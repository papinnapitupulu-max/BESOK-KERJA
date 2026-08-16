import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Sparkles, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Send,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobCategory, WorkType, ExperienceLevel } from '../../types';
import { JOB_CATEGORIES, INDONESIA_LOCATIONS } from '../../data/mockData';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const { addJob } = useApp();

  const [title, setTitle] = useState('');
  const [agencyName, setAgencyName] = useState('PT Karya Mandiri Outsource Solution');
  const [clientPlacement, setClientPlacement] = useState('');
  const [location, setLocation] = useState('Jakarta Selatan, DKI Jakarta');
  const [category, setCategory] = useState<JobCategory>('Teknologi & IT');
  const [workType, setWorkType] = useState<WorkType>('Kontrak Outsourcing');
  const [contractDuration, setContractDuration] = useState('12 Bulan (Bisa Perpanjang)');
  const [salaryMin, setSalaryMin] = useState('6500000');
  const [salaryMax, setSalaryMax] = useState('8500000');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('1-3 Tahun');
  const [educationMin, setEducationMin] = useState('D3/S1 Sederajat');
  const [quota, setQuota] = useState('5');
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('IT Support, Troubleshooting Hardware, Mikrotik');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    addJob({
      title,
      agencyName,
      clientPlacement: clientPlacement || 'Klien Korporat Mitra',
      location,
      category,
      workType,
      contractDuration,
      salaryMin: parseInt(salaryMin) || 5000000,
      salaryMax: parseInt(salaryMax) || 7500000,
      currency: 'IDR',
      requiredSkills: skillsArray.length > 0 ? skillsArray : ['Komunikasi', 'Microsoft Office'],
      experienceLevel,
      educationMin,
      quota: parseInt(quota) || 1,
      description: description || `Dibutuhkan tenaga profesional posisi ${title} untuk penempatan langsung di ${clientPlacement}.`,
      responsibilities: [
        `Melaksanakan tugas operasional ${title} sesuai SOP klien.`,
        'Melaporkan progres harian kepada supervisor penempatan.',
        'Menjaga standar kualitas dan keselamatan kerja K3.'
      ],
      requirements: [
        `Pendidikan minimal ${educationMin}.`,
        `Pengalaman di bidang terkait minimal ${experienceLevel}.`,
        'Memiliki etos kerja tinggi, disiplin, dan siap bekerja dalam tim.'
      ],
      benefits: [
        'Gaji Pokok sesuai UMR/UMK + Tunjangan Keahlian',
        'BPJS Kesehatan & BPJS Ketenagakerjaan Penuh',
        'Tunjangan Hari Raya (THR) & Insentif Prestasi'
      ],
      isUrgent
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
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
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Publikasikan Lowongan Outsourcing Baru
                </h2>
                <p className="text-xs text-slate-500">
                  Otomatis kirimkan push alert ke kandidat yang keahliannya sesuai
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Lowongan Berhasil Dipublikasikan!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Push notifikasi instan telah disiarkan ke kandidat dengan kecocokan skill yang relevan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Posisi Pekerjaan *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: IT Support Officer, Operator Reach Truck, Staff Pajak"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Klien Penempatan Outsourcing *</label>
                  <input
                    type="text"
                    required
                    value={clientPlacement}
                    onChange={(e) => setClientPlacement(e.target.value)}
                    placeholder="Contoh: PT Bank BCA Thamrin, Shopee Hub Bekasi"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Kerja *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Bidang</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JobCategory)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {JOB_CATEGORIES.slice(1).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durasi Kontrak</label>
                  <input
                    type="text"
                    value={contractDuration}
                    onChange={(e) => setContractDuration(e.target.value)}
                    placeholder="Contoh: 12 Bulan (Bisa Perpanjang)"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gaji Minimum (IDR)</label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gaji Maksimum (IDR)</label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kuota Kebutuhan (Orang)</label>
                  <input
                    type="number"
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Keahlian yang Dibutuhkan (Pisahkan dengan koma) *
                </label>
                <input
                  type="text"
                  required
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="Contoh: IT Support, Mikrotik, Cisco, Active Directory"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Keahlian ini digunakan oleh sistem untuk mencocokkan profil pelamar secara otomatis.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan kebutuhan peran dan tanggung jawab penempatan..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isUrgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="isUrgent" className="font-semibold text-slate-700 cursor-pointer">
                  Tandai sebagai Lowongan Mendesak (Urgent Hiring) 🔥
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Pasang & Siarkan Push Notifikasi</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
