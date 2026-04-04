<div align="center">

<img src="https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
<img src="https://img.shields.io/badge/Updates-Every_Hour-0075CA?style=for-the-badge&logo=githubactions&logoColor=white" />


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
- [How the Automation Works](#-how-the-automation-works)
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

The platform bridges the gap between complex cybersecurity concepts and the general public. It provides a comprehensive, bilingual (English and Filipino), and highly accessible interface to ensure that critical fraud-awareness information reaches the widest possible demographic — particularly those most vulnerable to online manipulation.

---

## 🇵🇭 Why P.R.O.O.F?

Online fraud is one of the fastest-growing threats to Filipinos. Nearly **8 in 10 Filipino adults** encounter scams annually. Despite the scale of the problem, information about active scams remains fragmented across government websites, social media posts, and news articles that most people never see.

P.R.O.O.F exists to change that. It pulls verified cybercrime advisories from trusted Philippine sources every single hour, surfaces them in a clean and accessible interface, and pairs them with factual statistics and educational resources. No subscriptions. No downloads. No login required. Just free, accurate, always-current scam awareness for every Filipino with internet access.

---

## ✨ Features


### 🔴 Live Scam Alerts

> *Always current. Automatically updated every hour.*

The alerts feed is the core of P.R.O.O.F. A GitHub Actions workflow runs on an hourly schedule, pulling fresh RSS feeds from a curated whitelist of Philippine government agencies and reputable local news sources. Every alert on the platform has been sourced from a verified, trusted domain.

Each alert card displays:
- **Headline** — the title of the advisory or news report
- **Source logo** — so you immediately know which agency or outlet published it
- **Publication date** — formatted and normalized across all feed sources
- **Direct link** — takes you straight to the original article or advisory

No algorithms. No sponsored content. No opinion pieces. Only verified, relevant cybercrime news from sources Filipinos can trust.

**Whitelisted source categories include:**
- Government cybersecurity agencies (CICC, PNP-ACG, DICT)
- Bangko Sentral ng Pilipinas (BSP) consumer advisories
- NBI public announcements
- Established Philippine news organizations covering cybercrime


### 📊 Statistics Dashboard

> *Real numbers. Real context. Powered by Recharts.*

Understanding the scale of the problem is the first step toward protecting yourself. The statistics section presents verified Philippine cybercrime data through a set of fully interactive, responsive charts.

**What the dashboard covers:**

**Scam Type Distribution**
A breakdown of the most reported fraud categories in the Philippines, from phishing and smishing to investment scams and online selling fraud. The chart shows which scam types are most prevalent so users can prioritize their awareness.

**Victim Demographics**
Age group and regional data showing which populations are most targeted. This helps users understand whether they or their family members fall into high-risk groups.

**Financial Loss Trends**
Year-over-year data on total reported financial losses from cybercrime in the Philippines. The trend line puts the human cost of online fraud in concrete terms.

**Incident Volume Over Time**
Monthly and annual reported cybercrime incident counts, showing whether the threat is growing, stabilizing, or shifting in nature.

All charts are fully responsive. They render cleanly on both desktop and mobile viewports and include hover tooltips for precise data points.


### 🎣 Scam Type Encyclopedia

> *Know what to look for before it's too late.*

P.R.O.O.F documents the most common fraud tactics actively targeting Filipinos. Each entry is written in plain, accessible language so that anyone can understand the threat.

**Scam types covered:**

| Type | How It Works |
|---|---|
| **Phishing** | Fake emails or websites impersonating banks, government agencies, or delivery services to steal credentials |
| **Smishing** | Fraudulent SMS messages containing malicious links or requests for personal information |
| **Vishing** | Voice call scams where fraudsters pose as bank representatives, government officials, or tech support |
| **Online Selling Scams** | Fake listings on e-commerce platforms and social media where payment is collected with no product delivered |
| **Love Scams** | Long-term emotional manipulation via social media or dating apps, ending in a financial request |
| **Investment Fraud** | Fake high-yield investment schemes promising unrealistic returns, often spread through group chats |
| **SIM Swap Attacks** | Fraudsters convince a mobile carrier to transfer a victim's number to a SIM they control, bypassing OTP |
| **Job Scams** | Fake employment offers that extract fees or personal documents from applicants |
| **Parcel Scams** | Fake delivery notifications requiring urgent payment, targeting online shoppers |

Each entry includes:
- A plain-language description of how the scam works
- Red flags and warning signs to watch for
- Real-world examples drawn from reported Philippine cases
- Recommended actions if you suspect you have been targeted

<br/>

### 🧪 Interactive Scenarios ("Try Me")

> *Practice identifying scams in a safe, consequence-free environment.*

Engaging simulation modules let users test their ability to spot phishing attempts and fraudulent schemes before encountering them in the real world. These scenarios are grounded in documented Philippine cases and are designed to build practical recognition skills, not just theoretical knowledge.

<br/>

### 📣 How to Report

> *Because knowing who to call is half the battle.*

Many Filipino fraud victims never report their experience because they do not know where to go. P.R.O.O.F removes that barrier entirely.

The reporting section provides direct, up-to-date contact information for every major Philippine agency that handles cybercrime and fraud. For each agency, the platform lists:
- The agency's mandate and what types of cases they handle
- Their official online reporting portal or complaint form
- Hotline numbers and email addresses
- What information to prepare before filing a report

This section is designed to take a victim from "I was scammed" to "I have filed a report" in as few steps as possible.

---

## ⚙️ How the Automation Works

P.R.O.O.F has no backend server and no database. All live data flows through a single automated pipeline powered by GitHub Actions.

```
┌─────────────────────────────────────────────────┐
│         GitHub Actions — Runs Every Hour        │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
           ┌──────────────────┐
           │  fetch-alerts.js  │  (zero-dependency Node.js script)
           └────────┬─────────┘
                    │
       ┌────────────┼─────────────────┐
       ▼            ▼                 ▼
 Pull RSS       Filter out        Attach logos
 feeds from     irrelevant        + normalize
 whitelisted    articles          dates
 PH sources
       │            │                 │
       └────────────┴─────────────────┘
                     │
                     ▼
            Writes public/alerts.json
                     │
                     ▼
          Git commit pushed to repo
                     │
                     ▼
           Triggers deploy.yml
                     │
                     ▼
           Vite builds the project
                     │
                     ▼
     Fresh site deployed to GitHub Pages ✅
```

The entire pipeline completes in under two minutes. The live site is always within one hour of the latest verified advisory.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible, headless UI components |
| [Recharts](https://recharts.org/) | Interactive data visualization |
| [Node.js](https://nodejs.org/) | Powers the `fetch-alerts.js` script |
| [GitHub Actions](https://github.com/features/actions) | Hourly automation and CI/CD pipeline |
| [GitHub Pages](https://pages.github.com/) | Free static hosting |
| [Figma](https://figma.com/) | Original design source |

---

## 📁 Project Structure

```
PROOF-WEBSITE/
├── .github/
│   └── workflows/
│       ├── fetch-alerts.yml     # Hourly cron: pulls latest scam news
│       └── deploy.yml           # Builds and deploys to GitHub Pages
│
├── public/
│   └── alerts.json              # Auto-generated by the fetch workflow
│
├── src/
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Route-level page components
│   ├── data/                    # Static data (scam types, stats, agencies)
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript interfaces and types
│   └── App.tsx                  # Root application component
│
├── fetch-alerts.js              # News fetcher script (run by GitHub Actions)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone and install

```bash
git clone https://github.com/alxxrzfyr/PROOF-WEBSITE.git
cd PROOF-WEBSITE
git checkout react-ver
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### 3. Fetch fresh alerts (optional)

The repo already includes a recent `alerts.json` committed by the automation workflow. To manually pull the latest scam news and regenerate it:

```bash
node fetch-alerts.js
```

*Note: This will overwrite the local `public/alerts.json` file with the most recent advisories.*

### 4. Build for production

```bash
npm run build
```

Output is written to the `dist/` folder.

---

## 🤖 GitHub Actions Workflows

### `fetch-alerts.yml`

| Property | Value |
|---|---|
| Trigger | Cron schedule — top of every hour (`0 * * * *`) |
| Manual trigger | `workflow_dispatch` — run on demand from the GitHub UI |
| What it does | Runs `fetch-alerts.js`, commits `public/alerts.json` if changes are detected |
| Node version | 18 |

### `deploy.yml`

| Property | Value |
|---|---|
| Trigger | Any push to the `react-ver` branch (including commits from the fetch workflow) |
| What it does | Installs dependencies, runs `vite build`, deploys `dist/` to GitHub Pages |
| Action used | `actions/deploy-pages` |

---

## 🏛️ Official Reporting Channels

If you or someone you know has been victimized by an online scam in the Philippines, report it immediately to one of these agencies:

| Agency | Handles | Contact |
|---|---|---|
| **CICC** — Cybercrime Investigation and Coordinating Center | All cybercrime coordination | [cicc.gov.ph](https://cicc.gov.ph) · Hotline **1326** |
| **PNP Anti-Cybercrime Group** | Criminal enforcement and cybercrime cases | [acg.pnp.gov.ph](https://acg.pnp.gov.ph) |
| **NBI Cybercrime Division** | Serious and syndicated cybercrime offenses | [nbi.gov.ph](https://nbi.gov.ph) |
| **BSP — Bangko Sentral ng Pilipinas** | Bank-related fraud and financial scams | [bsp.gov.ph](https://bsp.gov.ph) · consumer@bsp.gov.ph |
| **DICT — Dept. of Information and Communications Technology** | Digital governance and cyber policy | [dict.gov.ph](https://dict.gov.ph) |

> 💡 **Tip:** When reporting, prepare your evidence in advance. Screenshots of messages, transaction records, URLs, phone numbers, and email headers all strengthen your case.

---

## 🤝 Contributing

Contributions are welcome. This project is especially open to improvements in these areas:

- **New RSS feed sources** — additional verified Philippine government or news sources
- **Scam entries** — new types backed by documented Philippine cases
- **Translations** — Filipino (Tagalog) or regional language support
- **Accessibility** — screen reader improvements, contrast, keyboard navigation
- **Design** — UI/UX enhancements consistent with the Figma source

To contribute, fork the repository, create a feature branch off `react-ver`, make your changes, and open a pull request with a clear description of what you added or fixed.

---

## 🤝 Attributions & Acknowledgements

The original design for this platform was conceptualized and generated in Figma. For a comprehensive list of third-party assets, icons, graphical resources, and informational sources used in this project, consult the `ATTRIBUTIONS.md` file in the root of the repository.

---


*P.R.O.O.F is a community awareness initiative.*
*It is not affiliated with any Philippine government agency.*
*All links to official channels are provided for public convenience.*


**Stay safe. Stay informed. Don't be the next victim. 🇵🇭**
