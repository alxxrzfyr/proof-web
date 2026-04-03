import { useState } from "react";
import { translations, type Lang } from "./data";

type Section = "home" | "about-scam" | "about-us" | "try-me";

interface Props {
  lang: Lang;
  onNavigate: (section: Section) => void;
}

export function Navbar({ lang, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const nav = (section: Section) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#e5ded4] bg-[#f4f1ea]/95 backdrop-blur-sm px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-3 sm:py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between min-h-[56px]">
        {/* Left: Nav */}
        <div className="flex flex-1 justify-start items-center relative z-20">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-start p-2 text-[#0a2fad] -ml-2 hover:bg-black/5 rounded-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-3xl">{mobileOpen ? "close" : "menu"}</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button onClick={() => nav("home")} className="nav-link text-[#1a1816] font-sleek text-[15px] hover:text-[#0a2fad] hover:bg-black/5 px-4 py-2 rounded-md transition-all cursor-pointer" style={{ fontWeight: 700 }}>
              {t("nav.home")}
            </button>

            {/* Scam Info Dropdown */}
            <div className="relative group flex items-center">
              <button onClick={() => nav("about-scam")} className="nav-link text-[#1a1816] font-sleek text-[15px] group-hover:text-[#0a2fad] group-hover:bg-black/5 px-4 py-2 rounded-md transition-all cursor-pointer flex items-center gap-1" style={{ fontWeight: 700 }}>
                <span>{t("nav.scam_info")}</span>
                <span className="material-symbols-outlined text-[18px] opacity-70 transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
              </button>
              <div className="absolute top-[100%] left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 min-w-[280px]">
                <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-md shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-[#e5ded4]/50 overflow-hidden p-2">
                  <button onClick={() => nav("about-scam")} className="flex items-center gap-4 text-[#1a1816] py-3 px-4 hover:bg-black/5 rounded-md transition-colors group/link cursor-pointer text-left">
                    <div className="w-10 h-10 rounded-md bg-[#0a2fad]/10 text-[#0a2fad] flex items-center justify-center group-hover/link:bg-[#0a2fad] group-hover/link:text-white transition-colors shrink-0">
                      <span className="material-symbols-outlined">menu_book</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sleek text-[16px]" style={{ fontWeight: 700 }}>{t("nav.learn_scam")}</span>
                      <span className="text-[13px] text-[#1a1816]/60 mt-0.5" style={{ fontWeight: 500 }}>{t("nav.learn_scam_desc")}</span>
                    </div>
                  </button>
                  <div className="h-px bg-[#1a1816]/10 my-1 mx-3" />
                  <button onClick={() => nav("about-scam")} className="flex items-center gap-4 text-[#1a1816] py-3 px-4 hover:bg-black/5 rounded-md transition-colors group/link cursor-pointer text-left">
                    <div className="w-10 h-10 rounded-full bg-[#4a3224]/10 text-[#4a3224] flex items-center justify-center group-hover/link:bg-[#4a3224] group-hover/link:text-white transition-colors shrink-0">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sleek text-[16px]" style={{ fontWeight: 700 }}>{t("nav.how_detect")}</span>
                      <span className="text-[13px] text-[#1a1816]/60 mt-0.5" style={{ fontWeight: 500 }}>{t("nav.how_detect_desc")}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => nav("about-us")} className="nav-link text-[#1a1816] font-sleek text-[15px] hover:text-[#0a2fad] hover:bg-black/5 px-4 py-2 rounded-md transition-all cursor-pointer" style={{ fontWeight: 700 }}>
              {t("nav.about_us")}
            </button>
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0 flex justify-center items-center relative z-20 px-2 sm:px-4">
          <button onClick={() => nav("home")} className="flex items-center group cursor-pointer">
            <h2 className="font-sleek text-[#0a2fad] text-xl sm:text-2xl leading-tight uppercase border-2 border-[#0a2fad] rounded-sm bg-[#f4f1ea] px-3 py-1 group-hover:text-[#4a3224] group-hover:border-[#4a3224] hover:-translate-y-1 transition-all duration-300 shadow-[2px_2px_0_0_#0725b0] sm:shadow-[4px_4px_0_0_#0725b0] group-hover:shadow-[4px_4px_0_0_#6b4a3a]" style={{ fontWeight: 700 }}>
              P.R.O.O.F
            </h2>
          </button>
        </div>

        {/* Right: TRY ME */}
        <div className="flex flex-1 justify-end items-center relative z-20">
          <button
            onClick={() => nav("try-me")}
            className="inline-flex group items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-5 xl:px-6 sm:py-2.5 bg-yellow-400 border-2 border-[#1a1816] text-[#1a1816] font-sleek text-[12px] sm:text-[15px] hover:-translate-y-1 transition-transform shadow-[2px_2px_0_0_#1a1816] sm:shadow-[4px_4px_0_0_#1a1816] hover:shadow-[4px_4px_0_0_#1a1816] sm:hover:shadow-[6px_6px_0_0_#1a1816] rounded-full cursor-pointer"
            style={{ fontWeight: 700 }}
          >
            <span>{t("nav.try_me")}</span>
            <span className="material-symbols-outlined text-base sm:text-lg transition-transform group-hover:translate-x-1">smart_toy</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-[#f4f1ea] border-b-2 border-[#e5ded4] shadow-xl flex-col lg:hidden z-10 overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-[500px] opacity-100 pointer-events-auto translate-y-0" : "max-h-0 opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="flex flex-col p-6 w-full">
          <button onClick={() => nav("home")} className="text-[#1a1816] font-sleek text-2xl hover:text-[#0a2fad] hover:bg-black/5 px-4 py-4 rounded-md transition-all cursor-pointer text-left" style={{ fontWeight: 700 }}>{t("nav.home")}</button>
          <div className="h-[2px] bg-black/10 my-1 mx-4" />
          <button onClick={() => nav("about-scam")} className="text-[#1a1816] font-sleek text-2xl hover:text-[#0a2fad] hover:bg-black/5 px-4 py-4 rounded-md transition-all cursor-pointer text-left" style={{ fontWeight: 700 }}>{t("nav.scam_info")}</button>
          <div className="h-[2px] bg-[#1a1816]/10 my-1 mx-4" />
          <button onClick={() => nav("about-us")} className="text-[#1a1816] font-sleek text-2xl hover:text-[#0a2fad] hover:bg-black/5 px-4 py-4 rounded-md transition-all cursor-pointer text-left" style={{ fontWeight: 700 }}>{t("nav.about_us")}</button>
        </div>
      </div>
    </header>
  );
}