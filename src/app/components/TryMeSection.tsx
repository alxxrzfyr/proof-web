import { useState } from "react";
import { quizScenarios, translations, type Lang } from "./data";

interface Props {
  lang: Lang;
  onNavigate: (section: string) => void;
}

function getMediumIcon(medium: string) {
  switch (medium) {
    case "Email": return "mail";
    case "SMS": return "sms";
    case "Phone Call": return "call";
    case "Social Media": return "chat_bubble";
    case "Marketplace": return "storefront";
    case "Dating App": return "favorite";
    case "Pop-up": return "open_in_browser";
    default: return "mail";
  }
}

function getScoreData(score: number) {
  if (score >= 23) return { label: "Exceptional Awareness", emoji: "", color: "text-yellow-500", message: "Your assessment results indicate an exceptional understanding of digital threats. We encourage you to share your knowledge to promote community vigilance." };
  if (score >= 18) return { label: "Proficient Awareness", emoji: "", color: "text-green-500", message: "Your assessment results indicate a solid understanding of common scams. However, further review of the Scam Information Center will help address any remaining vulnerabilities." };
  if (score >= 12) return { label: "Developing Awareness", emoji: "", color: "text-blue-500", message: "Your assessment suggests a developing awareness of cyber threats. We highly recommend utilizing the resources in the Scam Information Center to further educate yourself." };
  return { label: "Requires Immediate Vigilance", emoji: "", color: "text-red-500", message: "Your assessment results highlight a critical need for improved digital awareness. It is strongly advised that you review all materials provided in the Scam Information Center to protect yourself from sophisticated threats." };
}

