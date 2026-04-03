import { teamMembers, translations, type Lang } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import teamBg from "../../assets/backgrounds/bg-5.jpg";

interface Props {
  lang: Lang;
}

const TEAM_PHOTO = "https://images.unsplash.com/photo-1764726354739-1222d1ea5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGdyb3VwJTIwcGhvdG8lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1MTY4OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const TEAM_BG = teamBg;

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-cyan-100 text-cyan-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-lime-100 text-lime-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export function AboutSection({ lang }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <section className="bg-white">
      {/* Header */}
      <div className="bg-[#f8f7f5] border-b border-[#e5ded4]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-16 md:py-20 text-center">
          <span className="inline-block bg-[#0a2fad] text-white uppercase tracking-wider rounded-full px-5 py-2 text-xs mb-5 sm:mb-6" style={{ fontWeight: 800 }}>
            {t("about.badge")}
          </span>
          <h1 className="text-[#1a1816] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.75rem)" }}>
            {t("about.title1")} <span className="text-[#0a2fad]">{t("about.title2")}</span>
          </h1>
          <p className="text-[#2d2926] text-base sm:text-lg max-w-4xl mx-auto mt-5 sm:mt-6 leading-[1.75]" style={{ fontWeight: 500, textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
        </div>
      </div>

      {/* Group Photo FIRST */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-14 sm:pt-16 md:pt-20">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#e5ded4] h-64 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[34rem] bg-[#f4f1ea] flex items-center justify-center">
          {/* Picture removed - empty for now */}
        </div>
      </div>

      {/* What is our research all about? */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-16 md:py-20 border-b border-[#e5ded4]">
        <h2 className="text-[#0a2fad] uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}>
          {lang === "fil" ? "Ano ang Aming Pananaliksik?" : lang === "ceb" ? "Unsa ang Among Panukiduki?" : "What is Our Research All About?"}
        </h2>
        <div className="w-16 h-1.5 bg-[#0a2fad] rounded-full mt-4 mb-6" />
        <p className="text-[#2d2926] text-base sm:text-lg leading-[1.75] w-full lg:max-w-none" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      {/* Team Section — with background picture */}
      <div
        className="relative mt-10 sm:mt-14"
        style={{
          backgroundImage: `linear-gradient(rgba(26,24,22,0.85), rgba(26,24,22,0.9)), url("${TEAM_BG}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-16 md:py-20">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-white uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}>
              {t("about.team_title1")} <span className="text-yellow-400">{t("about.team_title2")}</span>
            </h2>
            <div className="w-12 h-1.5 bg-yellow-400 rounded-full mx-auto mt-5" />
            <p className="text-[#d4d0cc] mt-4 max-w-lg mx-auto text-base sm:text-lg" style={{ fontWeight: 500, textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full bg-[#f4f1ea] border-2 border-white/20 overflow-hidden flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
                  {/* TO ADD A PICTURE: Uncomment the img tag below and paste your image source! */}
                  {/* <img src="PASTE_YOUR_IMAGE_HERE" alt={member.name} className="w-full h-full object-cover" /> */}
                </div>
                <p className="text-white mt-3 text-sm sm:text-base" style={{ fontWeight: 700 }}>{member.name}</p>
                <p className="text-[#a8a29e] text-xs sm:text-sm mt-0.5" style={{ fontWeight: 500 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner — Enhanced Floating Bar */}
      <div className="bg-[#1a1816] px-5 sm:px-8 py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-64 h-full bg-yellow-400/5 blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 relative z-10">
            <div className="text-center lg:text-left flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-3">
                <span className="material-symbols-outlined text-yellow-400 text-3xl hidden sm:block">campaign</span>
                <h3 className="text-white uppercase tracking-tight" style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                  {t("home.join_title")}
                </h3>
              </div>
              <p className="text-[#a8a29e] text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ fontWeight: 500 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
              <button className="px-8 py-4 bg-yellow-400 text-[#1a1816] rounded-full hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2 font-bold whitespace-nowrap">
                <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                {t("home.volunteer_btn")}
              </button>
              <button className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2 font-bold whitespace-nowrap">
                <span className="material-symbols-outlined text-lg">share</span>
                {lang === "fil" ? "Ibahagi" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}