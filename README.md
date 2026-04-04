# P.R.O.O.F
### Program for Responsible Online Operations and Fraud-awareness

> A localized, tech-driven awareness campaign and interactive platform designed to combat online scams and cyber fraud in the Philippines.

**🌐 Live Site:** [https://alxxrzfyr.github.io/PROOF-WEBSITE](https://alxxrzfyr.github.io/PROOF-WEBSITE)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How the Live Alerts Work](#how-the-live-alerts-work)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Getting Started](#getting-started)
- [Official Reporting Channels](#official-reporting-channels)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

P.R.O.O.F is a civic-tech awareness platform built specifically for Filipino internet users. Cyber fraud has become one of the most prevalent threats to Filipinos online. This platform addresses that threat by centralizing verified scam alerts, real-world phishing examples, demographic statistics, and direct links to official government reporting agencies — all in one accessible, constantly updated interface.

The project was designed originally in Figma and rebuilt as a fully automated React application. It requires no backend server. All live data is fetched automatically via GitHub Actions and committed directly to the repository, which triggers a fresh deployment to GitHub Pages.

---

## Features

### 🔴 Live Scam Alerts
Verified cybercrime and scam advisories are pulled hourly from trusted Philippine government and news sources. Each alert displays the headline, source domain logo, publication date, and a direct link to the original article. The feed updates automatically without any manual intervention.

### 📊 Statistics & Data Visualization
Interactive charts built with Recharts present real cybercrime data relevant to the Philippines. Visualizations cover scam type breakdowns, victim demographics, financial loss trends, and incident frequency over time. All charts are responsive and render cleanly across desktop and mobile viewports.

### 🎣 Scam Type Encyclopedia
A dedicated section covers the most common fraud tactics targeting Filipinos, including phishing, smishing (SMS phishing), vishing (voice phishing), online selling scams, love scams, investment fraud, and SIM swap attacks. Each entry includes a description, red flags to watch for, and real-world examples drawn from reported Philippine cases.

### 📣 How to Report
P.R.O.O.F provides quick access to all major official reporting channels in the Philippines. Contact details, online portals, and hotlines are listed for each agency. Users can navigate directly from the platform to file a report or seek assistance.

### ⚡ Zero-Downtime, Serverless Architecture
The platform runs entirely on static hosting. The automated workflow keeps data fresh without requiring a live server, a database, or recurring cloud costs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) |
| Data Visualization | [Recharts](https://recharts.org/) |
| Automation | Node.js + GitHub Actions |
| Hosting | GitHub Pages |
| Design | Figma |

---

## Project Structure

```
PROOF-WEBSITE/
├── .github/
│   └── workflows/
│       ├── fetch-alerts.yml     # Hourly cron job — pulls latest scam news
│       └── deploy.yml           # Builds and deploys to GitHub Pages
├── public/
│   └── alerts.json              # Auto-generated; committed by fetch-alerts.yml
├── src/
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Route-level page components
│   ├── data/                    # Static data (scam types, statistics, agencies)
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript interfaces and types
│   └── App.tsx                  # Root application component
├── fetch-alerts.js              # Node.js script — fetches and formats RSS feeds
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## How the Live Alerts Work

The live alerts pipeline is fully automated and runs on a zero-dependency Node.js script.

```
[GitHub Actions Cron — every hour]
        │
        ▼
  fetch-alerts.js
        │
        ├─ Pulls RSS feeds from whitelisted PH government and news sources
        ├─ Filters out irrelevant articles using keyword matching
        ├─ Attaches source domain logos
        ├─ Normalizes and formats publication dates
        │
        ▼
  Writes → public/alerts.json
        │
        ▼
  Git commit pushed to repository
        │
        ▼
  Triggers deploy.yml
        │
        ▼
  Vite builds the project
        │
        ▼
  Updated site published to GitHub Pages
```

### Whitelisted Sources

Alerts are only pulled from verified Philippine sources. These include government agency websites (CICC, PNP-ACG, BSP, NBI, DICT) and reputable local news outlets. No unverified or third-party aggregator feeds are used.

---

## GitHub Actions Workflows

### `fetch-alerts.yml`
- **Trigger:** Scheduled cron (`0 * * * *`) — runs at the top of every hour
- **Steps:** Checks out the repo, installs Node.js, runs `fetch-alerts.js`, commits and pushes `public/alerts.json` if changes are detected
- **Manual trigger:** Supported via `workflow_dispatch` for on-demand refreshes

### `deploy.yml`
- **Trigger:** Push to the `react-ver` branch (including commits from `fetch-alerts.yml`)
- **Steps:** Checks out the repo, installs dependencies, runs `vite build`, deploys the `dist/` folder to GitHub Pages via the official `actions/deploy-pages` action

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/alxxrzfyr/PROOF-WEBSITE.git

# Switch to the active development branch
cd PROOF-WEBSITE
git checkout react-ver

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Fetching Fresh Alerts Locally

To manually pull the latest scam news and regenerate `public/alerts.json`:

```bash
node fetch-alerts.js
```

This is optional. The repository already includes a recent `alerts.json` committed by the automated workflow.

### Building for Production

```bash
npm run build
```

The production-ready output is written to the `dist/` folder.

---

## Official Reporting Channels

P.R.O.O.F links directly to all of the following agencies. If you or someone you know has been victimized by an online scam, report it here:

| Agency | Role | Contact |
|---|---|---|
| **CICC** — Cybercrime Investigation and Coordinating Center | Primary cybercrime coordination body | [cicc.gov.ph](https://cicc.gov.ph) / Hotline: 1326 |
| **PNP-ACG** — Philippine National Police Anti-Cybercrime Group | Law enforcement for cybercrime cases | [acg.pnp.gov.ph](https://acg.pnp.gov.ph) |
| **NBI Cybercrime Division** — National Bureau of Investigation | Investigation of serious cybercrime offenses | [nbi.gov.ph](https://nbi.gov.ph) |
| **BSP** — Bangko Sentral ng Pilipinas | Financial fraud and bank-related scams | [bsp.gov.ph](https://bsp.gov.ph) / consumer@bsp.gov.ph |
| **DICT** — Department of Information and Communications Technology | Digital governance and cyber policy | [dict.gov.ph](https://dict.gov.ph) |

---

## Contributing

Contributions are welcome. This project is especially open to improvements in the following areas:

- Additional verified RSS feed sources
- New scam type entries backed by reported Philippine cases
- Accessibility improvements
- Translations (Filipino / regional languages)

To contribute, fork the repository, create a feature branch off `react-ver`, and open a pull request with a clear description of your changes.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

*P.R.O.O.F is a community awareness initiative. It is not affiliated with any government agency. All links to official channels are provided for public convenience.*
