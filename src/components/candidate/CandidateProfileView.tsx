import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  Plus, 
  X, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Bell, 
  Check, 
  Award, 
  GraduationCap, 
  Briefcase,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CandidateProfileView: React.FC = () => {
  const { 
    candidate, 
    updateCandidate, 
    addSkillToCandidate, 
    removeSkillFromCandidate,
    browserNotificationPermission,
    requestBrowserNotificationPermission
  } = useApp();

  const [newSkillInput, setNewSkillInput] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(candidate.bio);
  const [headlineInput, setHeadlineInput] = useState(candidate.headline);
  const [salaryInput, setSalaryInput] = useState(candidate.expectedSalary.toString());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkillToCandidate(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  const handleSaveProfile = () => {
    updateCandidate({
      bio: bioInput,
      headline: headlineInput,
      expectedSalary: parseInt(salaryInput) || candidate.expectedSalary
    });
    setIsEditingBio(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-600 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white ring-2 ring-white" title="Verified Talent">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {candidate.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {candidate.availability}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {candidate.headline}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {candidate.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
            >
              {isEditingBio ? 'Batal Edit' : 'Edit Ringkasan Profil'}
            </button>
            <span className="text-[11px] text-slate-400">ID Kandidat: #{candidate.id}</span>
          </div>
        </div>

        {/* Edit Bio & Salary Form Drawer */}
        {isEditingBio && (
          <div className="mt-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Perbarui Informasi Profil
            </h4>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headline Profesional</label>
              <input
                type="text"
                value={headlineInput}
                onChange={(e) => setHeadlineInput(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target / Ekspektasi Gaji (IDR/Bulan)</label>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Pengalaman / Bio</label>
              <textarea
                rows={3}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profil berhasil diperbarui!</span>
          </div>
        )}

        {/* Bio Section */}
        {!isEditingBio && (
          <div className="pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Tentang & Ringkasan Keahlian
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {candidate.bio}
            </p>
          </div>
        )}
      </div>

      {/* Main Grid: Skills Manager & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skills & Certification Manager */}
        <div className="lg:col-span-7 space-y-6">
          {/* Skill Tags Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Keahlian & Kompetensi Anda ({candidate.skills.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tambahkan keahlian teknis untuk meningkatkan skor kecocokan dengan lowongan klien.
                </p>
              </div>
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Tambah keahlian baru (misal: Mikrotik, SAP, Brevet Pajak)..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </form>

            {/* List of Skills with Remove Button */}
            <div className="flex flex-wrap gap-2 pt-2">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold flex items-center gap-2 group hover:bg-blue-100 transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillFromCandidate(skill)}
                    className="text-blue-400 hover:text-red-600 transition-colors"
                    title={`Hapus ${skill}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Sertifikasi & Lisensi Resmi
            </h3>

            <div className="space-y-2">
              {candidate.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs font-semibold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: CV Document & Push Notification Preferences */}
        <div className="lg:col-span-5 space-y-6">
          {/* CV Attachment Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Dokumen Curriculum Vitae (CV)
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 text-red-600 font-bold text-xs">
                  PDF
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate max-w-[180px]">
                    {candidate.resumeFileName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {candidate.resumeFileSize} • Diperbarui {candidate.resumeLastUpdated}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                Aktif
              </span>
            </div>

            <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <span className="text-xs font-semibold text-slate-700 block">Unggah CV Versi Baru</span>
              <span className="text-[11px] text-slate-400">Format PDF atau DOCX (Maksimal 5MB)</span>
            </div>
          </div>

          {/* Push Notification Preferences Box */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold">Pengaturan Push Alert Perangkat</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dapatkan pemberitahuan seketika saat HR mengubah status lamaran Anda atau ada lowongan outsourcing baru yang cocok dengan keahlian Anda.
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold block">Status Push Browser:</span>
                <span className="text-[11px] text-emerald-400 font-semibold uppercase">
                  {browserNotificationPermission === 'granted' ? 'Telah Diizinkan ✓' : 'Belum Diizinkan'}
                </span>
              </div>

              {browserNotificationPermission !== 'granted' && (
                <button
                  type="button"
                  onClick={requestBrowserNotificationPermission}
                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Aktifkan Push
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
