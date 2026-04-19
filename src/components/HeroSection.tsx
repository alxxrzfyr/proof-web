import { useState, useEffect } from 'react';
import { translations, threatStats, pieData, lineData, type Lang } from './data';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import bg1 from '@/assets/backgrounds/bg-1.jpg';
import bg2 from '@/assets/backgrounds/bg-2.jpg';
import bg3 from '@/assets/backgrounds/bg-3.jpg';
import bg4 from '@/assets/backgrounds/bg-4.png';

interface Props {
  lang: Lang;
  onNavigate: (section: string) => void;
}

const HERO_IMAGES = [bg1, bg2, bg3, bg4];

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
    {
      icon: 'visibility',
      text: lang === 'fil' ? 'KAMALAYAN' : lang === 'ceb' ? 'KAHIBALO' : 'AWARENESS',
    },
    { icon: 'verified_user', text: lang === 'fil' ? 'LIGTAS' : lang === 'ceb' ? 'LUWAS' : 'SAFE' },
    {
      icon: 'menu_book',
      text:
        lang === 'fil'
          ? 'DIGITAL NA KARUNUNGAN'
          : lang === 'ceb'
            ? 'DIGITAL NGA KAALAM'
            : 'DIGITAL LITERACY',
    },
    {
      icon: 'psychology',
      text: lang === 'fil' ? 'MULAT' : lang === 'ceb' ? 'MAKAAMGO' : 'COGNIZANT',
    },
    {
      icon: 'security',
      text: lang === 'fil' ? 'PROTEKTADO' : lang === 'ceb' ? 'GIPANALIPDAN' : 'PROTECTED',
    },
  ];

  const MarqueeGroup = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div
      className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
      aria-hidden={ariaHidden}
    >
      {marqueeItems.map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-yellow-400 drop-shadow-md md:text-4xl">
            {item.icon}
          </span>
          <span
            className="text-2xl tracking-widest text-white drop-shadow-md md:text-3xl"
            style={{ fontWeight: 900 }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative">
      {/* Hero with changing background images */}
      <div className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 blur-[3px] transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("${img}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBg === i ? 1 : 0,
            }}
          />
        ))}
        {/* Simple dark overlay to unify colors and make text pop */}
        <div className="absolute inset-0 bg-[#1a1816]/80" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pt-24 pb-14 sm:px-8 sm:pt-28 sm:pb-16 md:px-12 lg:px-16 xl:px-24">
          <div className="flex max-w-5xl flex-col gap-5 sm:gap-8">
            <h1
              className="text-4xl leading-[1.2] tracking-tight break-words uppercase sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem]"
              style={{ fontWeight: 900 }}
            >
              <span className="block text-white">{t('hero.title1')}</span>
              <span className="mt-2 block text-yellow-400 sm:mt-3 md:mt-4">{t('hero.title2')}</span>
            </h1>

            <p
              className="max-w-3xl text-lg leading-relaxed text-[#e5ded4] sm:text-xl md:text-2xl"
              style={{ fontWeight: 500 }}
            >
              {t('hero.subtitle')}
            </p>

            <div className="mt-2 flex w-full flex-col gap-3 sm:mt-4 sm:flex-row sm:gap-4">
              <button
                onClick={() => onNavigate('about-scam')}
                className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-yellow-400 px-8 text-base text-[#1a1816] shadow-md transition-colors hover:bg-yellow-500 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                style={{ fontWeight: 700 }}
              >
                <span>{t('hero.btn_learn')}</span>
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </button>
              <a
                href="https://cicc.gov.ph/report/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-yellow-400 px-8 text-base text-[#1a1816] shadow-md transition-colors hover:bg-yellow-500 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                  style={{ fontWeight: 700 }}
                >
                  <span>{t('hero.btn_report')}</span>
                  <span className="material-symbols-outlined text-xl">arrow_outward</span>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Slideshow indicator dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBg(i)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-all ${currentBg === i ? 'w-8 bg-yellow-400' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <section className="relative z-10 flex items-center overflow-hidden border-y-4 border-yellow-400 bg-gradient-to-r from-[#0a2fad] via-blue-800 to-[#0a2fad] py-4 shadow-2xl md:py-6">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap">
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </section>

      {/* What is P.R.O.O.F? */}
      <section className="bg-[#f8f7f5]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <h2
            className="tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {lang === 'fil'
              ? 'Ano ang "P.R.O.O.F"?'
              : lang === 'ceb'
                ? 'Unsa ang "P.R.O.O.F"?'
                : 'What is "P.R.O.O.F"?'}
          </h2>
          <div className="mt-4 mb-6 h-1.5 w-16 rounded-full bg-[#0a2fad]" />
          <p
            className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </section>

      {/* What are the online scams? */}
      <section className="border-t border-[#e5ded4] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <h2
            className="tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {lang === 'fil'
              ? 'Ano ang mga online na scam?'
              : lang === 'ceb'
                ? 'Unsa ang mga online scam?'
                : 'What are the online scams?'}
          </h2>
          <div className="mt-4 mb-10 h-1.5 w-16 rounded-full bg-[#4a3224]" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: 'mail',
                title: lang === 'fil' ? 'Mga Mensaheng Phishing' : 'Phishing Messages',
                desc:
                  lang === 'fil'
                    ? 'Mga mapanlinlang na email at mensahe.'
                    : 'Deceptive emails designed to steal your credentials and personal data.',
                onClick: () => onNavigate('about-scam'),
              },
              {
                icon: 'redeem',
                title: lang === 'fil' ? 'Mga Huwad na Premyo' : 'Fake Prize Traps',
                desc:
                  lang === 'fil'
                    ? 'Mga alok na masyadong maganda para maging totoo.'
                    : 'Too-good-to-be-true offers designed to steal your money or information.',
                onClick: () => onNavigate('about-scam'),
              },
              {
                icon: 'link_off',
                title: lang === 'fil' ? 'Mga Mapanlinlang na Link' : 'Fraudulent Links',
                desc:
                  lang === 'fil'
                    ? 'Mga nakakasamang URL at website.'
                    : 'Malicious URLs that masquerade as trusted and legitimate websites.',
                onClick: () => onNavigate('about-scam'),
              },
            ].map((card, i) => (
              <button
                key={i}
                onClick={card.onClick}
                className="group flex cursor-pointer flex-col items-center rounded-xl border border-[#e5ded4] bg-[#f8f7f5] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-8"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[#0a2fad] shadow-sm transition-colors group-hover:bg-[#0a2fad] group-hover:text-white sm:mb-5 sm:h-20 sm:w-20">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">
                    {card.icon}
                  </span>
                </div>
                <h3
                  className="mb-2 text-lg tracking-tight break-words text-[#1a1816] uppercase sm:mb-3 sm:text-xl"
                  style={{ fontWeight: 800 }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-[#3d3530] sm:text-base" style={{ fontWeight: 500 }}>
                  {card.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Are you part of the vulnerable sector? */}
      <section className="border-t border-[#e5ded4] bg-[#f8f7f5]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mb-10 text-center sm:mb-14">
            <span
              className="inline-block rounded-full bg-[#0a2fad] px-5 py-2 text-xs tracking-widest text-white uppercase"
              style={{ fontWeight: 700 }}
            >
              {lang === 'fil'
                ? 'DATOS AT DEMOGRAPIYA'
                : lang === 'ceb'
                  ? 'DATOS UG DEMOGRAPIYA'
                  : 'DATA & DEMOGRAPHICS'}
            </span>
            <h2
              className="mt-5 tracking-tight text-[#1a1816] uppercase"
              style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
            >
              {lang === 'fil'
                ? 'Ikaw ba ay bahagi ng vulnerable sector?'
                : lang === 'ceb'
                  ? 'Ikaw ba usa sa vulnerable sector?'
                  : 'Are you part of the vulnerable sector?'}
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#3d3530] sm:text-lg"
              style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus
              mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-10 grid grid-cols-2 gap-3 sm:mb-14 sm:gap-4 md:gap-6 lg:grid-cols-4">
            {threatStats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center rounded-xl border border-[#e5ded4] bg-white p-4 text-center shadow-sm sm:p-5"
              >
                <p
                  className="font-mono text-[10px] tracking-widest text-[#5c544d] uppercase sm:text-xs"
                  style={{ fontWeight: 700 }}
                >
                  {stat.label}
                </p>
                <p
                  className={`mt-2 text-2xl break-words sm:mt-3 sm:text-3xl lg:text-4xl ${stat.color === 'text-red-400' ? 'text-red-600' : 'text-[#0a2fad]'}`}
                  style={{ fontWeight: 900 }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-1 text-xs text-[#5c544d] sm:mt-2 sm:text-sm"
                  style={{ fontWeight: 600 }}
                >
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Row: Pie + Line */}
          <div className="mb-10 grid grid-cols-1 gap-5 sm:mb-14 sm:gap-6 lg:grid-cols-2">
            {/* Pie Chart ΓÇö Scam Types (Based on CICC 2024-2025 data) */}
            <div className="rounded-xl border border-[#e5ded4] bg-white p-5 sm:p-6 md:p-8">
              <h3
                className="mb-1 tracking-tight text-[#1a1816] uppercase"
                style={{ fontWeight: 800, fontSize: '1.1rem' }}
              >
                {lang === 'fil' ? 'Mga Uri ng Scam sa Pilipinas' : 'Scam Types in the Philippines'}
              </h3>
              <p className="mb-5 text-xs text-[#5c544d]" style={{ fontWeight: 500 }}>
                Source: CICC, PNP-ACG reports (2024ΓÇô2025)
              </p>
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
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #e5ded4',
                        fontWeight: 600,
                      }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                    <Legend wrapperStyle={{ fontWeight: 600, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart ΓÇö Reported Cases Trend (PNP-ACG & CICC) */}
            <div className="rounded-xl border border-[#e5ded4] bg-white p-5 sm:p-6 md:p-8">
              <h3
                className="mb-1 tracking-tight text-[#1a1816] uppercase"
                style={{ fontWeight: 800, fontSize: '1.1rem' }}
              >
                {lang === 'fil'
                  ? 'Trend ng mga Kaso sa Pilipinas'
                  : 'Reported Cybercrime Cases (PH)'}
              </h3>
              <p className="mb-5 text-xs text-[#5c544d]" style={{ fontWeight: 500 }}>
                Source: PNP-ACG, CICC annual reports (2019ΓÇô2025)
              </p>
              <div className="w-full" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 15, left: -5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5ded4" />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: '#3d3530', fontWeight: 700, fontSize: 13 }}
                    />
                    <YAxis
                      tick={{ fill: '#3d3530', fontWeight: 600, fontSize: 11 }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #e5ded4',
                        fontWeight: 600,
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} cases`, '']}
                    />
                    <Line
                      type="monotone"
                      dataKey="cases"
                      stroke="#dc2626"
                      strokeWidth={3}
                      dot={{ fill: '#dc2626', r: 5, strokeWidth: 0 }}
                      activeDot={{ r: 7 }}
                      name="Cybercrime Cases"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Why This Matters ΓÇö open layout, title left, text underneath */}
          <div className="w-full lg:max-w-none">
            <h3
              className="tracking-tight text-[#0a2fad] uppercase"
              style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              {lang === 'fil' ? 'Bakit Mahalaga Ito?' : 'Why This Matters?'}
            </h3>
            <div className="mt-4 mb-6 h-1.5 w-16 rounded-full bg-[#0a2fad]" />
            <p
              className="w-full text-base leading-relaxed text-[#2d2926] sm:text-lg"
              style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel
              augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet
              fermentum. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor
              fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet.
            </p>
            <p
              className="mt-4 w-full text-sm leading-relaxed text-[#5c544d] italic"
              style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh
              ultricies vehicula ut id elit. Cras justo odio, dapibus ut facilisis in, egestas eget
              quam.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
