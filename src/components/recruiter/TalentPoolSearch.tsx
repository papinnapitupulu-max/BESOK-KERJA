import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Phone, 
  Mail, 
  Send, 
  ShieldCheck, 
  Award, 
  SlidersHorizontal,
  Briefcase,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CandidateProfile } from '../../types';

export const TalentPoolSearch: React.FC = () => {
  const { talentPool, jobs, sendPushNotification } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('');
  const [selectedLocationFilter, setSelectedLocationFilter] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedJobToOffer, setSelectedJobToOffer] = useState<string>(jobs[0]?.id || '');
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);

  const allSkills = Array.from(new Set(talentPool.flatMap(c => c.skills)));

  const filteredTalents = talentPool.filter(cand => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = cand.fullName.toLowerCase().includes(q);
      const matchHeadline = cand.headline.toLowerCase().includes(q);
      const matchSkills = cand.skills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchHeadline && !matchSkills) return false;
    }
    if (selectedSkillFilter && !cand.skills.includes(selectedSkillFilter)) return false;
    if (selectedLocationFilter && !cand.location.toLowerCase().includes(selectedLocationFilter.toLowerCase())) return false;
    return true;
  });

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const targetJob = jobs.find(j => j.id === selectedJobToOffer);
    if (!targetJob || !selectedCandidate) return;

    // Send push notification simulation
    sendPushNotification({
      type: 'new_job',
      title: `💼 Penawaran Langsung: ${targetJob.title}`,
      message: `HR PT Karya Mandiri mengundang Anda secara khusus untuk melamar posisi di ${targetJob.clientPlacement} berdasarkan profil keahlian Anda.`,
      relatedJobId: targetJob.id,
      actionText: 'Lihat Penawaran'
    });

    setInviteFeedback(`Undangan lamaran untuk posisi "${targetJob.title}" berhasil dikirimkan ke ${selectedCandidate.fullName}!`);
    setTimeout(() => {
      setInviteFeedback(null);
      setInviteModalOpen(false);
    }, 2000);
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider inline-flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Database Talent Pool Outsourcing Terverifikasi
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Pencarian & Penyaluran Kandidat Siap Kerja
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Filter kandidat berdasarkan sertifikasi khusus (SIO, Brevet, Gada Pratama, MTCNA) dan tawarkan penempatan kerja langsung.
          </p>
        </div>

        {/* Search & Skill Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari keahlian, nama kandidat, sertifikasi..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedSkillFilter}
              onChange={(e) => setSelectedSkillFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
            >
              <option value="">Semua Keahlian Khusus</option>
              {allSkills.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedLocationFilter}
              onChange={(e) => setSelectedLocationFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
            >
              <option value="">Semua Wilayah</option>
              <option value="Jakarta">DKI Jakarta</option>
              <option value="Bekasi">Bekasi & Cikarang</option>
              <option value="Karawang">Karawang</option>
              <option value="Surabaya">Surabaya</option>
            </select>
          </div>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTalents.map(cand => (
          <div
            key={cand.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={cand.avatar}
                  alt={cand.fullName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {cand.fullName}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified" />
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{cand.headline}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {cand.availability}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                {cand.bio}
              </p>

              {/* Skills badges */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Keahlian Utama:
                </span>
                <div className="flex flex-wrap gap-1">
                  {cand.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications snippet */}
              {cand.certifications.length > 0 && (
                <div className="mt-3 text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded-xl border border-amber-200/60 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-medium truncate">{cand.certifications[0]}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="text-xs">
                <span className="text-[10px] text-slate-400 block">Ekspektasi Gaji:</span>
                <span className="font-extrabold text-slate-800">{formatIDR(cand.expectedSalary)}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCandidate(cand);
                  setInviteModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Tawarkan Lowongan</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Candidate Modal */}
      {inviteModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setInviteModalOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Tawarkan Lowongan ke {selectedCandidate.fullName}
              </h3>
              <button 
                type="button"
                onClick={() => setInviteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Lowongan Penempatan Klien</label>
                <select
                  value={selectedJobToOffer}
                  onChange={(e) => setSelectedJobToOffer(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>
                      {j.title} — {j.clientPlacement} ({j.location})
                    </option>
                  ))}
                </select>
              </div>

              {inviteFeedback ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                  {inviteFeedback}
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Undangan Push</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
