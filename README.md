<div align="center">

<img src="https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
<img src="https://img.shields.io/badge/Updates-Every_12_Hours-0075CA?style=for-the-badge&logo=githubactions&logoColor=white" />

# 🛡️ P.R.O.O.F

### Program for Responsible Online Operations and Fraud-awareness

**A localized, tech-driven campaign platform designed to protect Filipinos from online scams and cyber fraud.**

P.R.O.O.F delivers real-time scam alerts, data-backed statistics, educational resources, and direct links to official government reporting agencies — all in one free, automatically updated website built for the Philippines.

**🌐 [Visit the Live Website →](https://alxxrzfyr.github.io/PROOF-WEBSITE)**

</div>

---

## 📌 Table of Contents
- [Executive Summary](#-executive-summary)
- [Why P.R.O.O.F?](#-why-proof)
- [Features](#-features)
  - [Live Scam Alerts](#-live-scam-alerts)
  - [Statistics Dashboard](#-statistics-dashboard)
  - [Scam Type Encyclopedia](#-scam-type-encyclopedia)
  - [Interactive Scenarios](#-interactive-scenarios-try-me)
  - [How to Report](#-how-to-report)
- [How the Automation & Logic Works](#-how-the-automation--logic-works)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started Locally](#-getting-started-locally)
- [GitHub Actions Workflows](#-github-actions-workflows)
- [Official Reporting Channels](#-official-reporting-channels)
- [Contributing](#-contributing)
- [Attributions](#-attributions--acknowledgements)

---

## 📖 Executive Summary
With the rapid digitalization of financial and social services in the Philippines, phishing, identity theft, and online scams have surged to unprecedented levels. P.R.O.O.F was developed as an educational and preventive response to this growing national threat.

The platform bridges the gap between complex cybersecurity concepts and the general public. It pulls verified cybercrime advisories from trusted local domains and top-tier global journalism every single day, surfaces them in a bilingual (English and Filipino) accessible interface, and pairs them with factual statistics and educational resources. No subscriptions. No algorithms. Just free, accurate, always-current scam awareness.

---

## 🇵🇭 Why P.R.O.O.F?

Online fraud is one of the fastest-growing threats to Filipinos. Nearly **8 in 10 Filipino adults** encounter scams annually. Despite the scale of the problem, information about active scams remains fragmented across government websites, social media posts, and news articles that most people never see.

P.R.O.O.F exists to change that. It pulls verified cybercrime advisories from trusted Philippine sources, surfaces them in a clean and accessible interface, and pairs them with factual statistics and educational resources. 

---

## ✨ Features

### 🔴 Live Scam Alerts
> _Always current. Automatically updated every 12 hours._

The alerts feed is the core of P.R.O.O.F. A GitHub Actions workflow runs on a 12-hour schedule, pulling fresh RSS feeds from a curated whitelist of reliable cybersecurity journalists and local news sources. Every alert on the platform has been sourced from a verified, trusted domain and fact-checked via strict programmatic filters.

Each alert card displays:
- **Headline** — the title of the advisory or news report
- **Source logo** — so you immediately know which agency or outlet published it (powered by DuckDuckGo API)
- **Publication date** — formatted and normalized across all feed sources
- **Direct link** — takes you straight to the original article or advisory

### 📊 Statistics Dashboard
> _Real numbers. Real context. Powered by Recharts._

The statistics section presents verified Philippine cybercrime data through a set of fully interactive, responsive charts covering:
- **Scam Type Distribution**: A breakdown of the most reported fraud categories.
- **Victim Demographics**: Age group and regional data showing which populations are most targeted.
- **Financial Loss Trends**: Year-over-year data on total reported financial losses.
- **Incident Volume Over Time**: Monthly and annual reported cybercrime incident counts.

### 🎣 Scam Type Encyclopedia
> _Know what to look for before it's too late._

P.R.O.O.F documents the most common fraud tactics actively targeting Filipinos, written in plain, accessible language. Includes mechanics, red flags, and avoidance strategies for Phishing, Smishing, Vishing, Online Selling Scams, Love Scams, Investment Fraud, SIM Swap Attacks, Job Scams, and Parcel Scams.

### 🧪 Interactive Scenarios ("Try Me")
> _Practice identifying scams in a safe, consequence-free environment._

Engaging simulation modules let users test their ability to spot phishing attempts and fraudulent schemes before encountering them in the real world. 

### 📣 How to Report
> _Because knowing who to call is half the battle._

The reporting section provides direct, up-to-date contact information for every major Philippine agency that handles cybercrime and fraud, outlining their mandates and hotlines.

---

## ⚙️ How the Automation & Logic Works

P.R.O.O.F has no backend server or traditional database. Live data flows through a single automated pipeline driven by **GitHub Actions** and a zero-dependency **Node.js** scraper.

### The Logic (`rss feed/fetch-alerts.js`)
1. **The Sources**:
   - **Local (PH):** Analyzes Google News RSS filtered tightly to Philippine domains (`gmanetwork.com`, `inquirer.net`, `mb.com.ph`, etc.) or articles containing Philippine-centric keywords.
   - **International:** Relies on dedicated reliable cybersecurity journalism (`Krebs On Security`, `The Guardian's Scam feed`) + a strict News aggregator filtered *only* to highly credible global publishers (`reuters`, `bbc`, `apnews`, `wired`, `wall street journal`, etc.).
2. **The Filter (Regex):** Every single article downloaded is tested against a rigid Regular Expression looking for specific online scam identifiers (e.g., `phishing`, `pig butchering`, `crypto scam`, `sim swap`, `ransomware`). If an article does not explicitly discuss an online scam/fraud, or stringently match the domains whitelist, it is automatically dropped.
3. **The Output:** Verified articles are formatted, date-normalized, assigned a publisher logo, and saved directly into `rss feed/alerts.json` (max 12 alerts per category).

### The Pipeline

```text
┌─────────────────────────────────────────────────┐
│       GitHub Actions — Runs Every 12 Hours      │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
           ┌─────────────────────┐
           │ rss feed/fetch-alerts.js │  (Node.js scraper)
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

## 🛠️ Tech Stack

| Technology                                            | Role                                 |
| ----------------------------------------------------- | ------------------------------------ |
| [React 18](https://react.dev/)                        | UI framework                         |
| [Vite](https://vitejs.dev/)                           | Build tool and dev server            |
| [TypeScript](https://www.typescriptlang.org/)         | Type-safe JavaScript                 |
| [Tailwind CSS](https://tailwindcss.com/)              | Utility-first styling                |
| [Radix UI](https://www.radix-ui.com/)                 | Accessible, headless UI components   |
| [Recharts](https://recharts.org/)                     | Interactive data visualization       |
| [Node.js](https://nodejs.org/)                        | Powers the `fetch-alerts.js` script  |
| [GitHub Actions](https://github.com/features/actions) | 12-hour automation and CI/CD pipeline|
| [GitHub Pages](https://pages.github.com/)             | Free static hosting                  |
| [Figma](https://figma.com/)                           | Original design source               |

---

## 📁 Project Structure

```text
PROOF-WEBSITE/
├── .github/workflows/
│   ├── deploy.yml           # Builds Vite UI & deploys to GitHub Pages
│   └── fetch-alerts.yml     # Cron: pulls latest scam news every 12 hrs
├── guidelines/              # Project guidelines and documentation
├── rss feed/                # The public static storage folder
│   ├── alerts.json          # The database (auto-generated JSON)
│   └── fetch-alerts.js      # The heart of the platform's automation logic
├── src/
│   ├── assets/              # Local images and backgrounds
│   ├── components/          # Reusable React components
│   │   ├── figma/           # Exported Figma/design components
│   │   └── ui/              # Component library elements (Radix/Shadcn)
│   ├── hooks/               # Custom React hooks (e.g., use-mobile)
│   ├── lib/                 # Utility functions and helpers
│   ├── styles/              # Global fonts and Tailwind CSS styles
│   ├── App.tsx              # Root React component
│   └── main.tsx             # Application entry point
├── .prettierrc.mjs          # Prettier formatting configuration
├── eslint.config.js         # ESLint rules configuration
├── index.html               # Main HTML template
├── package-lock.json        # NPM dependency tree lockfile
├── package.json             # NPM dependencies & scripts
├── postcss.config.mjs       # PostCSS configuration
└── vite.config.ts           # Configured to expose 'rss feed' publicly
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### 1. Clone & Install
```bash
git clone https://github.com/alxxrzfyr/PROOF-WEBSITE.git
cd PROOF-WEBSITE
git checkout main
npm install
```

### 2. Manual Guide: Fetching Alerts Locally
You can update the live scam feed manually on your machine before running the app. 

Run the fetcher script located in the `rss feed/` directory by executing:
```bash
node "rss feed/fetch-alerts.js"
```
**What this does:** It connects to the internet to pull the latest security RSS feeds. It applies the strict scam regex filters, formats the remaining data, pulls domain logos, and completely overwrites `rss feed/alerts.json` with the new data.

### 3. Start the Development Server
```bash
npm run dev
```
The frontend React application will start at `http://localhost:5173`. 

*Note: The frontend automatically reads the local JSON DB via `fetch('alerts.json')` because Vite is configured (`vite.config.ts` via the `publicDir` flag) to treat the `rss feed` directory exactly like a standard public static assets folder!*

### 4. Build for Production
```bash
npm run build
```
Outputs an optimized React bundle to the `dist/` directory, copying the `rss feed/` assets alongside the Javascript and CSS.

### 5. Linting and Formatting
To ensure code quality and consistent styling, this project uses ESLint and Prettier.

Run the linter to catch errors:
```bash
npm run lint
```

Format the code using Prettier:
```bash
npm run format
```

---

## 🤖 GitHub Actions Workflows

### `fetch-alerts.yml`
| Property       | Value                                                                        |
| -------------- | ---------------------------------------------------------------------------- |
| Trigger        | Cron schedule — every 12 hours (`0 */12 * * *`)                              |
| Manual trigger | `workflow_dispatch` — run on demand from the GitHub UI                       |
| What it does   | Runs `"rss feed/fetch-alerts.js"`, commits `alerts.json` to the `main` branch|

### `deploy.yml`
| Property     | Value                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| Trigger      | Any push to the `main` branch (including commits from the fetch workflow)      |
| What it does | Installs dependencies, runs `vite build` using the `rss feed/` public dir      |

---

## 🏛️ Official Reporting Channels

If you or someone you know has been victimized by an online scam in the Philippines, report it immediately to one of these agencies:

| Agency | Handles | Contact |
| --- | --- | --- |
| **CICC** | All cybercrime coordination | [cicc.gov.ph](https://cicc.gov.ph) · Hotline **1326** |
| **PNP Anti-Cybercrime Group** | Criminal enforcement and cybercrime cases | [acg.pnp.gov.ph](https://acg.pnp.gov.ph) |
| **NBI Cybercrime Division** | Serious and syndicated cybercrime offenses | [nbi.gov.ph](https://nbi.gov.ph) |
| **BSP** | Bank-related fraud and financial scams | [bsp.gov.ph](https://bsp.gov.ph) · consumer@bsp.gov.ph |
| **DICT** | Digital governance and cyber policy | [dict.gov.ph](https://dict.gov.ph) |

> 💡 **Tip:** When reporting, prepare your evidence in advance. Screenshots of messages, transaction records, URLs, phone numbers, and email headers all strengthen your case.

---

## 🤝 Contributing

Contributions are welcome. To contribute, fork the repository, create a feature branch off `main`, make your changes, and open a pull request with a clear description of what you added or fixed.

---

## 🤝 Attributions & Acknowledgements

The original design for this platform was conceptualized and generated in Figma. Built using React, Vite, Tailwind CSS, TypeScript, and powered by highly credible independent open-internet journalism.

---

_P.R.O.O.F is a community awareness initiative._ _It is not affiliated with any Philippine government agency._ _All links to official channels are provided for public convenience._

**Stay safe. Stay informed. Don't be the next victim. 🇵🇭**
