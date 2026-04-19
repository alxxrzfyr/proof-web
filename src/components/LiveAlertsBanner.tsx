// src/app/components/LiveAlertsBanner.tsx
import { useState, useEffect } from 'react';

interface AlertItem {
  title: string;
  url: string;
  sourceLabel: string;
  date: string;
  logo?: string;
  scope?: 'local' | 'international';
}

export function LiveAlertsBanner() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const [alertScope, setAlertScope] = useState<'local' | 'international'>('local');

  useEffect(() => {
    // Fetch the JSON file from the public directory
    fetch('alerts.json') // Relative fetch works on GitHub Pages Subpaths
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        // Grab the top 6 most recent alerts
        const alertsList = data.alerts || data;
        setAlerts(alertsList);
      })
      .catch((err) => console.error('Failed to load alerts:', err));
  }, []);

  if (alerts.length === 0) return null;

  const displayAlerts = alerts
    .filter((a) => a.scope === alertScope || (!a.scope && alertScope === 'local'))
    .slice(0, 6);

  return (
    <div className="flex items-center overflow-hidden border-b border-slate-800 bg-slate-900 p-2.5 text-sm text-slate-200">
      <div className="mr-4 flex shrink-0 rounded bg-slate-800 px-1 py-0.5 transition-colors">
        <button
          onClick={() => setAlertScope('local')}
          className={`rounded px-3 py-1 text-xs font-bold uppercase transition-colors ${alertScope === 'local' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          PH
        </button>
        <button
          onClick={() => setAlertScope('international')}
          className={`rounded px-3 py-1 text-xs font-bold uppercase transition-colors ${alertScope === 'international' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          INTL
        </button>
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        <div className="animate-marquee flex items-center space-x-10 whitespace-nowrap hover:[animation-play-state:paused]">
          {displayAlerts.map((alert, i) => (
            <a
              key={i}
              href={alert.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              {alert.logo && (
                <img
                  src={alert.logo}
                  alt={`${alert.sourceLabel} logo`}
                  className="h-4 w-4 rounded object-cover"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onError={(e: any) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="font-semibold text-slate-400">{alert.sourceLabel}</span>
              <span>{alert.title}</span>
              <span className="ml-1 text-xs text-slate-500">- {alert.date}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
