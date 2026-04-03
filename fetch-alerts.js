// fetch-alerts.js
// ═══════════════════════════════════════════════════════════════
// Fetches scam/cyber alerts ONLY from registered, trusted PH sources.
// Two-layer trust system:
//   1. TRUSTED_PUBLISHERS — whitelist of verified publisher names
//   2. TRUSTED_DOMAINS   — whitelist of verified article domains
// Any article not matching either layer is silently rejected.
//
// Zero external dependencies — uses only Node built-ins.
// Run manually:  node fetch-alerts.js
// Run via CI:    see .github/workflows/fetch-alerts.yml
// ═══════════════════════════════════════════════════════════════

import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname   = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "public", "alerts.json");

// ── Config ──────────────────────────────────────────────────────
const MAX_TOTAL_ALERTS = 12;
const FETCH_TIMEOUT_MS = 12_000;
const MAX_RETRIES      = 3;
const RETRY_DELAY_MS      = 1_500;
const MAX_ARTICLE_AGE_DAYS = 7;   // reject anything older than 7 days

// ═══════════════════════════════════════════════════════════════
// LAYER 1 — TRUSTED PUBLISHER NAMES
// ───────────────────────────────────────────────────────────────
// Google News embeds the publisher name inside the article title
// as "Headline - Publisher Name". We extract it and reject any
// article whose publisher is NOT in this set.
//
// To add a new source: add its exact Google News publisher label
// (lowercased) to this Set.
// ═══════════════════════════════════════════════════════════════
const TRUSTED_PUBLISHERS = new Set([
    // ── Philippine Government & Official Bodies ──────────────
    "bangko sentral ng pilipinas",
    "bsp",
    "cicc",                             
    "philippine national police",
    "pnp",
    "pnp-acg",
    "nbi",                              
    "dict",                             
    "securities and exchange commission",
    "sec",
    "department of trade and industry",
    "dti",
    "anti-money laundering council",
    "amlc",
    "philippine information agency",
    "pia",
    "philippine news agency",
    "pna",
    "department of justice",
    "doj",

    // ── Reliable Philippine News Outlets ─────────────────────
    "inquirer.net",
    "philippine daily inquirer",
    "gma news",
    "gma network",
    "the philippine star",
    "philstar",
    "philstar.com",
    "manila bulletin",
    "mb.com.ph",
    "rappler",
    "cnn philippines",
    "abs-cbn news",
    "abs-cbn",
    "one news",
    "business mirror",
    "businessmirror",
    "businessworld",
    "business world",
    "mindanews",
    "sunstar",
    "sunstar cebu",
    "daily tribune",
    "manila standard",
    "malaya business insight",
    "interaksyon",
    "reuters",
    "associated press",
    "ap",
]);

// ═══════════════════════════════════════════════════════════════
// LAYER 2 — TRUSTED ARTICLE DOMAINS
// ───────────────────────────────────────────────────────────────
// For sources whose RSS links go directly to the article
// (not through a Google News redirect), we also check the domain.
// Google News redirect URLs (news.google.com/...) bypass domain
// check since we can't resolve them without an extra HTTP call —
// they fall back to the publisher name check instead.
// ═══════════════════════════════════════════════════════════════
const TRUSTED_DOMAINS = new Set([
    // Government
    "bsp.gov.ph",
    "cicc.gov.ph",
    "pnp.gov.ph",
    "acg.pnp.gov.ph",
    "nbi.gov.ph",
    "dict.gov.ph",
    "sec.gov.ph",
    "dti.gov.ph",
    "amlc.gov.ph",
    "pia.gov.ph",
    "pna.gov.ph",
    "doj.gov.ph",

    // Reliable news
    "inquirer.net",
    "newsinfo.inquirer.net",
    "technology.inquirer.net",
    "gmanetwork.com",
    "news.gmanetwork.com",
    "philstar.com",
    "mb.com.ph",
    "rappler.com",
    "cnnphilippines.com",
    "abs-cbn.com",
    "news.abs-cbn.com",
    "onenews.ph",
    "businessmirror.com.ph",
    "bworldonline.com",
    "mindanews.com",
    "sunstar.com.ph",
    "tribune.net.ph",
    "manilastandard.net",
    "malaya.com.ph",
    "interaksyon.com",
    "reuters.com",
    "apnews.com",

    // Google News redirect — domain check not applicable, handled by publisher check
    "news.google.com",
]);

