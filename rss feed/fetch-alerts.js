import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, 'alerts.json');
const MAX_ALERTS = 12;

// International feeds - Online scam alerts, consumer fraud prevention, and factual reporting
const INTL_FEEDS = [
  { url: 'https://www.theguardian.com/money/scamsandfraud/rss', label: 'The Guardian (Scams)' },
  { url: 'https://krebsonsecurity.com/feed/', label: 'Krebs on Security' },
  {
    // Simplified query since Google ignores complex site: blocks. We will filter the domains in JavaScript.
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22crypto+scam%22+OR+%22pig+butchering%22+OR+%22tech+support+scam%22+OR+%22malware%22+OR+%22ransomware%22)+when:30d&hl=en-US&gl=US&ceid=US:en',
    label: 'Global News (Scams)',
    whitelist: ['reuters', 'associated press', 'bbc', 'npr', 'consumer reports', 'cnbc', 'bloomberg', 'wired', 'techcrunch', 'wall street journal', 'cbs news', 'nbc news']
  }
];

// Local feeds - Philippines ONLY (online scam & fraud awareness)
const LOCAL_FEEDS = [
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:ph+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'PH Online Scam News',
  },
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:gmanetwork.com+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'GMA News',
  },
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:abs-cbn.com+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'ABS-CBN News',
  },
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:inquirer.net+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'Inquirer',
  },
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:philstar.com+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'Philstar',
  },
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:mb.com.ph+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'Manila Bulletin',
  },
  {
    url: 'https://news.google.com/rss/search?q=(%22phishing%22+OR+%22smishing%22+OR+%22gcash+scam%22+OR+%22online+selling+scam%22+OR+%22love+scam%22+OR+%22crypto+scam%22+OR+%22task+scam%22+OR+%22fake+booking+scam%22)+site:rappler.com+when:30d&hl=en-PH&gl=PH&ceid=PH:en',
    label: 'Rappler',
  },
];

