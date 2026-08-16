import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  Filter, 
  Sparkles, 
  ChevronRight, 
  Briefcase, 
  SlidersHorizontal,
  Flame,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Job, JobCategory } from '../../types';
import { JOB_CATEGORIES, INDONESIA_LOCATIONS } from '../../data/mockData';
import { JobDetailModal } from './JobDetailModal';

export const JobFinder: React.FC = () => {
  const { 
    jobs, 
    candidate, 
    filters, 
    setFilters, 
    resetFilters,
    calculateSkillMatch,
    getApplicationByJobId,
    selectedJobForDetail,
    setSelectedJobForDetail
  } = useApp();

  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Filter and sort jobs based on filter options and skill match
  const filteredJobs = jobs.filter(job => {
    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.agencyName.toLowerCase().includes(q) || job.clientPlacement.toLowerCase().includes(q);
      const matchSkill = job.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchSkill) return false;
    }

    // Category
    if (filters.category && filters.category !== 'Semua Kategori' && job.category !== filters.category) {
      return false;
    }

    // Location
    if (filters.location && filters.location !== 'Semua Lokasi' && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Work Type
    if (filters.workType && job.workType !== filters.workType) {
      return false;
    }

    // High match only
    if (filters.onlyHighMatch) {
      const { score } = calculateSkillMatch(job.requiredSkills, candidate.skills);
      if (score < 70) return false;
    }

    // Selected skill tag
    if (filters.selectedSkill && !job.requiredSkills.includes(filters.selectedSkill)) {
      return false;
    }

    return true;
  });

  // Calculate high match count for quick toggle
  const highMatchCount = jobs.filter(j => calculateSkillMatch(j.requiredSkills, candidate.skills).score >= 70).length;

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200">
        <div className="max-w-3xl mb-5">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Pencocokan Keahlian Otomatis
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Temukan Lowongan Outsourcing Sesuai Keahlian Anda
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sistem otomatis menghitung persentase kecocokan skill profil Anda dengan kebutuhan klien korporat.
          </p>
        </div>

        {/* Search & Location Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Cari posisi, keahlian (contoh: IT Support, Forklift, Accurate)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="md:col-span-4 relative">
            <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              {INDONESIA_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className={`w-full py-3 px-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                showFiltersMobile || filters.onlyHighMatch || filters.category !== 'Semua Kategori'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, onlyHighMatch: !prev.onlyHighMatch }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                filters.onlyHighMatch
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cocok Tingkat Tinggi (70%+)</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-700/30 text-[10px]">{highMatchCount}</span>
            </button>

            {/* Category horizontal scroll/chips */}
            {JOB_CATEGORIES.slice(1, 5).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat ? 'Semua Kategori' : cat }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  filters.category === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(filters.searchQuery || filters.category !== 'Semua Kategori' || filters.location !== 'Semua Lokasi' || filters.onlyHighMatch || filters.workType) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Expanded Filters Drawer */}
        {showFiltersMobile && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Pekerjaan</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                {JOB_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tipe Kontrak Penyalur</label>
              <select
                value={filters.workType}
                onChange={(e) => setFilters(prev => ({ ...prev, workType: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="">Semua Tipe Kontrak</option>
                <option value="Kontrak Outsourcing">Kontrak Outsourcing</option>
                <option value="Full-time">Full-time</option>
                <option value="Project-based">Project-based</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Filter Berdasarkan Skill Anda</label>
              <select
                value={filters.selectedSkill}
                onChange={(e) => setFilters(prev => ({ ...prev, selectedSkill: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="">Semua Keahlian</option>
                {candidate.skills.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-2">
        <span>Menampilkan <strong>{filteredJobs.length}</strong> lowongan outsourcing tersedia</span>
        <span className="text-slate-400">Diperbarui real-time</span>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="md:col-span-2 py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada lowongan yang sesuai kriteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Coba reset filter atau ubah kata kunci pencarian Anda untuk melihat peluang kerja lainnya.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          filteredJobs.map(job => {
            const { score, matched } = calculateSkillMatch(job.requiredSkills, candidate.skills);
            const applied = getApplicationByJobId(job.id);

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobForDetail(job)}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Match score ribbon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                      {job.category}
                    </span>
                    {job.isUrgent && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-600" />
                        Mendesak
                      </span>
                    )}
                  </div>

                  {/* Smart Skill Match Badge */}
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs ${
                    score >= 80 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : score >= 50 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{score}% Match</span>
                  </div>
                </div>

                {/* Job Title & Client Placement */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {job.title}
                  </h3>

                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Klien: <strong>{job.clientPlacement}</strong></span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.contractDuration}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags preview */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.requiredSkills.slice(0, 4).map((skill, sIdx) => {
                      const isMatch = matched.includes(skill);
                      return (
                        <span
                          key={sIdx}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                            isMatch
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isMatch ? '✓ ' : ''}{skill}
                        </span>
                      );
                    })}
                    {job.requiredSkills.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium self-center">
                        +{job.requiredSkills.length - 4} skill lainnya
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer with Salary & Apply CTA */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                      Gaji / Tunjangan:
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-700">
                      {formatIDR(job.salaryMin)} - {formatIDR(job.salaryMax)}
                    </span>
                  </div>

                  {applied ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                      {applied.currentStatus}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJobForDetail(job);
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                    >
                      <span>Lihat Detail</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected Job Modal */}
      <JobDetailModal
        job={selectedJobForDetail}
        onClose={() => setSelectedJobForDetail(null)}
      />
    </div>
  );
};
