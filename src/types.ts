export type UserRole = 'candidate' | 'recruiter';

export type WorkType = 'Kontrak Outsourcing' | 'Full-time' | 'Project-based' | 'Magang / Trainee';

export type JobCategory = 
  | 'Teknologi & IT'
  | 'Logistik & Gudang'
  | 'Administrasi & Keuangan'
  | 'Sales & Marketing'
  | 'Manufaktur & Pabrik'
  | 'Customer Service & BPO'
  | 'Fasilitas & Keamanan';

export type ExperienceLevel = 'Fresh Graduate' | '1-3 Tahun' | '3-5 Tahun' | '>5 Tahun';

export type ApplicationStatus =
  | 'Lamaran Dikirim'
  | 'Review Berkas'
  | 'Screening HRD'
  | 'Wawancara Klien'
  | 'Penawaran Kontrak'
  | 'Lolos / Penempatan'
  | 'Ditolak';

export interface Job {
  id: string;
  title: string;
  agencyName: string;
  clientPlacement: string; // Klien Penempatan Outsourcing (e.g. PT Bank Central Asia, Tokopedia Warehouse, PT Astra International)
  clientLogo?: string;
  location: string;
  category: JobCategory;
  workType: WorkType;
  contractDuration: string; // e.g. "12 Bulan (Bisa Perpanjang)", "6 Bulan Project", "Permanen"
  salaryMin: number;
  salaryMax: number;
  currency: string;
  requiredSkills: string[];
  niceToHaveSkills?: string[];
  experienceLevel: ExperienceLevel;
  educationMin: string;
  quota: number;
  applicantCount: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
  status: 'Aktif' | 'Tutup';
  isUrgent?: boolean;
}

export interface CandidateWorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  isOutsource?: boolean;
}

export interface CandidateEducation {
  id: string;
  degree: string;
  institution: string;
  year: string;
  major: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  avatar: string;
  location: string;
  bio: string;
  expectedSalary: number;
  skills: string[];
  experience: CandidateWorkExperience[];
  education: CandidateEducation[];
  certifications: string[];
  languages: string[];
  resumeFileName: string;
  resumeFileSize: string;
  resumeLastUpdated: string;
  availability: 'Siap Kerja Segera' | 'Pemberitahuan 1 Bulan' | 'Sedang Bekerja / Open to Offer';
  preferredCategories: JobCategory[];
  preferredLocations: string[];
  allowPushNotifications: boolean;
}

export interface StatusHistoryItem {
  id: string;
  status: ApplicationStatus;
  timestamp: string;
  title: string;
  note: string;
  updatedBy: string;
}

export interface InterviewSchedule {
  date: string; // e.g. "2026-08-20"
  time: string; // e.g. "10:00 WIB"
  type: 'Online (Google Meet / Zoom)' | 'Tatap Muka (On-site di Kantor Klien)' | 'Psikotes & Skill Test';
  locationOrLink: string;
  interviewerName: string;
  notes: string;
}

export interface ContractOffer {
  salaryOffered: number;
  contractLength: string;
  startDate: string;
  clientPlacement: string;
  positionTitle: string;
  benefitsSummary: string;
  documentUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  appliedDate: string;
  currentStatus: ApplicationStatus;
  statusHistory: StatusHistoryItem[];
  matchScore: number; // calculated match %
  matchedSkills: string[];
  missingSkills: string[];
  coverNote?: string;
  interviewSchedule?: InterviewSchedule;
  contractOffer?: ContractOffer;
  recruiterNotes?: string;
  lastUpdated: string;
}

export type NotificationType = 'status_update' | 'new_job' | 'interview_invite' | 'contract_offer' | 'system';

export interface PushNotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedJobId?: string;
  relatedApplicationId?: string;
  actionText?: string;
  priority?: 'high' | 'normal';
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  location: string;
  workType: string;
  minSalary: number;
  maxSalary: number;
  experienceLevel: string;
  onlyHighMatch: boolean;
  selectedSkill: string;
}
