import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "public", "alerts.json");
const MAX_ALERTS = 6;

// Reliable & Official RSS sources based on your research
const INTL_FEEDS = [
    { url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", label: "CISA Advisories" },
    { url: "https://www.cisa.gov/news-events/news/rss.xml", label: "CISA News" },
    { url: "https://www.fbi.gov/investigate/cyber/alerts/RSS", label: "FBI Cyber Alerts" },
    { url: "https://www.ftc.gov/news-events/stay-connected/rss-feeds", label: "FTC Consumer Advice" },
    { url: "https://www.ncsc.gov.uk/api/1/services/v1/all-rss-feed.xml", label: "NCSC UK" },
    { url: "https://cert.europa.eu/publications/security-advisories-rss", label: "CERT-EU" },
    { url: "https://isc.sans.edu/rssfeed_full.xml", label: "SANS ISC" },
    { url: "https://krebsonsecurity.com/feed", label: "Krebs on Security" },
    { url: "https://feeds.feedburner.com/TheHackersNews", label: "The Hacker News" },
    { url: "https://www.darkreading.com/rss.xml", label: "Dark Reading" }
];

const LOCAL_FEEDS = [
    { url: "https://mastodon.social/@rssphilippinenewsagency.rss", label: "PNA (Official)" },
    { url: "https://technology.inquirer.net/feed", label: "Inquirer (Technology)" },
    { url: "https://globalnation.inquirer.net/feed", label: "Inquirer (Global News)" },
    { url: "https://newsinfo.inquirer.net/feed", label: "Inquirer (Newsinfo)" },
    { url: "https://www.gmanetwork.com/news/rss/", label: "GMA News Online" },
    { url: "https://www.philstar.com/rss/", label: "Philstar" },
    { url: "https://www.rappler.com/feed", label: "Rappler" },
    { url: "https://cirt.gov.bd/feed/", label: "BGD e-GOV CIRT" }
];

async function fetchFromFeeds(feeds, type) {
    console.log(`Fetching ${type} alerts from official sources...`);
    let allItems = [];
    
    for (const feed of feeds) {
        try {
            // Fake user-agent slightly to prevent 403s on strict news sites
            const response = await fetch(feed.url, { 
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            });
            if (!response.ok) {
                console.error(`HTTP Error ${response.status} for ${feed.url}`);
                continue;
            }

            const xmlText = await response.text();
            // Support both RSS <item> and Atom <entry>
            const items = [...xmlText.matchAll(/<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/gi)];

            items.forEach((itemMatch) => {
                const block = itemMatch[1];
                const titleRaw = (block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "No Title";
                
                const descMatch = block.match(/<description[^>]*>([\s\S]*?)<\/description>/i) 
                               || block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) 
                               || block.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
                const descRaw = descMatch ? descMatch[1] : "";

                const linkMatch = block.match(/<link[^>]*href=["'](.*?)["']/i) || block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
                const linkRaw = linkMatch ? linkMatch[1] : "#";

                const dateMatch = block.match(/<(?:pubDate|published|updated|dc:date)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date)>/i);
                const pubDate = dateMatch ? dateMatch[1] : new Date().toISOString();

                const title = titleRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").replace(/<[^>]+>/g, '').trim();
                const desc = descRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").replace(/<[^>]+>/g, '').trim();
                const link = linkRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim();
                
                // Strictly filter local news to ONLY cyber/scam topics (Intl feeds provide pure cyber news primarily)
                const keywordRegex = /scam|cyber|hack|phish|fraud|breach|malware|ransomware|smishing|vishing/i;
                const isRelevant = type === "international" || keywordRegex.test(title) || keywordRegex.test(desc);

                if (isRelevant) {
                    const dateObj = new Date(pubDate);
                    const displayDate = isNaN(dateObj)
                        ? "Recently"
                        : dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

                    // Find base domain for the logo
                    let domainIcon = "https://icons.duckduckgo.com/ip3/news.google.com.ico"; // Fallback
                    try {
                        const urlObj = new URL(feed.url);
                        domainIcon = `https://icons.duckduckgo.com/ip3/${urlObj.hostname.replace("feeds.feedburner.com", "thehackernews.com")}.ico`;
                    } catch(e) {}

                    allItems.push({
                        id: `alert-${type}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
                        title: title,
                        url: link,
                        source: feed.label,
                        sourceLabel: feed.label,
                        sourceLogo: "newspaper",
                        category: "cybercrime",
                        severity: "medium",
                        date: displayDate,
                        rawDate: isNaN(dateObj) ? new Date().toISOString() : dateObj.toISOString(),
                        logo: domainIcon,
                        scope: type
                    });
                }
            });
        } catch (error) {
            console.error(`Failed fetching from ${feed.url}:`, error.message);
        }
    }

    return allItems;
}

function mergeAlerts(fetched, existing, type) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const freshAlerts = fetched.filter(a => new Date(a.rawDate) >= sevenDaysAgo);
    const existingType = existing.filter(a => a.scope === type);

    const allAlertsMap = new Map();
    [...existingType, ...freshAlerts].forEach(alert => {
        if (!alert.rawDate) alert.rawDate = new Date(alert.date).toISOString();
        const key = alert.title.toLowerCase().trim();
        if (!allAlertsMap.has(key)) {
            allAlertsMap.set(key, alert);
        } else {
            if (new Date(alert.rawDate) > new Date(allAlertsMap.get(key).rawDate)) {
                allAlertsMap.set(key, alert);
            }
        }
    });

    return Array.from(allAlertsMap.values())
        .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
        .slice(0, MAX_ALERTS);
}

async function fetchLatestAlerts() {
    try {
        const [localFetched, intlFetched] = await Promise.all([
            fetchFromFeeds(LOCAL_FEEDS, "local"),
            fetchFromFeeds(INTL_FEEDS, "international")
        ]);

        let existingLocal = [];
        let existingIntl = [];
        try {
            const prevContent = await readFile(OUTPUT_PATH, "utf8");
            const prevData = JSON.parse(prevContent);
            const allExisting = prevData.alerts || Object.values(prevData).flat() || [];
            existingLocal = allExisting.filter(a => a.scope === "local");
            existingIntl = allExisting.filter(a => a.scope === "international");
            
            // Backwards compatibility if old structure didn't have scope
            if (existingLocal.length === 0 && allExisting.length > 0 && !allExisting[0].scope) {
                // assume previous were local
                existingLocal = allExisting.map(a => ({...a, scope: "local"}));
            }
        } catch(e) {}

        const finalLocal = mergeAlerts(localFetched, existingLocal, "local");
        const finalIntl = mergeAlerts(intlFetched, existingIntl, "international");

        const newLocalTitles = finalLocal.map(a => a.title).join("|");
        const oldLocalTitles = existingLocal.slice(0, MAX_ALERTS).map(a => a.title).join("|");
        const newIntlTitles = finalIntl.map(a => a.title).join("|");
        const oldIntlTitles = existingIntl.slice(0, MAX_ALERTS).map(a => a.title).join("|");

        const isUnchanged = (newLocalTitles === oldLocalTitles) && (newIntlTitles === oldIntlTitles);

        if (isUnchanged && existingLocal.length > 0 && existingIntl.length > 0) {
            console.log(`No new local or international news found within the last 7 days. Maintaining existing alerts.`);
            process.exit(0);
        }

        const outputData = {
            fetchedAt: new Date().toISOString(),
            alerts: [...finalLocal, ...finalIntl]
        };

        await writeFile(OUTPUT_PATH, JSON.stringify(outputData, null, 2), "utf-8");
        console.log(`Successfully wrote ${finalLocal.length} local and ${finalIntl.length} international alerts to ${OUTPUT_PATH}`);
        
    } catch (error) {
        console.error("Error fetching alerts:", error);
        process.exit(1); 
    }
}

fetchLatestAlerts();
