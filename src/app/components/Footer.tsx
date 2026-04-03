import { translations, type Lang } from "./data";
import { QRCodeSVG } from "qrcode.react";

type Section = "home" | "about-scam" | "about-us" | "try-me";

interface Props {
  lang: Lang;
  onNavigate: (section: Section) => void;
  onOpenTerms: () => void;
}

export function Footer({ lang, onNavigate, onOpenTerms }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <footer className="bg-[#1a1816] py-10 sm:py-12 px-5 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="inline-block">
              <h2 className="font-sleek text-[#0a2fad] text-xl leading-tight uppercase border-2 border-[#0a2fad] rounded-sm bg-[#f4f1ea] px-2.5 py-0.5 shadow-[3px_3px_0_0_#0725b0]" style={{ fontWeight: 700 }}>
                P.R.O.O.F
              </h2>
            </div>
            <p className="text-[#c7c3bf] mt-4 text-xs leading-relaxed max-w-xs" style={{ fontWeight: 500, textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-yellow-400 text-sm uppercase tracking-wider mb-3" style={{ fontWeight: 900 }}>{t("footer.quick_links")}</h4>
            <div className="flex flex-col space-y-0 items-start">
              {([
                { label: lang === "fil" ? "Home ng Platform" : "Home Page", section: "home" as Section },
                { label: lang === "fil" ? "Tungkol Sa Amin" : "About Us", section: "about-us" as Section },
                { label: lang === "fil" ? "Sentro ng Scam" : "Scam Information", section: "about-scam" as Section },
                { label: lang === "fil" ? "Pagtatasa" : "Assessment", section: "try-me" as Section },
              ]).map((link) => (
                <button
                  key={link.section}
                  onClick={() => onNavigate(link.section)}
                  className="text-white hover:text-yellow-400 hover:translate-x-1 transition-all text-xs cursor-pointer py-1 text-left"
                  style={{ fontWeight: 600 }}
                >
                  {link.label}
                </button>
              ))}
              {/* Terms of Use */}
              <button
                onClick={onOpenTerms}
                className="text-white hover:text-yellow-400 hover:translate-x-1 transition-all text-xs cursor-pointer py-1 text-left"
                style={{ fontWeight: 600 }}
              >
                {lang === "fil" ? "Mga Tuntunin ng Paggamit" : "Terms of Use"}
              </button>
            </div>
          </div>

          {/* References / QR */}
          <div>
            <h4 className="text-yellow-400 text-sm uppercase tracking-wider mb-3" style={{ fontWeight: 900 }}>References</h4>
            <div className="w-24 h-24 bg-white rounded-lg p-1.5 flex items-center justify-center">
              <QRCodeSVG
                value="https://proof-app.ph"
                size={84}
                bgColor="#ffffff"
                fgColor="#1a1816"
                level="M"
              />
            </div>
            <p className="text-[#8a8480] text-[10px] mt-2" style={{ fontWeight: 500 }}>Scan for references</p>
          </div>
        </div>

        <div className="border-t border-[#3d3530] mt-10 pt-6 text-center text-[#c7c3bf] text-[10px] sm:text-xs uppercase tracking-widest">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}