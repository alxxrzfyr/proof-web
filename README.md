# P.R.O.O.F
**Program for Responsible Online Operations and Fraud-awareness**

A localized, tech-driven campaign and interactive platform designed to raise awareness about online scams and cyber fraud in the Philippines. 

## 🚀 Overview
P.R.O.O.F provides live alerts, factual statistics, real-world examples of phishing/scams, and quick access to official reporting channels (CICC, PNP-ACG, BSP, NBI, etc.). 

It features an automated workflow that fetches the latest verified cybercrime and scam advisories from trusted Philippine news and government sources every hour.

## 🛠️ Tech Stack
- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Headless accessible components)
- **Data Visualization:** [Recharts](https://recharts.org/) (Interactive charts for demographic & scam data)
- **Automation:** Node.js script (`fetch-alerts.js`) executed via **GitHub Actions**
- **Hosting:** GitHub Pages (Automated CI/CD deployment pipeline)

## ⚙️ How the Live Alerts Work
The platform relies on a zero-dependency script run hourly via GitHub Actions (`fetch-alerts.yml`).
1. Pulls RSS feeds from safely *whitelisted* Government and News sources in the Philippines.
2. Filters out irrelevant news, attaches domain logos, and formats dates.
3. Automatically updates and commits `public/alerts.json`.
4. Triggers `deploy.yml` which automatically rebuilds and publishes the website with the fresh data.

## 💻 Running the Code Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. *(Optional)* To manually trigger the news fetcher to get fresh articles locally:
   ```bash
   node fetch-alerts.js
   ```

---
*Design originally generated from [Figma].*
  