import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ScamInfoSection } from './components/ScamInfoSection';
import { TryMeSection } from './components/TryMeSection';
import { Footer } from './components/Footer';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import type { Lang } from './components/data';

type Section = 'home' | 'about-scam' | 'about-us' | 'try-me';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [lang, setLang] = useState<Lang>('en');
  const [showTerms, setShowTerms] = useState(false);

  const navigate = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden bg-[#f4f1ea] text-[#1a1816]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Header lang={lang} onNavigate={navigate} />

      <main className="relative w-full flex-1">
        {activeSection === 'home' && (
          <div className="animate-fadeIn">
            <HeroSection lang={lang} onNavigate={navigate as any} />
          </div>
        )}
        {activeSection === 'about-us' && (
          <div className="animate-fadeIn">
            <AboutSection lang={lang} />
          </div>
        )}
        {activeSection === 'about-scam' && (
          <div className="animate-fadeIn">
            <ScamInfoSection lang={lang} />
          </div>
        )}
        {activeSection === 'try-me' && (
          <div className="animate-fadeIn">
            <TryMeSection lang={lang} onNavigate={navigate as any} />
          </div>
        )}
      </main>

      <Footer lang={lang} onNavigate={navigate} onOpenTerms={() => setShowTerms(true)} />
      <AccessibilityWidget lang={lang} setLang={setLang} />

      {showTerms && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowTerms(false)}
        >
          {/* Blur backdrop overlay ensures focus on the active modal content */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="animate-fadeIn relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between bg-[#1a1816] px-6 py-5 text-white sm:px-8">
              <h2
                className="tracking-tight uppercase"
                style={{ fontWeight: 900, fontSize: '1.25rem' }}
              >
                {lang === 'fil' ? 'Mga Tuntunin ng Paggamit' : 'Terms of Use'}
              </h2>
              <button
                onClick={() => setShowTerms(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="space-y-6">
                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    1. Acceptance of Terms
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    By accessing and using the P.R.O.O.F. Scam Awareness Campaign website, you
                    acknowledge that you have read, understood, and agree to be bound by these Terms
                    of Use. If you do not agree to these terms, please do not use this website.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    2. Purpose of the Website
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    This website is an educational platform designed to raise awareness about online
                    scams and cybercrime in the Philippines. All content — including scam examples,
                    quiz scenarios, and statistics — is provided for informational and educational
                    purposes only.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    3. No Legal or Professional Advice
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    The information presented on this website does not constitute legal, financial,
                    or professional cybersecurity advice. If you have been a victim of a scam,
                    please contact the proper government authorities such as the CICC (cicc.gov.ph),
                    PNP-ACG, or NBI Cybercrime Division.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    4. Accuracy of Information
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    While we strive to provide accurate and up-to-date information, P.R.O.O.F. makes
                    no warranties or representations regarding the completeness, accuracy, or
                    reliability of the content. Statistics and data presented are based on publicly
                    available reports from government agencies and cybersecurity organizations.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    5. Privacy
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    This website does not collect, store, or process any personal data. The quiz
                    assessment is conducted entirely on your device and no results are transmitted
                    or stored on any server.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    6. External Links
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    This website may contain links to external websites operated by government
                    agencies and third-party organizations. P.R.O.O.F. is not responsible for the
                    content, privacy practices, or availability of these external sites.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    7. Intellectual Property
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    All original content, design, and materials on this website are the intellectual
                    property of the P.R.O.O.F. campaign team. You may share content for educational
                    purposes with proper attribution.
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-2 tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 800, fontSize: '1rem' }}
                  >
                    8. Changes to Terms
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#2d2926] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    We reserve the right to modify these Terms of Use at any time. Continued use of
                    the website after changes constitutes acceptance of the revised terms.
                  </p>
                </div>

                <div className="rounded-xl border border-[#e5ded4] bg-[#f8f7f5] p-4 sm:p-5">
                  <p className="text-xs text-[#5c544d] sm:text-sm" style={{ fontWeight: 500 }}>
                    Last updated: April 2026. If you have questions about these terms, please
                    contact the P.R.O.O.F. campaign team.
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-[#e5ded4] px-6 py-4 sm:px-8">
              <button
                onClick={() => setShowTerms(false)}
                className="min-h-[48px] w-full cursor-pointer rounded-lg bg-[#0a2fad] py-3.5 text-base text-white transition-colors hover:bg-[#1a1816]"
                style={{ fontWeight: 700 }}
              >
                {lang === 'fil' ? 'Naintindihan Ko' : 'I Understand'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
