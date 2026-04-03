// src/app/components/LiveAlertsBanner.tsx
import { useState, useEffect } from "react";

interface AlertItem {
  title: string;
  url: string;
  sourceLabel: string;
  date: string;
  logo?: string;
  scope?: "local" | "international";
}

export function LiveAlertsBanner() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const [alertScope, setAlertScope] = useState<"local" | "international">("local");

  useEffect(() => {
    // Fetch the JSON file from the public directory
    fetch("alerts.json") // Relative fetch works on GitHub Pages Subpaths
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // Grab the top 6 most recent alerts
        const alertsList = data.alerts || data;
        setAlerts(alertsList);
      })
      .catch((err) => console.error("Failed to load alerts:", err));
  }, []);

  if (alerts.length === 0) return null;

  const displayAlerts = alerts.filter(a => a.scope === alertScope || (!a.scope && alertScope === "local")).slice(0, 6);

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 p-2.5 flex items-center overflow-hidden text-sm">
      <div className="flex bg-slate-800 rounded px-1 py-0.5 mr-4 shrink-0 transition-colors">
        <button
          onClick={() => setAlertScope("local")}
          className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${alertScope === "local" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          PH
        </button>
        <button
          onClick={() => setAlertScope("international")}
          className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${alertScope === "international" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          INTL
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex animate-marquee space-x-10 whitespace-nowrap items-center hover:[animation-play-state:paused]">
          {displayAlerts.map((alert, i) => (
          <a 
            key={i} 
            href={alert.url} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            {alert.logo && (
              <img 
                src={alert.logo} 
                alt={`${alert.sourceLabel} logo`} 
                className="w-4 h-4 rounded object-cover" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <span className="text-slate-400 font-semibold">{alert.sourceLabel}</span>
            <span>{alert.title}</span>
            <span className="text-slate-500 text-xs ml-1">- {alert.date}</span>
          </a>
        ))}
      </div>
    </div>
  );
}