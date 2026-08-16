import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Send, 
  Sparkles, 
  FileText, 
  ShieldCheck,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const { 
    candidate, 
    applyToJob, 
    getApplicationByJobId, 
    calculateSkillMatch, 
    setActiveCandidateTab 
  } = useApp();

  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!job) return null;

  const existingApp = getApplicationByJobId(job.id);
  const { score, matched, missing } = calculateSkillMatch(job.requiredSkills, candidate.skills);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = applyToJob(job.id, coverNote);
      setIsSubmitting(false);
      setSubmitFeedback(res);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/30 border border-blue-400/40 text-blue-300">
                {job.workType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                {job.category}
              </span>
              {job.isUrgent && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/30 border border-rose-400/40 text-rose-300 animate-pulse">
                  Dibutuhkan Mendesak
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight text-white mb-2">
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 font-medium text-white">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Penyalur: {job.agencyName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Kontrak: {job.contractDuration}</span>
              </div>
            </div>

            {/* Placement Client Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                  Penempatan Langsung di Klien Rekanan:
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {job.clientPlacement}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-300 block">Kisaran Gaji:</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">
                  {formatIDR(job.salaryMin)} - {formatIDR(job.salaryMax)}
                </span>
              </div>
            </div>
          </div>

          {/* Skill Match Analysis Card */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Analisis Kesesuaian Keahlian Profil Anda
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                score >= 80 ? 'bg-emerald-100 text-emerald-800' : score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}>
                Skor Match: {score}%
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 mb-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-slate-400'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-emerald-700 block mb-1">
                  ✓ Keahlian yang Anda Miliki ({matched.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matched.length > 0 ? (
                    matched.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        {m}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">Belum ada skill yang cocok di profil.</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-amber-700 block mb-1">
                  ⚠ Keahlian Tambahan Lowongan Ini ({missing.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {missing.length > 0 ? (
                    missing.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                        {m}
                      </span>
                    ))
                  ) : (
                    <span className="text-emerald-600 font-semibold">Semua skill utama terpenuhi! 🌟</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Deskripsi Pekerjaan & Penempatan
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Tanggung Jawab Utama
              </h3>
              <ul className="space-y-1.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Kualifikasi & Persyaratan
              </h3>
              <ul className="space-y-1.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Fasilitas & Tunjangan Tenaga Kerja
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Section */}
            <div className="pt-4 border-t border-slate-200">
              {existingApp ? (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Anda Sudah Melamar Posisi Ini
                    </h4>
                    <p className="text-xs text-blue-700 mt-0.5">
                      Status Saat Ini: <strong>{existingApp.currentStatus}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setActiveCandidateTab('tracker');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Buka Pelacak Status
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Catatan Singkat / Alasan Melamar (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Jelaskan secara singkat kesiapan penempatan atau pengalaman relevan Anda..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-slate-500">
                      <span>CV Terlampir: </span>
                      <strong className="text-slate-800">{candidate.resumeFileName}</strong>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Mengirim Lamaran...' : 'Kirim Lamaran Sekarang'}</span>
                    </button>
                  </div>
                </form>
              )}

              {submitFeedback && (
                <div className={`mt-3 p-3 rounded-xl text-xs font-medium ${
                  submitFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {submitFeedback.message}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Dipublikasikan: {job.postedDate} • Kuota: {job.quota} orang</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
