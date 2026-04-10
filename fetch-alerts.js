import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "public", "alerts.json");
const MAX_ALERTS = 6;

// Reliable & Keyword-Focused Google News queries & top-tier RSS feeds
const INTL_FEEDS = [
    { url: "https://news.google.com/rss/search?q=%22online+scam%22+OR+%22emerging+fraud%22+OR+%22cybercrime%22+when:7d&hl=en-US&gl=US&ceid=US:en", label: "Google News Feed" },
    { url: "https://news.google.com/rss/search?q=%22phishing+attack%22+OR+%22identity+theft%22+when:7d&hl=en-US&gl=US&ceid=US:en", label: "Google News Feed" },
    { url: "https://www.bleepingcomputer.com/feed/", label: "BleepingComputer" },
    { url: "https://krebsonsecurity.com/feed", label: "Krebs on Security" }
];

const LOCAL_FEEDS = [
    { url: "https://news.google.com/rss/search?q=%22online+scam%22+philippines+OR+%22cybercrime%22+philippines+when:7d&hl=en-PH&gl=PH&ceid=PH:en", label: "PH News Search" },
    { url: "https://news.google.com/rss/search?q=(DICT+OR+NTC+OR+CICC+OR+PNP-ACG)+%22scam%22+OR+%22phishing%22+when:7d&hl=en-PH&gl=PH&ceid=PH:en", label: "PH Gov News Search" },
    { url: "https://news.google.com/rss/search?q=%22gcash+scam%22+OR+%22maya+scam%22+OR+%22smishing%22+philippines+when:14d&hl=en-PH&gl=PH&ceid=PH:en", label: "PH Local Tech Search" },
    { url: "https://news.google.com/rss/search?q=source:GMA+News+(scam+OR+phishing+OR+cybercrime)+when:7d&hl=en-PH&gl=PH&ceid=PH:en", label: "GMA News Search" },
    { url: "https://news.google.com/rss/search?q=source:ABS-CBN+News+(scam+OR+phishing+OR+cybercrime)+when:7d&hl=en-PH&gl=PH&ceid=PH:en", label: "ABS-CBN News Search" }
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

                const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
                const extractedSource = sourceMatch ? sourceMatch[1] : feed.label;

                let title = titleRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").replace(/<[^>]+>/g, '').trim();
                if (feed.url.includes("news.google.com")) {
                    const lastDash = title.lastIndexOf(" - ");
                    if (lastDash !== -1) title = title.substring(0, lastDash).trim();
                }

                const desc = descRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").replace(/<[^>]+>/g, '').trim();
                const link = linkRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim();
                
                // Strictly filter local news to ONLY cyber/scam topics (Intl feeds provide pure cyber news primarily)
                const keywordRegex = /scam|cyber|hack|phish|fraud|breach|malware|ransomware|smishing|vishing/i;
                const isRelevant = type === "international" || keywordRegex.test(title) || keywordRegex.test(desc) || feed.url.includes("news.google.com");

                if (isRelevant) {
                    const dateObj = new Date(pubDate);
                    const displayDate = isNaN(dateObj)
                        ? "Recently"
                        : dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

                    // Find base domain for the logo
                    let domainIcon = "https://icons.duckduckgo.com/ip3/news.google.com.ico"; // Fallback
                    try {
                        const sourceUrlMatch = block.match(/<source[^>]*url=["'](.*?)["']/i);
                        const sourceUrl = sourceUrlMatch ? sourceUrlMatch[1] : feed.url;
                        const urlObj = new URL(sourceUrl);
                        domainIcon = `https://icons.duckduckgo.com/ip3/${urlObj.hostname.replace("feeds.feedburner.com", "thehackernews.com")}.ico`;
                    } catch(e) {}

                    allItems.push({
                        id: `alert-${type}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
                        title: title,
                        url: link,
                        source: extractedSource,
                        sourceLabel: extractedSource,
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
