// ═══════════════════════════════════════════════════════════════
// ALL HARDCODED DATA FOR P.R.O.O.F. WEBSITE
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// HERO SECTION DATA (HOME PAGE)
// ═══════════════════════════════════════════════════════════════
export const threatStats = [
  { label: "Filipinos lost to scams in 2025", value: "N/A", color: "text-red-400", sublabel: "Total financial damage reported (BSP, CICC)" },
  { label: "Online scam cases filed", value: "N/A", color: "text-yellow-400", sublabel: "Reported to PNP-ACG & CICC" },
  { label: "Rise in phishing attempts", value: "N/A", color: "text-red-400", sublabel: "Year-over-year increase (Kaspersky PH)" },
  { label: "Most targeted age group", value: "N/A", color: "text-yellow-400", sublabel: "Highest victim demographic (DICT)" },
];

export const pieData = [
  { name: "Phishing / Smishing", value: 35, color: "#dc2626" },
  { name: "Online Selling Scam", value: 25, color: "#0a2fad" },
  { name: "Investment Scam", value: 18, color: "#f97316" },
  { name: "Love Scam", value: 12, color: "#eab308" },
  { name: "Others", value: 10, color: "#6b7280" },
];

export const lineData = [
  { year: "2019", cases: 8453 },
  { year: "2020", cases: 13671 },
  { year: "2021", cases: 20870 },
  { year: "2022", cases: 27081 },
  { year: "2023", cases: 30567 },
  { year: "2024", cases: 35102 },
  { year: "2025", cases: 39000 },
];

export const quickJumpPills = [
  "PHISHING", "FAKE PRIZES", "FRAUDULENT LINKS", "LOVE SCAM", "OTP FRAUD", "FAKE SELLER", "SIM SWAP"
];

export interface TeamMember {
  name: string;
  role: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Placeholder", role: "Project Lead" },
  { name: "Placeholder", role: "Research Head" },
  { name: "Placeholder", role: "Content Writer" },
  { name: "Placeholder", role: "UI/UX Designer" },
  { name: "Placeholder", role: "Frontend Developer" },
  { name: "Placeholder", role: "Backend Developer" },
  { name: "Placeholder", role: "Data Analyst" },
  { name: "Placeholder", role: "Community Manager" },
  { name: "Placeholder", role: "Outreach Coordinator" },
  { name: "Placeholder", role: "Social Media Manager" },
  { name: "Placeholder", role: "Graphic Designer" },
  { name: "Placeholder", role: "Video Producer" },
  { name: "Placeholder", role: "QA Tester" },
  { name: "Placeholder", role: "Documentation Lead" },
];


// ═══════════════════════════════════════════════════════════════
// SCAM PAGE SECTION DATA
// ═══════════════════════════════════════════════════════════════

export interface Alert {
  id: string;
  source: string;
  sourceLabel: string;
  sourceLogo: string;
  category: string;
  severity: string;
  date: string;
  title: string;
  url: string;
}

export const alerts: Alert[] = [
  { id: "1", source: "Mindanao Times", sourceLabel: "Mindanao Times", sourceLogo: "security", category: "cybercrime", severity: "medium", date: "2026-04-01", title: "GCash urges vigilance against online scams and fraud this Holy Week", url: "#" },
  { id: "2", source: "Manila Standard", sourceLabel: "Manila Standard", sourceLogo: "security", category: "cybercrime", severity: "medium", date: "2026-04-01", title: "GCash warns users against scams during Holy Week", url: "#" },
  { id: "3", source: "WalasTech", sourceLabel: "WalasTech", sourceLogo: "newspaper", category: "scam", severity: "medium", date: "2026-04-01", title: "BPI reminds Filipinos to stay alert vs scams this Holy Week", url: "#" },
  { id: "4", source: "Newsbytes.PH", sourceLabel: "Newsbytes.PH", sourceLogo: "newspaper", category: "scam", severity: "medium", date: "2026-03-31", title: "BPI warns of scams during Holy Week, April Fool's Day", url: "#" },
  { id: "5", source: "Philippine News Agency", sourceLabel: "Philippine News Agency", sourceLogo: "newspaper", category: "scam", severity: "medium", date: "2026-03-27", title: "16 caught in 2-month PNP cyber scam crackdown", url: "#" },
  { id: "6", source: "Travel And Tour World", sourceLabel: "Travel And Tour World", sourceLogo: "newspaper", category: "scam", severity: "medium", date: "2026-03-28", title: "Alarming Rise of Online Hotel Booking Scams in the Philippines", url: "#" },
];

export interface ScamType {
  number: string;
  title: string;
  description: string;
  tabs: ScamTab[];
}

export interface ScamTab {
  label: string;
  content: ScamExample;
}

export interface ScamExample {
  type: string;
  from?: string;
  subject?: string;
  sender?: string;
  senderBadge?: string;
  body: string;
  cta?: string;
  annotations: string[];
  callout: string;
  extra?: any;
}

