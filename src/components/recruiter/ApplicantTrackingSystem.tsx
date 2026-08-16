import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ChevronRight, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Video, 
  Send, 
  Building2, 
  Phone, 
  Mail, 
  X,
  Search,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus, InterviewSchedule, ContractOffer } from '../../types';

export const ApplicantTrackingSystem: React.FC = () => {
  const { 
    applications, 
    jobs, 
    talentPool, 
    updateApplicationStatus, 
    calculateSkillMatch 
  } = useApp();

  const [selectedAppForAction, setSelectedAppForAction] = useState<Application | null>(null);
  const [modalType, setModalType] = useState<'advance' | 'interview' | 'offer' | 'reject' | null>(null);

  // Form states for stage advance / interview / offer
  const [actionNote, setActionNote] = useState('');
  const [targetNextStatus, setTargetNextStatus] = useState<ApplicationStatus>('Review Berkas');
  
  // Interview form
  const [interviewDate, setInterviewDate] = useState('2026-08-22');
  const [interviewTime, setInterviewTime] = useState('10:00 WIB');
  const [interviewType, setInterviewType] = useState<'Online (Google Meet / Zoom)' | 'Tatap Muka (On-site di Kantor Klien)' | 'Psikotes & Skill Test'>('Online (Google Meet / Zoom)');
  const [interviewLink, setInterviewLink] = useState('https://meet.google.com/karyalink-interview-room');
  const [interviewerName, setInterviewerName] = useState('Tim User Klien & HR Penyalur');
  const [interviewNote, setInterviewNote] = useState('Harap siapkan portofolio & koneksi stabil.');

  // Offer form
  const [offeredSalary, setOfferedSalary] = useState('8000000');
  const [offeredContractLength, setOfferedContractLength] = useState('12 Bulan PKWT');
  const [offeredStartDate, setOfferedStartDate] = useState('2026-09-01');
  const [offeredBenefits, setOfferedBenefits] = useState('Gaji Pokok + BPJS Kesehatan & Ketenagakerjaan + Tunjangan Makan');

  const [filterJobId, setFilterJobId] = useState<string>('all');
  const [searchCand, setSearchCand] = useState('');

  const COLUMNS: { status: ApplicationStatus; title: string; color: string; badgeBg: string }[] = [
    { status: 'Lamaran Dikirim', title: '1. Lamaran Masuk', color: 'border-slate-300', badgeBg: 'bg-slate-100 text-slate-700' },
    { status: 'Review Berkas', title: '2. Review Berkas', color: 'border-blue-300', badgeBg: 'bg-blue-100 text-blue-800' },
    { status: 'Screening HRD', title: '3. Screening HR', color: 'border-indigo-300', badgeBg: 'bg-indigo-100 text-indigo-800' },
    { status: 'Wawancara Klien', title: '4. Wawancara Klien', color: 'border-amber-300', badgeBg: 'bg-amber-100 text-amber-800' },
    { status: 'Penawaran Kontrak', title: '5. Offering PKWT', color: 'border-purple-300', badgeBg: 'bg-purple-100 text-purple-800' },
    { status: 'Lolos / Penempatan', title: '6. Lolos / Penempatan', color: 'border-emerald-400', badgeBg: 'bg-emerald-100 text-emerald-800' }
  ];

  const filteredApps = applications.filter(app => {
    if (filterJobId !== 'all' && app.jobId !== filterJobId) return false;
    const cand = talentPool.find(c => c.id === app.candidateId);
    if (searchCand && cand && !cand.fullName.toLowerCase().includes(searchCand.toLowerCase())) return false;
    return true;
  });

  const handleOpenAdvanceModal = (app: Application, nextStatus: ApplicationStatus) => {
    setSelectedAppForAction(app);
    setTargetNextStatus(nextStatus);
    setActionNote(`Kandidat memenuhi kualifikasi untuk tahap ${nextStatus}.`);

    if (nextStatus === 'Wawancara Klien') {
      setModalType('interview');
    } else if (nextStatus === 'Penawaran Kontrak') {
      const job = jobs.find(j => j.id === app.jobId);
      if (job) {
        setOfferedSalary(job.salaryMin.toString());
        setOfferedContractLength(job.contractDuration);
      }
      setModalType('offer');
    } else {
      setModalType('advance');
    }
  };

  const handleConfirmAdvance = () => {
    if (!selectedAppForAction) return;

    if (modalType === 'interview') {
      const interviewSchedule: InterviewSchedule = {
        date: interviewDate,
        time: interviewTime,
        type: interviewType,
        locationOrLink: interviewLink,
        interviewerName,
        notes: interviewNote
      };
      updateApplicationStatus(
        selectedAppForAction.id,
        'Wawancara Klien',
        `Undangan wawancara teknis telah dijadwalkan pada ${interviewDate} pukul ${interviewTime}.`,
        'HR Rekruter Penyalur',
        interviewSchedule
      );
    } else if (modalType === 'offer') {
      const job = jobs.find(j => j.id === selectedAppForAction.jobId);
      const contractOffer: ContractOffer = {
        salaryOffered: parseInt(offeredSalary) || 7500000,
        contractLength: offeredContractLength,
        startDate: offeredStartDate,
        clientPlacement: job?.clientPlacement || 'Klien Korporat',
        positionTitle: job?.title || 'Posisi Rekrutmen',
        benefitsSummary: offeredBenefits
      };
      updateApplicationStatus(
        selectedAppForAction.id,
        'Penawaran Kontrak',
        `Surat penawaran kerja PKWT telah diterbitkan dengan gaji ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(contractOffer.salaryOffered)}.`,
        'Legal & HR Penyalur',
        undefined,
        contractOffer
      );
    } else if (modalType === 'reject') {
      updateApplicationStatus(
        selectedAppForAction.id,
        'Ditolak',
        actionNote || 'Kualifikasi belum sesuai dengan kebutuhan saat ini.',
        'HR Rekruter'
      );
    } else {
      updateApplicationStatus(
        selectedAppForAction.id,
        targetNextStatus,
        actionNote,
        'HR Rekruter'
      );
    }

    setModalType(null);
    setSelectedAppForAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Title & Filters */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider inline-flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Sistem Manajemen Pelamar (ATS Pipeline)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Pipeline Rekrutmen & Penyaluran Tenaga Kerja
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Kelola proses seleksi kandidat secara real-time. Setiap pemindahan status akan otomatis mengirimkan push notifikasi ke perangkat pelamar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
              Total {filteredApps.length} Lamaran Terdata
            </span>
          </div>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchCand}
              onChange={(e) => setSearchCand(e.target.value)}
              placeholder="Cari nama pelamar..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-6">
            <select
              value={filterJobId}
              onChange={(e) => setFilterJobId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="all">Semua Lowongan Penempatan</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title} ({j.clientPlacement})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col, colIdx) => {
          const colApps = filteredApps.filter(a => a.currentStatus === col.status);

          return (
            <div
              key={col.status}
              className="bg-slate-100/80 rounded-3xl p-3.5 border border-slate-200 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${col.badgeBg}`}>
                  {col.title}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  {colApps.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {colApps.length === 0 ? (
                  <div className="p-4 text-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-xs mt-2">
                    Kosong
                  </div>
                ) : (
                  colApps.map(app => {
                    const cand = talentPool.find(c => c.id === app.candidateId);
                    const job = jobs.find(j => j.id === app.jobId);

                    return (
                      <div
                        key={app.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3"
                      >
                        {/* Candidate avatar & Match */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={cand?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                              alt={cand?.fullName}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                {cand?.fullName || 'Kandidat'}
                              </h4>
                              <p className="text-[11px] text-slate-500 truncate max-w-[120px]">
                                {cand?.headline || 'Spesialis'}
                              </p>
                            </div>
                          </div>

                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            app.matchScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {app.matchScore}%
                          </span>
                        </div>

                        {/* Job Position Info */}
                        <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Posisi / Klien:</span>
                          <p className="font-semibold text-slate-800 line-clamp-1">{job?.title}</p>
                          <p className="text-[11px] text-blue-600 font-medium">{job?.clientPlacement}</p>
                        </div>

                        {/* Candidate Skills Match Snippet */}
                        <div className="flex flex-wrap gap-1">
                          {app.matchedSkills.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                              ✓ {s}
                            </span>
                          ))}
                        </div>

                        {/* Stage Actions */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                          {colIdx < COLUMNS.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => handleOpenAdvanceModal(app, COLUMNS[colIdx + 1].status)}
                              className="flex-1 py-1.5 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>Lanjut Tahap</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="flex-1 py-1.5 text-center text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                              ✓ Selesai & Ditempatkan
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAppForAction(app);
                              setModalType('reject');
                            }}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Tolak Lamaran"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Modal (Advance / Interview / Offer / Reject) */}
      <AnimatePresence>
        {modalType && selectedAppForAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {modalType === 'interview' ? 'Jadwalkan Wawancara Klien' : modalType === 'offer' ? 'Terbitkan Offering Kontrak PKWT' : modalType === 'reject' ? 'Tolak Lamaran' : `Pindahkan ke: ${targetNextStatus}`}
                    </h3>
                    <p className="text-xs text-slate-500">Notifikasi otomatis akan dikirimkan ke pelamar</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content depending on type */}
              {modalType === 'interview' ? (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tanggal Wawancara</label>
                      <input
                        type="date"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Waktu</label>
                      <input
                        type="text"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                        placeholder="Contoh: 10:00 WIB"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Metode Wawancara</label>
                    <select
                      value={interviewType}
                      onChange={(e) => setInterviewType(e.target.value as unknown as typeof interviewType)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Online (Google Meet / Zoom)">Online (Google Meet / Zoom)</option>
                      <option value="Tatap Muka (On-site di Kantor Klien)">Tatap Muka (On-site di Kantor Klien)</option>
                      <option value="Psikotes & Skill Test">Psikotes & Skill Test</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Link Meeting / Lokasi Kantor</label>
                    <input
                      type="text"
                      value={interviewLink}
                      onChange={(e) => setInterviewLink(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Tim Interviewer Klien</label>
                    <input
                      type="text"
                      value={interviewerName}
                      onChange={(e) => setInterviewerName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Petunjuk untuk Kandidat</label>
                    <textarea
                      rows={2}
                      value={interviewNote}
                      onChange={(e) => setInterviewNote(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              ) : modalType === 'offer' ? (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Gaji Ditawarkan (IDR/Bulan)</label>
                      <input
                        type="number"
                        value={offeredSalary}
                        onChange={(e) => setOfferedSalary(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Durasi Kontrak</label>
                      <input
                        type="text"
                        value={offeredContractLength}
                        onChange={(e) => setOfferedContractLength(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tanggal Mulai Bekerja</label>
                    <input
                      type="date"
                      value={offeredStartDate}
                      onChange={(e) => setOfferedStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ringkasan Benefit & Tunjangan</label>
                    <textarea
                      rows={2}
                      value={offeredBenefits}
                      onChange={(e) => setOfferedBenefits(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Catatan Evaluasi Rekruter</label>
                    <textarea
                      rows={3}
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      placeholder="Masukkan catatan alasan pemindahan status..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAdvance}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simpan & Kirim Notifikasi Push</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
