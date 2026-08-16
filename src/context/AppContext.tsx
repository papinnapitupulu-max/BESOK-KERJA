import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Job, 
  CandidateProfile, 
  Application, 
  ApplicationStatus, 
  PushNotificationItem, 
  UserRole,
  FilterOptions,
  InterviewSchedule,
  ContractOffer
} from '../types';
import { 
  INITIAL_CANDIDATE, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_TALENT_POOL 
} from '../data/mockData';
import { notificationService } from '../utils/notificationService';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  candidate: CandidateProfile;
  updateCandidate: (updated: Partial<CandidateProfile>) => void;
  addSkillToCandidate: (skill: string) => void;
  removeSkillFromCandidate: (skill: string) => void;
  
  jobs: Job[];
  addJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'applicantCount' | 'status'>) => void;
  getJobById: (id: string) => Job | undefined;
  
  applications: Application[];
  applyToJob: (jobId: string, coverNote?: string) => { success: boolean; message: string; applicationId?: string };
  updateApplicationStatus: (
    applicationId: string, 
    newStatus: ApplicationStatus, 
    note: string, 
    updatedBy?: string,
    interviewDetails?: InterviewSchedule,
    contractOffer?: ContractOffer
  ) => void;
  getApplicationByJobId: (jobId: string) => Application | undefined;
  
  talentPool: CandidateProfile[];
  
  notifications: PushNotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendPushNotification: (notif: Omit<PushNotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  
  activeToast: PushNotificationItem | null;
  dismissToast: () => void;
  
  browserNotificationPermission: NotificationPermission;
  requestBrowserNotificationPermission: () => Promise<void>;
  
  // Filter and Active Navigation
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  activeCandidateTab: 'jobs' | 'tracker' | 'profile' | 'notifications';
  setActiveCandidateTab: (tab: 'jobs' | 'tracker' | 'profile' | 'notifications') => void;
  activeRecruiterTab: 'dashboard' | 'ats' | 'talents' | 'post-job';
  setActiveRecruiterTab: (tab: 'dashboard' | 'ats' | 'talents' | 'post-job') => void;
  
  selectedJobForDetail: Job | null;
  setSelectedJobForDetail: (job: Job | null) => void;
  
  // Simulation Helpers
  simulateNewJobNotification: () => void;
  simulateInterviewInviteNotification: () => void;
  simulateStatusAdvancementNotification: () => void;
  
  // Utility
  calculateSkillMatch: (jobRequiredSkills: string[], candidateSkills: string[]) => { score: number; matched: string[]; missing: string[] };
}

