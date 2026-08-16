import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  FileText, 
  Building2, 
  MapPin, 
  Video, 
  ExternalLink, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Send,
  UserCheck,
  Award,
  CircleDot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';

export const StatusTracker: React.FC = () => {
  const { 
    applications, 
    jobs, 
    candidate, 
    setActiveCandidateTab, 
    setSelectedJobForDetail 
  } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string | null>(applications[0]?.id || null);

  const STAGES: { status: ApplicationStatus; label: string; desc: string }[] = [
    { status: 'Lamaran Dikirim', label: '1. Berkas Masuk', desc: 'CV & portofolio diterima oleh sistem penyalur' },
    { status: 'Review Berkas', label: '2. Review Dokumen', desc: 'Verifikasi kecocokan skill & sertifikasi keahlian' },
    { status: 'Screening HRD', label: '3. Screening HR', desc: 'Evaluasi kesiapan kerja & ekspektasi penempatan' },
    { status: 'Wawancara Klien', label: '4. Wawancara Klien', desc: 'Wawancara teknis / psikotes bersama perusahaan rekanan' },
    { status: 'Penawaran Kontrak', label: '5. Offering PKWT', desc: 'Peninjauan gaji, benefit, dan draft kontrak kerja' },
    { status: 'Lolos / Penempatan', label: '6. Aktif Bekerja', desc: 'Resmi ditempatkan dan mulai bertugas di klien' },
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    if (status === 'Ditolak') return -1;
    return STAGES.findIndex(s => s.status === status);
  };

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];
  const relatedJob = selectedApp ? jobs.find(j => j.id === selectedApp.jobId) : null;
  const currentStageIndex = selectedApp ? getStageIndex(selectedApp.currentStatus) : 0;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs max-w-2xl mx-auto my-8">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Belum Ada Lamaran Aktif</h2>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          Anda belum mengirim lamaran kerja. Jelajahi lowongan yang sesuai dengan keahlian Anda untuk memulai.
        </p>
        <button
          type="button"
          onClick={() => setActiveCandidateTab('jobs')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2"
        >
          <span>Cari Lowongan Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title & Real-time Live Badge */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Pelacak Status Real-Time
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Terhubung Langsung ke Sistem HR Klien</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Pelacakan Status Lamaran
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pantau setiap tahapan rekrutmen outsourcing Anda dari review berkas hingga penempatan kerja.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200/80">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Total Dilamar</span>
            <span className="text-base font-extrabold text-slate-800">{applications.length} Posisi</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Application Selector List & Detailed Tracker Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Application Tabs / List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Daftar Lamaran Anda ({applications.length})
          </h3>

          {applications.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            const isSelected = app.id === selectedApp?.id;

            return (
              <div
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`p-4 rounded-2xl transition-all cursor-pointer border text-left ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md border-blue-600'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {job?.workType || 'Kontrak'}
                  </span>
                  
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    app.currentStatus === 'Lolos / Penempatan'
                      ? isSelected ? 'bg-emerald-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                      : app.currentStatus === 'Wawancara Klien'
                      ? isSelected ? 'bg-amber-300 text-slate-900' : 'bg-amber-100 text-amber-800'
                      : app.currentStatus === 'Penawaran Kontrak'
                      ? isSelected ? 'bg-indigo-300 text-slate-900' : 'bg-indigo-100 text-indigo-800'
                      : isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {app.currentStatus}
                  </span>
                </div>

                <h4 className="text-sm font-bold leading-snug line-clamp-1 mb-1">
                  {job?.title || 'Posisi Rekrutmen'}
                </h4>

                <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'} mb-2`}>
                  Klien: <strong>{job?.clientPlacement}</strong>
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/15">
                  <span className={isSelected ? 'text-blue-200' : 'text-slate-400'}>
                    Update: {app.lastUpdated.split(',')[0]}
                  </span>
                  <span className="font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Match: {app.matchScore}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Real-Time Progress Visualizer */}
        <div className="lg:col-span-8 space-y-5">
          {selectedApp && relatedJob && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700">
                      {relatedJob.category}
                    </span>
                    <span className="text-xs text-slate-400">• Dilamar pada {selectedApp.appliedDate}</span>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900">
                    {relatedJob.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      Klien: {relatedJob.clientPlacement}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {relatedJob.location}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Status Terkini:</span>
                  <span className={`inline-block px-3 py-1 rounded-xl text-xs font-extrabold mt-1 ${
                    selectedApp.currentStatus === 'Lolos / Penempatan'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedApp.currentStatus === 'Wawancara Klien'
                      ? 'bg-amber-100 text-amber-800'
                      : selectedApp.currentStatus === 'Penawaran Kontrak'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedApp.currentStatus}
                  </span>
                </div>
              </div>

              {/* Visual Multi-Step Pipeline Stepper */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Tahapan Rekrutmen & Penempatan Tenaga Kerja
                </h3>

                <div className="relative">
                  <div className="space-y-4">
                    {STAGES.map((stage, idx) => {
                      const isCompleted = currentStageIndex > idx || selectedApp.currentStatus === 'Lolos / Penempatan';
                      const isCurrent = currentStageIndex === idx && selectedApp.currentStatus !== 'Lolos / Penempatan';

                      return (
                        <div
                          key={stage.status}
                          className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                            isCurrent
                              ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                              : isCompleted
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : 'bg-slate-50 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                            isCurrent
                              ? 'bg-blue-600 text-white animate-pulse'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            ) : isCurrent ? (
                              <CircleDot className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className={`text-sm font-bold ${
                                isCurrent ? 'text-blue-950' : isCompleted ? 'text-emerald-950' : 'text-slate-700'
                              }`}>
                                {stage.label}
                              </h4>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                                  Tahap Sedang Berjalan
                                </span>
                              )}
                              {isCompleted && (
                                <span className="text-[11px] font-bold text-emerald-700">
                                  ✓ Selesai & Lolos
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {stage.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Special Dynamic Card: Interview Invite Details */}
              {selectedApp.interviewSchedule && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/80">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                          Jadwal Wawancara Klien Terkonfirmasi
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                          {selectedApp.interviewSchedule.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-3">
                        <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">Tanggal & Waktu:</span>
                          <span className="font-bold text-slate-800 text-sm">
                            {selectedApp.interviewSchedule.date} • {selectedApp.interviewSchedule.time}
                          </span>
                        </div>
                        <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">Pewawancara:</span>
                          <span className="font-bold text-slate-800 text-sm">
                            {selectedApp.interviewSchedule.interviewerName}
                          </span>
                        </div>
                      </div>

                      {selectedApp.interviewSchedule.notes && (
                        <p className="text-xs text-amber-900 mt-2.5 bg-white/60 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                          <strong>Catatan HR:</strong> {selectedApp.interviewSchedule.notes}
                        </p>
                      )}

                      {selectedApp.interviewSchedule.locationOrLink && (
                        <div className="mt-3">
                          <a
                            href={selectedApp.interviewSchedule.locationOrLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                          >
                            <Video className="w-4 h-4" />
                            <span>Buka Ruang Wawancara Online</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Special Dynamic Card: Contract Offering Letter */}
              {selectedApp.contractOffer && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-xs">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 block mb-1">
                        Draft Surat Penawaran Kerja (Offering Letter PKWT)
                      </span>
                      <p className="text-xs text-emerald-800 mb-3">
                        Selamat! Klien menyetujui kualifikasi Anda. Berikut rincian penawaran kerja outsourcing:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">Gaji Ditawarkan:</span>
                          <span className="font-extrabold text-emerald-700 text-base">
                            {formatIDR(selectedApp.contractOffer.salaryOffered)} / Bulan
                          </span>
                        </div>
                        <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">Durasi Kontrak:</span>
                          <span className="font-bold text-slate-800 text-sm">
                            {selectedApp.contractOffer.contractLength}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 bg-white/80 p-3 rounded-xl border border-emerald-200 text-xs text-slate-700">
                        <p><strong>Fasilitas & Tunjangan:</strong> {selectedApp.contractOffer.benefitsSummary}</p>
                        <p className="mt-1"><strong>Mulai Masuk Kerja:</strong> {selectedApp.contractOffer.startDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Audit Logs / Timeline History */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Riwayat Aktivitas & Catatan Rekruter
                </h3>

                <div className="space-y-3">
                  {selectedApp.statusHistory.map(hist => (
                    <div key={hist.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-800">{hist.title}</span>
                          <span className="text-[10px] text-slate-400">{hist.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{hist.note}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Oleh: {hist.updatedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
