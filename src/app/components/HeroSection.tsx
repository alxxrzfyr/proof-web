import { useState, useEffect } from "react";
import { translations, threatStats, type Lang } from "./data";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import bg1 from "@/assets/backgrounds/bg-1.jpg";
import bg2 from "@/assets/backgrounds/bg-2.jpg";
import bg3 from "@/assets/backgrounds/bg-3.jpg";
import bg4 from "@/assets/backgrounds/bg-4.png";

interface Props {
  lang: Lang;
  onNavigate: (section: string) => void;
}

const HERO_IMAGES = [
  bg1,
  bg2,
  bg3,
  bg4,
];

// Factual data based on CICC, PNP-ACG, BSP, DICT reports
const pieData = [
  { name: "Phishing / Smishing", value: 35, color: "#dc2626" },
  { name: "Online Selling Scam", value: 25, color: "#0a2fad" },
  { name: "Investment Scam", value: 18, color: "#f97316" },
  { name: "Romance Scam", value: 12, color: "#eab308" },
  { name: "Others", value: 10, color: "#6b7280" },
];

// Factual trend: PNP-ACG & CICC reported cybercrime cases in PH
const lineData = [
  { year: "2019", cases: 8453 },
  { year: "2020", cases: 13671 },
  { year: "2021", cases: 20870 },
  { year: "2022", cases: 27081 },
  { year: "2023", cases: 30567 },
  { year: "2024", cases: 35102 },
  { year: "2025", cases: 39000 },
];