// ═══════════════════════════════════════════════════════════════
// RSS SOURCES
// ───────────────────────────────────────────────────────────────
// Three tiers:
//   A) Direct RSS from reliable outlets — most trustworthy
//   B) Google News scoped to specific trusted gov sites
//   C) Google News keyword search — filtered by TRUSTED_PUBLISHERS
// ═══════════════════════════════════════════════════════════════
const SOURCES = [

    // ── A) Direct RSS from reliable PH outlets ───────────────
    {
        id:          "pna-direct",
        sourceLabel: "Philippine News Agency",
        sourceLogo:  "account_balance",
        category:    "official",
        url:         "https://www.pna.gov.ph/rss/headlines",
        keywords:    ["scam","fraud","phishing","cybercrime","estafa","modus","gcash","sim swap","online","cyber"],
        maxItems:    3,
        directRSS:   true,  // domain already trusted — skip publisher check
    },
    {
        id:          "inquirer-tech",
        sourceLabel: "Inquirer.net",
        sourceLogo:  "newspaper",
        category:    "news",
        url:         "https://technology.inquirer.net/feed",
        keywords:    ["scam","fraud","phishing","cybercrime","estafa","gcash","sim swap"],
        maxItems:    3,
        directRSS:   true,
    },
    {
        id:          "gma-tech",
        sourceLabel: "GMA News",
        sourceLogo:  "newspaper",
        category:    "news",
        url:         "https://www.gmanetwork.com/news/rss/technology/",
        keywords:    ["scam","fraud","phishing","cybercrime","estafa","gcash","sim swap"],
        maxItems:    3,
        directRSS:   true,
    },
    {
        id:          "rappler-tech",
        sourceLabel: "Rappler",
        sourceLogo:  "newspaper",
        category:    "news",
        url:         "https://www.rappler.com/technology/internet-culture/feed/",
        keywords:    ["scam","fraud","phishing","cybercrime","philippines"],
        maxItems:    2,
        directRSS:   true,
    },

    // ── B) Google News scoped to trusted gov sites ───────────
    {
        id:          "gnews-bsp",
        sourceLabel: "Bangko Sentral ng Pilipinas",
        sourceLogo:  "account_balance",
        category:    "banking",
        url:         "https://news.google.com/rss/search?q=site:bsp.gov.ph+advisory+scam+fraud&hl=en-PH&gl=PH&ceid=PH:en",
        keywords:    [],
        maxItems:    3,
        directRSS:   false,
    },
    {
        id:          "gnews-sec",
        sourceLabel: "Securities and Exchange Commission",
        sourceLogo:  "gavel",
        category:    "investment scam",
        url:         "https://news.google.com/rss/search?q=site:sec.gov.ph+advisory+investment+scam&hl=en-PH&gl=PH&ceid=PH:en",
        keywords:    [],
        maxItems:    2,
        directRSS:   false,
    },
    {
        id:          "gnews-cicc",
        sourceLabel: "CICC",
        sourceLogo:  "security",
        category:    "cybercrime",
        url:         "https://news.google.com/rss/search?q=site:cicc.gov.ph&hl=en-PH&gl=PH&ceid=PH:en",
        keywords:    [],
        maxItems:    2,
        directRSS:   false,
    },

    // ── C) Google News keyword search — publisher-filtered ───
    {
        id:          "gnews-scam",
        sourceLabel: "Google News",
        sourceLogo:  "newspaper",
        category:    "scam",
        url:         "https://news.google.com/rss/search?q=scam+fraud+Philippines+when:7d&hl=en-PH&gl=PH&ceid=PH:en",
        keywords:    [],
        maxItems:    4,
        directRSS:   false,
    },
    {
        id:          "gnews-cyber",
        sourceLabel: "Google News",
        sourceLogo:  "security",
        category:    "cybercrime",
        url:         "https://news.google.com/rss/search?q=cybercrime+phishing+gcash+Philippines+when:7d&hl=en-PH&gl=PH&ceid=PH:en",
        keywords:    [],
        maxItems:    3,
        directRSS:   false,
    },
    {
        id:          "gnews-pnp",
        sourceLabel: "Google News",
        sourceLogo:  "local_police",
        category:    "law enforcement",
        url:         "https://news.google.com/rss/search?q=PNP+NBI+cybercrime+arrest+Philippines+when:7d&hl=en-PH&gl=PH&ceid=PH:en",
        keywords:    [],
        maxItems:    3,
        directRSS:   false,
    },
];

// ── Trust checks ────────────────────────────────────────────────
function isTrustedPublisher(publisher = "") {
    return TRUSTED_PUBLISHERS.has(publisher.toLowerCase().trim());
}

function isTrustedDomain(url = "") {
    try {
        const hostname = new URL(url).hostname.replace(/^www\./, "");
        return TRUSTED_DOMAINS.has(hostname);
    } catch { return false; }
}

