import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { quizScenarios, translations, type Lang } from './data';

interface Props {
  lang: Lang;
  onNavigate: (section: string) => void;
}

function getMediumIcon(medium: string) {
  switch (medium) {
    case 'Email':
      return 'mail';
    case 'SMS':
      return 'sms';
    case 'Phone Call':
      return 'call';
    case 'Social Media':
      return 'chat_bubble';
    case 'Marketplace':
      return 'storefront';
    case 'Dating App':
      return 'favorite';
    case 'Pop-up':
      return 'open_in_browser';
    default:
      return 'mail';
  }
}

function getScoreData(score: number) {
  if (score >= 23)
    return {
      label: 'Exceptional Awareness',
      icon: 'emoji_events',
      color: 'text-yellow-500',
      message:
        'Your assessment results indicate an exceptional understanding of digital threats. We encourage you to share your knowledge to promote community vigilance.',
    };
  if (score >= 18)
    return {
      label: 'Proficient Awareness',
      icon: 'thumb_up',
      color: 'text-green-500',
      message:
        'Your assessment results indicate a solid understanding of common scams. However, further review of the Scam Information Center will help address any remaining vulnerabilities.',
    };
  if (score >= 12)
    return {
      label: 'Developing Awareness',
      icon: 'insights',
      color: 'text-blue-500',
      message:
        'Your assessment suggests a developing awareness of cyber threats. We highly recommend utilizing the resources in the Scam Information Center to further educate yourself.',
    };
  return {
    label: 'Requires Immediate Vigilance',
    icon: 'report_problem',
    color: 'text-red-500',
    message:
      'Your assessment results highlight a critical need for improved digital awareness. It is strongly advised that you review all materials provided in the Scam Information Center to protect yourself from sophisticated threats.',
  };
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

  const [showClues, setShowClues] = useState(false);
  const [mobileTab, setMobileTab] = useState<'scenario' | 'action'>('scenario');

  const scenario = quizScenarios[currentIndex];
  const isCorrect = selectedScam === scenario.isScam;
  const scoreData = getScoreData(score);

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
    setTimeout(() => {
      setShowNext(true);
      setMobileTab('action');
    }, 500);
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
    setShowClues(false);
    setMobileTab('scenario');
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedScam(null);
    setShowNext(false);
    setCompleted(false);
    setStreak(0);
    setShowClues(false);
    setMobileTab('scenario');
  };

  const renderBody = (body: string) => {
    let cleanBody = body;
    // Remove em-dashes and semicolons as requested
    cleanBody = cleanBody.replace(/[—;]/g, '');

    return cleanBody;
  };

  const stripText = (text: string) => {
    return text ? text.replace(/[—;]/g, '') : '';
  };

  return (
    <section className="fixed inset-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-[#eef2f5]">
      {/* Assessment Complete Dialog */}
      <Dialog open={completed} onOpenChange={setCompleted}>
        <DialogContent className="overflow-hidden border-none bg-transparent p-0 shadow-xl sm:max-w-[700px]">
          <div className="overflow-hidden rounded-2xl border border-[#e5ded4] bg-white">
            {/* Score Header */}
            <div className="bg-[#0a2fad] p-8 text-center text-white sm:p-10">
              <h2 className="mb-2 text-2xl uppercase sm:text-3xl" style={{ fontWeight: 900 }}>
                {t('quiz.complete_title')}
              </h2>
              <p className="text-base text-white/70 sm:text-lg" style={{ fontWeight: 500 }}>
                Summary of Results
              </p>
              <div className="mt-6">
                <p className="text-6xl sm:text-7xl lg:text-8xl" style={{ fontWeight: 900 }}>
                  {score} / 25
                </p>
                <p
                  className={`mt-4 text-xl sm:text-2xl lg:text-3xl ${scoreData.color} flex items-center justify-center gap-2`}
                  style={{ fontWeight: 900 }}
                >
                  <span
                    className={`material-symbols-outlined ${scoreData.color} text-2xl sm:text-3xl`}
                  >
                    {scoreData.icon}
                  </span>
                  {scoreData.label}
                </p>
              </div>
            </div>

            {/* Feedback & Actions */}
            <div className="p-6 sm:p-8">
              <p
                className="text-center text-base leading-relaxed text-[#1a1816]/80 sm:text-lg"
                style={{ fontWeight: 500 }}
              >
                {scoreData.message}
              </p>

              {/* Score breakdown */}
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
                  <p className="text-2xl text-green-700 sm:text-3xl" style={{ fontWeight: 900 }}>
                    {score}
                  </p>
                  <p
                    className="mt-1 text-[10px] text-green-600 uppercase sm:text-xs"
                    style={{ fontWeight: 600 }}
                  >
                    Correct
                  </p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center sm:p-4">
                  <p className="text-2xl text-red-700 sm:text-3xl" style={{ fontWeight: 900 }}>
                    {25 - score}
                  </p>
                  <p
                    className="mt-1 text-[10px] text-red-600 uppercase sm:text-xs"
                    style={{ fontWeight: 600 }}
                  >
                    Incorrect
                  </p>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-center sm:p-4">
                  <p className="text-2xl text-[#0a2fad] sm:text-3xl" style={{ fontWeight: 900 }}>
                    {Math.round((score / 25) * 100)}%
                  </p>
                  <p
                    className="mt-1 text-[10px] text-[#0a2fad] uppercase sm:text-xs"
                    style={{ fontWeight: 600 }}
                  >
                    Accuracy
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={restart}
                  className="flex min-h-[56px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-base text-white transition-colors hover:bg-blue-800 sm:text-lg"
                  style={{ fontWeight: 700 }}
                >
                  <span className="material-symbols-outlined">replay</span>
                  {t('quiz.btn_restart')}
                </button>
                <button
                  onClick={() => {
                    setCompleted(false);
                    onNavigate('about-scam');
                  }}
                  className="flex min-h-[56px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-blue-700 bg-white px-6 py-4 text-base text-blue-700 transition-colors hover:bg-blue-50 sm:text-lg"
                  style={{ fontWeight: 700 }}
                >
                  <span className="material-symbols-outlined">menu_book</span>
                  Go to Scam Info
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modern, Professional Header */}
      <header className="z-10 flex shrink-0 items-center justify-between border-b border-[#e5ded4] bg-white px-4 py-4 shadow-sm sm:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center rounded-lg p-2 text-[#5c544d] transition-colors hover:bg-gray-100 hover:text-[#1a1816]"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <h1
              className="text-xl tracking-tight text-[#1a1816] uppercase sm:text-2xl"
              style={{ fontWeight: 900 }}
            >
              {t('quiz.page_title')}
            </h1>
            <p className="text-xs text-[#5c544d] sm:text-sm" style={{ fontWeight: 600 }}>
              Interactive Assessment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {streak > 1 && (
            <div className="hidden items-center gap-1.5 rounded-lg border border-orange-100 bg-orange-50 px-3 py-1.5 text-orange-600 sm:flex">
              <span className="material-symbols-outlined text-[1rem]">bolt</span>
              <span className="text-sm" style={{ fontWeight: 700 }}>
                {streak} Streak
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 border-l border-[#e5ded4] pl-4 text-right sm:pl-6">
            <div className="hidden sm:block">
              <span
                className="block text-[10px] tracking-wider text-[#8a8480] uppercase"
                style={{ fontWeight: 700 }}
              >
                Current Score
              </span>
              <span
                className="block text-xl leading-none text-[#0a2fad]"
                style={{ fontWeight: 900 }}
              >
                {score}
              </span>
            </div>
            <div className="flex flex-col items-end sm:hidden">
              <span className="text-sm text-[#0a2fad]" style={{ fontWeight: 900 }}>
                {score} Pts
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar (Attached to header) */}
      <div className="h-1.5 w-full shrink-0 bg-[#e5ded4]">
        <div
          className="h-full bg-[#0a2fad] transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / 25) * 100}%` }}
        />
      </div>

      {/* Mobile-only tab switcher (portrait phones/small tablets) */}
      <div className="flex shrink-0 border-b border-[#e5ded4] bg-white sm:hidden landscape:hidden">
        <button
          onClick={() => setMobileTab('scenario')}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs transition-colors ${mobileTab === 'scenario' ? 'border-b-2 border-[#0a2fad] text-[#0a2fad]' : 'text-[#5c544d]'}`}
          style={{ fontWeight: 700 }}
        >
          <span className="material-symbols-outlined text-[1rem]">article</span>
          Scenario
        </button>
        <button
          onClick={() => setMobileTab('action')}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs transition-colors ${mobileTab === 'action' ? 'border-b-2 border-[#0a2fad] text-[#0a2fad]' : 'text-[#5c544d]'}`}
          style={{ fontWeight: 700 }}
        >
          <span className="material-symbols-outlined text-[1rem]">
            {answered ? 'task_alt' : 'gavel'}
          </span>
          {answered ? 'Result' : 'Evaluate'}
          {answered && (
            <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-[#0a2fad]" />
          )}
        </button>
      </div>
      <main className="safe-bottom relative flex flex-1 flex-col overflow-hidden bg-[#f8f7f5] p-2 pb-2 sm:p-3 sm:pb-3 md:p-4 md:pb-4 lg:p-6 lg:pb-6">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col gap-2 sm:gap-3">
          {/* Status Header (Compact) */}
          <div className="flex shrink-0 items-center justify-between rounded-lg border border-[#e5ded4] bg-white px-3 py-2 shadow-sm sm:px-4 sm:py-3">
            <h2 className="text-lg text-[#1a1816] sm:text-xl" style={{ fontWeight: 900 }}>
              Question {currentIndex + 1}{' '}
              <span className="text-sm font-normal text-[#8a8480] sm:text-base">of 25</span>
            </h2>
            <div className="flex items-center gap-2">
              <span
                className="hidden text-xs text-[#5c544d] uppercase sm:inline"
                style={{ fontWeight: 700 }}
              >
                Module:
              </span>
              <span
                className="rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-[#0a2fad] sm:text-sm"
                style={{ fontWeight: 700 }}
              >
                {scenario.category}
              </span>
            </div>
          </div>

          {/* Main Quiz Area - Split Layout (Portrait vs Landscape/Desktop) */}
          <div className="pb-safe flex min-h-0 flex-1 flex-col items-stretch gap-2 sm:flex-row sm:gap-3 landscape:flex-row">
            {/* Scenario Card (Left/Top) */}
            <div
              className={`min-h-0 w-full flex-[1.5] flex-col overflow-hidden rounded-lg border border-[#e5ded4] bg-white shadow-sm ${mobileTab === 'scenario' ? 'flex' : 'hidden'} sm:flex landscape:flex`}
            >
              {/* Title Bar */}
              <div className="flex shrink-0 items-center gap-2 bg-[#1a1816] px-4 py-2">
                <span className="material-symbols-outlined text-xl text-white">
                  {getMediumIcon(scenario.medium)}
                </span>
                <span className="flex-1 text-white" style={{ fontWeight: 600 }}>
                  {scenario.category}
                </span>
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f8f7f5] p-2 sm:p-4">
                <div className="flex min-h-0 flex-1 flex-col">
                  {scenario.medium === 'Email' ? (
                    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#e5ded4] bg-white shadow-sm">
                      {/* Minimal email client header */}
                      <div className="flex shrink-0 flex-col gap-1 border-b border-[#e5ded4] bg-[#f4f1ea] px-4 py-3 text-sm sm:px-5 sm:py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                              {scenario.sender.charAt(0)}
                            </div>
                            <div>
                              <p className="text-base font-bold text-[#1a1816]">
                                {stripText(scenario.sender)}
                              </p>
                              <p className="text-xs text-[#5c544d] opacity-80 sm:text-sm">
                                &lt;{stripText(scenario.senderDetail)}&gt;
                              </p>
                            </div>
                          </div>
                          <span className="pt-1 text-xs text-[#5c544d]">10:42 AM</span>
                        </div>
                        {scenario.subject && (
                          <div className="mt-4 text-lg font-bold text-[#1a1816] sm:text-xl">
                            {stripText(scenario.subject)}
                          </div>
                        )}
                      </div>
                      <div
                        className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-4 text-sm leading-relaxed whitespace-pre-line text-black sm:p-5 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: renderBody(scenario.body) }}
                      />
                      {scenario.cta && (
                        <div className="shrink-0 px-4 pt-2 pb-4 sm:px-5">
                          <span className="inline-block cursor-pointer rounded-md bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700">
                            {stripText(scenario.cta)}
                          </span>
                        </div>
                      )}
                      {scenario.footer && (
                        <div className="shrink-0 border-t border-[#e5ded4] bg-[#fbfbfb] p-4 py-3 text-xs whitespace-pre-line text-[#8a8480] sm:p-5">
                          {stripText(scenario.footer)}
                        </div>
                      )}
                    </div>
                  ) : scenario.medium === 'SMS' ||
                    scenario.medium === 'Social Media' ||
                    scenario.medium === 'Dating App' ? (
                    <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#d1d9e0] bg-[#eef2f5] shadow-inner">
                      {/* Phone Header */}
                      <div className="z-10 flex shrink-0 items-center gap-3 border-b border-gray-200 bg-white/90 px-4 py-3 text-sm backdrop-blur-md">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500">
                          {scenario.medium === 'Dating App' ? (
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.sender}&backgroundColor=b6e3f4`}
                              alt="avatar"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-base">person</span>
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-sm font-bold text-[#1a1816]">
                            {stripText(scenario.sender)}
                          </p>
                          <p className="truncate text-[10px] text-gray-500">
                            {scenario.medium === 'SMS'
                              ? stripText(scenario.senderDetail)
                              : 'Active Now'}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-lg text-gray-400">
                          info
                        </span>
                      </div>
                      {/* Phone Body */}
                      <div className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
                        <div className="my-1 text-center text-[11px] text-gray-400">
                          Today 9:41 AM
                        </div>

                        <div className="flex items-end gap-2">
                          <div className="mb-1 h-6 w-6 shrink-0 overflow-hidden rounded-full bg-gray-200">
                            {scenario.medium === 'Dating App' ? (
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.sender}&backgroundColor=b6e3f4`}
                                alt="avatar"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="material-symbols-outlined flex h-full w-full items-center justify-center text-[14px] leading-tight text-gray-500">
                                person
                              </span>
                            )}
                          </div>
                          <div
                            className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white p-3 text-sm leading-snug whitespace-pre-line text-black shadow-sm"
                            dangerouslySetInnerHTML={{ __html: renderBody(scenario.body) }}
                          />
                        </div>

                        {scenario.cta && (
                          <div className="mt-1 flex items-end gap-2">
                            <div className="w-6 shrink-0" />
                            <div className="max-w-[85%] cursor-pointer rounded-2xl rounded-bl-sm bg-white p-3 text-[14px] break-words text-blue-600 underline shadow-sm">
                              {stripText(scenario.cta)}
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Phone Input Area */}
                      <div className="flex shrink-0 items-center gap-2 border-t border-gray-200 bg-white p-3">
                        <div className="flex h-9 flex-1 items-center rounded-full bg-gray-100 px-4">
                          <span className="text-sm text-gray-400">Message...</span>
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500">
                          <span className="material-symbols-outlined text-[18px] text-white">
                            send
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Default Fallback (Pop-ups, Phone Calls, Marketplace, etc.) */
                    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#e5ded4] bg-white shadow-sm">
                      <div className="mb-4 flex shrink-0 items-center gap-3 border-b border-[#e5ded4] p-4 pb-4 sm:p-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#5c544d]">
                          <span className="material-symbols-outlined text-2xl">
                            {getMediumIcon(scenario.medium)}
                          </span>
                        </div>
                        <div>
                          <p
                            className="text-base text-[#1a1816] sm:text-lg"
                            style={{ fontWeight: 700 }}
                          >
                            {stripText(scenario.sender)}
                          </p>
                          <p className="mt-0.5 text-xs text-[#5c544d] sm:text-sm">
                            {stripText(scenario.senderDetail)}
                          </p>
                        </div>
                      </div>

                      <div className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 sm:px-5">
                        {scenario.subject && (
                          <p
                            className="mb-3 shrink-0 text-lg text-[#1a1816] sm:text-xl"
                            style={{ fontWeight: 700 }}
                          >
                            {stripText(scenario.subject)}
                          </p>
                        )}

                        <div
                          className="custom-scrollbar min-h-0 flex-1 rounded-xl border border-[#e5ded4] bg-[#f8f7f5] p-4 text-sm leading-relaxed whitespace-pre-line text-black sm:p-5"
                          dangerouslySetInnerHTML={{ __html: renderBody(scenario.body) }}
                        />

                        {scenario.cta && (
                          <div className="mt-4 shrink-0">
                            <span
                              className="inline-block cursor-pointer rounded-lg bg-[#0a2fad] px-5 py-2 text-sm text-white shadow-sm transition-colors hover:bg-blue-800"
                              style={{ fontWeight: 700 }}
                            >
                              {stripText(scenario.cta)}
                            </span>
                          </div>
                        )}

                        {scenario.footer && (
                          <p className="mt-4 shrink-0 border-t border-[#e5ded4] pt-4 text-xs whitespace-pre-line text-[#8a8480]">
                            {stripText(scenario.footer)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interaction Area (Right/Bottom) */}
            <div
              className={`custom-scrollbar min-h-0 w-full shrink-0 flex-col gap-2 overflow-y-auto sm:w-[35%] sm:max-w-[400px] sm:min-w-[300px] landscape:w-[35%] landscape:max-w-[400px] landscape:min-w-[300px] ${mobileTab === 'action' ? 'flex' : 'hidden'} sm:flex landscape:flex`}
            >
              {/* Tools Card - Shows Clues when requested */}
              {showClues && !answered && (
                <div className="animate-in slide-in-from-top-2 shrink-0 rounded-xl border border-yellow-200 bg-yellow-50 p-3 shadow-sm sm:p-4">
                  <h4
                    className="mb-1.5 flex items-center gap-1.5 text-xs tracking-wider text-yellow-800 uppercase"
                    style={{ fontWeight: 800 }}
                  >
                    <span className="material-symbols-outlined text-[1rem]">lightbulb</span>
                    Insight
                  </h4>
                  <p
                    className="text-xs leading-snug text-yellow-900 sm:text-sm"
                    style={{ fontWeight: 500 }}
                  >
                    {scenario.clue}
                  </p>
                </div>
              )}

              {/* Main Action Card */}
              <div className="flex shrink-0 flex-col rounded-xl border border-[#e5ded4] bg-white p-4 shadow-sm">
                <span
                  className="mb-3 block text-xs tracking-wider text-[#5c544d] uppercase"
                  style={{ fontWeight: 800 }}
                >
                  Authentication Check
                </span>

                {/* Voting Buttons */}
                {!answered ? (
                  <div className="mt-1 flex flex-col gap-3">
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-green-600 bg-white px-4 py-3.5 text-base text-green-700 shadow-sm transition-all hover:bg-green-600 hover:text-white active:scale-[0.98] sm:text-lg"
                      style={{ fontWeight: 800 }}
                    >
                      <span className="material-symbols-outlined text-[1.4rem]">verified_user</span>
                      {t('quiz.btn_legit')}
                    </button>
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-red-600 bg-white px-4 py-3.5 text-base text-red-700 shadow-sm transition-all hover:bg-red-600 hover:text-white active:scale-[0.98] sm:text-lg"
                      style={{ fontWeight: 800 }}
                    >
                      <span className="material-symbols-outlined text-[1.4rem]">warning</span>
                      {t('quiz.btn_scam')}
                    </button>

                    {!showClues && (
                      <button
                        onClick={() => setShowClues(true)}
                        className="mt-2 flex items-center justify-center gap-1 text-xs text-[#0a2fad] transition-colors hover:text-blue-800"
                        style={{ fontWeight: 600 }}
                      >
                        Need an insight?
                      </button>
                    )}
                  </div>
                ) : (
                  /* Feedback State */
                  <div className={`animate-in zoom-in-95 flex flex-1 flex-col duration-200`}>
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {isCorrect ? 'task_alt' : 'error'}
                        </span>
                      </div>
                      <div>
                        <h3
                          className={`mb-0.5 text-base sm:text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
                          style={{ fontWeight: 900 }}
                        >
                          {isCorrect ? 'Correct Assessment' : 'Incorrect Assessment'}
                        </h3>
                        <p className="text-xs text-[#5c544d]" style={{ fontWeight: 600 }}>
                          {isCorrect ? '+1 Point Earned' : 'No Points'}
                        </p>
                      </div>
                    </div>

                    <p
                      className="mb-4 rounded-lg bg-[#f8f7f5] p-3 text-xs leading-relaxed text-[#1a1816] sm:text-sm"
                      style={{ fontWeight: 500 }}
                    >
                      {scenario.explanation}
                    </p>

                    {showNext && (
                      <button
                        onClick={handleNext}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0a2fad] px-3 py-3 text-sm text-white shadow-sm transition-colors hover:bg-blue-800 active:scale-[0.98]"
                        style={{ fontWeight: 700 }}
                      >
                        {currentIndex >= 24 ? 'View Final Report' : 'Next Context'}
                        <span className="material-symbols-outlined text-[1.1rem]">
                          arrow_forward
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Feedback After Answer */}
              {answered && (
                <div className="flex shrink-0 flex-col gap-3">
                  {scenario.redFlags.length > 0 && (
                    <div className="animate-in slide-in-from-bottom-2 rounded-xl border border-red-200 bg-red-50 p-3 shadow-sm sm:p-4">
                      <h4
                        className="mb-2 flex items-center gap-1.5 text-xs tracking-wider text-red-800 uppercase"
                        style={{ fontWeight: 800 }}
                      >
                        <span className="material-symbols-outlined text-[1rem]">flag</span>
                        Diagnostic Red Flags
                      </h4>
                      <ul className="space-y-2">
                        {scenario.redFlags.map((flag, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[#1a1816] sm:text-sm"
                            style={{ fontWeight: 500 }}
                          >
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500"></div>
                            <span className="leading-snug">{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(!isCorrect || scenario.redFlags.length === 0) && (
                    <div className="animate-in slide-in-from-bottom-2 rounded-xl border border-yellow-200 bg-yellow-50 p-3 shadow-sm sm:p-4">
                      <h4
                        className="mb-1.5 flex items-center gap-1.5 text-xs tracking-wider text-yellow-800 uppercase"
                        style={{ fontWeight: 800 }}
                      >
                        <span className="material-symbols-outlined text-[1rem]">lightbulb</span>
                        Key Takeaway
                      </h4>
                      <p
                        className="text-xs leading-snug text-yellow-900 sm:text-sm"
                        style={{ fontWeight: 500 }}
                      >
                        {scenario.clue}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
