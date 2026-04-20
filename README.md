<div align="center">

<img src="https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
<img src="https://img.shields.io/badge/Updates-Every_12_Hours-0075CA?style=for-the-badge&logo=githubactions&logoColor=white" />

# P.R.O.O.F

### Program for Responsible Online Operations and Fraud-Awareness

**A localized, technology-driven campaign platform designed to protect Filipinos from online scams and cyber fraud.**

P.R.O.O.F delivers real-time scam alerts, data-backed statistics, educational resources, and direct links to official government reporting agencies, consolidated into a single free website that is updated automatically on a 12-hour cycle and built specifically for use in the Philippines.

**[Visit the Live Website](https://alxxrzfyr.github.io/peoof-web)**

</div>

---

## Table of Contents
- [Executive Summary](#executive-summary)
- [Background and Rationale](#background-and-rationale)
- [Features](#features)
  - [Live Scam Alerts](#live-scam-alerts)
  - [Statistics Dashboard](#statistics-dashboard)
  - [Scam Type Encyclopedia](#scam-type-encyclopedia)
  - [Interactive Scenarios](#interactive-scenarios)
  - [How to Report](#how-to-report)
- [Automation and System Logic](#automation-and-system-logic)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Local Development Guide](#local-development-guide)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Official Reporting Channels](#official-reporting-channels)
- [Contributing](#contributing)
- [Attributions and Acknowledgements](#attributions-and-acknowledgements)

---

## Executive Summary

The rapid digitalization of financial and social services in the Philippines has contributed to a significant rise in phishing, identity theft, and online fraud. P.R.O.O.F was developed as an educational and preventive response to this growing national concern.

The platform bridges the gap between complex cybersecurity concepts and the general public. It retrieves verified cybercrime advisories from trusted local domains and reputable international journalism on a daily basis, presents them through a bilingual (English and Filipino) accessible interface, and supplements them with factual statistics and educational resources. The platform operates at no cost to users, is free of algorithmic curation, and is designed to remain accurate and current at all times.

---

## Background and Rationale

Online fraud is among the fastest-growing threats to Filipinos today. Approximately eight in ten Filipino adults encounter scam attempts on an annual basis. Despite the scale of the problem, information about active threats remains fragmented across government websites, social media, and news articles that most members of the public never encounter.

P.R.O.O.F addresses this gap directly. It retrieves verified cybercrime advisories from trusted Philippine sources, surfaces them through a clean and accessible interface, and pairs them with factual statistics and educational materials.

---

## Features

### Live Scam Alerts
> _Automatically refreshed every 12 hours._

The alerts feed is the core component of P.R.O.O.F. A GitHub Actions workflow runs on a 12-hour schedule, retrieving fresh RSS feeds from a curated whitelist of reliable cybersecurity journalists and local news sources. Every alert published on the platform has been sourced from a verified, trusted domain and validated through strict programmatic filters.

Each alert card displays the following:
- **Headline** — the title of the advisory or news report
- **Source logo** — identifies the publishing agency or outlet (powered by the DuckDuckGo Favicon API)
- **Publication date** — formatted and normalized across all feed sources
- **Direct link** — navigates to the original article or advisory

### Statistics Dashboard
> _Verified data presented through interactive visualizations. Powered by Recharts._

The statistics section presents verified Philippine cybercrime data through a set of fully interactive, responsive charts covering the following areas:
- **Scam Type Distribution:** A breakdown of the most commonly reported fraud categories
- **Victim Demographics:** Age group and regional data indicating which populations are most frequently targeted
- **Financial Loss Trends:** Year-over-year data on total reported financial losses
- **Incident Volume Over Time:** Monthly and annual reported cybercrime incident counts

### Scam Type Encyclopedia
> _A reference guide for identifying threats before they occur._

P.R.O.O.F documents the most prevalent fraud tactics actively targeting Filipinos, written in plain and accessible language. Each entry includes an explanation of mechanics, identifiable warning signs, and recommended avoidance strategies for the following scam types: Phishing, Smishing, Vishing, Online Selling Scams, Love Scams, Investment Fraud, SIM Swap Attacks, Job Scams, and Parcel Scams.

### Interactive Scenarios
> _Practical, consequence-free scam recognition exercises._

Simulation modules allow users to test their ability to identify phishing attempts and fraudulent schemes in a controlled environment before encountering them in real-world situations.

### How to Report
> _Guidance on which agencies to contact and how._

The reporting section provides direct, current contact information for every major Philippine government agency responsible for handling cybercrime and fraud, including an outline of each agency's mandate and available hotlines.

---

## Automation and System Logic

P.R.O.O.F operates without a backend server or traditional database. All live data flows through a single automated pipeline driven by GitHub Actions and a zero-dependency Node.js script.

### Script Logic (`rss feed/fetch-alerts.js`)

**1. Source Retrieval**

The script pulls from two categories of sources:

- **Local (Philippines):** Analyzes Google News RSS feeds filtered to Philippine domains such as `gmanetwork.com`, `inquirer.net`, and `mb.com.ph`, or articles containing Philippines-specific keywords.
- **International:** Retrieves from dedicated cybersecurity journalism outlets (Krebs on Security, The Guardian's Scam feed) and a strictly filtered news aggregator limited to highly credible global publishers including Reuters, BBC, AP News, Wired, and The Wall Street Journal.

**2. Content Filtering (Regular Expression)**

Every article retrieved is evaluated against a strict regular expression pattern that checks for specific online fraud identifiers such as `phishing`, `pig butchering`, `crypto scam`, `sim swap`, and `ransomware`. Articles that do not explicitly address online scams or fraud, or that do not match the domain whitelist, are automatically excluded.

**3. Output**

Verified articles are formatted, date-normalized, assigned a publisher logo via the DuckDuckGo Favicon API, and saved directly into `rss feed/alerts.json`, with a maximum of 12 alerts per category.

A simplified representation of the core pipeline logic is as follows:

```javascript
// fetch-alerts.js — core pipeline logic (simplified)
const scamRegex = /phishing|pig butchering|crypto scam|sim swap|ransomware/i;

async function fetchAndFilter(feedUrl) {
  const items = await parseRSS(feedUrl);
  return items.filter(item => scamRegex.test(item.title + item.description));
}

async function run() {
  const local = await fetchAndFilter(PH_GOOGLE_NEWS_RSS);
  const global = await fetchAndFilter(KREBS_RSS);

  const verified = [...local, ...global]
    .map(item => attachLogo(item))     // DuckDuckGo Favicon API
    .map(item => normalizeDate(item))  // Consistent ISO date format
    .slice(0, 12);                     // Max 12 alerts per category

  fs.writeFileSync('rss feed/alerts.json', JSON.stringify(verified, null, 2));
  console.log(`✅ Done — ${verified.length} alerts written to alerts.json`);
}

run();
```

### Full Pipeline Overview

```
┌─────────────────────────────────────────────────┐
│       GitHub Actions — Runs Every 12 Hours      │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
           ┌─────────────────────┐
           │  fetch-alerts.js    │  (Node.js scraper)
           └────────┬────────────┘
                    │
       ┌────────────┼─────────────────┐
       ▼            ▼                 ▼
 Pull RSS       Filter out        Attach logos
 feeds from     irrelevant        + normalize
 whitelisted    articles          dates
 sources        (Regex)           (DuckDuckGo)
       │            │                 │
       └────────────┴─────────────────┘
                     │
                     ▼
          Writes rss feed/alerts.json
                     │
                     ▼
       Git commit pushed by PROOF Alert Bot
                     │
                     ▼
           Triggers deploy.yml
                     │
                     ▼
       Vite builds & moves assets to dist/
                     │
                     ▼
     Fresh site deployed to GitHub Pages ✅
```

---

## Technology Stack

| Technology | Role |
| --- | --- |
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool and development server |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Core scripting language (`fetch-alerts.js`) |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible, headless UI components |
| [Recharts](https://recharts.org/) | Interactive data visualization |
| [Node.js](https://nodejs.org/) | Runtime for the `fetch-alerts.js` script |
| [GitHub Actions](https://github.com/features/actions) | Scheduled automation and CI/CD pipeline |
| [GitHub Pages](https://pages.github.com/) | Static site hosting |
| [Figma](https://figma.com/) | Original design source |

---

## Project Structure

```
PROOF-WEBSITE/
├── .github/workflows/
│   ├── deploy.yml           # Builds Vite UI & deploys to GitHub Pages
│   └── fetch-alerts.yml     # Cron: pulls latest scam news every 12 hrs
├── guidelines/              # Project guidelines and documentation
├── rss feed/                # Public static storage directory
│   ├── alerts.json          # Auto-generated data output (JSON)
│   └── fetch-alerts.js      # Core automation logic
├── src/
│   ├── assets/              # Local images and background files
│   ├── components/          # Reusable React components
│   │   ├── figma/           # Exported Figma design components
│   │   └── ui/              # Component library elements (Radix/Shadcn)
│   ├── hooks/               # Custom React hooks (e.g., use-mobile)
│   ├── lib/                 # Utility functions and helpers
│   ├── styles/              # Global fonts and Tailwind CSS styles
│   ├── App.tsx              # Root React component
│   └── main.tsx             # Application entry point
├── .prettierrc.mjs          # Prettier formatting configuration
├── eslint.config.js         # ESLint rules configuration
├── index.html               # Main HTML template
├── package-lock.json        # NPM dependency lockfile
├── package.json             # NPM dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
└── vite.config.ts           # Configured to expose 'rss feed' as a public directory
```

---

## Local Development Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/alxxrzfyr/proof-web.git
cd proof-web
git checkout main
npm install
```

### 2. Fetching Alerts Locally

The live scam feed can be updated manually on a local machine prior to running the application. Execute the fetcher script located in the `rss feed/` directory:

```bash
node "rss feed/fetch-alerts.js"
```

Expected console output:

```console
[PROOF Alert Bot] Fetching PH sources...  ✔
[PROOF Alert Bot] Fetching global sources... ✔
[PROOF Alert Bot] Applying scam regex filter...
[PROOF Alert Bot] 9 PH articles matched. 7 global articles matched.
✅ Done — 12 alerts written to alerts.json
```

This command connects to the internet to retrieve the latest security RSS feeds, applies the scam regex filters, formats the resulting data, retrieves domain logos, and overwrites `rss feed/alerts.json` with the updated output.

### 3. Starting the Development Server

```bash
npm run dev
```

```console
  VITE v5.x.x  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

The frontend reads the local JSON data file via `fetch('alerts.json')`. This works because Vite is configured in `vite.config.ts` (via the `publicDir` flag) to treat the `rss feed/` directory as a standard public static assets folder.

### 4. Building for Production

```bash
npm run build
```

```console
vite v5.x.x building for production...
✓ 84 modules transformed.
dist/index.html                  0.46 kB │ gzip:  0.30 kB
dist/assets/index-[hash].css    42.18 kB │ gzip:  8.91 kB
dist/assets/index-[hash].js    312.04 kB │ gzip: 91.23 kB
✓ built in 3.21s
```

This produces an optimized React bundle in the `dist/` directory, with the `rss feed/` assets copied alongside the JavaScript and CSS output.

### 5. Linting and Formatting

To run the linter:

```bash
npm run lint
```

To format the codebase using Prettier:

```bash
npm run format
```

---

## GitHub Actions Workflows

### `fetch-alerts.yml`

| Property | Value |
| --- | --- |
| Trigger | Cron schedule — every 12 hours (`0 */12 * * *`) |
| Manual trigger | `workflow_dispatch` — can be run on demand from the GitHub Actions UI |
| Function | Executes `"rss feed/fetch-alerts.js"` and commits the updated `alerts.json` to the `main` branch |

### `deploy.yml`

| Property | Value |
| --- | --- |
| Trigger | Any push to the `main` branch, including automated commits from the fetch workflow |
| Function | Installs dependencies and runs `vite build` using the `rss feed/` directory as the public asset source |

---

## Official Reporting Channels

Any individual who has been victimized by an online scam in the Philippines is encouraged to file a report promptly with one of the following agencies:

| Agency | Jurisdiction | Contact |
| --- | --- | --- |
| **CICC** | All cybercrime coordination | [cicc.gov.ph](https://cicc.gov.ph) · Hotline **1326** |
| **PNP Anti-Cybercrime Group** | Criminal enforcement and cybercrime cases | [acg.pnp.gov.ph](https://acg.pnp.gov.ph) |
| **NBI Cybercrime Division** | Serious and syndicated cybercrime offenses | [nbi.gov.ph](https://nbi.gov.ph) |
| **BSP** | Bank-related fraud and financial scams | [bsp.gov.ph](https://bsp.gov.ph) · consumer@bsp.gov.ph |
| **DICT** | Digital governance and cyber policy | [dict.gov.ph](https://dict.gov.ph) |

**Note:** When filing a report, it is advisable to prepare supporting evidence in advance. Screenshots of messages, transaction records, URLs, phone numbers, and email headers all strengthen a reported case.

---

## Contributing

Contributions are welcome. To contribute, fork the repository, create a feature branch off `main`, implement your changes, and submit a pull request with a clear and detailed description of what was added or modified.

---

## Attributions and Acknowledgements

The original design for this platform was conceptualized and prototyped in Figma. The platform is built on React, Vite, Tailwind CSS, and TypeScript, and is sustained by reporting from credible, independent open-internet journalism.

---

_P.R.O.O.F is a community awareness initiative. It is not affiliated with any Philippine government agency. All links to official channels are provided for public convenience._
