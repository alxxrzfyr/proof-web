import { useState, useEffect } from 'react';
import { scamTypes, quickJumpPills, type Lang, translations } from './data';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Add these imports (adjust the paths if the exact filenames differ)
import bspLogo from '@/assets/backgrounds/bsp-logo.png';
import ciccLogo from '@/assets/backgrounds/cicc.png';
import nbiLogo from '@/assets/backgrounds/nbi.png';
import pnpAcgLogo from '@/assets/backgrounds/pnp-acg-logo.png';

interface Props {
  lang: Lang;
}

// Official logo URLs (using clearbit for logos)
const resourceLogos: Record<string, string> = {
  CICC: ciccLogo,
  'NBI-CCD': nbiLogo,
  BSP: bspLogo,
  'PNP-ACG': pnpAcgLogo,
};

function ScamExampleCard({ tab, index }: { tab: any; index: number }) {
  const content = tab.content;

  const categoryColors = [
    {
      header: 'bg-gradient-to-r from-[#1a1816] to-[#2d2926]',
      accent: 'bg-red-500',
      badge: 'bg-red-500/20 text-red-300',
    },
    {
      header: 'bg-gradient-to-r from-[#1a1816] to-[#2d2926]',
      accent: 'bg-amber-500',
      badge: 'bg-amber-500/20 text-amber-300',
    },
    {
      header: 'bg-gradient-to-r from-[#1a1816] to-[#2d2926]',
      accent: 'bg-blue-500',
      badge: 'bg-blue-500/20 text-blue-300',
    },
  ];
  const color = categoryColors[index % 3];

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#e5ded4] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0a2fad]/30 hover:shadow-lg">
      <div className={`${color.header} flex items-center gap-3 px-4 py-3.5 sm:px-5`}>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs text-[#1a1816]"
          style={{ fontWeight: 900 }}
        >
          {index + 1}
        </span>
        <span className="flex-1 text-sm text-white sm:text-base" style={{ fontWeight: 700 }}>
          {tab.label}
        </span>
        <span
          className={`${color.badge} rounded-full px-2.5 py-1 text-[10px] tracking-wider uppercase`}
          style={{ fontWeight: 700 }}
        >
          Example
        </span>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        {content.sender && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>
              {content.sender}
            </span>
            {content.senderBadge && (
              <span
                className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-700 uppercase"
                style={{ fontWeight: 700 }}
              >
                {content.senderBadge}
              </span>
            )}
          </div>
        )}

        {content.from && (
          <div className="mb-1 text-sm">
            <span className="text-[#3d3530]" style={{ fontWeight: 600 }}>
              From:{' '}
            </span>
            <span
              className="font-mono text-xs break-all text-red-600 underline decoration-wavy"
              style={{ fontWeight: 600 }}
            >
              {content.from}
            </span>
          </div>
        )}
        {content.subject && (
          <div className="mb-3 text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>
            <span className="text-[#3d3530]" style={{ fontWeight: 600 }}>
              Subject:{' '}
            </span>
            {content.subject}
          </div>
        )}

        {content.body && (
          <div
            className="rounded-lg border border-[#d6cfc6] bg-[#f8f7f5] p-3 text-sm leading-[1.75] whitespace-pre-line text-[#1a1816] sm:p-4"
            style={{ fontWeight: 500 }}
          >
            {content.body}
          </div>
        )}

        {content.cta && (
          <div className="mt-3">
            <span
              className="inline-block rounded-md bg-red-600 px-5 py-2.5 text-sm text-white shadow-sm"
              style={{ fontWeight: 700 }}
            >
              {content.cta}
            </span>
          </div>
        )}

        {content.type === 'url-compare' && content.extra?.urls && (
          <div className="space-y-2">
            {content.extra.urls.map((u: any, i: number) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg p-3 sm:gap-3 ${u.verdict === 'safe' ? 'border-2 border-green-300 bg-green-50' : 'border-2 border-red-300 bg-red-50'}`}
              >
                <span
                  className={`material-symbols-outlined ${u.verdict === 'safe' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {u.verdict === 'safe' ? 'lock' : 'warning'}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-xs tracking-wider text-[#3d3530] uppercase"
                    style={{ fontWeight: 700 }}
                  >
                    {u.label}
                  </p>
                  <p
                    className="font-mono text-sm break-all text-[#1a1816]"
                    style={{ fontWeight: 600 }}
                  >
                    {u.url}
                  </p>
                </div>
                {u.highlight && (
                  <span className="shrink-0 text-xs text-red-600" style={{ fontWeight: 800 }}>
                    {u.highlight}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {content.type === 'sim-swap' && content.extra && (
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-lg border border-[#d6cfc6] bg-[#f8f7f5] p-4 sm:p-5">
              <p
                className="mb-3 text-xs tracking-wider text-[#1a1816] uppercase"
                style={{ fontWeight: 800 }}
              >
                How SIM Swap Happens
              </p>
              <div className="space-y-2.5">
                {content.extra.steps.map((step: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs text-white"
                      style={{ fontWeight: 700 }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#1a1816]" style={{ fontWeight: 500 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p
                className="mb-2 text-xs tracking-wider text-[#1a1816] uppercase"
                style={{ fontWeight: 800 }}
              >
                Warning Signs
              </p>
              {content.extra.warnings.map((w: string, i: number) => (
                <div
                  key={i}
                  className="rounded-md border-2 border-red-300 bg-red-50 p-3 text-sm text-red-800"
                  style={{ fontWeight: 600 }}
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        )}

        {content.extra?.domain && content.type !== 'url-compare' && (
          <p className="mt-2 font-mono text-xs text-[#3d3530]" style={{ fontWeight: 600 }}>
            {content.extra.domain}
          </p>
        )}
        {content.extra?.moneyRequest && (
          <div className="mt-4 rounded-lg border-2 border-[#d6cfc6] bg-[#f8f7f5] p-4">
            <p className="mb-2 text-xs text-[#1a1816] uppercase" style={{ fontWeight: 700 }}>
              3 weeks later...
            </p>
            <p className="text-sm text-[#1a1816] italic" style={{ fontWeight: 500 }}>
              {content.extra.moneyRequest}
            </p>
          </div>
        )}
        {content.extra?.trackingNo && (
          <div className="relative mt-3 rounded-lg border-2 border-[#d6cfc6] bg-[#f8f7f5] p-4">
            <div
              className="absolute top-2 right-2 rotate-12 rounded bg-red-600 px-2 py-0.5 text-[10px] text-white uppercase"
              style={{ fontWeight: 700 }}
            >
              FORGED
            </div>
            <p className="text-xs text-[#1a1816] uppercase" style={{ fontWeight: 800 }}>
              LBC EXPRESS
            </p>
            <p className="mt-2 font-mono text-sm text-[#1a1816]" style={{ fontWeight: 600 }}>
              Tracking: {content.extra.trackingNo}
            </p>
            <p className="mt-1 text-sm text-[#1a1816]" style={{ fontWeight: 500 }}>
              Recipient: {content.extra.recipient}
            </p>
          </div>
        )}
        {content.extra?.shares && (
          <div className="mt-3 flex gap-4 text-xs text-[#3d3530]" style={{ fontWeight: 600 }}>
            <span>{content.extra.reactions} reactions</span>
            <span>{content.extra.shares} shares</span>
          </div>
        )}

        {content.annotations.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {content.annotations.map((a: string, i: number) => (
              <p
                key={i}
                className="flex items-start gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                style={{ fontWeight: 700 }}
              >
                <span className="shrink-0">⚠</span> {a}
              </p>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-3 sm:p-4">
          <p className="text-sm text-amber-900" style={{ fontWeight: 700 }}>
            💡 {content.callout}
          </p>
        </div>
      </div>
    </div>
  );
}

function LogoImage({ name }: { name: string }) {
  const url = resourceLogos[name];
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e5ded4] bg-white p-1.5 sm:h-14 sm:w-14">
      <ImageWithFallback
        src={url || ''}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
        onError={(e: any) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `<span style="font-weight:900;font-size:11px;color:#0a2fad;text-align:center;line-height:1.1">${name}</span>`;
        }}
      />
    </div>
  );
}

export function ScamInfoSection({ lang }: Props) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [alertScope, setAlertScope] = useState<'local' | 'international'>('local');

  useEffect(() => {
    fetch('alerts.json') // Relative fetch works on GitHub Pages Subpaths
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setAlerts(data.alerts || data);
      })
      .catch((err) => console.error('Failed to load alerts:', err));
  }, []);

  return (
    <section className="bg-white">
      {/* Page Header */}
      <div className="border-b border-[#e5ded4] bg-[#f8f7f5]">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-18 lg:px-16">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="inline-block rounded-full bg-[#1a1816] px-4 py-1.5 font-mono text-xs tracking-widest text-white uppercase"
              style={{ fontWeight: 700 }}
            >
              SCAM INFO CENTER
            </span>
            <span className="font-mono text-xs text-[#5c544d]" style={{ fontWeight: 600 }}>
              UPDATED: APRIL 2026
            </span>
          </div>
          <h1
            className="tracking-tight text-[#1a1816] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
          >
            {lang === 'fil'
              ? 'Sentro ng Impormasyon sa Scam'
              : lang === 'ceb'
                ? 'Sentro sa Kasayuran sa Scam'
                : 'Scam Information Center'}
          </h1>
          <p
            className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus
            porttitor. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies
            vehicula ut id elit.
          </p>

          <div className="mt-6 flex flex-row flex-wrap gap-2 sm:mt-8">
            {quickJumpPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#1a1816]/15 bg-[#1a1816]/5 px-3 py-2 text-xs text-[#3d3530] sm:px-4 sm:text-sm"
                style={{ fontWeight: 600 }}
              >
                # {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What is scam? + How to detect? */}
      <div className="mx-auto max-w-[1400px] space-y-12 px-5 py-12 sm:space-y-16 sm:px-8 sm:py-16 md:px-12 lg:px-16">
        <div>
          <h2
            className="tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {lang === 'fil' ? 'Ano ang Scam?' : lang === 'ceb' ? 'Unsa ang Scam?' : 'What is Scam?'}
          </h2>
          <div className="mt-4 mb-5 h-1.5 w-16 rounded-full bg-[#0a2fad]" />
          <p
            className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>

        <div className="text-right">
          <h2
            className="tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {lang === 'fil'
              ? 'Paano Matukoy ang Scam?'
              : lang === 'ceb'
                ? 'Unsaon Pagkita sa Scam?'
                : 'How to Detect a Scam?'}
          </h2>
          <div className="mt-4 mb-5 ml-auto h-1.5 w-16 rounded-full bg-[#0a2fad]" />
          <p
            className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel
            augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet
            fermentum. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
      </div>

      {/* Scam Categories */}
      <div className="border-t border-[#e5ded4] bg-[#f8f7f5]">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16">
          <h2
            className="mb-2 tracking-tight text-[#1a1816] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}
          >
            {lang === 'fil' ? 'Karaniwang Uri ng Panloloko' : 'Common Types of Scams'}
          </h2>
          <p className="mb-10 text-base text-[#3d3530] sm:mb-12" style={{ fontWeight: 500 }}>
            {lang === 'fil'
              ? 'Suriin ang mga pattern ng panloloko upang maprotektahan ang inyong sarili.'
              : 'Analyze malicious patterns to protect yourself and your loved ones.'}
          </p>

          {scamTypes.map((scam) => (
            <div key={scam.number} className="mb-12 last:mb-0 sm:mb-16">
              <div className="mb-6 flex items-start gap-3 border-b-2 border-[#e5ded4] pb-4 sm:mb-8 sm:items-center sm:gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a1816] text-lg text-white sm:h-12 sm:w-12 sm:text-xl"
                  style={{ fontWeight: 900 }}
                >
                  {scam.number}
                </div>
                <div className="min-w-0">
                  <h3
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.75rem)' }}
                  >
                    {scam.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#3d3530]" style={{ fontWeight: 500 }}>
                    {scam.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                {scam.tabs.map((tab, i) => (
                  <ScamExampleCard key={i} tab={tab} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts, Resources, Report */}
      <div className="border-t border-[#e5ded4]">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 md:px-12 lg:px-16">
          {/* Live Alerts — Redesigned as a news ticker / card grid */}
          <div className="mb-10 sm:mb-14">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                  <span className="material-symbols-outlined text-xl text-white">
                    notifications_active
                  </span>
                </div>
                <div>
                  <h3
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: '1.25rem' }}
                  >
                    Live Alerts
                  </h3>
                  <p className="text-xs text-[#5c544d]" style={{ fontWeight: 600 }}>
                    Latest scam reports & advisories
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-full border border-[#e5ded4] bg-[#f8f7f5] p-1 sm:ml-auto">
                <button
                  onClick={() => setAlertScope('local')}
                  className={`rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-all ${alertScope === 'local' ? 'bg-[#0a2fad] text-white shadow-sm' : 'text-[#5c544d] hover:text-[#1a1816]'}`}
                  style={{ fontWeight: alertScope === 'local' ? 800 : 700 }}
                >
                  Local (PH)
                </button>
                <button
                  onClick={() => setAlertScope('international')}
                  className={`rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-all ${alertScope === 'international' ? 'bg-[#0a2fad] text-white shadow-sm' : 'text-[#5c544d] hover:text-[#1a1816]'}`}
                  style={{ fontWeight: alertScope === 'international' ? 800 : 700 }}
                >
                  International
                </button>
              </div>

              <div className="ml-3 hidden items-center gap-1.5 lg:flex">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </span>
                <span
                  className="text-xs tracking-wider text-red-600 uppercase"
                  style={{ fontWeight: 700 }}
                >
                  Live
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alerts
                .filter((a) => a.scope === alertScope || (!a.scope && alertScope === 'local'))
                .slice(0, 12)
                .map((alert) => (
                  <a
                    key={alert.id}
                    href={alert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-[#0a2fad] bg-white p-5 transition-all hover:border-[#0a2fad]/40 hover:shadow-lg lg:border-[#e5ded4]"
                  >
                    <div className="mb-3 flex w-full items-center justify-between">
                      <div className="flex max-w-[65%] items-center gap-2">
                        {alert.logo ? (
                          <img
                            src={alert.logo}
                            alt=""
                            className="h-4 w-4 shrink-0 rounded object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <span
                            className={`inline-block h-2 w-2 shrink-0 rounded-full ${alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}
                          />
                        )}
                        <span
                          className="truncate text-[11px] tracking-wider text-[#5c544d] uppercase"
                          style={{ fontWeight: 700 }}
                          title={alert.source}
                        >
                          {alert.source}
                        </span>
                      </div>
                      <span
                        className="shrink-0 text-right text-[11px] text-[#5c544d]/50"
                        style={{ fontWeight: 600 }}
                      >
                        {alert.date}
                      </span>
                    </div>
                    <p
                      className="flex-1 text-sm leading-snug text-[#1a1816] transition-colors group-hover:text-[#0a2fad] sm:text-base"
                      style={{ fontWeight: 700 }}
                    >
                      {alert.title}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#0a2fad] opacity-100 transition-opacity group-hover:opacity-100 xl:opacity-0">
                      <span className="text-xs" style={{ fontWeight: 700 }}>
                        Read more
                      </span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </a>
                ))}
            </div>
          </div>

          {/* Quick Resources + Report — Redesigned */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-5">
            {/* Quick Resources — spans 3 cols */}
            <div className="rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] p-6 sm:p-8 lg:col-span-3">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a2fad]">
                  <span className="material-symbols-outlined text-xl text-white">verified</span>
                </div>
                <div>
                  <h4
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: '1.1rem' }}
                  >
                    Quick Resources
                  </h4>
                  <p className="text-xs text-[#5c544d]" style={{ fontWeight: 600 }}>
                    Official government agencies you can contact
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                  {
                    name: 'CICC',
                    desc: 'Cybercrime Investigation and Coordinating Center',
                    url: 'https://cicc.gov.ph',
                    hotline: '1326',
                  },
                  {
                    name: 'NBI-CCD',
                    desc: 'National Bureau of Investigation — Cybercrime Division',
                    url: 'https://nbi.gov.ph',
                    hotline: '(02) 8523-8231',
                  },
                  {
                    name: 'BSP',
                    desc: 'Bangko Sentral ng Pilipinas — Consumer Complaints',
                    url: 'https://bsp.gov.ph',
                    hotline: '(02) 8708-7087',
                  },
                  {
                    name: 'PNP-ACG',
                    desc: 'Philippine National Police — Anti-Cybercrime Group',
                    url: 'https://acg.pnp.gov.ph',
                    hotline: '(02) 8414-1560',
                  },
                ].map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-[#0a2fad] bg-white p-4 transition-all hover:border-[#0a2fad]/40 hover:shadow-md sm:p-5 lg:border-[#e5ded4]"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <LogoImage name={resource.name} />
                      <div className="min-w-0 flex-1">
                        <p className="text-base text-[#0a2fad]" style={{ fontWeight: 800 }}>
                          {resource.name}
                        </p>
                      </div>
                      <span className="material-symbols-outlined shrink-0 text-lg text-[#1a1816]/20 transition-colors group-hover:text-[#0a2fad]">
                        open_in_new
                      </span>
                    </div>
                    <p
                      className="text-xs leading-snug text-[#3d3530] sm:text-sm"
                      style={{ fontWeight: 500 }}
                    >
                      {resource.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[#5c544d]">
                      <span className="material-symbols-outlined text-sm">phone</span>
                      <span className="font-mono text-xs" style={{ fontWeight: 700 }}>
                        {resource.hotline}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Report a Threat — spans 2 cols */}
            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1816] p-6 text-white sm:p-8 lg:col-span-2">
              <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10" />
              <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-600/10" />

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
                    <span className="material-symbols-outlined text-2xl text-white">shield</span>
                  </div>
                  <h4 className="text-xl uppercase sm:text-2xl" style={{ fontWeight: 900 }}>
                    Report a<br />
                    Threat
                  </h4>
                </div>

                <p
                  className="flex-1 text-sm leading-relaxed text-[#c7c3bf] sm:text-base"
                  style={{ fontWeight: 500 }}
                >
                  If you or someone you know has encountered a suspicious online activity, a scam,
                  or any form of cyber fraud — report it immediately. Your report can help protect
                  others.
                </p>

                <div className="mt-6 space-y-3 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-red-400">phone</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>
                      CICC Hotline: 1326
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-red-400">email</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>
                      report@cicc.gov.ph
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-red-400">language</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>
                      cicc.gov.ph/report
                    </span>
                  </div>
                </div>

                <a
                  href="https://cicc.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block"
                >
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-base text-white transition-colors hover:bg-red-700 sm:text-lg"
                    style={{ fontWeight: 700 }}
                  >
                    <span className="material-symbols-outlined text-xl">report</span>
                    Log an Incident Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