export const scamTypes: ScamType[] = [
  {
    number: "01",
    title: "PHISHING & SOCIAL ENGINEERING",
    description: "Scammers impersonate trusted institutions, government agencies, or people you know — via email, SMS, calls, or DMs — to steal your credentials, OTP, or personal information.",
    tabs: [
      {
        label: "Via Email",
        content: {
          type: "email",
          from: "security@citibank-alert-ph.net",
          subject: "[URGENT] Your account has been compromised",
          body: "Dear Valued Customer,\n\nWe have detected unauthorized activity on your account. For your protection, we have temporarily limited access.\n\nPlease verify your identity within 24 hours to restore full functionality.",
          cta: "VERIFY MY ACCOUNT NOW",
          annotations: ["Spoofed domain: citibank-alert-ph.net", "Urgency language: 24-hour deadline"],
          callout: "Legitimate banks never ask you to verify credentials via email links. Type the bank URL manually — never click email links.",
        },
      },
      {
        label: "Via SMS",
        content: {
          type: "sms",
          sender: "GCash PH",
          senderBadge: "SPOOFED SENDER",
          body: "GCash: Your account has been temporarily suspended due to unusual activity. Verify your identity immediately to avoid permanent deactivation: gcash-verify-ph.net/login",
          annotations: ["This URL is not gcash.com — it is a fake domain"],
          callout: "GCash's official domain is gcash.com. Any other domain in an SMS is fraudulent. Do not click.",
        },
      },
      {
        label: "Via Social Media DM",
        content: {
          type: "messenger",
          sender: "Meta Business Support",
          senderBadge: "NOT VERIFIED",
          body: "Hello! Your Facebook Page has been reported for violating Community Standards. Appeal within 24 hours or your Page will be permanently removed: fb-appeal-support.com/verify",
          annotations: ["Urgency pressure", "Unofficial domain", "Threatens account loss", "Meta never uses Messenger DMs for violations"],
          callout: "Red Flags: Urgency pressure \u00b7 Unofficial domain \u00b7 Threatens account loss \u00b7 Meta never uses Messenger DMs for violations",
        },
      },
      {
        label: "Via Phone Call",
        content: {
          type: "phone",
          sender: "Globe Telecom Customer Service",
          senderBadge: "SPOOFED CALLER ID",
          body: "\"Good afternoon po. I'm Agent Torres from Globe Fraud Prevention. We detected suspicious activity on your account. I'll send a 6-digit OTP to your number — please share it with me to cancel the unauthorized transaction.\"",
          annotations: ["This OTP grants account access. Sharing it = instant takeover."],
          callout: "Your OTP is YOUR password. No legitimate company will EVER ask for it over the phone. Hang up and call your provider's official number.",
        },
      },
      {
        label: "Via Fake Support SMS",
        content: {
          type: "sms",
          sender: "+63 917 XXX XXXX",
          senderBadge: "NOT AN OFFICIAL SHORT CODE",
          body: "Magandang araw po! Ako po si Ma. Reyes mula sa GCash Customer Service. Na-flag ang inyong account. Ipadala namin ang OTP sa inyong number — ibigay lang po para ma-process ang inyong case.",
          annotations: ["Real GCash support uses short code 2882, never a +63 mobile number", "Sharing your OTP = instant wallet takeover"],
          callout: "No company — not even GCash itself — should ever ask for your OTP. It is a one-time code only YOU should see.",
        },
      },
      {
        label: "Via Dating App",
        content: {
          type: "dating",
          sender: "Michael Anderson",
          body: "Hey, I almost never match with someone as genuine as you. I'm a civil engineer currently on a project in Dubai — single dad, widower. I'd love to move to WhatsApp if that's okay? \u2764\ufe0f",
          annotations: ["New account", "Moving off-platform removes protections", "Love-bombing within first message"],
          callout: "Romance scammers build trust for weeks before the money request. Once you send, the requests escalate and the 'person' will eventually vanish.",
          extra: {
            moneyRequest: "Baby, my tools were held at customs. I need \u20b135,000 to release them \u2014 I'll pay you back double. You're the only person I trust.",
          },
        },
      },
    ],
  },
  {
    number: "02",
    title: "FAKE PRIZES & DECEPTIVE OFFERS",
    description: "Scammers lure victims with impossible promises — lottery winnings, exclusive deals, investment returns — to extract upfront fees, personal info, or payment.",
    tabs: [
      {
        label: "Via Email",
        content: {
          type: "email",
          from: "noreply@netflix-rewards-ph.com",
          subject: "You've been selected! Claim your \u20b15,000 Netflix Gift Card",
          body: "Congratulations! You have been selected in our quarterly rewards program.\n\nClick below to claim your \u20b15,000 Netflix Gift Card before it expires.",
          cta: "CLAIM MY GIFT CARD",
          annotations: ["Fake domain: netflix-rewards-ph.com"],
          callout: "Netflix does not give out unsolicited gift cards. Verify all prize offers directly at the official company website — never via email links.",
        },
      },
      {
        label: "Via SMS",
        content: {
          type: "sms",
          sender: "GCash Rewards",
          senderBadge: "NOT A REAL SHORT CODE",
          body: "Congratulations! You have been selected as our LUCKY WINNER! Claim your \u20b15,000 GCash reward. Reply YES and send your GCash PIN to confirm. Limited time only!",
          annotations: ["GCash will NEVER ask for your PIN \u2014 this is immediate account theft"],
          callout: "GCash will NEVER ask for your PIN via SMS. Any message asking for your PIN is always a scam, no exceptions.",
        },
      },
      {
        label: "Via Pop-up",
        content: {
          type: "popup",
          body: "You're Today's Lucky Visitor!\n\nSpin to win a brand new iPhone 16 Pro! Only 2 prizes left today.",
          cta: "SPIN NOW",
          annotations: ["Fake Facebook branding", "Countdown timer creates urgency"],
          callout: "Legitimate companies never give prizes through browser pop-ups. The '1,000,000th visitor' prize is always fake.",
          extra: { domain: "survey-prizewinners.info/ph", countdown: "00:03:47" },
        },
      },
      {
        label: "Via Marketplace",
        content: {
          type: "marketplace",
          sender: "Juan dela Cruz",
          body: "iPhone 15 Pro Max 256GB \u2014 BRAND NEW SEALED\nPrice: \u20b18,500 (SRP \u20b182,000+)\nJoined 2 months ago \u00b7 0 reviews\n\nCOD is not available po. GCash full payment muna bago i-ship. 100% legit, may receipt po.",
          annotations: ["Price 90% below market", "New account with no reviews", "Refuses COD"],
          callout: "A price that seems impossible IS impossible. Sellers who refuse COD and require full GCash payment upfront will disappear with your money.",
        },
      },
      {
        label: "Via Shopping App",
        content: {
          type: "chat",
          sender: "Shopee Seller",
          body: "Na-sold out po yung stocks sa Shopee pero meron pa po kami personal. Mas mura pa pag direct \u2014 ibigay lang GCash number at bayad na agad.",
          annotations: ["Pushes off-platform", "Removes buyer protection"],
          callout: "NEVER transact outside the official Shopee/Lazada platform. Moving payment off-platform removes all buyer protection.",
        },
      },
      {
        label: "Via Messaging App",
        content: {
          type: "chat",
          sender: "Mei Lin",
          body: "Hi! I got your number from the investment group. I do crypto trading \u2014 my uncle runs a private trading platform. Last month I made \u20b1180,000 from \u20b130,000. I can guide you step by step. \ud83d\ude0a",
          annotations: ["Stranger promising investment returns", "500% returns in one month", "'Private platform' = pig butchering setup"],
          callout: "This is the 'pig butchering' scam. Scammers fatten the victim with fake returns before taking everything.",
        },
      },
    ],
  },
  {
    number: "03",
    title: "FRAUDULENT LINKS & IDENTITY THEFT",
    description: "Scammers use fake URLs, manipulated domain names, forged QR codes, and counterfeit documents to redirect victims to phishing pages or steal their identity.",
    tabs: [
      {
        label: "URL Comparison",
        content: {
          type: "url-compare",
          body: "",
          annotations: [],
          callout: "Always look at the FULL domain carefully. Copy-paste the URL to verify — one invisible character difference makes it a fake site.",
          extra: {
            urls: [
              { label: "Legitimate", url: "https://www.bdo.com.ph", verdict: "safe" },
              { label: "Typosquatted", url: "https://www.bd0.com.ph", verdict: "danger", highlight: "0 instead of O" },
              { label: "Subdomain trick", url: "https://bdo.com.ph.login-secure.xyz", verdict: "danger", highlight: "Real domain is .xyz" },
              { label: "Homoglyph", url: "https://www.bd\u043e.com.ph", verdict: "danger", highlight: "Cyrillic \u043e character" },
            ],
          },
        },
      },
      {
        label: "QR Code Phishing",
        content: {
          type: "qr",
          body: "PAYMENT REQUIRED \u2014 MERALCO\n\nScan the QR code to settle your outstanding balance of \u20b13,841.50. Failure to pay within 48 hours will result in service disconnection.",
          annotations: ["FAKE DOMAIN \u2014 NOT meralco.com.ph"],
          callout: "QR codes can silently redirect you to phishing sites. Always verify the URL the QR points to BEFORE entering any credentials.",
          extra: { domain: "meralco-payment-portal.online" },
        },
      },
      {
        label: "Fake Gov Portal",
        content: {
          type: "email",
          from: "sss-onlineservices@sss-member-portal.com",
          subject: "URGENT: Update your MDR or lose your benefits",
          body: "Your Member Data Record has not been updated since 2022. Failure to update by April 10 will result in suspension of benefits.",
          cta: "UPDATE MY MDR NOW",
          annotations: ["Philippine government agencies ONLY use .gov.ph domains"],
          callout: "SSS's real domain is sss.gov.ph. This is a government impersonation phishing attack.",
        },
      },
      {
        label: "SIM Swap Attack",
        content: {
          type: "sim-swap",
          body: "",
          annotations: [],
          callout: "SIM Swap is silent \u2014 you may not realize it happened until your accounts are drained. Act within minutes of losing signal unexpectedly.",
          extra: {
            steps: [
              "Scammer collects your personal info from data leaks or social media",
              "Calls your mobile carrier posing as you, requests SIM replacement",
              "Carrier transfers your number to scammer's SIM",
              "Scammer receives all your OTPs, resets your bank and e-wallet passwords",
            ],
            warnings: [
              "Phone suddenly loses all signal",
              "Stops receiving calls and texts",
              "\"Your SIM has been transferred\" message",
              "Bank alerts for transactions you didn't make",
              "Mobile banking password suddenly \"wrong\"",
            ],
          },
        },
      },
      {
        label: "Forged Shipping Receipt",
        content: {
          type: "receipt",
          sender: "Budget Gadgets PH",
          body: "Shipped na po! Heto po ang tracking number at receipt.",
          annotations: ["This tracking number may not exist \u2014 or may be reused from an old shipment"],
          callout: "Forged shipping receipts are the #1 fake seller trick. Always go to lbcexpress.com yourself and manually type the tracking number to verify.",
          extra: { trackingNo: "LBC9988120044PH", recipient: "Maria Santos, Pasig" },
        },
      },
      {
        label: "Fake Charity Link",
        content: {
          type: "social-post",
          sender: "Sagip Pilipinas Foundation",
          body: "Tulong para sa mga biktima ng Bagyo Kristine! I-click ang link para mag-donate: sagip-pilipinas-relief.org/donate",
          annotations: ["Account created 1 week ago", "Official fundraising uses trusted platforms", "High share count can be manufactured"],
          callout: "Fake charity scams spike after every natural disaster. Before donating, verify the organization through SEC Philippines or DSWD.",
          extra: { shares: "2,400", reactions: "841" },
        },
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// QUIZ SCENARIOS — 25 TOTAL
// ═══════════════════════════════════════════════════════════════

export interface QuizScenario {
  id: number;
  category: string;
  medium: string;
  isScam: boolean;
  sender: string;
  senderDetail: string;
  subject?: string;
  body: string;
  cta?: string;
  footer?: string;
  redFlags: string[];
  clue: string;
  explanation: string;
}

export const quizScenarios: QuizScenario[] = [
  {
    id: 1, category: "Account Security Alert (Email)", medium: "Email", isScam: true,
    sender: "BDO Unibank Security", senderDetail: "security@bdo-alert-ph.net",
    subject: "[ACTION REQUIRED] Your BDO account has been locked",
    body: "Dear Valued Customer,\n\nWe have detected multiple failed login attempts on your BDO account. To prevent unauthorized access, your account has been temporarily locked.\n\nClick the button below within 24 hours to restore full access. Failure to verify will result in permanent account suspension.",
    cta: "RESTORE MY ACCOUNT",
    footer: "BDO Unibank \u2014 For your security, do not share this link.",
    redFlags: ["Sender domain is 'bdo-alert-ph.net' \u2014 not bdo.com.ph", "Urgency: 24-hour deadline pressure", "Threatens permanent suspension", "CTA button leads to unknown domain"],
    clue: "Real BDO emails come from @bdo.com.ph only. Check the sender address carefully.",
    explanation: "The sender domain 'bdo-alert-ph.net' is a fake lookalike of BDO's real domain 'bdo.com.ph'. Legitimate banks never ask you to click email links to unlock accounts.",
  },
  {
    id: 2, category: "Transaction Confirmation (Email)", medium: "Email", isScam: false,
    sender: "GCash", senderDetail: "noreply@gcash.com",
    subject: "Your GCash transfer of \u20b1500 was successful",
    body: "Hi Maria,\n\nYour GCash transfer is complete.\n\nAmount: \u20b1500.00\nRecipient: Juan dela Cruz\nDate: April 3, 2026 \u2014 2:14 PM\nReference No: GC20260403-7749281\n\nIf you did not make this transaction, please call GCash Support at 2882 immediately.",
    redFlags: [],
    clue: "Check the sender address. Does it match the official GCash domain?",
    explanation: "The sender is noreply@gcash.com \u2014 GCash's official domain. The email contains a real reference number and no suspicious links.",
  },
  {
    id: 3, category: "Account Activity Alert (SMS)", medium: "SMS", isScam: true,
    sender: "Landbank PH", senderDetail: "",
    body: "LANDBANK: Your account has been flagged for suspicious activity. Immediate verification required. Click here to confirm your identity: <span class=\"underline text-blue-600\">landbank-secure-verify.com/ph</span> or your account will be frozen within 2 hours.",
    redFlags: ["Sender is a mobile number, not a short code", "Unofficial domain: landbank-secure-verify.com", "2-hour freeze threat creates panic", "Asks you to click a link via SMS"],
    clue: "Official Landbank SMS alerts come from a short code, never a +63 mobile number.",
    explanation: "Landbank's official SMS alerts come from registered short codes, not mobile numbers. The link is not affiliated with Landbank.",
  },
  {
    id: 4, category: "Rewards Notification (Email)", medium: "Email", isScam: true,
    sender: "GCash Rewards Program", senderDetail: "gcashrewards@gcash-winners.ph",
    subject: "\ud83c\udf89 Congratulations! You've been selected as a GCash Lucky Winner!",
    body: "Dear GCash User,\n\nYou have been randomly selected as one of 10 LUCKY WINNERS in our monthly rewards draw!\n\nYour prize: \u20b110,000 GCash Credit\n\nTo claim your prize, reply to this email with your:\n\u2022 Full Name\n\u2022 GCash Mobile Number\n\u2022 GCash MPIN\n\u2022 Birthday\n\nOffer expires in 48 hours.",
    redFlags: ["Sender domain is 'gcash-winners.ph' \u2014 not gcash.com", "Asks for MPIN \u2014 GCash will NEVER ask for this", "Collects personal info via email", "48-hour expiry creates false urgency"],
    clue: "Any message asking for your MPIN is always a scam, no exceptions.",
    explanation: "GCash will NEVER ask for your MPIN or personal details via email. The sender domain is fake.",
  },
  {
    id: 5, category: "Billing Notification (SMS)", medium: "SMS", isScam: false,
    sender: "PLDT", senderDetail: "",
    body: "PLDT: Your bill for account 02-XXXX-1234 is now available. Amount due: \u20b11,299.00. Due date: April 15, 2026. Pay via myPldt app or authorized payment centers. For billing inquiries call 171.",
    redFlags: [],
    clue: "Does this message ask you to click a link or share any personal information?",
    explanation: "This is a standard billing notification. It provides an amount and due date, and directs you to official PLDT channels.",
  },
  {
    id: 6, category: "Fraud Prevention Call", medium: "Phone Call", isScam: true,
    sender: "BPI Customer Service", senderDetail: "",
    body: "CALLER: Good afternoon po. Ako po si Agent Torres mula sa BPI Fraud Prevention Team. Na-detect po namin ang suspicious na transaction sa inyong account \u2014 \u20b125,000 transfer papunta sa unknown account.\n\nPara ma-stop po namin ito, kailangan ko pong i-verify ang inyong identity. Magpapadala po kami ng 6-digit OTP sa inyong registered number. Ibigay lang po sa akin ang code para ma-cancel namin ang transaction.",
    redFlags: ["No real bank will ask for your OTP over the phone \u2014 ever", "Spoofed caller ID can mimic official numbers", "Creates panic with a fake \u20b125,000 transaction", "Asks you to 'cancel' a transaction by sharing OTP"],
    clue: "If someone asks for your OTP, hang up. Call your bank directly using the number on the back of your card.",
    explanation: "This is a classic OTP social engineering call. Banks will NEVER ask for your OTP by phone.",
  },
  {
    id: 7, category: "Page Violation Notice (Social Media)", medium: "Social Media", isScam: true,
    sender: "Meta Business Support", senderDetail: "Facebook Messenger \u2014 Unverified Page",
    body: "Hello! We have received multiple reports against your Facebook Page for violating our Terms of Service.\n\nYour Page is scheduled for PERMANENT REMOVAL in 24 hours unless you submit an appeal.\n\nClick below to file your appeal:\nfb-page-appeal-center.com/verify-identity",
    cta: "APPEAL NOW",
    redFlags: ["Meta never contacts page owners via Messenger DM", "Domain 'fb-page-appeal-center.com' is not facebook.com", "24-hour removal threat is a pressure tactic", "Unverified sender page"],
    clue: "Facebook handles all Page violations through the official Support Inbox inside Business Suite \u2014 not via Messenger.",
    explanation: "Facebook/Meta does not send violation notices through Messenger DMs.",
  },
  {
    id: 8, category: "Order Shipment Update (Email)", medium: "Email", isScam: false,
    sender: "Shopee Philippines", senderDetail: "no-reply@shopee.ph",
    subject: "Your order #2204571839 has been shipped!",
    body: "Hi there!\n\nGreat news \u2014 your order is on its way.\n\nOrder #2204571839\nItem: Xiaomi Redmi Note 13 \u2014 Space Black\nShipping via: J&T Express\nTracking No: JT0094827461PH\n\nEstimated delivery: April 5\u20137, 2026\n\nTrack your order in the Shopee app under 'My Purchases'.",
    redFlags: [],
    clue: "Is the sender domain official? Does it ask for any credentials?",
    explanation: "This is a standard Shopee order shipment notification from no-reply@shopee.ph.",
  },
  {
    id: 9, category: "Dating App Message", medium: "Dating App", isScam: true,
    sender: "Peter Anderson", senderDetail: "Bumble Match \u2014 Profile created 6 weeks ago",
    body: "Hey, I almost never match with someone as genuine as you. I'm a civil engineer currently on a project in Dubai \u2014 single dad, widower. I don't usually do this but I feel like we have something real.\n\nI'd love to move to WhatsApp if that's okay? \u2764\ufe0f",
    redFlags: ["Pushes to move off the dating app immediately", "Profile only 6 weeks old", "'Widower + engineer abroad' is a common template", "Love-bombing after one match"],
    clue: "Why would someone ask to move to WhatsApp so quickly?",
    explanation: "This matches the classic romance scammer profile: foreign engineer, widower, new account, immediate push to move off-platform.",
  },
  {
    id: 10, category: "Marketplace Listing (Social Media)", medium: "Marketplace", isScam: true,
    sender: "TechDeals_PH", senderDetail: "Facebook Marketplace \u2014 Account: 2 months old, 0 reviews",
    body: "iPhone 15 Pro Max 256GB Natural Titanium \u2014 BRAND NEW SEALED with Apple PH receipt\nPrice: \u20b19,500 (SRP \u20b182,000)\n\n[Seller chat]: COD is not available po kasi mataas ang value ng item. GCash full payment muna bago i-ship. May proof of stocks kami. Marami na kaming nai-ship!\n\nBuy now \u2014 only 1 unit left! \ud83d\udd25",
    redFlags: ["Price is 88% below SRP", "2-month-old account with zero reviews", "Refuses Cash on Delivery", "Urgency: 'only 1 unit left'"],
    clue: "A brand-new iPhone 15 Pro Max cannot legitimately sell for \u20b19,500.",
    explanation: "The price is nearly 90% below retail \u2014 a hallmark of a fake listing.",
  },
  {
    id: 11, category: "SIM Card Notice", medium: "SMS", isScam: true,
    sender: "Globe Telecom", senderDetail: "",
    body: "Globe: Your SIM card replacement request has been received. To confirm the transfer and protect your number, reply with your 6-digit account PIN within 10 minutes.\n\nYour confirmation code: 482910",
    redFlags: ["Real Globe messages come from official short codes, never mobile numbers", "Asks you to reply with your account PIN", "Includes a fake 'confirmation code'"],
    clue: "Globe's official SMS short code is 8080 or *143# for calls.",
    explanation: "This is a SIM swap social engineering attack. By replying with your PIN, you confirm the fraudulent SIM transfer.",
  },
  {
    id: 12, category: "Login Activity Notice (App)", medium: "Social Media", isScam: false,
    sender: "Facebook", senderDetail: "support.facebook.com",
    subject: "We noticed a new login to your Facebook account",
    body: "Hi Maria Santos,\n\nWe noticed a new login to your Facebook account from a new device.\n\nDevice: iPhone 14\nLocation: Quezon City, Philippines\nTime: April 3, 2026 \u2014 3:41 PM\n\nIf this was you, no action is needed.\n\nIf this wasn't you, secure your account at facebook.com/hacked",
    redFlags: [],
    clue: "Check: Does it ask for credentials? Does the link go to facebook.com?",
    explanation: "This is an authentic Facebook security notification from @facebookmail.com.",
  },
  {
    id: 13, category: "Member Benefits Notice (Email)", medium: "Email", isScam: true,
    sender: "PhilHealth Online Services", senderDetail: "philhealth-portal@ph-gov-services.com",
    subject: "URGENT: Update your PhilHealth MDR or lose your benefits",
    body: "Dear PhilHealth Member,\n\nOur records show your Member Data Record (MDR) has not been updated since 2022. Failure to update by April 10, 2026 will result in suspension of your PhilHealth benefits.\n\nUpdate your MDR now through our secure online portal.",
    cta: "UPDATE MY MDR NOW",
    footer: "Philippine Health Insurance Corporation \u2014 Online Member Services",
    redFlags: ["Domain is 'ph-gov-services.com' \u2014 not philhealth.gov.ph", "Government agencies use .gov.ph domains only", "Threatens loss of benefits"],
    clue: "All Philippine government services use .gov.ph domains.",
    explanation: "PhilHealth's official domain is philhealth.gov.ph. The sender uses a fake domain.",
  },
  {
    id: 14, category: "Browser Notification (Ads)", medium: "Pop-up", isScam: true,
    sender: "Survey Rewards PH", senderDetail: "survey-rewardsPH.info",
    body: "\ud83c\udf8a CONGRATULATIONS, VISITOR! \ud83c\udf8a\n\nYou are our 1,000,000th visitor today!\n\nYou have been selected to receive one of the following prizes:\n\u2022 Samsung Galaxy S25 Ultra\n\u2022 \u20b150,000 GCash\n\u2022 Apple AirPods Pro\n\nSpin the wheel NOW to claim your prize \u2014 offer expires in 4:59",
    cta: "SPIN THE WHEEL",
    footer: "survey-rewardsPH.info/claim",
    redFlags: ["No legitimate brand awards prizes via browser pop-ups", "Countdown timer manufactured urgency", "Domain is survey-rewardsPH.info"],
    clue: "No website can accurately count 'the millionth visitor' \u2014 this is always fake.",
    explanation: "The '1,000,000th visitor' prize is one of the oldest internet scams.",
  },
  {
    id: 15, category: "Password Change Alert (Email)", medium: "Email", isScam: false,
    sender: "BDO Unibank", senderDetail: "customercare@bdo.com.ph",
    subject: "Your BDO Online Banking password was changed",
    body: "Dear Account Holder,\n\nThis is to confirm that your BDO Online Banking password was successfully changed on April 3, 2026 at 10:22 AM.\n\nIf you made this change, no further action is required.\n\nIf you did NOT make this change, please call BDO Customer Service immediately at (02) 8631-8000.",
    redFlags: [],
    clue: "Does the sender use bdo.com.ph? Does it ask you to click any links?",
    explanation: "This is a standard BDO security confirmation email from bdo.com.ph. It contains no links or requests.",
  },
  {
    id: 16, category: "Personal Message (Social Media)", medium: "Social Media", isScam: true,
    sender: "Col. James Morrison", senderDetail: "Facebook Messenger \u2014 Profile: US Army, deployed Syria, widower",
    body: "My love, I am so sorry to bother you with this. I would never ask if I had any other option.\n\nI am stranded at the Damascus airport \u2014 my military transport was cancelled and I need to buy a civilian ticket back to the US. The cost is $800.\n\nPlease send via Western Union or GCash. You are the only person I trust in this world. \ud83d\ude22",
    redFlags: ["Emergency money request after emotional relationship", "Asks for Western Union or GCash \u2014 untraceable", "'Pay you back double' is manipulation", "US military have official travel support"],
    clue: "Has this person ever video-called you with their face clearly visible?",
    explanation: "This is the 'stranded abroad' money trap. US military personnel never need civilian funds.",
  },
  {
    id: 17, category: "Utility Payment Notice (SMS)", medium: "SMS", isScam: true,
    sender: "Meralco", senderDetail: "",
    body: "MERALCO NOTICE: Your electricity service for account 104-582-0011 is scheduled for DISCONNECTION tomorrow due to an unpaid balance of \u20b13,841.50.\n\nAvoid disconnection \u2014 pay at: <span class=\"text-blue-600 underline\">meralco-payment.online/settle</span>",
    redFlags: ["Sender is a mobile number, not Meralco's official 1622", "Domain 'meralco-payment.online' is not meralco.com.ph", "Disconnection threat creates urgency"],
    clue: "Meralco's official payment portal is meralco.com.ph.",
    explanation: "Meralco does not send disconnection notices WITH CLICKABLE LINKS via mobile numbers. All payments go through meralco.com.ph only.",
  },
  {
    id: 18, category: "Marketplace Chat (App)", medium: "Marketplace", isScam: true,
    sender: "Shopee Seller: gadgets_cheapph", senderDetail: "Shopee In-App Chat",
    body: "Hi po! Salamat sa inyong order. Pasensya na po pero na-sold out na po yung stocks namin sa Shopee.\n\nPero meron pa po kaming available sa aming personal stock \u2014 mas mura pa po pag direct.\n\nPwede po nating i-transact sa labas? Ibigay lang po ang GCash number at bayad na po.",
    redFlags: ["Pushes transaction outside Shopee", "Claims stock is 'sold out' but has personal stock", "GCash payment outside platform is untraceable"],
    clue: "Shopee's Buyer Protection only works if you pay INSIDE the app.",
    explanation: "This is off-platform scamming. Once you pay via GCash directly, there is no recourse.",
  },
  {
    id: 19, category: "Customer Support Message (SMS)", medium: "SMS", isScam: true,
    sender: "GCash Support", senderDetail: "",
    body: "Magandang araw po! Ito po si Ma. Reyes mula sa GCash Customer Service. Na-flag po ang inyong account para sa unusual activity.\n\nPara ma-secure po ang inyong account, kailangan naming i-verify ang inyong identity. Ipapadala namin ang OTP sa inyong number \u2014 ibigay lang po sa amin.",
    redFlags: ["GCash support uses 2882, never a +63 mobile number", "GCash will NEVER ask for your OTP", "Framing OTP sharing as 'for your protection'"],
    clue: "Your OTP is the key to your account. No company should ever ask you to share it.",
    explanation: "This is a fake GCash support OTP scam. Real GCash support never asks for OTPs.",
  },
  {
    id: 20, category: "Transaction Notification (Email)", medium: "Email", isScam: false,
    sender: "Maya (formerly PayMaya)", senderDetail: "no-reply@maya.ph",
    subject: "You've received \u20b11,500 from Jose Reyes",
    body: "Hi Maria,\n\nGood news! You have received a money transfer.\n\nAmount: \u20b11,500.00\nFrom: Jose Reyes (+63 917 *** 4421)\nDate: April 3, 2026 \u2014 4:55 PM\nTransaction ID: MAYA-20260403-99123\n\nYour new Maya balance: \u20b12,341.00\n\nCheck your wallet in the Maya app.",
    redFlags: [],
    clue: "Check the sender domain and whether anything is being asked of you.",
    explanation: "This is an authentic Maya transaction notification from no-reply@maya.ph.",
  },
  {
    id: 21, category: "Government Services Notice (Email)", medium: "Email", isScam: true,
    sender: "SSS \u2014 Social Security System", senderDetail: "sss-onlineservices@sss-member-portal.com",
    subject: "Your SSS Pension Application \u2014 Additional Documents Required",
    body: "Dear SSS Member,\n\nYour online pension application (Ref# SSS-2026-0403-7741) is under review. Our records show a discrepancy in your submitted documents.\n\nTo avoid delays, please log in and re-upload:\n\u2022 Government-issued ID (front & back)\n\u2022 Latest payslip\n\u2022 Bank account details for pension disbursement\n\nDeadline: April 10, 2026.",
    cta: "LOG IN TO SSS PORTAL",
    redFlags: ["Domain is 'sss-member-portal.com' \u2014 SSS's real domain is sss.gov.ph", "Government agency not using .gov.ph", "Asks for bank account details", "Requests sensitive documents through non-official portal"],
    clue: "SSS's official website is sss.gov.ph. All member portal access goes through that domain only.",
    explanation: "This is a spear phishing attack targeting SSS members. The fake domain is designed to steal your credentials.",
  },
  {
    id: 22, category: "Investment Opportunity (Social Media)", medium: "Social Media", isScam: true,
    sender: "Mei Lin", senderDetail: "WhatsApp \u2014 referred via Facebook group",
    body: "Hi! Sorry to message you out of nowhere \u2014 I got your number from the investment group. I'm Mei Lin, based in Singapore. I've been doing crypto trading for 3 years.\n\nMy uncle manages a private trading platform. Last month I made \u20b1180,000 from a \u20b130,000 deposit.\n\nInterested? I can guide you step by step. \ud83d\ude0a",
    redFlags: ["Unsolicited contact from stranger", "500% returns in one month is unrealistic", "'Private platform' = pig butchering", "Will coach you to deposit, show fake profits, then freeze your account"],
    clue: "Any stranger offering 500% returns on a 'private platform' is running a scam. No exceptions.",
    explanation: "This is the 'pig butchering' romance-investment scam. The platform is fake and controlled by scammers.",
  },
  {
    id: 23, category: "One-Time Password (SMS)", medium: "SMS", isScam: false,
    sender: "BPI", senderDetail: "",
    body: "BPI: Your BPI OTP is 738291. Use this to complete your transaction. Valid for 5 minutes. Never share this code with anyone, including BPI staff. If you did not request this, call 889-100 immediately.",
    redFlags: [],
    clue: "Did you initiate a transaction just now? Is the sender a registered short code?",
    explanation: "This OTP was sent from BPI's official short code in response to a transaction you initiated.",
  },
  {
    id: 24, category: "Shipping Update (App)", medium: "Marketplace", isScam: true,
    sender: "Seller: budgetgadgets_mnl", senderDetail: "Carousell Chat + Screenshot sent via Messenger",
    body: "Shipped na po! Napadala ko na kanina. Heto po ang tracking number at receipt.\n\n[Attached: LBC receipt showing Tracking No. LBC9988120044PH, Sender: Budget Gadgets, Recipient: Maria Santos, Pasig City, Status: ACCEPTED \u2014 April 3, 2026]\n\nMacheck na lang po sa LBC website. 3\u20135 days po ang delivery.",
    redFlags: ["Always verify tracking numbers directly on lbcexpress.com", "Tracking numbers can be fabricated or reused", "Seller pushed for GCash payment before showing proof"],
    clue: "A screenshot of a receipt proves nothing. Go to lbcexpress.com yourself.",
    explanation: "Forged shipping receipts are one of the most common online seller scams in the Philippines.",
  },
  {
    id: 25, category: "Security Notification (Email)", medium: "Email", isScam: true,
    sender: "BDO Unibank", senderDetail: "security@bd0.com.ph",
    subject: "Security Notice: Unusual login detected on your BDO account",
    body: "Dear Valued Customer,\n\nWe detected a login attempt from an unrecognized device:\n\nDevice: Windows PC\nLocation: Cebu City, Philippines\nTime: April 3, 2026 \u2014 11:47 PM\n\nIf this was not you, please secure your account immediately by verifying your identity through our official portal.",
    cta: "SECURE MY ACCOUNT",
    footer: "BDO Unibank \u2014 24/7 Customer Security Team",
    redFlags: ["The sender domain uses a zero ('0') instead of the letter 'O' (bd0.com.ph)", "CTA goes to a cloned BDO login page", "Creates urgency by claiming an unrecognized login"],
    clue: "Look extremely closely at the sender's email address. Does it spell 'bdo' correctly?",
    explanation: "This uses a typosquatting attack. The sender replaced the letter 'O' with the number '0' (bd0.com.ph). Real BDO emails always use the exact domain bdo.com.ph.",
  },
];

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════

export type Lang = "en" | "fil" | "ceb";

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "HOME",
    "nav.scam_info": "SCAM INFO",
    "nav.about_us": "ABOUT US",
    "nav.try_me": "TRY ME",
    "nav.learn_scam": "Learn About Scam",
    "nav.learn_scam_desc": "Understand the fundamentals",
    "nav.how_detect": "How to Detect",
    "nav.how_detect_desc": "Spot the warning signs early",
    "hero.title1": "Think Before",
    "hero.title2": "You Click.",
    "hero.subtitle": "Cyber threats are evolving rapidly. P.R.O.O.F. is here to help you stay one step ahead \u2014 learn to identify, avoid, and report online scams.",
    "hero.btn_learn": "Start Learning",
    "hero.btn_report": "Report Incident",
    "about.badge": "Our Core Mission",
    "about.title1": "LEARN ABOUT",
    "about.title2": "THE CAMPAIGN",
    "about.body": "P.R.O.O.F is a proactive awareness campaign designed to educate and protect the community from malicious digital threats. Our mission is to ensure everyone\u2014especially vulnerable populations\u2014can navigate the digital landscape securely.",
    "about.team_title1": "The Team",
    "about.team_title2": "Behind it",
    "home.join_title": "Join Our Mission",
    "home.join_body": "We're always looking for passionate individuals to join our cause. Together, we can make the internet safer.",
    "home.volunteer_btn": "Volunteer Now",
    "quiz.page_title": "TEST YOUR SKILLS",
    "quiz.page_subtitle": "25 real-world scenarios. One goal: can you spot the scam before it's too late?",
    "quiz.module_label": "Scam Identification Module",
    "quiz.btn_scam": "IT'S A SCAM",
    "quiz.btn_legit": "SEEMS LEGIT",
    "quiz.btn_next": "Next Scenario",
    "quiz.btn_restart": "Restart Assessment",
    "quiz.complete_title": "Assessment Complete",
    "footer.mission": "Our mission is to empower the community through education and timely alerts.",
    "footer.quick_links": "Quick Links",
    "footer.copyright": "\u00a9 2026 P.R.O.O.F Scam Awareness Campaign. All rights reserved.",
    "a11y.title": "Accessibility",
    "a11y.large_text": "Large Text",
    "a11y.readable_font": "Readable Font",
    "a11y.high_contrast": "High Contrast",
    "a11y.grayscale": "Grayscale",
    "a11y.highlight_links": "Highlight Links",
    "a11y.stop_animations": "Stop Animations",
    "a11y.big_cursor": "Big Cursor",
    "a11y.reset": "Reset All",
    "a11y.language_title": "Language",
  },
  fil: {
    "nav.home": "TAHANAN",
    "nav.scam_info": "IMPORMASYON SA SCAM",
    "nav.about_us": "TUNGKOL SA AMIN",
    "nav.try_me": "SUBUKAN",
    "nav.learn_scam": "Matuto Tungkol sa Scam",
    "nav.learn_scam_desc": "Unawain ang mga pangunahing konsepto",
    "nav.how_detect": "Paano Matukoy",
    "nav.how_detect_desc": "Kilalanin ang mga babala nang maaga",
    "hero.title1": "Mag-isip Muna",
    "hero.title2": "Bago I-click.",
    "hero.subtitle": "Mabilis na umuunlad ang mga cyber threat. Pangalagaan ang inyong digital na pagkakakilanlan sa pamamagitan ng kamalayan sa cybersecurity.",
    "hero.btn_learn": "Magsimulang Matuto",
    "hero.btn_report": "Mag-ulat ng Insidente",
    "about.badge": "Ang Aming Pangunahing Misyon",
    "about.title1": "ALAMIN ANG",
    "about.title2": "KAMPANYA",
    "about.body": "Kami ay isang dedikadong kolektibo ng mga tagapagtaguyod na nagtatrabaho nang magkasama upang magdala ng makabuluhang pagbabago.",
    "about.team_title1": "Ang Pangkat",
    "about.team_title2": "sa Likod Nito",
    "home.join_title": "Sumali sa Aming Misyon",
    "home.join_body": "Palagi kaming naghahanap ng mga taong may pagmamahal upang sumali sa aming layunin.",
    "home.volunteer_btn": "Mag-boluntaryo Ngayon",
    "quiz.page_title": "SUBUKAN ANG INYONG MGA KAKAYAHAN",
    "quiz.page_subtitle": "25 totoong senaryo. Isang layunin: makikita mo ba ang scam bago mahuli?",
    "quiz.module_label": "Modyul ng Pagkilala sa Scam",
    "quiz.btn_scam": "ITO AY SCAM",
    "quiz.btn_legit": "MUKHANG LEHITIMO",
    "quiz.btn_next": "Susunod na Senaryo",
    "quiz.btn_restart": "Ulitin ang Pagtatasa",
    "quiz.complete_title": "Kumpleto ang Pagtatasa",
    "footer.mission": "Ang aming misyon ay bigyang-kapangyarihan ang komunidad sa pamamagitan ng edukasyon.",
    "footer.quick_links": "Mabilis na Link",
    "footer.copyright": "\u00a9 2026 P.R.O.O.F Kampanya ng Kamalayan sa Scam. Lahat ng karapatan ay nakalaan.",
    "a11y.title": "Accessibility",
    "a11y.large_text": "Malaking Teksto",
    "a11y.readable_font": "Madaling Basahing Font",
    "a11y.high_contrast": "Mataas na Kontraste",
    "a11y.grayscale": "Grayscale",
    "a11y.highlight_links": "I-highlight ang mga Link",
    "a11y.stop_animations": "Ihinto ang Animasyon",
    "a11y.big_cursor": "Malaking Cursor",
    "a11y.reset": "I-reset Lahat",
    "a11y.language_title": "Wika",
  },
  ceb: {
    "nav.home": "PANIMALAY",
    "nav.scam_info": "KASAYURAN SA SCAM",
    "nav.about_us": "MAHITUNGOD KANAMO",
    "nav.try_me": "SULAYAN",
    "nav.learn_scam": "Pagkat-on Bahin sa Scam",
    "nav.learn_scam_desc": "Sabta ang mga pundasyon",
    "nav.how_detect": "Unsaon Pagkita",
    "nav.how_detect_desc": "Mailhan ang mga timailhan sa sayo",
    "hero.title1": "Mag-isip Una",
    "hero.title2": "Sa Dili Ka Mag-klik.",
    "hero.subtitle": "Dali ra mag-ilis ang mga cyber threat. Panalipdi ang imong digital nga pagkatawo pinaagi sa kahibalo sa cybersecurity.",
    "hero.btn_learn": "Sugdi ang Pagkat-on",
    "hero.btn_report": "I-report ang Insidente",
    "about.badge": "Ang Among Panguna nga Misyon",
    "about.title1": "PAGKAT-ON BAHIN SA",
    "about.title2": "KAMPANYA",
    "about.body": "Kami usa ka dedikado nga kolektibo sa mga tigpaluyo nga nagtinabangay aron magdala ug kausaban.",
    "about.team_title1": "Ang Pundok",
    "about.team_title2": "Sa Luyo Niini",
    "home.join_title": "Apil sa Among Misyon",
    "home.join_body": "Kanunay kaming naghanap ug mga tawo aron moapil sa among katuyoan.",
    "home.volunteer_btn": "Mag-boluntaryo Karon",
    "quiz.page_title": "SULAYAN ANG IMONG MGA KAHANAS",
    "quiz.page_subtitle": "25 ka senaryo. Usa ka tumong: makit-an ba nimo ang scam?",
    "quiz.module_label": "Modulo sa Pag-ila sa Scam",
    "quiz.btn_scam": "SCAM KINI",
    "quiz.btn_legit": "DALING LEHITIMO",
    "quiz.btn_next": "Sunod nga Senaryo",
    "quiz.btn_restart": "Sugdan Pag-usab",
    "quiz.complete_title": "Kompleto ang Pagtuki",
    "footer.mission": "Ang among misyon mao ang paghatag ug gahom sa komunidad pinaagi sa edukasyon.",
    "footer.quick_links": "Dali nga mga Link",
    "footer.copyright": "\u00a9 2026 P.R.O.O.F Kampanya sa Kahibalo sa Scam. Tanan nga katungod gitagana.",
    "a11y.title": "Accessibility",
    "a11y.large_text": "Dako nga Teksto",
    "a11y.readable_font": "Sayon Basahon nga Font",
    "a11y.high_contrast": "Taas nga Kontraste",
    "a11y.grayscale": "Grayscale",
    "a11y.highlight_links": "I-highlight ang mga Link",
    "a11y.stop_animations": "Ihunong ang Animasyon",
    "a11y.big_cursor": "Dako nga Cursor",
    "a11y.reset": "I-reset Tanan",
    "a11y.language_title": "Pinulongan",
  },
};
