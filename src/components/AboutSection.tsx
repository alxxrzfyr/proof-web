import { teamMembers, translations, type Lang } from './data';
import teamBg from '../assets/backgrounds/bg-5.jpg';

interface Props {
  lang: Lang;
}

const TEAM_BG = teamBg;

export function AboutSection({ lang }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <section className="bg-white">
      {/* Header */}
      <div className="border-b border-[#e5ded4] bg-[#f8f7f5]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 text-center sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <span
            className="mb-5 inline-block rounded-full bg-[#0a2fad] px-5 py-2 text-xs tracking-wider text-white uppercase sm:mb-6"
            style={{ fontWeight: 800 }}
          >
            {t('about.badge')}
          </span>
          <h1
            className="tracking-tight text-[#1a1816] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          >
            {t('about.title1')} <span className="text-[#0a2fad]">{t('about.title2')}</span>
          </h1>
          <p
            className="mx-auto mt-5 max-w-4xl text-base leading-[1.75] text-[#2d2926] sm:mt-6 sm:text-lg"
            style={{ fontWeight: 500, textAlign: 'justify' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
            porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
        </div>
      </div>

      {/* Group Photo FIRST */}
      <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-8 sm:pt-16 md:px-12 md:pt-20 lg:px-16">
        <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#e5ded4] bg-[#f4f1ea] shadow-lg sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
          <span className="text-sm font-semibold tracking-widest text-[#a8a29e] uppercase">
            Team Photo Placeholder
          </span>

          {/* TO ADD A PICTURE: Uncomment the img tag below and replace the src with your image URL! */}
          {/* 
          <img 
            src="PASTE_YOUR_IMAGE_URL_HERE" 
            alt="Our Team" 
            className="absolute inset-0 h-full w-full object-cover object-center"
          /> 
          */}
        </div>
      </div>

      {/* What is our research all about? */}
      <div className="mx-auto max-w-[1400px] border-b border-[#e5ded4] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
        <h2
          className="tracking-tight text-[#0a2fad] uppercase"
          style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
        >
          {lang === 'fil'
            ? 'Ano ang Aming Pananaliksik?'
            : lang === 'ceb'
              ? 'Unsa ang Among Panukiduki?'
              : 'What is Our Research All About?'}
        </h2>
        <div className="mt-4 mb-6 h-1.5 w-16 rounded-full bg-[#0a2fad]" />
        <p
          className="w-full text-base leading-[1.75] text-[#2d2926] sm:text-lg lg:max-w-none"
          style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      {/* TEAM SECTION — with background picture */}
      <div
        className="relative mt-10 sm:mt-14"
        style={{
          backgroundImage: `linear-gradient(rgba(26,24,22,0.85), rgba(26,24,22,0.9)), url("${TEAM_BG}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mb-10 text-center sm:mb-14">
            <h2
              className="tracking-tight text-white uppercase"
              style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
            >
              {t('about.team_title1')}{' '}
              <span className="text-yellow-400">{t('about.team_title2')}</span>
            </h2>
            <div className="mx-auto mt-5 h-1.5 w-12 rounded-full bg-yellow-400" />
            <p
              className="mx-auto mt-4 max-w-lg text-base text-[#d4d0cc] sm:text-lg"
              style={{ fontWeight: 500, textAlign: 'justify' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
            </p>
          </div>

          {/* TEAM MEMBERS GRID */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:gap-x-12 md:gap-y-12">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="group flex w-[120px] flex-col items-center text-center sm:w-[140px] md:w-[160px] lg:w-[150px]"
              >
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-[#f4f1ea] shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-24 lg:w-24 xl:h-28 xl:w-28">
                  {/* TO ADD A PICTURE: Uncomment the img tag below and paste your image source! */}
                  {/* <img src="PASTE_YOUR_IMAGE_HERE" alt={member.name} className="w-full h-full object-cover" /> */}
                </div>
                <p
                  className="mt-4 text-sm leading-tight whitespace-normal text-white sm:text-base"
                  style={{ fontWeight: 700 }}
                >
                  {member.name}
                </p>
                <p
                  className="mt-1 text-xs leading-tight whitespace-normal text-[#a8a29e] sm:text-sm"
                  style={{ fontWeight: 500 }}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner — Enhanced Floating Bar */}
      <div className="bg-[#1a1816] px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-8 sm:p-10 lg:p-14">
          {/* Subtle glow effect */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-64 bg-yellow-400/5 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 sm:gap-10 lg:flex-row">
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <span className="material-symbols-outlined hidden text-3xl text-yellow-400 sm:block">
                  campaign
                </span>
                <h3
                  className="tracking-tight text-white uppercase"
                  style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
                >
                  {t('home.join_title')}
                </h3>
              </div>
              <p
                className="mx-auto max-w-xl text-sm leading-relaxed text-[#a8a29e] sm:text-base lg:mx-0"
                style={{ fontWeight: 500 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis
                interdum. Vivamus sagittis lacus vel augue laoreet.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-4 sm:w-auto sm:flex-row">
              <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold whitespace-nowrap text-[#1a1816] transition-all hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] sm:text-base">
                <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                {t('home.volunteer_btn')}
              </button>
              <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-sm font-bold whitespace-nowrap text-white transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 sm:text-base">
                <span className="material-symbols-outlined text-lg">share</span>
                {lang === 'fil' ? 'Ibahagi' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
