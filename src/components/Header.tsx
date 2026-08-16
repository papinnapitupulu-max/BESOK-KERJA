import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Bell, 
  Search, 
  Compass, 
  Clock, 
  UserCheck, 
  PlusCircle, 
  Building2, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationCenterModal } from './NotificationCenterModal';

interface HeaderProps {
  onOpenPostJobModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPostJobModal }) => {
  const { 
    role, 
    setRole, 
    unreadNotificationCount, 
    candidate,
    activeCandidateTab,
    setActiveCandidateTab,
    activeRecruiterTab,
    setActiveRecruiterTab,
    applications
  } = useApp();

  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Count active applications in progress
  const activeAppsCount = applications.filter(a => 
    a.currentStatus !== 'Ditolak' && a.currentStatus !== 'Lolos / Penempatan'
  ).length;

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                    Penyalur<span className="text-blue-600">Kerja</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
                    Outsourcing & ATS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Platform Penyalur Kerja & Manajemen Rekrutmen Pintar
                </p>
              </div>
            </div>

            {/* Middle Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === 'candidate'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Mode Pelamar</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === 'recruiter'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Perusahaan / HR ATS</span>
              </button>
            </div>

            {/* Right Actions: Notifications & User Profile */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Push Notification Center Trigger */}
              <button
                type="button"
                onClick={() => setIsNotifModalOpen(true)}
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-slate-200"
                title="Buka Pusat Notifikasi & Push Alert"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar / Info */}
              {role === 'candidate' ? (
                <div 
                  onClick={() => setActiveCandidateTab('profile')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                >
                  <img
                    src={candidate.avatar}
                    alt={candidate.fullName}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-none">{candidate.fullName.split(' ')[0]}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Siap Kerja</p>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => onOpenPostJobModal?.()}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Pasang Lowongan</span>
                </div>
              )}
            </div>
          </div>

          {/* Secondary Sub-navigation Bar */}
          <div className="flex items-center justify-between border-t border-slate-100 py-2.5 overflow-x-auto no-scrollbar">
            {role === 'candidate' ? (
              <nav className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCandidateTab('jobs')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeCandidateTab === 'jobs'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Cari Lowongan & Match Keahlian</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCandidateTab('tracker')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeCandidateTab === 'tracker'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pelacak Status Real-Time</span>
                  {activeAppsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-bold">
                      {activeAppsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCandidateTab('profile')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeCandidateTab === 'profile'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Profil & Keahlian Saya</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNotifModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pengaturan Push Alert</span>
                </button>
              </nav>
            ) : (
              <nav className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActiveRecruiterTab('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeRecruiterTab === 'dashboard'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Dashboard Rekrutmen</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRecruiterTab('ats')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeRecruiterTab === 'ats'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Sistem Manajemen Pelamar (ATS Pipeline)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRecruiterTab('talents')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeRecruiterTab === 'talents'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Database Talent Outsourcing</span>
                </button>
              </nav>
            )}

            {/* Quick Helper Badge */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real-Time Sync Aktif</span>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
      />
    </>
  );
};
