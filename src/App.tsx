import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { NotificationSimulatorBar } from './components/NotificationSimulatorBar';
import { PushNotificationToast } from './components/PushNotificationToast';
import { JobFinder } from './components/candidate/JobFinder';
import { StatusTracker } from './components/candidate/StatusTracker';
import { CandidateProfileView } from './components/candidate/CandidateProfileView';
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { ApplicantTrackingSystem } from './components/recruiter/ApplicantTrackingSystem';
import { TalentPoolSearch } from './components/recruiter/TalentPoolSearch';
import { PostJobModal } from './components/recruiter/PostJobModal';
import { 
  Briefcase, 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle,
  Building2,
  ExternalLink
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    role, 
    activeCandidateTab, 
    activeRecruiterTab,
    applications,
    jobs
  } = useApp();

  const [postJobModalOpen, setPostJobModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans">
      {/* Top Interactive Simulation Bar */}
      <NotificationSimulatorBar />

      {/* Main Navigation Header */}
      <Header onOpenPostJobModal={() => setPostJobModalOpen(true)} />

      {/* Toast Alert Simulator */}
      <PushNotificationToast />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {role === 'candidate' ? (
          <div>
            {activeCandidateTab === 'jobs' && <JobFinder />}
            {activeCandidateTab === 'tracker' && <StatusTracker />}
            {activeCandidateTab === 'profile' && <CandidateProfileView />}
          </div>
        ) : (
          <div>
            {activeRecruiterTab === 'dashboard' && (
              <RecruiterDashboard onOpenPostJobModal={() => setPostJobModalOpen(true)} />
            )}
            {activeRecruiterTab === 'ats' && <ApplicantTrackingSystem />}
            {activeRecruiterTab === 'talents' && <TalentPoolSearch />}
          </div>
        )}
      </main>

      {/* Post Job Modal for Recruiters */}
      <PostJobModal
        isOpen={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
      />

      {/* Professional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              PK
            </div>
            <span className="font-bold text-slate-800">PenyalurKerja & Outsourcing Hub</span>
            <span className="text-slate-400">© 2026 • Platform Penyaluran Kerja & ATS Terintegrasi</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-600">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Push Notifikasi Aktif
            </span>
            <span>Kecocokan Keahlian Pintar</span>
            <span>ATS Real-time</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