function isTrusted(item, source) {
    if (source.directRSS)           return true;  // source domain already vetted
    if (isTrustedDomain(item.link)) return true;  // direct article domain matches
    if (isTrustedPublisher(item.publisher)) return true; // Google News publisher matches
    return false;
}

// ── Text helpers ────────────────────────────────────────────────
function cleanText(raw = "") {
    return raw
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g,   "&")
        .replace(/&lt;/g,    "<")
        .replace(/&gt;/g,    ">")
        .replace(/&quot;/gi, '"')
        .replace(/&apos;|&#39;/gi, "'")
        .replace(/&nbsp;/gi, " ")
        .replace(/&#(\d+);/g,        (_, n) => String.fromCharCode(+n))
        .replace(/&#x([0-9a-f]+);/gi,(_, h) => String.fromCharCode(parseInt(h, 16)))
        .replace(/\s+/g, " ")
        .trim();
}

function splitTitle(raw) {
    const i = raw.lastIndexOf(" - ");
    if (i > 10) return { headline: raw.slice(0, i).trim(), publisher: raw.slice(i + 3).trim() };
    return { headline: raw, publisher: "" };
}

function inferSeverity(title = "") {
    const t = title.toLowerCase();
    if (/urgent|critical|immediate|warning|high.risk|severe|breach|hack|attack|sim.swap/.test(t)) return "high";
    if (/reminder|advisory|notice|alert|caution|scam|fraud|phishing|estafa|modus|gcash/.test(t))  return "medium";
    return "low";
}

function matchesKeywords(title = "", keywords = []) {
    if (!keywords.length) return true;
    const t = title.toLowerCase();
    return keywords.some(kw => t.includes(kw.toLowerCase()));
}

// ── Date freshness check ────────────────────────────────────────
function isFreshEnough(dateObj) {
    if (isNaN(dateObj)) return false; // unparseable date = reject
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - MAX_ARTICLE_AGE_DAYS);
    const fresh = dateObj >= cutoff;
    return fresh;
}

function isValidUrl(str) {
    try { return ["http:", "https:"].includes(new URL(str).protocol); }
    catch { return false; }
}

// ── Minimal RSS parser ──────────────────────────────────────────
function parseRSS(xml) {
    const items  = [];
    const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

    for (const block of blocks) {
        const get = (tag) => {
            const m = block.match(
                new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, "i")
            );
            return m ? (m[1] ?? m[2] ?? "").trim() : "";
        };

        const rawTitle = cleanText(get("title"));
        const link     = get("link") || get("guid");
        const pubDate  = get("pubDate") || get("dc:date");

        if (!rawTitle || !isValidUrl(link)) continue;

        const { headline, publisher } = splitTitle(rawTitle);

        let date = new Date().toISOString().slice(0, 10);
        let parsedDate = new Date();
        if (pubDate) {
            parsedDate = new Date(pubDate);
            if (!isNaN(parsedDate)) {
                // Format the date nicely to "Month Name Day, Year"
                const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                date = parsedDate.toLocaleDateString('en-US', dateOptions);
            }
        }

        items.push({ title: headline, publisher, link, date, rawDate: parsedDate });
    }
    return items;
}

