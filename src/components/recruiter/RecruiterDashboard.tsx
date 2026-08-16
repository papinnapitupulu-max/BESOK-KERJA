import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  PlusCircle, 
  Clock, 
  Building2, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RecruiterDashboardProps {
  onOpenPostJobModal: () => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onOpenPostJobModal }) => {
  const { 
    jobs, 
    applications, 
    talentPool, 
    setActiveRecruiterTab,
    setSelectedJobForDetail 
  } = useApp();

  const totalJobs = jobs.length;
  const totalApplicants = applications.length;
  const interviewCount = applications.filter(a => a.currentStatus === 'Wawancara Klien').length;
  const placedCount = applications.filter(a => a.currentStatus === 'Lolos / Penempatan').length;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 border border-white/30 uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            Portal Penyalur Kerja & Rekrutmen Klien
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Manajemen Talenta & Outsourcing
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            Pantau kebutuhan penempatan tenaga kerja, jadwalkan wawancara klien, dan distribusikan lowongan kerja secara instan ke kandidat terverifikasi.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenPostJobModal}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Pasang Lowongan Baru</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRecruiterTab('ats')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              <span>Buka Pipeline ATS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lowongan Dibuka</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalJobs} Posisi</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              100% Aktif Disalurkan
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Lamaran Masuk</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalApplicants} Berkas</h3>
            <span className="text-[11px] text-blue-600 font-semibold">Real-time update</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tahap Wawancara</span>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{interviewCount} Kandidat</h3>
            <span className="text-[11px] text-amber-700 font-semibold">Jadwal interview aktif</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ditempatkan (Placed)</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{placedCount} Karyawan</h3>
            <span className="text-[11px] text-emerald-700 font-semibold">Terkontrak resmi PKWT</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Active Client Job Openings & Quick Candidate Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Job Openings */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Lowongan Penyaluran Klien yang Sedang Aktif ({jobs.length})
            </h2>
            <button
              type="button"
              onClick={onOpenPostJobModal}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>+ Buat Lowongan Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map(job => {
              const jobApps = applications.filter(a => a.jobId === job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                        {job.category}
                      </span>
                      <span className="text-xs text-slate-400">• Kuota: {job.quota} Personil</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-medium text-blue-600">Klien: {job.clientPlacement}</span>
                      <span>Lokasi: {job.location}</span>
                      <span className="text-emerald-700 font-bold">{formatIDR(job.salaryMin)} - {formatIDR(job.salaryMax)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Pelamar:</span>
                      <span className="text-sm font-bold text-slate-800">{jobApps.length} Berkas</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveRecruiterTab('ats')}
                      className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Kelola di ATS
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Verified Talent Database Preview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Talent Pool Siap Kerja
            </h2>
            <button
              type="button"
              onClick={() => setActiveRecruiterTab('talents')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3">
            {talentPool.slice(0, 4).map(cand => (
              <div
                key={cand.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.fullName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {cand.fullName}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {cand.headline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cand.skills.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-500">
                  <span>{cand.location.split(',')[0]}</span>
                  <span className="font-semibold text-emerald-600">{cand.availability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