async function fetchFromFeeds(feeds, type) {
  console.log(`Fetching ${type} alerts from official sources...`);
  let allItems = [];

  for (const feed of feeds) {
    try {
      // Fake user-agent slightly to prevent 403s on strict news sites
      const response = await fetch(feed.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
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
        const titleRaw = (block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || 'No Title';

        const descMatch =
          block.match(/<description[^>]*>([\s\S]*?)<\/description>/i) ||
          block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) ||
          block.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
        const descRaw = descMatch ? descMatch[1] : '';

        const linkMatch =
          block.match(/<link[^>]*href=["'](.*?)["']/i) ||
          block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
        const linkRaw = linkMatch ? linkMatch[1] : '#';

        const dateMatch = block.match(
          /<(?:pubDate|published|updated|dc:date)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date)>/i
        );
        const pubDate = dateMatch ? dateMatch[1] : new Date().toISOString();

        const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
        const extractedSource = sourceMatch ? sourceMatch[1] : feed.label;

        let title = titleRaw
          .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
          .replace(/<[^>]+>/g, '')
          .trim();
        if (feed.url.includes('news.google.com')) {
          const lastDash = title.lastIndexOf(' - ');
          if (lastDash !== -1) title = title.substring(0, lastDash).trim();
        }

        const desc = descRaw
          .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
          .replace(/<[^>]+>/g, '')
          .trim();
        const link = linkRaw.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();

        // Broadened scam matching since we are now relying on strictly whitelisted, high-quality sources
        const onlineScamRegex =
          /(scam|fraud|phishing|smishing|vishing|crypto|bitcoin|nft|tech support|lottery|job fake|employment|recruitment|BEC|account takeover|identity theft|sim.?swap|otp|qr.?code|deepfake|ai fake|malware|ransomware|pig.?butchering|money mule|impersonation|scammer|swindle|extortion|cybercrime|hacker|breach)/i;

        // Strictly enforce local news to only include articles explicitly mentioning the Philippines or from PH domains
        const philippinesRef =
          /\b(philippines|philippine|filipino|filipina|pinoy|pinay|pnp|nbi|bsp|dti|dict|dfcc|gcash|paymaya|maya|manila|cebu|quezon|davao|makati|pasig|taguig|ntc)\b/i;
        const isPhDomain =
          /\.(ph|com\.ph)\/|gmanetwork\.com|abs-cbn\.com|inquirer\.net|philstar\.com|mb\.com\.ph|rappler\.com|pna\.gov\.ph|cnnphilippines\.com|bworldonline\.com|sunstar\.com\.ph/i.test(
            link
          ) ||
          /\.(ph|com\.ph)|gma|abs.?cbn|inquirer|philstar|manila bulletin|rappler|pna|sunstar|businessworld/i.test(
            extractedSource
          );
        const isLocallyRelevant =
          type !== 'local' || isPhDomain || philippinesRef.test(title) || philippinesRef.test(desc);

        // Optional Source Whitelist (For International Google News)
        const passesWhitelist = !feed.whitelist || feed.whitelist.some(w => extractedSource.toLowerCase().includes(w));

        // All feeds go through the same scam filter — no source is whitelisted to bypass it
        const isRelevant =
          (onlineScamRegex.test(title) || onlineScamRegex.test(desc)) && isLocallyRelevant && passesWhitelist;

        if (isRelevant) {
          const dateObj = new Date(pubDate);
          const displayDate = isNaN(dateObj)
            ? 'Recently'
            : dateObj.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              });

          // Find base domain for the logo
          let domainIcon = 'https://icons.duckduckgo.com/ip3/news.google.com.ico'; // Fallback
          try {
            const sourceUrlMatch = block.match(/<source[^>]*url=["'](.*?)["']/i);
            const sourceUrl = sourceUrlMatch ? sourceUrlMatch[1] : feed.url;
            const urlObj = new URL(sourceUrl);
            domainIcon = `https://icons.duckduckgo.com/ip3/${urlObj.hostname.replace('feeds.feedburner.com', 'thehackernews.com')}.ico`;
          } catch (e) {}

          allItems.push({
            id: `alert-${type}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            title: title,
            url: link,
            source: extractedSource,
            sourceLabel: extractedSource,
            sourceLogo: 'newspaper',
            category: 'cybercrime',
            severity: 'medium',
            date: displayDate,
            rawDate: isNaN(dateObj) ? new Date().toISOString() : dateObj.toISOString(),
            logo: domainIcon,
            scope: type,
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
  const timeLimit = new Date();
  timeLimit.setDate(timeLimit.getDate() - 30); // 30 days for broader local context

  const freshAlerts = fetched.filter((a) => {
    const d = new Date(a.rawDate);
    return isNaN(d) || d >= timeLimit;
  });
  const existingType = existing.filter((a) => a.scope === type);

  const allAlertsMap = new Map();
  [...existingType, ...freshAlerts].forEach((alert) => {
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
      fetchFromFeeds(LOCAL_FEEDS, 'local'),
      fetchFromFeeds(INTL_FEEDS, 'international'),
    ]);

    let existingLocal = [];
    let existingIntl = [];
    try {
      const prevContent = await readFile(OUTPUT_PATH, 'utf8');
      const prevData = JSON.parse(prevContent);
      const allExisting = prevData.alerts || Object.values(prevData).flat() || [];
      existingLocal = allExisting.filter((a) => a.scope === 'local');
      existingIntl = allExisting.filter((a) => a.scope === 'international');

      // Backwards compatibility if old structure didn't have scope
      if (existingLocal.length === 0 && allExisting.length > 0 && !allExisting[0].scope) {
        // assume previous were local
        existingLocal = allExisting.map((a) => ({ ...a, scope: 'local' }));
      }
    } catch (e) {}

    const finalLocal = mergeAlerts(localFetched, existingLocal, 'local');
    const finalIntl = mergeAlerts(intlFetched, existingIntl, 'international');

    const newLocalTitles = finalLocal.map((a) => a.title).join('|');
    const oldLocalTitles = existingLocal
      .slice(0, MAX_ALERTS)
      .map((a) => a.title)
      .join('|');
    const newIntlTitles = finalIntl.map((a) => a.title).join('|');
    const oldIntlTitles = existingIntl
      .slice(0, MAX_ALERTS)
      .map((a) => a.title)
      .join('|');

    const isUnchanged = newLocalTitles === oldLocalTitles && newIntlTitles === oldIntlTitles;

    if (isUnchanged && existingLocal.length > 0 && existingIntl.length > 0) {
      console.log(
        `No new local or international news found within the last 7 days. Maintaining existing alerts.`
      );
      process.exit(0);
    }

    const outputData = {
      fetchedAt: new Date().toISOString(),
      alerts: [...finalLocal, ...finalIntl],
    };

    await writeFile(OUTPUT_PATH, JSON.stringify(outputData, null, 2), 'utf-8');
    console.log(
      `Successfully wrote ${finalLocal.length} local and ${finalIntl.length} international alerts to ${OUTPUT_PATH}`
    );
  } catch (error) {
    console.error('Error fetching alerts:', error);
    process.exit(1);
  }
}

fetchLatestAlerts();