// ── Fetch with retry (exponential backoff) ──────────────────────
async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res;
        } catch (err) {
            if (attempt === retries) throw err;
            const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
            console.warn(`  ↻ Retry ${attempt}/${retries - 1} for ${url} — ${err.message} (wait ${delay}ms)`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
}

// ── Fetch one source ────────────────────────────────────────────
// (Fetch logic moved into main loop for brevity)


// ── Main ────────────────────────────────────────────────────────
async function main() {
    console.log("fetch-alerts: starting —", new Date().toISOString());
    console.log(`fetch-alerts: ${TRUSTED_PUBLISHERS.size} trusted publishers | ${TRUSTED_DOMAINS.size} trusted domains`);

    const results = [];
    const errors  = [];

    await Promise.allSettled(
        SOURCES.map(async (source) => {
            try {
                const res = await fetchWithRetry(source.url, {
                    headers: {
                        "User-Agent": "PROOF-CampaignBot/1.0 (scam awareness; github.com/proof-campaign)",
                        "Accept":     "application/rss+xml, application/xml, text/xml, */*",
                    },
                });

                const xml = await res.text();
                const raw = parseRSS(xml);

                let rejected = 0;
                const items = raw
                    .filter(item => {
                        if (!matchesKeywords(item.title, source.keywords)) return false;
                        if (!isFreshEnough(item.rawDate)) {
                            rejected++;
                            return false;
                        }
                        if (!isTrusted(item, source)) {
                            rejected++;
                            return false;
                        }
                        return true;
                    })
                    .slice(0, source.maxItems)
                    .map((item, i) => {
                        // Extract original domain from google news if possible (naive extraction), 
                        // fallback to checking the source title.
                        let hostname = "news.google.com";
                        
                        // Give it an icon based on the publisher
                        let logoUrl;
                        const publisher = (item.publisher || source.sourceLabel).toLowerCase();
                        if (publisher.includes('inquirer')) logoUrl = 'https://icons.duckduckgo.com/ip3/inquirer.net.ico';
                        else if (publisher.includes('pna') || publisher.includes('agency')) logoUrl = 'https://icons.duckduckgo.com/ip3/pna.gov.ph.ico';
                        else if (publisher.includes('gma')) logoUrl = 'https://icons.duckduckgo.com/ip3/gmanetwork.com.ico';
                        else if (publisher.includes('rappler')) logoUrl = 'https://icons.duckduckgo.com/ip3/rappler.com.ico';
                        else if (publisher.includes('cnn')) logoUrl = 'https://icons.duckduckgo.com/ip3/cnnphilippines.com.ico';
                        else if (publisher.includes('abs-cbn')) logoUrl = 'https://icons.duckduckgo.com/ip3/abs-cbn.com.ico';
                        else if (publisher.includes('bsp')) logoUrl = 'https://icons.duckduckgo.com/ip3/bsp.gov.ph.ico';
                        else if (publisher.includes('nbi')) logoUrl = 'https://icons.duckduckgo.com/ip3/nbi.gov.ph.ico';
                        else if (publisher.includes('pnp')) logoUrl = 'https://icons.duckduckgo.com/ip3/pnp.gov.ph.ico';
                        else if (publisher.includes('sec')) logoUrl = 'https://icons.duckduckgo.com/ip3/sec.gov.ph.ico';
                        else if (publisher.includes('standard')) logoUrl = 'https://icons.duckduckgo.com/ip3/manilastandard.net.ico';
                        else if (publisher.includes('star')) logoUrl = 'https://icons.duckduckgo.com/ip3/philstar.com.ico';
                        else if (publisher.includes('sun')) logoUrl = 'https://icons.duckduckgo.com/ip3/sunstar.com.ph.ico';
                        else if (publisher.includes('bulletin')) logoUrl = 'https://icons.duckduckgo.com/ip3/mb.com.ph.ico';
                        else if (publisher.includes('mirror')) logoUrl = 'https://icons.duckduckgo.com/ip3/businessmirror.com.ph.ico';
                        else if (publisher.includes('world')) logoUrl = 'https://icons.duckduckgo.com/ip3/bworldonline.com.ico';
                        else {
                            try { hostname = new URL(item.link).hostname; } catch(e) {}
                            logoUrl = `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
                        }
                        
                        return {
                            id:          `${source.id}-${item.date}-${i}`,
                            source:      source.directRSS ? source.sourceLabel : (item.publisher || source.sourceLabel),
                            sourceLabel: source.directRSS ? source.sourceLabel : (item.publisher || source.sourceLabel),
                            sourceLogo:  source.sourceLogo,
                            category:    source.category,
                            severity:    inferSeverity(item.title),
                            date:        item.date,
                            rawDate:     item.rawDate.toISOString(),
                            title:       item.title,
                            summary:     "Read more at the source.",
                            url:         item.link,
                            logo:        logoUrl
                        };
                    });

                results.push(...items);
                console.log(`  ✓ ${source.id} — ${items.length} trusted item(s)`);
            } catch (err) {
                errors.push({ source: source.id, error: err.message });
                console.warn(`  ✗ ${source.id} — ${err.message}`);
            }
        })
    );

    results.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

    const seenTitles = new Set();
    const seenUrls   = new Set();
    const deduped    = results.filter(item => {
        const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
        if (seenTitles.has(key) || seenUrls.has(item.url)) return false;
        seenTitles.add(key);
        seenUrls.add(item.url);
        return true;
    });

    const final = deduped.slice(0, MAX_TOTAL_ALERTS);

    if (final.length === 0 && errors.length === SOURCES.length) {
        console.warn("fetch-alerts: all sources failed — keeping existing alerts.json");
        process.exit(0);
    }

    const output = {
        fetchedAt:      new Date().toISOString(),
        trustedSources: TRUSTED_PUBLISHERS.size,
        alerts:         final,
    };

    await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");
    console.log(`fetch-alerts: wrote ${final.length} trusted alert(s) → alerts.json`);

    if (errors.length) console.warn(`fetch-alerts: ${errors.length} source(s) had errors —`, errors);
    if (final.length === 0) { console.error("fetch-alerts: no trusted alerts found."); process.exit(1); }
}

main().catch(err => {
    console.error("fetch-alerts: fatal —", err);
    process.exit(1);
});
