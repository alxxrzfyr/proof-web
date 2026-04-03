import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LiveAlertsBanner } from "./components/LiveAlertsBanner";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ScamInfoSection } from "./components/ScamInfoSection";
import { TryMeSection } from "./components/TryMeSection";
import { Footer } from "./components/Footer";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import type { Lang } from "./components/data";

type Section = "home" | "about-scam" | "about-us" | "try-me";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [lang, setLang] = useState<Lang>("en");
  const [showTerms, setShowTerms] = useState(false);

  const navigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f4f1ea] text-[#1a1816] flex flex-col min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar lang={lang} onNavigate={navigate} />

      <main className="flex-1 w-full relative">
        {activeSection === "home" && (
          <div className="animate-fadeIn">
            <HeroSection lang={lang} onNavigate={navigate as any} />
          </div>
        )}
        {activeSection === "about-us" && (
          <div className="animate-fadeIn">
            <AboutSection lang={lang} />
          </div>
        )}
        {activeSection === "about-scam" && (
          <div className="animate-fadeIn">
            <ScamInfoSection lang={lang} />
          </div>
        )}
        {activeSection === "try-me" && (
          <div className="animate-fadeIn">
            <TryMeSection lang={lang} onNavigate={navigate as any} />
          </div>
        )}
      </main>

      <Footer lang={lang} onNavigate={navigate} onOpenTerms={() => setShowTerms(true)} />
      <AccessibilityWidget lang={lang} setLang={setLang} />

      {/* Terms of Use Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6" onClick={() => setShowTerms(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1a1816] text-white px-6 sm:px-8 py-5 flex items-center justify-between shrink-0">
              <h2 className="uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "1.25rem" }}>
                {lang === "fil" ? "Mga Tuntunin ng Paggamit" : "Terms of Use"}
              </h2>
              <button
                onClick={() => setShowTerms(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-6 sm:py-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>1. Acceptance of Terms</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    By accessing and using the P.R.O.O.F. Scam Awareness Campaign website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>2. Purpose of the Website</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    This website is an educational platform designed to raise awareness about online scams and cybercrime in the Philippines. All content — including scam examples, quiz scenarios, and statistics — is provided for informational and educational purposes only.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>3. No Legal or Professional Advice</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    The information presented on this website does not constitute legal, financial, or professional cybersecurity advice. If you have been a victim of a scam, please contact the proper government authorities such as the CICC (cicc.gov.ph), PNP-ACG, or NBI Cybercrime Division.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>4. Accuracy of Information</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    While we strive to provide accurate and up-to-date information, P.R.O.O.F. makes no warranties or representations regarding the completeness, accuracy, or reliability of the content. Statistics and data presented are based on publicly available reports from government agencies and cybersecurity organizations.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>5. Privacy</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    This website does not collect, store, or process any personal data. The quiz assessment is conducted entirely on your device and no results are transmitted or stored on any server.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>6. External Links</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    This website may contain links to external websites operated by government agencies and third-party organizations. P.R.O.O.F. is not responsible for the content, privacy practices, or availability of these external sites.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>7. Intellectual Property</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    All original content, design, and materials on this website are the intellectual property of the P.R.O.O.F. campaign team. You may share content for educational purposes with proper attribution.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#1a1816] uppercase tracking-tight mb-2" style={{ fontWeight: 800, fontSize: "1rem" }}>8. Changes to Terms</h3>
                  <p className="text-[#2d2926] text-sm sm:text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    We reserve the right to modify these Terms of Use at any time. Continued use of the website after changes constitutes acceptance of the revised terms.
                  </p>
                </div>

                <div className="bg-[#f8f7f5] border border-[#e5ded4] rounded-xl p-4 sm:p-5">
                  <p className="text-[#5c544d] text-xs sm:text-sm" style={{ fontWeight: 500 }}>
                    Last updated: April 2, 2026. If you have questions about these terms, please contact the P.R.O.O.F. campaign team.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#e5ded4] px-6 sm:px-8 py-4 shrink-0">
              <button
                onClick={() => setShowTerms(false)}
                className="w-full bg-[#0a2fad] text-white py-3.5 rounded-lg hover:bg-[#1a1816] transition-colors cursor-pointer text-base min-h-[48px]"
                style={{ fontWeight: 700 }}
              >
                {lang === "fil" ? "Naintindihan Ko" : "I Understand"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
