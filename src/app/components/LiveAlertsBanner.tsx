// src/app/components/LiveAlertsBanner.tsx
import { useState, useEffect } from "react";

interface AlertItem {
  title: string;
  link: string;
  sourceLabel: string;
  date: string;
  logo?: string;
}

export function LiveAlertsBanner() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    // Fetch the JSON file from the public directory
    fetch("/alerts.json")
      .then((res) => res.json())
      .then((data) => {
        // Grab the top 5 most recent alerts
        const alertsList = data.alerts || data;
        setAlerts(alertsList.slice(0, 5));
      })
      .catch((err) => console.error("Failed to load alerts:", err));
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 p-2.5 flex overflow-hidden text-sm">
      <div className="flex animate-marquee space-x-10 whitespace-nowrap">
        {alerts.map((alert, i) => (
          <a 
            key={i} 
            href={alert.link} 
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