const defaultFilters: FilterOptions = {
  searchQuery: '',
  category: 'Semua Kategori',
  location: 'Semua Lokasi',
  workType: '',
  minSalary: 0,
  maxSalary: 20000000,
  experienceLevel: '',
  onlyHighMatch: false,
  selectedSkill: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('candidate');
  const [candidate, setCandidate] = useState<CandidateProfile>(INITIAL_CANDIDATE);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [talentPool, setTalentPool] = useState<CandidateProfile[]>(INITIAL_TALENT_POOL);
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeToast, setActiveToast] = useState<PushNotificationItem | null>(null);
  const [browserNotificationPermission, setBrowserNotificationPermission] = useState<NotificationPermission>('default');
  
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [activeCandidateTab, setActiveCandidateTab] = useState<'jobs' | 'tracker' | 'profile' | 'notifications'>('jobs');
  const [activeRecruiterTab, setActiveRecruiterTab] = useState<'dashboard' | 'ats' | 'talents' | 'post-job'>('dashboard');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);

  useEffect(() => {
    setBrowserNotificationPermission(notificationService.getPermissionStatus());
  }, []);

  const calculateSkillMatch = (jobRequiredSkills: string[], candidateSkills: string[]) => {
    if (!jobRequiredSkills || jobRequiredSkills.length === 0) {
      return { score: 100, matched: [], missing: [] };
    }
    const matched: string[] = [];
    const missing: string[] = [];

    const normCandidateSkills = candidateSkills.map(s => s.toLowerCase().trim());

    jobRequiredSkills.forEach(req => {
      const isMatch = normCandidateSkills.some(cand => 
        cand.includes(req.toLowerCase().trim()) || req.toLowerCase().trim().includes(cand)
      );
      if (isMatch) {
        matched.push(req);
      } else {
        missing.push(req);
      }
    });

    const score = Math.min(100, Math.max(20, Math.round((matched.length / jobRequiredSkills.length) * 100)));
    return { score, matched, missing };
  };

  const updateCandidate = (updated: Partial<CandidateProfile>) => {
    setCandidate(prev => {
      const next = { ...prev, ...updated };
      setTalentPool(tp => tp.map(t => (t.id === next.id ? next : t)));
      return next;
    });
  };

  const addSkillToCandidate = (newSkill: string) => {
    const trimmed = newSkill.trim();
    if (!trimmed || candidate.skills.includes(trimmed)) return;
    updateCandidate({ skills: [...candidate.skills, trimmed] });
  };

  const removeSkillFromCandidate = (skillToRemove: string) => {
    updateCandidate({ skills: candidate.skills.filter(s => s !== skillToRemove) });
  };

  const getJobById = (id: string) => jobs.find(j => j.id === id);

  const getApplicationByJobId = (jobId: string) => applications.find(a => a.jobId === jobId && a.candidateId === candidate.id);

  const sendPushNotification = (notifData: Omit<PushNotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const now = new Date();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB, Hari Ini`;
    
    const newNotif: PushNotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: formattedTime,
      read: false,
      ...notifData
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);

    // Audio chime sound
    if (notifData.type === 'interview_invite' || notifData.type === 'contract_offer') {
      notificationService.playChime('invite');
    } else if (notifData.type === 'new_job') {
      notificationService.playChime('job');
    } else {
      notificationService.playChime('alert');
    }

    // Native browser notification
    notificationService.sendNativeNotification(notifData.title, {
      body: notifData.message,
    });
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const requestBrowserNotificationPermission = async () => {
    const perm = await notificationService.requestPermission();
    setBrowserNotificationPermission(perm);
    if (perm === 'granted') {
      sendPushNotification({
        type: 'system',
        title: '🔔 Push Notifikasi Berhasil Diaktifkan!',
        message: 'Anda akan menerima notifikasi instan saat ada lowongan baru yang cocok atau status lamaran Anda diperbarui oleh HR.',
        priority: 'high'
      });
    }
  };

  const applyToJob = (jobId: string, coverNote?: string) => {
    const existing = getApplicationByJobId(jobId);
    if (existing) {
      return { success: false, message: 'Anda sudah pernah melamar ke posisi ini.' };
    }

    const targetJob = getJobById(jobId);
    if (!targetJob) {
      return { success: false, message: 'Lowongan tidak ditemukan.' };
    }

    const { score, matched, missing } = calculateSkillMatch(targetJob.requiredSkills, candidate.skills);
    const nowStr = `${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      candidateId: candidate.id,
      appliedDate: nowStr,
      currentStatus: 'Lamaran Dikirim',
      matchScore: score,
      matchedSkills: matched,
      missingSkills: missing,
      coverNote: coverNote || 'Saya sangat tertarik dengan kesempatan ini dan siap ditempatkan segera.',
      statusHistory: [
        {
          id: `sh-${Date.now()}`,
          status: 'Lamaran Dikirim',
          timestamp: nowStr,
          title: 'Lamaran Terkirim ke Penyalur',
          note: `CV & Skor Kecocokan (${score}%) telah dikirimkan ke HR ${targetJob.agencyName}.`,
          updatedBy: 'Sistem Otomatis KaryaLink'
        }
      ],
      lastUpdated: nowStr
    };

    setApplications(prev => [newApp, ...prev]);

    // Update job applicant count
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicantCount: j.applicantCount + 1 } : j));

    // Send push notification confirmation
    sendPushNotification({
      type: 'status_update',
      title: '✅ Lamaran Terkirim!',
      message: `Lamaran untuk posisi "${targetJob.title}" di ${targetJob.clientPlacement} berhasil dikirim. Pantau perkembangannya di Pelacak Status.`,
      relatedJobId: jobId,
      relatedApplicationId: newApp.id,
      actionText: 'Lihat Status'
    });

    return { success: true, message: 'Lamaran berhasil dikirim!', applicationId: newApp.id };
  };

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: ApplicationStatus,
    note: string,
    updatedBy = 'HR Rekruter Penyalur',
    interviewDetails?: InterviewSchedule,
    contractOffer?: ContractOffer
  ) => {
    const nowStr = `${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const targetJob = getJobById(app.jobId);
      const titleMap: Record<ApplicationStatus, string> = {
        'Lamaran Dikirim': 'Lamaran Masuk',
        'Review Berkas': 'Lolos Verifikasi Berkas & Portofolio',
        'Screening HRD': 'Lolos Tahap Screening HR Penyalur',
        'Wawancara Klien': 'Undangan Wawancara / Ujian Teknis Bersama Klien',
        'Penawaran Kontrak': 'Surat Penawaran Kontrak Kerja (Offering Letter)',
        'Lolos / Penempatan': 'Selamat! Resmi Lolos & Siap Penempatan',
        'Ditolak': 'Proses Rekrutmen Belum Dapat Dilanjutkan'
      };

      const newHistoryItem = {
        id: `sh-${Date.now()}`,
        status: newStatus,
        timestamp: nowStr,
        title: titleMap[newStatus] || `Status: ${newStatus}`,
        note: note || `Status diperbarui menjadi ${newStatus}.`,
        updatedBy
      };

      // Trigger automatic push notification to candidate!
      let notifType: 'status_update' | 'interview_invite' | 'contract_offer' = 'status_update';
      if (newStatus === 'Wawancara Klien') notifType = 'interview_invite';
      if (newStatus === 'Penawaran Kontrak' || newStatus === 'Lolos / Penempatan') notifType = 'contract_offer';

      sendPushNotification({
        type: notifType,
        title: newStatus === 'Wawancara Klien' 
          ? `🎉 Undangan Wawancara: ${targetJob?.title || 'Posisi Rekrutmen'}`
          : newStatus === 'Penawaran Kontrak'
          ? `📄 Penawaran Kontrak: ${targetJob?.title || 'Posisi Rekrutmen'}`
          : `📢 Update Status Lamaran: ${newStatus}`,
        message: note || `Status lamaran Anda untuk ${targetJob?.clientPlacement || 'klien'} telah diperbarui menjadi ${newStatus}.`,
        relatedJobId: app.jobId,
        relatedApplicationId: app.id,
        actionText: 'Buka Dashboard Status',
        priority: newStatus === 'Wawancara Klien' || newStatus === 'Penawaran Kontrak' ? 'high' : 'normal'
      });

      return {
        ...app,
        currentStatus: newStatus,
        interviewSchedule: interviewDetails !== undefined ? interviewDetails : app.interviewSchedule,
        contractOffer: contractOffer !== undefined ? contractOffer : app.contractOffer,
        statusHistory: [newHistoryItem, ...app.statusHistory],
        lastUpdated: nowStr
      };
    }));
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'applicantCount' | 'status'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: 'Hari Ini',
      applicantCount: 0,
      status: 'Aktif'
    };

    setJobs(prev => [newJob, ...prev]);

    // Check if new job matches candidate skills
    const { score } = calculateSkillMatch(newJob.requiredSkills, candidate.skills);
    
    // Broadcast notification to candidate
    sendPushNotification({
      type: 'new_job',
      title: score >= 70 
        ? `🔥 Lowongan Baru Sangat Cocok (${score}% Match)!`
        : `💼 Lowongan Baru: ${newJob.title}`,
      message: `Posisi ${newJob.title} untuk penempatan ${newJob.clientPlacement} (${newJob.location}) baru saja dibuka oleh ${newJob.agencyName}.`,
      relatedJobId: newJob.id,
      actionText: 'Lihat Lowongan'
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Simulation handlers for instant interactive testing
  const simulateNewJobNotification = () => {
    const matchedJob = jobs[0];
    sendPushNotification({
      type: 'new_job',
      title: `✨ Lowongan Baru Sesuai Keahlian Anda (${matchedJob.title})`,
      message: `Klien ${matchedJob.clientPlacement} membutuhkan tenaga ${matchedJob.workType}. Keahlian Anda memiliki kecocokan tinggi!`,
      relatedJobId: matchedJob.id,
      actionText: 'Lamar Segera'
    });
  };

  const simulateInterviewInviteNotification = () => {
    const targetApp = applications[0];
    const targetJob = jobs.find(j => j.id === targetApp?.jobId) || jobs[0];

    updateApplicationStatus(
      targetApp?.id || 'app-501',
      'Wawancara Klien',
      'Klien PT Bank Central Asia Tbk mengundang Anda untuk sesi User & Technical Interview via Google Meet besok pukul 10:00 WIB.',
      'Bapak Ferry (Head of IT BCA)',
      {
        date: '2026-08-20',
        time: '10:00 - 11:00 WIB',
        type: 'Online (Google Meet / Zoom)',
        locationOrLink: 'https://meet.google.com/bca-interview-live',
        interviewerName: 'Tim User IT Bank BCA & Recruiter',
        notes: 'Silakan siapkan rangkuman pengalaman jaringan dan koneksi internet stabil.'
      }
    );
  };

  const simulateStatusAdvancementNotification = () => {
    const targetApp = applications[0];
    const targetJob = jobs.find(j => j.id === targetApp?.jobId) || jobs[0];

    updateApplicationStatus(
      targetApp?.id || 'app-501',
      'Penawaran Kontrak',
      'Selamat! Anda direkomendasikan untuk kontrak kerja outsourcing 12 bulan dengan penempatan penuh di Bank BCA Thamrin.',
      'Legal HR KaryaLink',
      undefined,
      {
        salaryOffered: 8500000,
        contractLength: '12 Bulan (Opsi Karyawan Tetap Klien)',
        startDate: '2026-09-01',
        clientPlacement: targetJob.clientPlacement,
        positionTitle: targetJob.title,
        benefitsSummary: 'Gaji Pokok Rp 8.500.000 + Asuransi Rawat Inap + Bonus Kinerja Triwulan'
      }
    );
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        candidate,
        updateCandidate,
        addSkillToCandidate,
        removeSkillFromCandidate,
        jobs,
        addJob,
        getJobById,
        applications,
        applyToJob,
        updateApplicationStatus,
        getApplicationByJobId,
        talentPool,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendPushNotification,
        activeToast,
        dismissToast,
        browserNotificationPermission,
        requestBrowserNotificationPermission,
        filters,
        setFilters,
        resetFilters,
        activeCandidateTab,
        setActiveCandidateTab,
        activeRecruiterTab,
        setActiveRecruiterTab,
        selectedJobForDetail,
        setSelectedJobForDetail,
        simulateNewJobNotification,
        simulateInterviewInviteNotification,
        simulateStatusAdvancementNotification,
        calculateSkillMatch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
