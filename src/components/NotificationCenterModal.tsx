import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  FileText, 
  Volume2, 
  ShieldCheck, 
  ExternalLink,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PushNotificationItem } from '../types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadNotificationCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    browserNotificationPermission,
    requestBrowserNotificationPermission,
    setActiveCandidateTab,
    setSelectedJobForDetail,
    getJobById,
    setRole,
    simulateNewJobNotification,
    simulateInterviewInviteNotification,
    simulateStatusAdvancementNotification
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'status' | 'jobs'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'status') return n.type === 'status_update' || n.type === 'interview_invite' || n.type === 'contract_offer';
    if (activeFilter === 'jobs') return n.type === 'new_job';
    return true;
  });

  const handleNotificationClick = (notif: PushNotificationItem) => {
    markNotificationAsRead(notif.id);
    if (notif.relatedApplicationId) {
      setRole('candidate');
      setActiveCandidateTab('tracker');
      onClose();
    } else if (notif.relatedJobId) {
      setRole('candidate');
      const job = getJobById(notif.relatedJobId);
      if (job) {
        setSelectedJobForDetail(job);
      }
      setActiveCandidateTab('jobs');
      onClose();
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'interview_invite':
        return <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200"><Calendar className="w-4 h-4" /></div>;
      case 'new_job':
        return <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200"><Briefcase className="w-4 h-4" /></div>;
      case 'contract_offer':
        return <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200"><FileText className="w-4 h-4" /></div>;
      default:
        return <div className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"><Bell className="w-4 h-4" /></div>;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Pusat Notifikasi & Push Alert</h3>
                  {unreadNotificationCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      {unreadNotificationCount} Baru
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">Update status rekrutmen outsourcing & lowongan baru secara real-time</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadNotificationCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsAsRead}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Tandai Semua Dibaca</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup modal"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Native Web Push Status Bar */}
          <div className="px-5 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Status Push Notifikasi Browser: 
                <strong className="ml-1 uppercase font-bold text-emerald-300">
                  {browserNotificationPermission === 'granted' ? 'Aktif (Terhubung)' : 'Belum Diizinkan'}
                </strong>
              </span>
            </div>

            {browserNotificationPermission !== 'granted' && (
              <button
                type="button"
                onClick={requestBrowserNotificationPermission}
                className="px-3 py-1 bg-white text-blue-900 rounded-md font-semibold text-xs hover:bg-blue-50 transition-colors cursor-pointer shadow-xs"
              >
                Izinkan Push Browser
              </button>
            )}
          </div>

          {/* Filter tabs & Simulation Tools */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl text-xs font-medium text-slate-600">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
              >
                Semua ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('unread')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'unread' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
              >
                Belum Dibaca ({unreadNotificationCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('status')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'status' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
              >
                Status Lamaran
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('jobs')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'jobs' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
              >
                Lowongan Baru
              </button>
            </div>

            {/* Test push buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Uji Notifikasi:
              </span>
              <button
                type="button"
                onClick={simulateNewJobNotification}
                title="Simulasi Notifikasi Lowongan Baru Sesuai Skill"
                className="px-2 py-1 text-[11px] font-medium bg-white border border-slate-300 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
              >
                + Lowongan Match
              </button>
              <button
                type="button"
                onClick={simulateInterviewInviteNotification}
                title="Simulasi HR Mengirim Undangan Interview"
                className="px-2 py-1 text-[11px] font-medium bg-amber-50 border border-amber-300 rounded-md hover:bg-amber-100 text-amber-800 transition-colors"
              >
                + Panggilan Interview
              </button>
            </div>
          </div>

          {/* List of Notifications */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Bell className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
                <p className="text-sm font-medium text-slate-600">Tidak ada notifikasi di kategori ini</p>
                <p className="text-xs text-slate-400 mt-1">Anda akan menerima alert otomatis saat ada kabar terbaru.</p>
              </div>
            ) : (
              filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`pt-2.5 first:pt-0 p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 ${
                    notif.read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/60 hover:bg-blue-50 border border-blue-100/80 shadow-xs'
                  }`}
                >
                  {getNotifIcon(notif.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className={`text-sm leading-tight ${notif.read ? 'font-medium text-slate-800' : 'font-bold text-slate-900'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">{notif.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between">
                      {notif.actionText ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
                          {notif.actionText}
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      ) : <span />}

                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              Notifikasi bersuara & web push otomatis aktif
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-colors"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