export function TryMeSection({ lang, onNavigate }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedScam, setSelectedScam] = useState<boolean | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const [showRedFlags, setShowRedFlags] = useState(false);
  const [showClues, setShowClues] = useState(false);
  const [markLinks, setMarkLinks] = useState(false);

  const scenario = quizScenarios[currentIndex];
  const isCorrect = selectedScam === scenario.isScam;

  const handleAnswer = (pickedScam: boolean) => {
    if (answered) return;
    setSelectedScam(pickedScam);
    setAnswered(true);
    const correct = pickedScam === scenario.isScam;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => setShowNext(true), 500);
  };

  const handleNext = () => {
    if (currentIndex >= 24) {
      setCompleted(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswered(false);
    setSelectedScam(null);
    setShowNext(false);
    setShowRedFlags(false);
    setShowClues(false);
    setMarkLinks(false);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedScam(null);
    setShowNext(false);
    setCompleted(false);
    setStreak(0);
    setShowRedFlags(false);
    setShowClues(false);
    setMarkLinks(false);
  };

  const renderBody = (body: string) => {
    let cleanBody = body;
    // Remove em-dashes and semicolons as requested
    cleanBody = cleanBody.replace(/[—;]/g, "");
    
    if (markLinks) {
      return cleanBody.replace(
        /(https?:\/\/[^\s"]+|[a-z0-9-]+\.[a-z]{2,}(?:\/[^\s"]*)?)/gi,
        '<span class="text-red-600 underline decoration-wavy">$1</span>'
      );
    }
    return cleanBody;
  };

  const stripText = (text: string) => {
    return text ? text.replace(/[—;]/g, "") : "";
  };

  return (
    <section className="bg-gradient-to-b from-[#eef2f5] to-[#dde4ea] min-h-screen">
      {/* Header area with subtle dark gradient */}
      <div className="bg-gradient-to-b from-[#2d4a54] to-[#3a5f6d] px-5 sm:px-8 md:px-16 lg:px-24 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-white uppercase tracking-tighter mb-3" style={{ fontWeight: 900, fontSize: "clamp(2rem, 6vw, 5.5rem)" }}>
            {t("quiz.page_title")}
          </h1>
          <p className="text-white max-w-3xl text-base sm:text-lg" style={{ fontWeight: 500, textIndent: "2em", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
      </div>

      {/* Quiz Content — lighter, more visible */}
      <div className="px-5 sm:px-8 md:px-16 lg:px-24 py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Progress Bar */}
          {!completed && (
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8 border border-[#e5ded4]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-[#1a1816] uppercase text-sm tracking-wider" style={{ fontWeight: 900 }}>{t("quiz.module_label")}</span>
                <div className="flex items-center gap-3">
                  <span className="bg-[#0a2fad]/10 text-[#0a2fad] px-3 py-1 rounded-full text-sm" style={{ fontWeight: 700 }}>{score} / {currentIndex + (answered ? 1 : 0)}</span>
                  <span className="text-[#5c544d] text-sm" style={{ fontWeight: 600 }}>Question {currentIndex + 1} of 25</span>
                </div>
              </div>
              <div className="w-full rounded-full bg-[#e5ded4] h-3.5">
                <div className="bg-[#0a2fad] h-3.5 rounded-full transition-all duration-500" style={{ width: `${((currentIndex + (answered ? 1 : 0)) / 25) * 100}%` }} />
              </div>
              <div className="flex items-center gap-3 mt-3 text-sm">
                <span className="text-[#5c544d]" style={{ fontWeight: 500 }}>Current Challenge:</span>
                <span className="text-[#0a2fad]" style={{ fontWeight: 700 }}>{scenario.category}</span>
                {streak > 1 && (
                  <span className="flex items-center gap-1 text-yellow-600" style={{ fontWeight: 700 }}>
                    <span className="material-symbols-outlined text-base">bolt</span>
                    {streak} streak
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Main Quiz Area */}
          {!completed ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Scenario Card */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e5ded4]">
                  {/* Title Bar */}
                  <div className="bg-[#1a1816] px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-white text-xl">{getMediumIcon(scenario.medium)}</span>
                    <span className="text-white flex-1" style={{ fontWeight: 600 }}>{scenario.category}</span>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    </div>
                  </div>

                  {/* Content - Dynamically styled based on medium */}
                  <div className="p-4 sm:p-6 md:p-8 bg-[#f8f7f5]">
                    {scenario.medium === "Email" ? (
                      <div className="bg-white border border-[#e5ded4] rounded-xl overflow-hidden shadow-sm">
                        {/* Minimal email client header */}
                        <div className="bg-[#f4f1ea] px-4 sm:px-5 py-3 sm:py-4 border-b border-[#e5ded4] flex flex-col gap-1 text-sm">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3 items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shrink-0">
                                {scenario.sender.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-[#1a1816] text-base">{stripText(scenario.sender)}</p>
                                <p className="text-xs sm:text-sm text-[#5c544d] opacity-80">&lt;{stripText(scenario.senderDetail)}&gt;</p>
                              </div>
                            </div>
                            <span className="text-xs text-[#5c544d] pt-1">10:42 AM</span>
                          </div>
                          {scenario.subject && <div className="mt-4 font-bold text-lg sm:text-xl text-[#1a1816]">{stripText(scenario.subject)}</div>}
                        </div>
                        <div className="p-5 sm:p-6 text-black whitespace-pre-line text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: renderBody(scenario.body) }} />
                        {scenario.cta && (
                          <div className="px-5 sm:px-6 pb-6">
                            <span className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-bold cursor-pointer shadow-sm hover:bg-blue-700">{stripText(scenario.cta)}</span>
                          </div>
                        )}
                        {scenario.footer && <div className="p-5 sm:p-6 border-t border-[#e5ded4] text-xs text-[#8a8480] whitespace-pre-line bg-[#fbfbfb]">{stripText(scenario.footer)}</div>}
                      </div>

                    ) : scenario.medium === "SMS" || scenario.medium === "Social Media" || scenario.medium === "Dating App" ? (
                      <div className="bg-[#eef2f5] border border-[#d1d9e0] rounded-[2rem] max-w-sm mx-auto overflow-hidden shadow-inner relative h-[500px] flex flex-col">
                        {/* Phone Header */}
                        <div className="bg-white/90 backdrop-blur-md px-4 py-3 border-b border-gray-200 flex items-center gap-3 text-sm z-10 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
                            {scenario.medium === "Dating App" ? (
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.sender}&backgroundColor=b6e3f4`} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-base">person</span>
                            )}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <p className="font-bold text-[#1a1816] text-sm truncate">{stripText(scenario.sender)}</p>
                            <p className="text-[10px] text-gray-500 truncate">{scenario.medium === "SMS" ? stripText(scenario.senderDetail) : "Active now"}</p>
                          </div>
                          <span className="material-symbols-outlined text-gray-400 text-lg">info</span>
                        </div>
                        {/* Phone Body */}
                        <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1 scrollbar-hide">
                          <div className="text-[11px] text-center text-gray-400 my-1">Today 9:41 AM</div>
                          
                          <div className="flex gap-2 items-end">
                            <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0 overflow-hidden mb-1">
                              {scenario.medium === "Dating App" ? (
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.sender}&backgroundColor=b6e3f4`} alt="avatar" className="w-full h-full object-cover" />
                              ) : (
                                <span className="material-symbols-outlined text-[14px] leading-tight text-gray-500 flex items-center justify-center h-full w-full">person</span>
                              )}
                            </div>
                            <div className="bg-white text-black p-3 shadow-sm text-[15px] whitespace-pre-line leading-snug rounded-2xl rounded-bl-sm max-w-[85%]" dangerouslySetInnerHTML={{ __html: renderBody(scenario.body) }} />
                          </div>

                          {scenario.cta && (
                            <div className="flex gap-2 items-end mt-1">
                              <div className="w-6 shrink-0" />
                              <div className="bg-white text-blue-600 p-3 shadow-sm text-[14px] underline cursor-pointer break-words rounded-2xl rounded-bl-sm max-w-[85%]">{stripText(scenario.cta)}</div>
                            </div>
                          )}
                        </div>
                        {/* Phone Input Area */}
                        <div className="bg-white p-3 border-t border-gray-200 flex gap-2 items-center shrink-0">
                          <div className="flex-1 bg-gray-100 rounded-full h-9 px-4 flex items-center">
                            <span className="text-gray-400 text-sm">Message...</span>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white text-[18px]">send</span>
                          </div>
                        </div>
                      </div>

                    ) : (
                      /* Default Fallback (Pop-ups, Phone Calls, Marketplace, etc.) */
                      <div className="bg-white border border-[#e5ded4] rounded-xl p-5 sm:p-6 md:p-8 shadow-sm">
                        <div className="mb-5 flex items-center gap-3 border-b border-[#e5ded4] pb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#5c544d]">
                            <span className="material-symbols-outlined text-2xl">{getMediumIcon(scenario.medium)}</span>
                          </div>
                          <div>
                            <p className="text-[#1a1816] text-lg" style={{ fontWeight: 700 }}>{stripText(scenario.sender)}</p>
                            <p className="text-[#5c544d] mt-0.5 text-sm">{stripText(scenario.senderDetail)}</p>
                          </div>
                        </div>
                        
                        {scenario.subject && (
                          <p className="text-[#1a1816] mb-4 text-xl" style={{ fontWeight: 700 }}>{stripText(scenario.subject)}</p>
                        )}
                        
                        <div
                          className="text-black whitespace-pre-line leading-relaxed bg-[#f8f7f5] rounded-xl p-4 sm:p-6 border border-[#e5ded4] text-sm sm:text-base"
                          dangerouslySetInnerHTML={{ __html: renderBody(scenario.body) }}
                        />
                        
                        {scenario.cta && (
                          <div className="mt-5">
                            <span className="inline-block bg-[#0a2fad] text-white px-6 py-2.5 rounded-lg text-sm sm:text-base cursor-pointer hover:bg-blue-800 transition-colors shadow-sm" style={{ fontWeight: 700 }}>{stripText(scenario.cta)}</span>
                          </div>
                        )}
                        
                        {scenario.footer && (
                          <p className="text-xs sm:text-sm text-[#8a8480] mt-4 whitespace-pre-line border-t border-[#e5ded4] pt-4">{stripText(scenario.footer)}</p>
                        )}
                      </div>
                    )}

                    {/* Red Flags */}
                    {showRedFlags && scenario.redFlags.length > 0 && (
                      <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-5 space-y-2">
                        {scenario.redFlags.map((flag, i) => (
                          <p key={i} className="text-red-700 text-sm flex items-start gap-2" style={{ fontWeight: 600 }}>
                            <span className="shrink-0">⚠</span> {flag}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Clue */}
                    {(showClues || (answered && !isCorrect)) && (
                      <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                        <p className="text-yellow-800 flex items-start gap-2" style={{ fontWeight: 600 }}>
                          <span className="material-symbols-outlined text-yellow-600 text-xl shrink-0">lightbulb</span>
                          {scenario.clue}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Voting Buttons */}
                {!answered && (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 sm:mt-6">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex-1 text-red-700 border-3 border-red-600 bg-white hover:bg-red-50 rounded-xl px-6 sm:px-8 py-4 sm:py-5 hover:shadow-lg transition-all cursor-pointer text-lg sm:text-xl min-h-[56px] sm:min-h-[64px]"
                      style={{ fontWeight: 900 }}
                    >
                      {t("quiz.btn_scam")}!
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex-1 text-[#0a2fad] border-3 border-[#0a2fad] bg-white hover:bg-blue-50 rounded-xl px-6 sm:px-8 py-4 sm:py-5 hover:shadow-lg transition-all cursor-pointer text-lg sm:text-xl min-h-[56px] sm:min-h-[64px]"
                      style={{ fontWeight: 900 }}
                    >
                      {t("quiz.btn_legit")}!
                    </button>
                  </div>
                )}

                {/* Feedback */}
                {answered && (
                  <div className={`mt-5 sm:mt-6 border-l-4 ${isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"} p-4 sm:p-6 rounded-r-xl animate-fadeIn`}>
                    <p className="text-base sm:text-lg text-[#1a1816] leading-relaxed" style={{ fontWeight: 600 }}>
                      {isCorrect ? "✅ Correct!" : "❌ Incorrect."} {scenario.explanation}
                    </p>
                  </div>
                )}

                {/* Next Button */}
                {showNext && (
                  <button
                    onClick={handleNext}
                    className="mt-4 sm:mt-5 bg-[#0a2fad] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl hover:bg-[#1a1816] transition-colors cursor-pointer animate-fadeIn text-base sm:text-lg min-h-[52px] sm:min-h-[60px]"
                    style={{ fontWeight: 700 }}
                  >
                    {currentIndex >= 24 ? "See Final Score →" : `${t("quiz.btn_next")} →`}
                  </button>
                )}
              </div>

              {/* Analysis Tools Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-[#e5ded4] rounded-xl shadow-md overflow-hidden lg:sticky lg:top-24">
                  <div className="p-4 sm:p-5 border-b border-[#e5ded4]">
                    <h4 className="uppercase tracking-wider text-[#1a1816]" style={{ fontWeight: 800 }}>Analysis Tools</h4>
                    <p className="text-sm text-[#5c544d] mt-1" style={{ fontWeight: 500 }}>Toggle these to help you decide</p>
                  </div>
                  <div className="p-4 space-y-1">
                    {[
                      { label: "Highlight Red Flags", icon: "flag", active: showRedFlags, toggle: () => setShowRedFlags(!showRedFlags) },
                      { label: "Show Clues", icon: "lightbulb", active: showClues, toggle: () => setShowClues(!showClues) },
                      { label: "Mark Suspicious Links", icon: "link", active: markLinks, toggle: () => setMarkLinks(!markLinks) },
                    ].map((tool) => (
                      <div key={tool.label} className="flex items-center justify-between p-4 hover:bg-[#f4f1ea] rounded-lg cursor-pointer min-h-[52px]" onClick={tool.toggle}>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#3d3530] text-xl">{tool.icon}</span>
                          <span className="text-[#1a1816] text-sm sm:text-base" style={{ fontWeight: 600 }}>{tool.label}</span>
                        </div>
                        <div className={`w-12 h-7 rounded-full transition-colors ${tool.active ? "bg-[#0a2fad]" : "bg-gray-300"} relative shrink-0`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${tool.active ? "translate-x-6" : "translate-x-1"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 sm:p-5 border-t border-[#e5ded4]">
                    <p className="text-[#2d2926]" style={{ fontWeight: 600 }}>
                      Score: <span className="text-[#0a2fad] text-xl" style={{ fontWeight: 800 }}>{score}</span> correct out of <span style={{ fontWeight: 700 }}>{currentIndex + (answered ? 1 : 0)}</span>
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 border-t border-[#e5ded4]">
                    <p className="text-xs uppercase tracking-wider text-[#0a2fad] mb-2" style={{ fontWeight: 700 }}>Did you know?</p>
                    <p className="text-sm text-[#3d3530] leading-relaxed">
                      90% of data breaches start with a phishing email. Scammers use "fear of loss" to disable your critical thinking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Completion Screen — Formal Assessment Results */
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-[#e5ded4] overflow-hidden">
                {/* Score Header */}
                <div className="bg-[#0a2fad] text-white p-10 md:p-12 text-center">
                  <h2 className="text-2xl md:text-3xl uppercase mb-2" style={{ fontWeight: 900 }}>{t("quiz.complete_title")}</h2>
                  <p className="text-white/70 text-lg" style={{ fontWeight: 500 }}>Summary of Results</p>
                  <div className="mt-6">
                    <p className="text-7xl md:text-8xl" style={{ fontWeight: 900 }}>{score} / 25</p>
                    <p className={`text-2xl md:text-3xl mt-4 ${getScoreData(score).color}`} style={{ fontWeight: 900 }}>
                      {getScoreData(score).emoji} {getScoreData(score).label}
                    </p>
                  </div>
                </div>

                {/* Feedback & Actions */}
                <div className="p-8 md:p-10">
                  <p className="text-[#1a1816]/80 text-lg leading-relaxed text-center" style={{ fontWeight: 500 }}>
                    {getScoreData(score).message}
                  </p>

                  {/* Score breakdown */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <p className="text-green-700 text-2xl" style={{ fontWeight: 900 }}>{score}</p>
                      <p className="text-green-600 text-xs uppercase mt-1" style={{ fontWeight: 600 }}>Correct</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <p className="text-red-700 text-2xl" style={{ fontWeight: 900 }}>{25 - score}</p>
                      <p className="text-red-600 text-xs uppercase mt-1" style={{ fontWeight: 600 }}>Incorrect</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                      <p className="text-[#0a2fad] text-2xl" style={{ fontWeight: 900 }}>{Math.round((score / 25) * 100)}%</p>
                      <p className="text-[#0a2fad] text-xs uppercase mt-1" style={{ fontWeight: 600 }}>Accuracy</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button onClick={restart} className="flex-1 bg-[#0a2fad] text-white px-6 py-4 rounded-xl hover:bg-[#1a1816] transition-colors cursor-pointer text-lg flex items-center justify-center gap-2" style={{ fontWeight: 700 }}>
                      <span className="material-symbols-outlined">replay</span>
                      {t("quiz.btn_restart")}
                    </button>
                    <button onClick={() => onNavigate("about-scam")} className="flex-1 border-2 border-[#0a2fad] text-[#0a2fad] px-6 py-4 rounded-xl hover:bg-[#0a2fad]/5 transition-colors cursor-pointer text-lg flex items-center justify-center gap-2" style={{ fontWeight: 700 }}>
                      <span className="material-symbols-outlined">menu_book</span>
                      Go to Scam Info
                    </button>
                  </div>

                  {/* Additional Advisory */}
                  <div className="mt-8 bg-[#f8f7f5] rounded-xl p-5 border border-[#e5ded4] text-center">
                    <p className="text-[#1a1816]/60 text-sm" style={{ fontWeight: 600 }}>
                      Note: Education is the most effective defense against digital fraud. Please disseminate this knowledge to protect vulnerable individuals within your immediate surroundings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}