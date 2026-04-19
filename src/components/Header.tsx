import { useState } from 'react';
import { translations, type Lang } from './data';

type Section = 'home' | 'about-scam' | 'about-us' | 'try-me';

interface Props {
  lang: Lang;
  onNavigate: (section: Section) => void;
}

/**
 * Main application header component with global navigation.
 * Handles responsive routing, navigation paths, and promotional actions.
 *
 * @param lang - The current active language locale.
 * @param onNavigate - Callback triggered when a navigation link is selected.
 */
export function Header({ lang, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const nav = (section: Section) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#e5ded4] bg-[#f4f1ea]/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6 sm:py-4 md:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto flex min-h-[56px] max-w-7xl items-center justify-between">
        <div className="relative z-20 flex flex-1 items-center justify-start">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="-ml-2 flex cursor-pointer items-center justify-start rounded-sm p-2 text-[#0a2fad] transition-colors hover:bg-black/5 lg:hidden"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
            <button
              onClick={() => nav('home')}
              className="nav-link font-sleek cursor-pointer rounded-md px-4 py-2 text-[15px] text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
              style={{ fontWeight: 700 }}
            >
              {t('nav.home')}
            </button>

            {/* Scam Info Dropdown */}
            <div className="group relative flex items-center">
              <button
                onClick={() => nav('about-scam')}
                className="nav-link font-sleek flex cursor-pointer items-center gap-1 rounded-md px-4 py-2 text-[15px] text-[#1a1816] transition-all group-hover:bg-black/5 group-hover:text-[#0a2fad]"
                style={{ fontWeight: 700 }}
              >
                <span>{t('nav.scam_info')}</span>
                <span className="material-symbols-outlined text-[18px] opacity-70 transition-transform group-hover:rotate-180">
                  keyboard_arrow_down
                </span>
              </button>
              <div className="invisible absolute top-[100%] left-0 z-50 min-w-[280px] translate-y-3 pt-2 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col overflow-hidden rounded-md border border-[#e5ded4]/50 bg-white/95 p-2 shadow-[0_10px_40px_rgb(0,0,0,0.08)] backdrop-blur-md">
                  <button
                    onClick={() => nav('about-scam')}
                    className="group/link flex cursor-pointer items-center gap-4 rounded-md px-4 py-3 text-left text-[#1a1816] transition-colors hover:bg-black/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0a2fad]/10 text-[#0a2fad] transition-colors group-hover/link:bg-[#0a2fad] group-hover/link:text-white">
                      <span className="material-symbols-outlined">menu_book</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sleek text-[16px]" style={{ fontWeight: 700 }}>
                        {t('nav.learn_scam')}
                      </span>
                      <span
                        className="mt-0.5 text-[13px] text-[#1a1816]/60"
                        style={{ fontWeight: 500 }}
                      >
                        {t('nav.learn_scam_desc')}
                      </span>
                    </div>
                  </button>
                  <div className="mx-3 my-1 h-px bg-[#1a1816]/10" />
                  <button
                    onClick={() => nav('about-scam')}
                    className="group/link flex cursor-pointer items-center gap-4 rounded-md px-4 py-3 text-left text-[#1a1816] transition-colors hover:bg-black/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4a3224]/10 text-[#4a3224] transition-colors group-hover/link:bg-[#4a3224] group-hover/link:text-white">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sleek text-[16px]" style={{ fontWeight: 700 }}>
                        {t('nav.how_detect')}
                      </span>
                      <span
                        className="mt-0.5 text-[13px] text-[#1a1816]/60"
                        style={{ fontWeight: 500 }}
                      >
                        {t('nav.how_detect_desc')}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => nav('about-us')}
              className="nav-link font-sleek cursor-pointer rounded-md px-4 py-2 text-[15px] text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
              style={{ fontWeight: 700 }}
            >
              {t('nav.about_us')}
            </button>
          </nav>
        </div>

        <div className="relative z-20 flex flex-shrink-0 items-center justify-center px-2 sm:px-4">
          <button onClick={() => nav('home')} className="group flex cursor-pointer items-center">
            <h2
              className="font-sleek rounded-sm border-2 border-[#0a2fad] bg-[#f4f1ea] px-3 py-1 text-xl leading-tight text-[#0a2fad] uppercase shadow-[2px_2px_0_0_#0725b0] transition-all duration-300 group-hover:border-[#4a3224] group-hover:text-[#4a3224] group-hover:shadow-[4px_4px_0_0_#6b4a3a] hover:-translate-y-1 sm:text-2xl sm:shadow-[4px_4px_0_0_#0725b0]"
              style={{ fontWeight: 700 }}
            >
              P.R.O.O.F
            </h2>
          </button>
        </div>

        <div className="relative z-20 flex flex-1 items-center justify-end">
          <button
            onClick={() => nav('try-me')}
            className="group font-sleek inline-flex cursor-pointer items-center gap-1 rounded-full border-2 border-[#1a1816] bg-yellow-400 px-3 py-1.5 text-[12px] text-[#1a1816] shadow-[2px_2px_0_0_#1a1816] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#1a1816] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[15px] sm:shadow-[4px_4px_0_0_#1a1816] sm:hover:shadow-[6px_6px_0_0_#1a1816] xl:px-6"
            style={{ fontWeight: 700 }}
          >
            <span>{t('nav.try_me')}</span>
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1 sm:text-lg">
              smart_toy
            </span>
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 z-10 w-full flex-col overflow-hidden border-b-2 border-[#e5ded4] bg-[#f4f1ea] shadow-xl transition-all duration-300 ease-out lg:hidden ${
          mobileOpen
            ? 'pointer-events-auto max-h-[500px] translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
        }`}
      >
        <div className="flex w-full flex-col p-6">
          <button
            onClick={() => nav('home')}
            className="font-sleek cursor-pointer rounded-md px-4 py-4 text-left text-2xl text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
            style={{ fontWeight: 700 }}
          >
            {t('nav.home')}
          </button>
          <div className="mx-4 my-1 h-[2px] bg-black/10" />
          <button
            onClick={() => nav('about-scam')}
            className="font-sleek cursor-pointer rounded-md px-4 py-4 text-left text-2xl text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
            style={{ fontWeight: 700 }}
          >
            {t('nav.scam_info')}
          </button>
          <div className="mx-4 my-1 h-[2px] bg-[#1a1816]/10" />
          <button
            onClick={() => nav('about-us')}
            className="font-sleek cursor-pointer rounded-md px-4 py-4 text-left text-2xl text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
            style={{ fontWeight: 700 }}
          >
            {t('nav.about_us')}
          </button>
        </div>
      </div>
    </header>
  );
}
