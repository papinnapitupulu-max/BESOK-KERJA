import React, { useState } from 'react';
import { 
  Sparkles, 
  BellRing, 
  CalendarCheck, 
  FileCheck2, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationSimulatorBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { 
    simulateNewJobNotification, 
    simulateInterviewInviteNotification, 
    simulateStatusAdvancementNotification,
    browserNotificationPermission,
    requestBrowserNotificationPermission,
    role,
    setRole
  } = useApp();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-800/40 text-white text-xs px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Simulasi Real-Time & Push Notification</span>
          </div>

          <p className="text-slate-300 hidden sm:inline">
            Coba klik pemicu otomatis untuk melihat simulasi alert ke pelamar secara langsung:
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={simulateNewJobNotification}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-600/90 hover:bg-blue-500 text-white font-medium shadow-xs transition-colors cursor-pointer"
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>+ Lowongan Baru Cocok</span>
          </button>

          <button
            type="button"
            onClick={simulateInterviewInviteNotification}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-600/90 hover:bg-amber-500 text-white font-medium shadow-xs transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>+ Panggilan Interview</span>
          </button>

          <button
            type="button"
            onClick={simulateStatusAdvancementNotification}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium shadow-xs transition-colors cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>+ Penawaran Kontrak PKWT</span>
          </button>

          {browserNotificationPermission !== 'granted' && (
            <button
              type="button"
              onClick={requestBrowserNotificationPermission}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 text-indigo-200 transition-colors"
            >
              <span>🔔 Aktifkan Push Browser</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