export function HeroSection({ lang, onNavigate }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [
    { icon: "visibility", text: lang === "fil" ? "KAMALAYAN" : lang === "ceb" ? "KAHIBALO" : "AWARENESS" },
    { icon: "verified_user", text: lang === "fil" ? "LIGTAS" : lang === "ceb" ? "LUWAS" : "SAFE" },
    { icon: "menu_book", text: lang === "fil" ? "DIGITAL NA KARUNUNGAN" : lang === "ceb" ? "DIGITAL NGA KAALAM" : "DIGITAL LITERACY" },
    { icon: "psychology", text: lang === "fil" ? "MULAT" : lang === "ceb" ? "MAKAAMGO" : "COGNIZANT" },
    { icon: "security", text: lang === "fil" ? "PROTEKTADO" : lang === "ceb" ? "GIPANALIPDAN" : "PROTECTED" },
  ];

  const MarqueeGroup = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div className="flex gap-16 md:gap-24 pr-16 md:pr-24 items-center shrink-0" aria-hidden={ariaHidden}>
      {marqueeItems.map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="material-symbols-outlined text-yellow-400 text-3xl md:text-4xl drop-shadow-md">{item.icon}</span>
          <span className="text-white text-2xl md:text-3xl tracking-widest drop-shadow-md" style={{ fontWeight: 900 }}>{item.text}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative">
      {/* Hero with changing background images */}
      <div className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out blur-[3px]"
            style={{
              backgroundImage: `url("${img}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentBg === i ? 1 : 0,
            }}
          />
        ))}
        {/* Simple dark overlay to unify colors and make text pop */}
        <div className="absolute inset-0 bg-[#1a1816]/80" />

        <div className="relative z-10 w-full pt-24 sm:pt-28 pb-14 sm:pb-16 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
          <div className="flex flex-col gap-5 sm:gap-8 max-w-5xl">
            <h1 className="text-4xl leading-[1.2] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] uppercase tracking-tight break-words" style={{ fontWeight: 900 }}>
              <span className="text-white block">
                {t("hero.title1")}
              </span>
              <span className="text-yellow-400 block mt-2 sm:mt-3 md:mt-4">
                {t("hero.title2")}
              </span>
            </h1>

            <p className="text-[#e5ded4] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl" style={{ fontWeight: 500 }}>
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 w-full">
              <button
                onClick={() => onNavigate("about-scam")}
                className="w-full sm:w-auto cursor-pointer items-center justify-center rounded-lg h-14 sm:h-16 px-8 sm:px-12 bg-yellow-400 text-[#1a1816] text-base sm:text-lg hover:bg-yellow-500 transition-colors shadow-md flex gap-3"
                style={{ fontWeight: 700 }}
              >
                <span>{t("hero.btn_learn")}</span>
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </button>
              <a href="https://cicc.gov.ph/report/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto cursor-pointer items-center justify-center rounded-lg h-14 sm:h-16 px-8 sm:px-12 bg-yellow-400 text-[#1a1816] text-base sm:text-lg hover:bg-yellow-500 transition-colors flex gap-3 shadow-md" style={{ fontWeight: 700 }}>
                  <span>{t("hero.btn_report")}</span>
                  <span className="material-symbols-outlined text-xl">arrow_outward</span>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Slideshow indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setCurrentBg(i)} className={`w-3 h-3 rounded-full transition-all cursor-pointer ${currentBg === i ? "bg-yellow-400 w-8" : "bg-white/40"}`} />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <section className="bg-gradient-to-r from-[#0a2fad] via-blue-800 to-[#0a2fad] relative z-10 py-4 md:py-6 overflow-hidden border-y-4 border-yellow-400 shadow-2xl flex items-center">
        <div className="flex whitespace-nowrap animate-marquee items-center w-max">
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </section>

      {/* What is P.R.O.O.F? */}
      <section className="bg-[#f8f7f5]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <h2 className="text-[#0a2fad] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            {lang === "fil" ? 'Ano ang "P.R.O.O.F"?' : lang === "ceb" ? 'Unsa ang "P.R.O.O.F"?' : 'What is "P.R.O.O.F"?'}
          </h2>
          <div className="w-16 h-1.5 bg-[#0a2fad] rounded-full mt-4 mb-6" />
          <p className="text-[#2d2926] text-lg md:text-xl leading-relaxed w-full lg:max-w-none" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      {/* What are the online scams? */}
      <section className="bg-white border-t border-[#e5ded4]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <h2 className="text-[#0a2fad] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            {lang === "fil" ? "Ano ang mga online na scam?" : lang === "ceb" ? "Unsa ang mga online scam?" : "What are the online scams?"}
          </h2>
          <div className="w-16 h-1.5 bg-[#4a3224] rounded-full mt-4 mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: "mail", title: lang === "fil" ? "Mga Mensaheng Phishing" : "Phishing Messages", desc: lang === "fil" ? "Mga mapanlinlang na email at mensahe." : "Deceptive emails designed to steal your credentials and personal data.", onClick: () => onNavigate("about-scam") },
              { icon: "redeem", title: lang === "fil" ? "Mga Huwad na Premyo" : "Fake Prize Traps", desc: lang === "fil" ? "Mga alok na masyadong maganda para maging totoo." : "Too-good-to-be-true offers designed to steal your money or information.", onClick: () => onNavigate("about-scam") },
              { icon: "link_off", title: lang === "fil" ? "Mga Mapanlinlang na Link" : "Fraudulent Links", desc: lang === "fil" ? "Mga nakakasamang URL at website." : "Malicious URLs that masquerade as trusted and legitimate websites.", onClick: () => onNavigate("about-scam") },
            ].map((card, i) => (
              <button
                key={i}
                onClick={card.onClick}
                className="group flex flex-col items-center text-center p-6 sm:p-8 bg-[#f8f7f5] border border-[#e5ded4] rounded-xl hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white text-[#0a2fad] rounded-xl group-hover:bg-[#0a2fad] group-hover:text-white transition-colors mb-4 sm:mb-5 shadow-sm">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">{card.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl text-[#1a1816] uppercase tracking-tight break-words mb-2 sm:mb-3" style={{ fontWeight: 800 }}>{card.title}</h3>
                <p className="text-[#3d3530] text-sm sm:text-base" style={{ fontWeight: 500 }}>{card.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Are you part of the vulnerable sector? */}
      <section className="bg-[#f8f7f5] border-t border-[#e5ded4]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block bg-[#0a2fad] text-white uppercase tracking-widest text-xs rounded-full px-5 py-2" style={{ fontWeight: 700 }}>
              {lang === "fil" ? "DATOS AT DEMOGRAPIYA" : lang === "ceb" ? "DATOS UG DEMOGRAPIYA" : "DATA & DEMOGRAPHICS"}
            </span>
            <h2 className="text-[#1a1816] mt-5 uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}>
              {lang === "fil" ? "Ikaw ba ay bahagi ng vulnerable sector?" : lang === "ceb" ? "Ikaw ba usa sa vulnerable sector?" : "Are you part of the vulnerable sector?"}
            </h2>
            <p className="text-[#3d3530] mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-14">
            {threatStats.map((stat, i) => (
              <div key={i} className="bg-white border border-[#e5ded4] rounded-xl p-4 sm:p-5 text-center shadow-sm flex flex-col justify-center">
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#5c544d] font-mono" style={{ fontWeight: 700 }}>{stat.label}</p>
                <p className={`text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-3 break-words ${stat.color === "text-red-400" ? "text-red-600" : "text-[#0a2fad]"}`} style={{ fontWeight: 900 }}>{stat.value}</p>
                <p className="text-xs sm:text-sm text-[#5c544d] mt-1 sm:mt-2" style={{ fontWeight: 600 }}>{stat.sublabel}</p>
              </div>
            ))}
          </div>

          {/* Charts Row: Pie + Line */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14">
            {/* Pie Chart — Scam Types (Based on CICC 2024-2025 data) */}
            <div className="bg-white border border-[#e5ded4] rounded-xl p-5 sm:p-6 md:p-8">
              <h3 className="text-[#1a1816] uppercase tracking-tight mb-1" style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                {lang === "fil" ? "Mga Uri ng Scam sa Pilipinas" : "Scam Types in the Philippines"}
              </h3>
              <p className="text-[#5c544d] text-xs mb-5" style={{ fontWeight: 500 }}>Source: CICC, PNP-ACG reports (2024–2025)</p>
              <div className="w-full" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={50}
                      paddingAngle={3}
                      label={false}
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`pie-cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5ded4", fontWeight: 600 }} formatter={(value: number) => [`${value}%`, ""]} />
                    <Legend wrapperStyle={{ fontWeight: 600, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart — Reported Cases Trend (PNP-ACG & CICC) */}
            <div className="bg-white border border-[#e5ded4] rounded-xl p-5 sm:p-6 md:p-8">
              <h3 className="text-[#1a1816] uppercase tracking-tight mb-1" style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                {lang === "fil" ? "Trend ng mga Kaso sa Pilipinas" : "Reported Cybercrime Cases (PH)"}
              </h3>
              <p className="text-[#5c544d] text-xs mb-5" style={{ fontWeight: 500 }}>Source: PNP-ACG, CICC annual reports (2019–2025)</p>
              <div className="w-full" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 15, left: -5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5ded4" />
                    <XAxis dataKey="year" tick={{ fill: "#3d3530", fontWeight: 700, fontSize: 13 }} />
                    <YAxis tick={{ fill: "#3d3530", fontWeight: 600, fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5ded4", fontWeight: 600 }} formatter={(value: number) => [`${value.toLocaleString()} cases`, ""]} />
                    <Line type="monotone" dataKey="cases" stroke="#dc2626" strokeWidth={3} dot={{ fill: "#dc2626", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} name="Cybercrime Cases" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Why This Matters — open layout, title left, text underneath */}
          <div className="w-full lg:max-w-none">
            <h3 className="text-[#0a2fad] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              {lang === "fil" ? "Bakit Mahalaga Ito" : "Why This Matters"}
            </h3>
            <div className="w-16 h-1.5 bg-[#0a2fad] rounded-full mt-4 mb-6" />
            <p className="text-[#2d2926] text-base sm:text-lg leading-relaxed w-full" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
            </p>
            <p className="text-[#5c544d] text-sm italic leading-relaxed mt-4 w-full" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ut facilisis in, egestas eget quam.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}