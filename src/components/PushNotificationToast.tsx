import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, ArrowRight, Briefcase, Calendar, CheckCircle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PushNotificationToast: React.FC = () => {
  const { 
    activeToast, 
    dismissToast, 
    setActiveCandidateTab, 
    setSelectedJobForDetail, 
    getJobById, 
    setRole 
  } = useApp();

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 6500);
    return () => clearTimeout(timer);
  }, [activeToast, dismissToast]);

  if (!activeToast) return null;

  const handleAction = () => {
    if (activeToast.relatedApplicationId) {
      setRole('candidate');
      setActiveCandidateTab('tracker');
    } else if (activeToast.relatedJobId) {
      setRole('candidate');
      const job = getJobById(activeToast.relatedJobId);
      if (job) {
        setSelectedJobForDetail(job);
      }
      setActiveCandidateTab('jobs');
    } else {
      setRole('candidate');
      setActiveCandidateTab('notifications');
    }
    dismissToast();
  };

  const getIcon = () => {
    switch (activeToast.type) {
      case 'interview_invite':
        return <Calendar className="w-5 h-5 text-amber-500" />;
      case 'new_job':
        return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'contract_offer':
        return <FileText className="w-5 h-5 text-emerald-500" />;
      case 'status_update':
        return <CheckCircle className="w-5 h-5 text-indigo-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Push Notifikasi Perangkat"
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed top-5 right-5 z-50 max-w-md w-full sm:w-[420px] bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 ring-1 ring-white/10"
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping inline-block" />
                Push Notifikasi Instan
              </span>
              <span className="text-[10px] text-slate-400">{activeToast.timestamp}</span>
            </div>

            <h4 className="text-sm font-bold text-white leading-tight mb-1 truncate">
              {activeToast.title}
            </h4>
            
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
              {activeToast.message}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAction}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span>{activeToast.actionText || 'Lihat Detail'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                type="button"
                onClick={dismissToast}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={dismissToast}
            aria-label="Tutup Notifikasi"
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
