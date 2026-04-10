import { useState } from "react";
import { translations, type Lang } from "./data";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export function AccessibilityWidget({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    largeText: false,
    readableFont: false,
    highContrast: false,
    grayscale: false,
    highlightLinks: false,
    stopAnimations: false,
    bigCursor: false,
    protanopia: false,
    deuteranopia: false,
    tritanopia: false,
  });

  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const toggle = (key: keyof typeof settings) => {
    const next = !settings[key];
    setSettings((s) => ({ ...s, [key]: next }));
    const classMap: Record<string, string> = {
      largeText: "a11y-large-text",
      readableFont: "a11y-readable-font",
      highContrast: "a11y-high-contrast",
      grayscale: "a11y-grayscale",
      highlightLinks: "a11y-highlight-links",
      stopAnimations: "a11y-reduce-motion",
      bigCursor: "a11y-big-cursor",
      protanopia: "a11y-protanopia",
      deuteranopia: "a11y-deuteranopia",
      tritanopia: "a11y-tritanopia",
    };
    if (["protanopia", "deuteranopia", "tritanopia"].includes(key) && next) {
      (["protanopia", "deuteranopia", "tritanopia"] as const).forEach((k) => {
        if (k !== key && settings[k]) {
          setSettings((s) => ({ ...s, [k]: false }));
          document.documentElement.classList.remove(classMap[k]);
        }
      });
    }
    document.documentElement.classList.toggle(classMap[key], next);
  };

  const resetAll = () => {
    Object.keys(settings).forEach((k) => {
      const key = k as keyof typeof settings;
      if (settings[key]) toggle(key);
    });
  };

  const toggleItems = [
    { key: "largeText" as const, label: t("a11y.large_text"), icon: "text_increase" },
    { key: "readableFont" as const, label: t("a11y.readable_font"), icon: "font_download" },
    { key: "highContrast" as const, label: t("a11y.high_contrast"), icon: "contrast" },
    { key: "grayscale" as const, label: t("a11y.grayscale"), icon: "filter_b_and_w" },
    { key: "highlightLinks" as const, label: t("a11y.highlight_links"), icon: "link" },
    { key: "stopAnimations" as const, label: t("a11y.stop_animations"), icon: "motion_photos_off" },
    { key: "bigCursor" as const, label: t("a11y.big_cursor"), icon: "mouse" },
  ];

  const colorBlindItems = [
    { key: "protanopia" as const, label: lang === "fil" ? "Protanopia (Pula-Berde)" : "Protanopia (Red-Green)", color: "bg-red-500" },
    { key: "deuteranopia" as const, label: lang === "fil" ? "Deuteranopia (Berde-Pula)" : "Deuteranopia (Green-Red)", color: "bg-green-500" },
    { key: "tritanopia" as const, label: lang === "fil" ? "Tritanopia (Asul-Dilaw)" : "Tritanopia (Blue-Yellow)", color: "bg-blue-500" },
  ];

  return (
    <>
      {/* SVG Filters for color blindness */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
          </filter>
        </defs>
      </svg>

      {/* Slide-in Container */}
      <div
        className="fixed top-1/2 -translate-y-1/2 right-0 z-[61] flex items-center transition-transform duration-300 ease-out"
        style={{ transform: open ? "translateX(0)" : "translateX(calc(100% - 28px))" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#1a1816] text-white flex items-center justify-center cursor-pointer hover:bg-[#0a2fad] transition-colors duration-200 rounded-l-2xl w-14 h-14 sm:w-16 sm:h-16 shadow-lg shrink-0 border-y-4 border-l-4 border-transparent"
          aria-label="Open accessibility settings"
        >
          <span className="material-symbols-outlined text-2xl sm:text-3xl">accessibility_new</span>
        </button>

        <div className="bg-white border-y-4 border-l-4 border-[#1a1816] w-[280px] sm:w-[340px] max-h-[85vh] overflow-y-auto rounded-l-[1.5rem] shadow-2xl shrink-0">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#1a1816]" style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "1.15rem", letterSpacing: "0.05em" }}>
                {t("a11y.title")}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-[#3d3530] hover:text-[#1a1816] cursor-pointer w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#f4f1ea] transition-colors"
                aria-label="Close accessibility panel"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Toggle Rows */}
            <div className="space-y-1">
              {toggleItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 sm:p-4 hover:bg-[#f4f1ea] rounded-lg cursor-pointer transition-colors active:bg-[#e5ded4] min-h-[52px] sm:min-h-[56px]"
                  onClick={() => toggle(item.key)}
                  role="switch"
                  aria-checked={settings[item.key]}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(item.key); } }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-xl sm:text-2xl text-[#3d3530]">{item.icon}</span>
                    <span className="text-[#1a1816] text-sm sm:text-base" style={{ fontWeight: 600 }}>{item.label}</span>
                  </div>
                  <div className={`w-11 sm:w-12 h-6 sm:h-7 rounded-full transition-colors ${settings[item.key] ? "bg-[#0a2fad]" : "bg-gray-300"} relative shrink-0`}>
                    <div className={`w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${settings[item.key] ? "translate-x-5 sm:translate-x-6" : "translate-x-1"}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Color Blind Mode */}
            <div className="border-t-2 border-[#e5ded4] mt-5 pt-5">
              <p className="text-sm uppercase tracking-widest text-[#5c544d] mb-3" style={{ fontWeight: 700 }}>
                {lang === "fil" ? "Mode para sa Color Blind" : "Color Blind Mode"}
              </p>
              <div className="space-y-1">
                {colorBlindItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 sm:p-4 hover:bg-[#f4f1ea] rounded-lg cursor-pointer transition-colors active:bg-[#e5ded4] min-h-[48px] sm:min-h-[52px]"
                    onClick={() => toggle(item.key)}
                    role="switch"
                    aria-checked={settings[item.key]}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(item.key); } }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full ${item.color} shrink-0`} />
                      <span className="text-[#1a1816] text-sm" style={{ fontWeight: 600 }}>{item.label}</span>
                    </div>
                    <div className={`w-11 sm:w-12 h-6 sm:h-7 rounded-full transition-colors ${settings[item.key] ? "bg-[#0a2fad]" : "bg-gray-300"} relative shrink-0`}>
                      <div className={`w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${settings[item.key] ? "translate-x-5 sm:translate-x-6" : "translate-x-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESET */}
            <button
              onClick={resetAll}
              className="w-full mt-5 p-3 sm:p-3.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-[#1a1816] text-base cursor-pointer transition-colors active:bg-gray-300 min-h-[48px] sm:min-h-[50px]"
              style={{ fontWeight: 700 }}
            >
              {t("a11y.reset")}
            </button>

            {/* LANGUAGE */}
            <div className="border-t-2 border-[#e5ded4] mt-6 pt-6">
              <p className="text-sm uppercase tracking-widest text-[#5c544d] mb-4" style={{ fontWeight: 700 }}>{t("a11y.language_title")}</p>
              <div className="flex gap-2">
                {([
                  { code: "en"  as Lang, label: "English (US)" },
                  { code: "fil" as Lang, label: "Filipino" },
                  { code: "ceb" as Lang, label: "Cebuano" },
                ]).map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 px-2 py-3 rounded-lg text-sm cursor-pointer transition-colors min-h-[48px] ${
                      lang === l.code
                        ? "bg-[#0a2fad] text-white shadow-md"
                        : "bg-[#f4f1ea] text-[#1a1816] hover:bg-[#e5ded4]"
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
