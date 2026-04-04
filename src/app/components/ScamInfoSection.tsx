import { useState, useEffect } from "react";
import { scamTypes, quickJumpPills, alerts as staticAlerts, type Lang, translations } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Add these imports (adjust the paths if the exact filenames differ)
import bspLogo from "@/assets/backgrounds/bsp-logo.png";
import ciccLogo from "@/assets/backgrounds/cicc.png";
import nbiLogo from "@/assets/backgrounds/nbi.png";
import pnpAcgLogo from "@/assets/backgrounds/pnp-acg-logo.png";

interface Props {
  lang: Lang;
}

// Official logo URLs (using clearbit for logos)
const resourceLogos: Record<string, string> = {
  CICC: ciccLogo,
  "NBI-CCD": nbiLogo,
  BSP: bspLogo,
  "PNP-ACG": pnpAcgLogo,
};

function ScamExampleCard({ tab, index }: { tab: any; index: number }) {
  const content = tab.content;

  const categoryColors = [
    { header: "bg-gradient-to-r from-[#1a1816] to-[#2d2926]", accent: "bg-red-500", badge: "bg-red-500/20 text-red-300" },
    { header: "bg-gradient-to-r from-[#1a1816] to-[#2d2926]", accent: "bg-amber-500", badge: "bg-amber-500/20 text-amber-300" },
    { header: "bg-gradient-to-r from-[#1a1816] to-[#2d2926]", accent: "bg-blue-500", badge: "bg-blue-500/20 text-blue-300" },
  ];
  const color = categoryColors[index % 3];

  return (
    <div className="bg-white border-2 border-[#e5ded4] rounded-xl shadow-sm overflow-hidden hover:shadow-lg hover:border-[#0a2fad]/30 transition-all hover:-translate-y-0.5">
      <div className={`${color.header} px-4 sm:px-5 py-3.5 flex items-center gap-3`}>
        <span className="bg-white text-[#1a1816] w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{ fontWeight: 900 }}>
          {index + 1}
        </span>
        <span className="text-white text-sm sm:text-base flex-1" style={{ fontWeight: 700 }}>{tab.label}</span>
        <span className={`${color.badge} text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider`} style={{ fontWeight: 700 }}>Example</span>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        {content.sender && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[#1a1816] text-sm" style={{ fontWeight: 700 }}>{content.sender}</span>
            {content.senderBadge && (
              <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full uppercase" style={{ fontWeight: 700 }}>{content.senderBadge}</span>
            )}
          </div>
        )}

        {content.from && (
          <div className="text-sm mb-1">
            <span className="text-[#3d3530]" style={{ fontWeight: 600 }}>From: </span>
            <span className="text-red-600 underline decoration-wavy font-mono text-xs break-all" style={{ fontWeight: 600 }}>{content.from}</span>
          </div>
        )}
        {content.subject && (
          <div className="text-sm mb-3 text-[#1a1816]" style={{ fontWeight: 700 }}>
            <span className="text-[#3d3530]" style={{ fontWeight: 600 }}>Subject: </span>{content.subject}
          </div>
        )}

        {content.body && (
          <div className="text-sm text-[#1a1816] whitespace-pre-line leading-[1.75] bg-[#f8f7f5] rounded-lg p-3 sm:p-4 border border-[#d6cfc6]" style={{ fontWeight: 500 }}>
            {content.body}
          </div>
        )}

        {content.cta && (
          <div className="mt-3">
            <span className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-md text-sm shadow-sm" style={{ fontWeight: 700 }}>{content.cta}</span>
          </div>
        )}

        {content.type === "url-compare" && content.extra?.urls && (
          <div className="space-y-2">
            {content.extra.urls.map((u: any, i: number) => (
              <div key={i} className={`flex items-center gap-2 sm:gap-3 p-3 rounded-lg ${u.verdict === "safe" ? "bg-green-50 border-2 border-green-300" : "bg-red-50 border-2 border-red-300"}`}>
                <span className={`material-symbols-outlined ${u.verdict === "safe" ? "text-green-600" : "text-red-600"}`}>
                  {u.verdict === "safe" ? "lock" : "warning"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#3d3530] uppercase tracking-wider" style={{ fontWeight: 700 }}>{u.label}</p>
                  <p className="text-[#1a1816] text-sm font-mono break-all" style={{ fontWeight: 600 }}>{u.url}</p>
                </div>
                {u.highlight && <span className="text-red-600 text-xs shrink-0" style={{ fontWeight: 800 }}>{u.highlight}</span>}
              </div>
            ))}
          </div>
        )}

        {content.type === "sim-swap" && content.extra && (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#f8f7f5] rounded-lg p-4 sm:p-5 border border-[#d6cfc6]">
              <p className="text-[#1a1816] text-xs uppercase tracking-wider mb-3" style={{ fontWeight: 800 }}>How SIM Swap Happens</p>
              <div className="space-y-2.5">
                {content.extra.steps.map((step: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0" style={{ fontWeight: 700 }}>{i + 1}</span>
                    <p className="text-[#1a1816] text-sm" style={{ fontWeight: 500 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[#1a1816] text-xs uppercase tracking-wider mb-2" style={{ fontWeight: 800 }}>Warning Signs</p>
              {content.extra.warnings.map((w: string, i: number) => (
                <div key={i} className="bg-red-50 border-2 border-red-300 rounded-md p-3 text-red-800 text-sm" style={{ fontWeight: 600 }}>{w}</div>
              ))}
            </div>
          </div>
        )}

        {content.extra?.domain && content.type !== "url-compare" && (
          <p className="text-[#3d3530] text-xs mt-2 font-mono" style={{ fontWeight: 600 }}>{content.extra.domain}</p>
        )}
        {content.extra?.moneyRequest && (
          <div className="mt-4 bg-[#f8f7f5] border-2 border-[#d6cfc6] rounded-lg p-4">
            <p className="text-xs text-[#1a1816] uppercase mb-2" style={{ fontWeight: 700 }}>3 weeks later...</p>
            <p className="text-[#1a1816] text-sm italic" style={{ fontWeight: 500 }}>{content.extra.moneyRequest}</p>
          </div>
        )}
        {content.extra?.trackingNo && (
          <div className="mt-3 bg-[#f8f7f5] rounded-lg p-4 border-2 border-[#d6cfc6] relative">
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded uppercase rotate-12" style={{ fontWeight: 700 }}>FORGED</div>
            <p className="text-xs text-[#1a1816] uppercase" style={{ fontWeight: 800 }}>LBC EXPRESS</p>
            <p className="font-mono text-sm mt-2 text-[#1a1816]" style={{ fontWeight: 600 }}>Tracking: {content.extra.trackingNo}</p>
            <p className="text-sm mt-1 text-[#1a1816]" style={{ fontWeight: 500 }}>Recipient: {content.extra.recipient}</p>
          </div>
        )}
        {content.extra?.shares && (
          <div className="flex gap-4 mt-3 text-[#3d3530] text-xs" style={{ fontWeight: 600 }}>
            <span>{content.extra.reactions} reactions</span>
            <span>{content.extra.shares} shares</span>
          </div>
        )}

        {content.annotations.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {content.annotations.map((a: string, i: number) => (
              <p key={i} className="text-red-700 text-xs flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-md px-3 py-2" style={{ fontWeight: 700 }}>
                <span className="shrink-0">⚠</span> {a}
              </p>
            ))}
          </div>
        )}

        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-3 sm:p-4 mt-4">
          <p className="text-amber-900 text-sm" style={{ fontWeight: 700 }}>💡 {content.callout}</p>
        </div>
      </div>
    </div>
  );
}

function LogoImage({ name }: { name: string }) {
  const url = resourceLogos[name];
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white border border-[#e5ded4] flex items-center justify-center shrink-0 overflow-hidden p-1.5">
      <ImageWithFallback
        src={url || ""}
        alt={`${name} logo`}
        className="w-full h-full object-contain"
        onError={(e: any) => {
          e.target.style.display = "none";
          e.target.parentElement.innerHTML = `<span style="font-weight:900;font-size:11px;color:#0a2fad;text-align:center;line-height:1.1">${name}</span>`;
        }}
      />
    </div>
  );
}

export function ScamInfoSection({ lang }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;
  const [alerts, setAlerts] = useState<any[]>(staticAlerts);
  const [alertScope, setAlertScope] = useState<"local" | "international">("local");

  useEffect(() => {
    fetch("alerts.json") // Relative fetch works on GitHub Pages Subpaths
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAlerts(data.alerts || data);
      })
      .catch((err) => console.error("Failed to load alerts:", err));
  }, []);

  return (
    <section className="bg-white">
      {/* Page Header */}
      <div className="bg-[#f8f7f5] border-b border-[#e5ded4]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-14 md:py-18">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-block bg-[#1a1816] text-white uppercase tracking-widest text-xs rounded-full px-4 py-1.5 font-mono" style={{ fontWeight: 700 }}>
              SCAM INFO CENTER
            </span>
            <span className="text-[#5c544d] text-xs font-mono" style={{ fontWeight: 600 }}>UPDATED: APRIL 2026</span>
          </div>
          <h1 className="text-[#1a1816] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
            {lang === "fil" ? "Sentro ng Impormasyon sa Scam" : lang === "ceb" ? "Sentro sa Kasayuran sa Scam" : "Scam Information Center"}
          </h1>
          <p className="text-[#3d3530] text-base sm:text-lg max-w-2xl mt-4 leading-relaxed" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.
          </p>

          <div className="flex flex-row gap-2 flex-wrap mt-6 sm:mt-8">
            {quickJumpPills.map((pill) => (
              <span
                key={pill}
                className="bg-[#1a1816]/5 border border-[#1a1816]/15 text-[#3d3530] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm"
                style={{ fontWeight: 600 }}
              >
                # {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What is scam? + How to detect? */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-[#0a2fad] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {lang === "fil" ? "Ano ang Scam?" : lang === "ceb" ? "Unsa ang Scam?" : "What is Scam?"}
          </h2>
          <div className="w-16 h-1.5 bg-[#0a2fad] rounded-full mt-4 mb-5" />
          <p className="text-[#2d2926] text-base sm:text-lg leading-relaxed max-w-4xl" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-[#0a2fad] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {lang === "fil" ? "Paano Matukoy ang Scam?" : lang === "ceb" ? "Unsaon Pagkita sa Scam?" : "How to Detect a Scam?"}
          </h2>
          <div className="w-16 h-1.5 bg-[#0a2fad] rounded-full mt-4 mb-5 ml-auto" />
          <p className="text-[#2d2926] text-base sm:text-lg leading-relaxed max-w-4xl ml-auto" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
      </div>

      {/* Scam Categories */}
      <div className="bg-[#f8f7f5] border-t border-[#e5ded4]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
          <h2 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 900, fontSize: "clamp(1.35rem, 3vw, 2.25rem)" }}>
            {lang === "fil" ? "Karaniwang Uri ng Panloloko" : "Common Types of Scams"}
          </h2>
          <p className="text-[#3d3530] mb-10 sm:mb-12 text-base" style={{ fontWeight: 500 }}>
            {lang === "fil" ? "Suriin ang mga pattern ng panloloko upang maprotektahan ang inyong sarili." : "Analyze malicious patterns to protect yourself and your loved ones."}
          </p>

          {scamTypes.map((scam) => (
            <div key={scam.number} className="mb-12 sm:mb-16 last:mb-0">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-[#e5ded4]">
                <div className="bg-[#1a1816] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0" style={{ fontWeight: 900 }}>
                  {scam.number}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[#1a1816] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.1rem, 2vw, 1.75rem)" }}>
                    {scam.title}
                  </h3>
                  <p className="text-[#3d3530] text-sm mt-1" style={{ fontWeight: 500 }}>{scam.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {scam.tabs.map((tab, i) => (
                  <ScamExampleCard key={i} tab={tab} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts, Resources, Report */}
      <div className="border-t border-[#e5ded4]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14">

          {/* Live Alerts — Redesigned as a news ticker / card grid */}
          <div className="mb-10 sm:mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">notifications_active</span>
                </div>
                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "1.25rem" }}>Live Alerts</h3>
                  <p className="text-[#5c544d] text-xs" style={{ fontWeight: 600 }}>Latest scam reports & advisories</p>
                </div>
              </div>
              
              <div className="flex items-center bg-[#f8f7f5] rounded-full p-1 border border-[#e5ded4] sm:ml-auto">
                <button 
                  onClick={() => setAlertScope("local")}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${alertScope === "local" ? "bg-[#0a2fad] text-white shadow-sm" : "text-[#5c544d] hover:text-[#1a1816]"}`}
                  style={{ fontWeight: alertScope === "local" ? 800 : 700 }}
                >
                  Local (PH)
                </button>
                <button 
                  onClick={() => setAlertScope("international")}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${alertScope === "international" ? "bg-[#0a2fad] text-white shadow-sm" : "text-[#5c544d] hover:text-[#1a1816]"}`}
                  style={{ fontWeight: alertScope === "international" ? 800 : 700 }}
                >
                  International
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-1.5 ml-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-red-600 text-xs uppercase tracking-wider" style={{ fontWeight: 700 }}>Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alerts.filter(a => a.scope === alertScope || (!a.scope && alertScope === "local")).slice(0, 6).map((alert) => (
                <a
                  key={alert.id}
                  href={alert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-[#e5ded4] rounded-xl p-5 hover:border-[#0a2fad]/40 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3 w-full">
                    <div className="flex items-center gap-2 max-w-[65%]">
                      {alert.logo ? (
                        <img src={alert.logo} alt="" className="w-4 h-4 rounded object-cover shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      ) : (
                        <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${alert.severity === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
                      )}
                      <span className="text-[#5c544d] text-[11px] uppercase tracking-wider truncate" style={{ fontWeight: 700 }} title={alert.source}>{alert.source}</span>
                    </div>
                    <span className="text-[#5c544d]/50 text-[11px] shrink-0 text-right" style={{ fontWeight: 600 }}>{alert.date}</span>
                  </div>
                  <p className="text-[#1a1816] text-sm sm:text-base leading-snug group-hover:text-[#0a2fad] transition-colors flex-1" style={{ fontWeight: 700 }}>
                    {alert.title}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-[#0a2fad] opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs" style={{ fontWeight: 700 }}>Read more</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Resources + Report — Redesigned */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
            {/* Quick Resources — spans 3 cols */}
            <div className="lg:col-span-3 bg-[#f8f7f5] rounded-2xl border border-[#e5ded4] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#0a2fad] rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">verified</span>
                </div>
                <div>
                  <h4 className="text-[#1a1816] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "1.1rem" }}>Quick Resources</h4>
                  <p className="text-[#5c544d] text-xs" style={{ fontWeight: 600 }}>Official government agencies you can contact</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { name: "CICC", desc: "Cybercrime Investigation and Coordinating Center", url: "https://cicc.gov.ph", hotline: "1326" },
                  { name: "NBI-CCD", desc: "National Bureau of Investigation — Cybercrime Division", url: "https://nbi.gov.ph", hotline: "(02) 8523-8231" },
                  { name: "BSP", desc: "Bangko Sentral ng Pilipinas — Consumer Complaints", url: "https://bsp.gov.ph", hotline: "(02) 8708-7087" },
                  { name: "PNP-ACG", desc: "Philippine National Police — Anti-Cybercrime Group", url: "https://acg.pnp.gov.ph", hotline: "(02) 8414-1560" },
                ].map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-xl border border-[#e5ded4] p-4 sm:p-5 hover:border-[#0a2fad]/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <LogoImage name={resource.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0a2fad] text-base" style={{ fontWeight: 800 }}>{resource.name}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#1a1816]/20 group-hover:text-[#0a2fad] text-lg shrink-0 transition-colors">open_in_new</span>
                    </div>
                    <p className="text-[#3d3530] text-xs sm:text-sm leading-snug" style={{ fontWeight: 500 }}>{resource.desc}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-[#5c544d]">
                      <span className="material-symbols-outlined text-sm">phone</span>
                      <span className="text-xs font-mono" style={{ fontWeight: 700 }}>{resource.hotline}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Report a Threat — spans 2 cols */}
            <div className="lg:col-span-2 bg-[#1a1816] text-white rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">shield</span>
                  </div>
                  <h4 className="uppercase text-xl sm:text-2xl" style={{ fontWeight: 900 }}>Report a<br/>Threat</h4>
                </div>

                <p className="text-[#c7c3bf] text-sm sm:text-base leading-relaxed flex-1" style={{ fontWeight: 500 }}>
                  If you or someone you know has encountered a suspicious online activity, a scam, or any form of cyber fraud — report it immediately. Your report can help protect others.
                </p>

                <div className="mt-6 space-y-3 bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400 text-lg">phone</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>CICC Hotline: 1326</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400 text-lg">email</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>report@cicc.gov.ph</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400 text-lg">language</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>cicc.gov.ph/report</span>
                  </div>
                </div>

                <a href="https://cicc.gov.ph" target="_blank" rel="noopener noreferrer" className="block mt-6">
                  <button className="w-full bg-red-600 text-white rounded-xl py-4 hover:bg-red-700 transition-colors cursor-pointer text-base sm:text-lg flex items-center justify-center gap-2" style={{ fontWeight: 700 }}>
                    <span className="material-symbols-outlined text-xl">report</span>
                    Log an Incident Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
