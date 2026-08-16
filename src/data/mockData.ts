import { Job, CandidateProfile, Application, PushNotificationItem } from '../types';

export const INITIAL_CANDIDATE: CandidateProfile = {
  id: 'cand-001',
  fullName: 'Ahmad Rizky Pratama',
  email: 'ahmad.rizky@karyalink.id',
  phone: '0812-8934-5678',
  headline: 'IT Support & Network Specialist | Cloud & Hardware Infrastructure',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  location: 'Jakarta Selatan, DKI Jakarta',
  bio: 'Profesional IT Support & Technical Specialist dengan pengalaman 3+ tahun menangani maintenance jaringan kantor, instalasi mikrotik, troubleshooting hardware/software, dan pengelolaan helpdesk untuk klien korporat perbankan dan e-commerce.',
  expectedSalary: 7500000,
  skills: [
    'IT Support & Helpdesk',
    'Troubleshooting Hardware',
    'Mikrotik & Cisco Router',
    'Windows Server & Linux',
    'Active Directory',
    'TCP/IP & LAN/WAN',
    'Google Workspace Admin',
    'CCTV & Access Door System'
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'IT Support Outsource Specialist',
      company: 'PT Mitra Solusi Solusindo (Penempatan: Bank Mandiri HQ)',
      period: '2024 - Sekarang',
      description: 'Menangani SLA ticket level 1 & 2 untuk 450+ user, konfigurasi switch LAN, maintenance workstation perbankan, dan setup ruang rapat video conference.',
      isOutsource: true
    },
    {
      id: 'exp-2',
      role: 'Junior Network & Hardware Technician',
      company: 'PT Data Prima Nusantara',
      period: '2022 - 2024',
      description: 'Instalasi jaringan kabel Cat6, konfigurasi router access point, dan maintenance server internal.',
      isOutsource: false
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'S1 Teknik Informatika',
      institution: 'Universitas Bina Nusantara (BINUS)',
      year: '2018 - 2022',
      major: 'Jaringan & Komputasi Awan'
    }
  ],
  certifications: [
    'Mikrotik Certified Network Associate (MTCNA)',
    'CompTIA A+ IT Technician',
    'Google IT Support Professional Certificate'
  ],
  languages: ['Bahasa Indonesia (Native)', 'Bahasa Inggris (Konversasi Kerja)'],
  resumeFileName: 'Ahmad_Rizky_IT_Support_CV_2026.pdf',
  resumeFileSize: '1.4 MB',
  resumeLastUpdated: '14 Agustus 2026',
  availability: 'Siap Kerja Segera',
  preferredCategories: ['Teknologi & IT', 'Administrasi & Keuangan'],
  preferredLocations: ['Jakarta Selatan', 'Jakarta Pusat', 'Tangerang Selatan', 'Bekasi'],
  allowPushNotifications: true
};

export const INITIAL_TALENT_POOL: CandidateProfile[] = [
  INITIAL_CANDIDATE,
  {
    id: 'cand-002',
    fullName: 'Siti Nur Aisyah',
    email: 'siti.aisyah@email.com',
    phone: '0857-1122-3344',
    headline: 'Senior Accounting & Tax Outsource Specialist (Brevet AB)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'Jakarta Barat, DKI Jakarta',
    bio: 'Akuntan berpengalaman 4 tahun dalam pembukuan PSAK, rekonsiliasi bank, e-Faktur, PPh 21/23, dan software Accurate/SAP ERP.',
    expectedSalary: 8500000,
    skills: [
      'Accurate Accounting',
      'SAP FI/CO',
      'Brevet Pajak A & B',
      'Laporan Keuangan PSAK',
      'e-Faktur & e-SPT',
      'Rekonsiliasi Bank',
      'Microsoft Excel Advanced'
    ],
    experience: [
      {
        id: 'exp-s1',
        role: 'Accounting Officer Outsource',
        company: 'PT Bina Talenta Persada (Klien: Unilever Distribution)',
        period: '2023 - 2026',
        description: 'Penyusunan laporan laba rugi bulanan dan monitoring AR/AP vendor.',
        isOutsource: true
      }
    ],
    education: [
      {
        id: 'edu-s1',
        degree: 'S1 Akuntansi',
        institution: 'Universitas Trisakti',
        year: '2018 - 2022',
        major: 'Akuntansi Perpajakan'
      }
    ],
    certifications: ['Sertifikat Brevet Pajak A & B - IAI', 'Certified Accurate Professional'],
    languages: ['Bahasa Indonesia', 'Bahasa Inggris'],
    resumeFileName: 'Siti_Aisyah_Accounting_CV.pdf',
    resumeFileSize: '980 KB',
    resumeLastUpdated: '10 Agustus 2026',
    availability: 'Pemberitahuan 1 Bulan',
    preferredCategories: ['Administrasi & Keuangan'],
    preferredLocations: ['Jakarta Barat', 'Jakarta Pusat', 'Tangerang'],
    allowPushNotifications: true
  },
  {
    id: 'cand-003',
    fullName: 'Budi Santoso',
    email: 'budi.santoso.forklift@email.com',
    phone: '0813-9876-5432',
    headline: 'Operator Forklift Bersertifikasi SIO Kemenaker & Leader Gudang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Bekasi, Jawa Barat',
    bio: 'Operator alat berat gudang (Forklift Reach Truck & Counterbalance) dengan pengalaman 5 tahun di Pusat Logistik Berikat dan Gudang E-commerce.',
    expectedSalary: 5800000,
    skills: [
      'SIO Forklift Kemenaker RI',
      'Reach Truck & Counterbalance',
      'WMS (Warehouse Management System)',
      'Stock Opname & Inbound/Outbound',
      'Keselamatan Kerja K3 Gudang',
      'Hand Pallet & Stacker'
    ],
    experience: [
      {
        id: 'exp-b1',
        role: 'Senior Forklift Operator Outsource',
        company: 'PT Outsource Daya Mandiri (Klien: Shopee Express Hub Bekasi)',
        period: '2023 - 2026',
        description: 'Handling bongkar muat 400+ pallet per shift dengan standar K3 tanpa zero accident.',
        isOutsource: true
      }
    ],
    education: [
      {
        id: 'edu-b1',
        degree: 'SMK Teknik Mesin',
        institution: 'SMK Negeri 1 Bekasi',
        year: '2016 - 2019',
        major: 'Teknik Otomasi & Mesin'
      }
    ],
    certifications: ['Lisensi K3 Operator Forklift Kemenaker Kelas II'],
    languages: ['Bahasa Indonesia'],
    resumeFileName: 'Budi_Santoso_SIO_Forklift.pdf',
    resumeFileSize: '2.1 MB',
    resumeLastUpdated: '12 Agustus 2026',
    availability: 'Siap Kerja Segera',
    preferredCategories: ['Logistik & Gudang', 'Manufaktur & Pabrik'],
    preferredLocations: ['Bekasi', 'Cikarang', 'Karawang', 'Jakarta Timur'],
    allowPushNotifications: true
  },
  {
    id: 'cand-004',
    fullName: 'Dian Permatasari',
    email: 'dian.permatasari@email.com',
    phone: '0812-4455-6677',
    headline: 'Customer Service BPO Inbound & Outbound Telemarketing Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    location: 'Surabaya, Jawa Timur',
    bio: 'Agent CS & Desk Collection berpengalaman menangani 100+ inbound call per hari dengan CSAT score konsisten 96%. Ramah, komunikatif, dan terbiasa dengan target SLA.',
    expectedSalary: 4800000,
    skills: [
      'Customer Handling & Service Excellence',
      'Zendesk & Freshdesk Ticketing',
      'Telephony Avaya & Genesys',
      'Komunikasi Persuasif',
      'Handling Complain & Escalation',
      'Bahasa Inggris Konversasi'
    ],
    experience: [
      {
        id: 'exp-d1',
        role: 'Customer Service Officer BPO',
        company: 'PT Infomedia Contact Nusantara (Klien: Telkomsel)',
        period: '2023 - 2025',
        description: 'Memberikan solusi kendala jaringan dan billing pulsa untuk pelanggan platinum.',
        isOutsource: true
      }
    ],
    education: [
      {
        id: 'edu-d1',
        degree: 'D3 Hubungan Masyarakat',
        institution: 'Universitas Airlangga',
        year: '2019 - 2022',
        major: 'Public Relations'
      }
    ],
    certifications: ['Certified Customer Service Professional (CCSP)'],
    languages: ['Bahasa Indonesia', 'Bahasa Inggris'],
    resumeFileName: 'Dian_Permatasari_CS_CV.pdf',
    resumeFileSize: '1.1 MB',
    resumeLastUpdated: '08 Agustus 2026',
    availability: 'Siap Kerja Segera',
    preferredCategories: ['Customer Service & BPO', 'Sales & Marketing'],
    preferredLocations: ['Surabaya', 'Sidoarjo', 'Malang'],
    allowPushNotifications: true
  },
  {
    id: 'cand-005',
    fullName: 'Hendra Wijaya',
    email: 'hendra.wijaya.security@email.com',
    phone: '0819-3344-5566',
    headline: 'Chief Security Officer | Sertifikasi Gada Pratama & Gada Madya',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Jakarta Pusat, DKI Jakarta',
    bio: 'Profesional pengamanan fisik gedung bertingkat dan perkantoran kedutaan dengan sertifikat resmi Mabes Polri. Tegas, disiplin, terlatih P3K & Damkar.',
    expectedSalary: 5500000,
    skills: [
      'Gada Pratama & Gada Madya POLRI',
      'SOP Pengamanan Gedung & VVIP',
      'Patroli & Investigasi Insiden',
      'Monitoring CCTV 24 Jam',
      'Tanggap Darurat K3 & Damkar',
      'Pengaturan Akses Pengunjung'
    ],
    experience: [
      {
        id: 'exp-h1',
        role: 'Danru Security Outsource',
        company: 'PT Garda Prima Utama (Klien: Menara Astra Sudirman)',
        period: '2022 - 2026',
        description: 'Memimpin 12 personil security shift malam, memastikan keamanan area lobi dan parkir.',
        isOutsource: true
      }
    ],
    education: [
      {
        id: 'edu-h1',
        degree: 'SMA Sederajat',
        institution: 'SMA Negeri 4 Jakarta',
        year: '2015 - 2018',
        major: 'IPS'
      }
    ],
    certifications: ['Ijazah Gada Pratama Mabes Polri', 'Sertifikat Basic Fire Fighting'],
    languages: ['Bahasa Indonesia'],
    resumeFileName: 'Hendra_Wijaya_Security_CV.pdf',
    resumeFileSize: '1.8 MB',
    resumeLastUpdated: '01 Agustus 2026',
    availability: 'Siap Kerja Segera',
    preferredCategories: ['Fasilitas & Keamanan'],
    preferredLocations: ['Jakarta Pusat', 'Jakarta Selatan'],
    allowPushNotifications: true
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'IT Support & Network Engineer (Penempatan Klien Perbankan)',
    agencyName: 'PT Karya Mandiri Outsource Solution',
    clientPlacement: 'PT Bank Central Asia Tbk (BCA) - KCU Thamrin',
    clientLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=80&auto=format&fit=crop&q=80',
    location: 'Jakarta Pusat, DKI Jakarta',
    category: 'Teknologi & IT',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan (Opsi Perpanjangan & Karyawan Tetap Klien)',
    salaryMin: 7000000,
    salaryMax: 8500000,
    currency: 'IDR',
    requiredSkills: [
      'IT Support & Helpdesk',
      'Mikrotik & Cisco Router',
      'Troubleshooting Hardware',
      'Active Directory',
      'Windows Server & Linux'
    ],
    niceToHaveSkills: ['TCP/IP & LAN/WAN', 'Google Workspace Admin'],
    experienceLevel: '1-3 Tahun',
    educationMin: 'D3/S1 Teknik Informatika / Sistem Informasi',
    quota: 4,
    applicantCount: 18,
    isUrgent: true,
    description: 'Dibutuhkan segera tenaga IT Support profesional melalui penyalur resmi PT Karya Mandiri Outsource untuk penempatan langsung di kantor pusat operasional perbankan rekanan. Bertanggung jawab atas stabilitas infrastruktur jaringan cabang dan support user internal.',
    responsibilities: [
      'Melakukan troubleshooting perangkat hardware (PC, Laptop, Printer kasir teller, Scanner EDC).',
      'Konfigurasi IP Static, VLAN, dan monitoring koneksi VPN antar cabang.',
      'Manajemen akun Active Directory dan hak akses aplikasi perbankan.',
      'Memberikan respons penanganan gangguan sesuai target SLA maksimal 15 menit.'
    ],
    requirements: [
      'Pria/Wanita, Usia maksimal 30 tahun.',
      'Pendidikan minimal D3/S1 Teknik Komputer/Informatika.',
      'Pengalaman kerja minimal 1 tahun di bidang IT Helpdesk/Support.',
      'Memahami topologi jaringan TCP/IP, router Mikrotik/Cisco.',
      'Memiliki sertifikasi IT (MTCNA / CCNA / CompTIA) menjadi nilai tambah besar.'
    ],
    benefits: [
      'Gaji Pokok sesuai UMR Plus Tunjangan Keahlian',
      'BPJS Kesehatan & Ketenagakerjaan Penuh',
      'Tunjangan Lembur & Insentif SLA',
      'Peluang konversi menjadi karyawan tetap klien perbankan'
    ],
    postedDate: '15 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-102',
    title: 'Cloud Infrastructure & DevOps Support Associate',
    agencyName: 'PT Talent Bridge Nusantara',
    clientPlacement: 'PT Tokopedia / GoTo Logistics Data Center',
    clientLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80',
    location: 'Jakarta Selatan, DKI Jakarta',
    category: 'Teknologi & IT',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan Project Outsource',
    salaryMin: 9000000,
    salaryMax: 12000000,
    currency: 'IDR',
    requiredSkills: [
      'Linux Server Administration',
      'Docker & Containerization',
      'CI/CD Pipeline',
      'TCP/IP & LAN/WAN',
      'Troubleshooting Hardware'
    ],
    niceToHaveSkills: ['Kubernetes', 'Cloud AWS/GCP'],
    experienceLevel: '3-5 Tahun',
    educationMin: 'S1 Teknik Komputer / Informatika',
    quota: 2,
    applicantCount: 11,
    isUrgent: false,
    description: 'Kami mencari profesional infrastruktur server & cloud untuk mendukung operasional e-commerce tier-1 di Indonesia. Mendapatkan fasilitas kerja lengkap dan mentoring berstandar internasional.',
    responsibilities: [
      'Monitoring kesehatan container cluster dan server deployment 24/7.',
      'Automasi backup data dan incident response saat server peak season event.',
      'Membantu developer dalam debugging issue konektivitas API dan gateway.'
    ],
    requirements: [
      'Pengalaman minimal 2 tahun mengelola Linux Server (Ubuntu/CentOS).',
      'Familiar dengan Docker container dan script automation (Bash/Python).',
      'Siap bekerja dengan sistem on-call shift jika diperlukan.'
    ],
    benefits: [
      'Gaji Kompetitif di atas rata-rata pasar',
      'Asuransi Rawat Inap & Rawat Jalan Mandiri Inhealth',
      'Tunjangan Kuota & Laptop High-End disediakan'
    ],
    postedDate: '14 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-103',
    title: 'Operator Forklift & Inventory Stacker (Gudang Logistik Modern)',
    agencyName: 'PT Sumber Daya Logistik Prima',
    clientPlacement: 'Shopee Mega Fulfillment Center - Cikarang',
    clientLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&auto=format&fit=crop&q=80',
    location: 'Cikarang, Jawa Barat',
    category: 'Logistik & Gudang',
    workType: 'Kontrak Outsourcing',
    contractDuration: '6 Bulan (Perpanjangan Tiap Semester)',
    salaryMin: 5500000,
    salaryMax: 6800000,
    currency: 'IDR',
    requiredSkills: [
      'SIO Forklift Kemenaker RI',
      'Reach Truck & Counterbalance',
      'WMS (Warehouse Management System)',
      'Keselamatan Kerja K3 Gudang'
    ],
    niceToHaveSkills: ['Hand Pallet & Stacker'],
    experienceLevel: '1-3 Tahun',
    educationMin: 'SMA/SMK Sederajat',
    quota: 10,
    applicantCount: 34,
    isUrgent: true,
    description: 'Penyaluran tenaga kerja terlatih untuk mengoperasikan forklift reach truck di pusat distribusi logistik otomatis. Jam kerja shifting dengan fasilitas jemputan karyawan.',
    responsibilities: [
      'Mengoperasikan Forklift Reach Truck setinggi 9 meter dengan presisi.',
      'Memindahkan pallet barang masuk (inbound) ke rak racking sesuai barcode WMS.',
      'Melakukan pre-trip inspection alat berat sebelum shift dimulai.'
    ],
    requirements: [
      'Wajib memiliki SIO (Surat Izin Operator) Forklift Kemenaker aktif.',
      'Pengalaman minimal 1 tahun di warehouse modern.',
      'Tidak buta warna dan sehat jasmani.'
    ],
    benefits: [
      'Gaji Pokok UMK Bekasi + Uang Kehadiran Harian',
      'Bus Antar Jemput Karyawan & Makan Siang Gratis di Kantin',
      'BPJS Ketenagakerjaan + Jaminan Kecelakaan Kerja 24 Jam'
    ],
    postedDate: '13 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-104',
    title: 'Staff Accounting & Tax Pajak (Penempatan Klien FMCG)',
    agencyName: 'PT Karya Mandiri Outsource Solution',
    clientPlacement: 'PT Mayora Indah Tbk Head Office',
    clientLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&auto=format&fit=crop&q=80',
    location: 'Jakarta Barat, DKI Jakarta',
    category: 'Administrasi & Keuangan',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan',
    salaryMin: 7500000,
    salaryMax: 9000000,
    currency: 'IDR',
    requiredSkills: [
      'Accurate Accounting',
      'Brevet Pajak A & B',
      'e-Faktur & e-SPT',
      'Microsoft Excel Advanced',
      'Rekonsiliasi Bank'
    ],
    niceToHaveSkills: ['SAP FI/CO', 'Laporan Keuangan PSAK'],
    experienceLevel: '1-3 Tahun',
    educationMin: 'S1 Akuntansi / Perpajakan',
    quota: 3,
    applicantCount: 22,
    isUrgent: false,
    description: 'Peluang karier sebagai staf akuntansi dan perpajakan korporasi. Menangani verifikasi bukti potong, pelaporan masa PPh, dan penyusunan jurnal penyesuaian bulanan.',
    responsibilities: [
      'Penyusunan e-Faktur Pajak Keluaran dan verifikasi Pajak Masukan.',
      'Rekonsiliasi rekening koran dan ledger bank harian.',
      'Penginputan transaksi kas dan bank pada sistem software akuntansi.'
    ],
    requirements: [
      'Pendidikan S1 Akuntansi dengan IPK minimal 3.00.',
      'Memiliki sertifikat Brevet A & B.',
      'Mahir menggunakan rumus Vlookup, Xlookup, Pivot Table pada MS Excel.'
    ],
    benefits: [
      'Gaji Pokok & Tunjangan Makan + Transport',
      'BPJS Kesehatan & Tenaga Kerja',
      'Jenjang karir promosi langsung ke klien'
    ],
    postedDate: '14 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-105',
    title: 'Customer Service BPO Inbound Officer (Fintech & E-Wallet)',
    agencyName: 'PT Mitra Solusi Solusindo',
    clientPlacement: 'PT DANA Indonesia (Fintech Hub)',
    clientLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&auto=format&fit=crop&q=80',
    location: 'Jakarta Selatan, DKI Jakarta',
    category: 'Customer Service & BPO',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan',
    salaryMin: 5000000,
    salaryMax: 6500000,
    currency: 'IDR',
    requiredSkills: [
      'Customer Handling & Service Excellence',
      'Zendesk & Freshdesk Ticketing',
      'Handling Complain & Escalation',
      'Komunikasi Persuasif'
    ],
    niceToHaveSkills: ['Telephony Avaya & Genesys', 'Bahasa Inggris Konversasi'],
    experienceLevel: 'Fresh Graduate',
    educationMin: 'D3/S1 Semua Jurusan',
    quota: 15,
    applicantCount: 45,
    isUrgent: true,
    description: 'Lowongan mass recruitment untuk penempatan Customer Care FinTech. Melayani pertanyaan nasabah mengenai transaksi digital, kendala akun, dan refund via telepon & live chat.',
    responsibilities: [
      'Menerima panggilan masuk dan live chat tiket bantuan dengan ramah.',
      'Membantu verifikasi data nasabah dan menyelesaikan keluhan dalam waktu SLA.',
      'Mencatat riwayat tiket dan eskalasi ke divisi operasional terkait.'
    ],
    requirements: [
      'Pria/Wanita usia max 27 tahun, artikulasi bicara jelas dan ramah.',
      'Terbiasa mengetik cepat (min 45 WPM).',
      'Mampu bekerja dalam jadwal shifting 24/7 (3 shift).'
    ],
    benefits: [
      'Gaji UMR Jakarta + Insentif Shift Malam',
      'Bonus Performa CSAT bulanan hingga Rp 1.500.000',
      'Pelatihan Public Speaking & Service Excellence berbayar'
    ],
    postedDate: '15 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-106',
    title: 'Danru & Anggota Pengamanan Fisik (Security Gedung Perkantoran SCBD)',
    agencyName: 'PT Garda Prima Nusantara',
    clientPlacement: 'Pacific Century Place - Kawasan SCBD Sudirman',
    clientLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&auto=format&fit=crop&q=80',
    location: 'Jakarta Selatan, DKI Jakarta',
    category: 'Fasilitas & Keamanan',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan',
    salaryMin: 5300000,
    salaryMax: 6200000,
    currency: 'IDR',
    requiredSkills: [
      'Gada Pratama & Gada Madya POLRI',
      'SOP Pengamanan Gedung & VVIP',
      'Monitoring CCTV 24 Jam',
      'Tanggap Darurat K3 & Damkar'
    ],
    niceToHaveSkills: ['Patroli & Investigasi Insiden'],
    experienceLevel: '1-3 Tahun',
    educationMin: 'SMA/SMK Sederajat',
    quota: 8,
    applicantCount: 20,
    isUrgent: true,
    description: 'Penyaluran resmi personil keamanan bersertifikat untuk gedung perkantoran Grade-A di SCBD. Seragam, atribut, dan pelatihan penyegaran disediakan gratis.',
    responsibilities: [
      'Melakukan screening pengunjung dan pengaturan akses tapping kartu.',
      'Patroli berkala tiap 2 jam ke seluruh lantai dan area basement.',
      'Mengoperasikan sistem alarm kebakaran dan monitoring CCTV.'
    ],
    requirements: [
      'Wajib memiliki KTA Security & Ijazah Gada Pratama aktif.',
      'Tinggi badan minimal 170 cm (Pria) / 160 cm (Wanita), berat proporsional.',
      'Bebas narkoba dan tidak bertato/bertindik.'
    ],
    benefits: [
      'Gaji Pokok UMR + Tunjangan Jabatan & Keahlian',
      'Seragam PDH & PDL Lengkap Gratis',
      'BPJS Ketenagakerjaan & Asuransi Jiwa'
    ],
    postedDate: '12 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-107',
    title: 'Quality Control (QC) Inspector Pabrik Manufaktur Otomotif',
    agencyName: 'PT Karya Mandiri Outsource Solution',
    clientPlacement: 'PT Astra Daihatsu Motor - Plant Karawang',
    clientLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&auto=format&fit=crop&q=80',
    location: 'Karawang, Jawa Barat',
    category: 'Manufaktur & Pabrik',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan',
    salaryMin: 5900000,
    salaryMax: 7200000,
    currency: 'IDR',
    requiredSkills: [
      'Alat Ukur Jangka Sorong & Mikrometer',
      'Membaca Gambar Teknik 2D/3D',
      'Pemeriksaan Dimensi & Defect Sampling',
      'Keselamatan Kerja K3 Gudang'
    ],
    experienceLevel: 'Fresh Graduate',
    educationMin: 'SMK Teknik Mesin / Otomotif / Elektro',
    quota: 12,
    applicantCount: 38,
    isUrgent: false,
    description: 'Tenaga outsourcing inspeksi mutu komponen perakitan mobil. Memastikan produk sesuai toleransi gambar kerja teknik sebelum dikirim ke line perakitan.',
    responsibilities: [
      'Inspeksi visual dan pengukuran dimensi dengan caliper / micrometers.',
      'Mencatat lembar checklist kualitas komponen dan memisahkan part NG (Not Good).',
      'Melaporkan temuan cacat produksi kepada Supervisor QC.'
    ],
    requirements: [
      'Lulusan SMK Jurusan Teknik Mesin / Otomotif / Listrik.',
      'Mampu membaca alat ukur presisi (Calipers, Micrometer, Height Gauge).',
      'Disiplin, teliti, dan siap bekerja shift di Kawasan Industri KIIC Karawang.'
    ],
    benefits: [
      'Gaji Pokok UMK Karawang + Uang Makan & Shift Malam',
      'Bus Antar Jemput dari Cikarang & Karawang Barat',
      'Tunjangan Hari Raya (THR) & Insentif Kinerja'
    ],
    postedDate: '11 Agustus 2026',
    status: 'Aktif'
  },
  {
    id: 'job-108',
    title: 'Field Sales Executive B2B & Modern Trade Outsource',
    agencyName: 'PT Talent Bridge Nusantara',
    clientPlacement: 'PT Indofood CBP Sukses Makmur',
    clientLogo: 'https://images.unsplash.com/photo-1556742049-0a67e557b683?w=80&auto=format&fit=crop&q=80',
    location: 'Surabaya, Jawa Timur',
    category: 'Sales & Marketing',
    workType: 'Kontrak Outsourcing',
    contractDuration: '12 Bulan',
    salaryMin: 5200000,
    salaryMax: 8000000,
    currency: 'IDR',
    requiredSkills: [
      'Komunikasi Persuasif',
      'Negosiasi & Selling Skill',
      'Customer Relationship Management',
      'Microsoft Excel Advanced'
    ],
    experienceLevel: '1-3 Tahun',
    educationMin: 'SMA/D3/S1 Semua Jurusan',
    quota: 6,
    applicantCount: 19,
    isUrgent: false,
    description: 'Eksekutif penjualan lapangan untuk memperluas distribusi produk konsumsi ke jaringan supermarket, horeka, dan grosir ritel modern.',
    responsibilities: [
      'Melakukan kunjungan rutin (calling visit) ke 15-20 outlet mitra per hari.',
      'Mengambil Purchase Order (PO) dan memastikan ketersediaan display produk.',
      'Mencapai target omset penjualan bulanan yang telah ditetapkan.'
    ],
    requirements: [
      'Memiliki kendaraan motor pribadi dan SIM C aktif.',
      'Pengalaman minimal 1 tahun di bidang Sales FMCG / Ritel.',
      'Berpenampilan rapi, target-oriented, dan komunikatif.'
    ],
    benefits: [
      'Gaji Pokok + Uang Transport Harian & Bensin',
      'Komisi Penjualan Tanpa Batas (Unlimited Incentive)',
      'Asuransi BPJS Kesehatan & BPJSTK'
    ],
    postedDate: '10 Agustus 2026',
    status: 'Aktif'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-501',
    jobId: 'job-101',
    candidateId: 'cand-001',
    appliedDate: '15 Agustus 2026, 09:30 WIB',
    currentStatus: 'Wawancara Klien',
    matchScore: 94,
    matchedSkills: [
      'IT Support & Helpdesk',
      'Mikrotik & Cisco Router',
      'Troubleshooting Hardware',
      'Active Directory',
      'Windows Server & Linux'
    ],
    missingSkills: [],
    coverNote: 'Saya memiliki pengalaman 3+ tahun di bidang IT support perbankan dengan sertifikasi MTCNA aktif. Saya siap berkontribusi penuh untuk menjaga uptime sistem kantor cabang.',
    interviewSchedule: {
      date: '2026-08-19',
      time: '14:00 - 15:00 WIB',
      type: 'Online (Google Meet / Zoom)',
      locationOrLink: 'https://meet.google.com/karyalink-bca-it-interview',
      interviewerName: 'Bapak Ferry Santoso (Head of IT Infra BCA Thamrin) & Ibu Melinda (HR Penyalur)',
      notes: 'Harap persiapkan portofolio konfigurasi jaringan dan pastikan koneksi internet stabil 10 menit sebelum jadwal dimulai.'
    },
    statusHistory: [
      {
        id: 'sh-1',
        status: 'Lamaran Dikirim',
        timestamp: '15 Agu 2026, 09:30 WIB',
        title: 'Lamaran Berhasil Diterima Sistem',
        note: 'Berkas CV dan sertifikat keahlian Anda telah terkirim ke tim rekruter PT Karya Mandiri Outsource.',
        updatedBy: 'Sistem Otomatis KaryaLink'
      },
      {
        id: 'sh-2',
        status: 'Review Berkas',
        timestamp: '15 Agu 2026, 11:15 WIB',
        title: 'Lolos Verifikasi Berkas & Skor Keahlian 94%',
        note: 'Sertifikasi MTCNA dan pengalaman IT Support Anda diverifikasi sesuai standar kebutuhan penempatan Bank BCA.',
        updatedBy: 'Ibu Melinda (Lead Recruiter)'
      },
      {
        id: 'sh-3',
        status: 'Screening HRD',
        timestamp: '15 Agu 2026, 15:40 WIB',
        title: 'Lolos Screening HR Penyalur',
        note: 'Kandidat menunjukkan kesiapan penempatan on-site dan ekspektasi gaji sesuai budget klien.',
        updatedBy: 'Ibu Melinda (Lead Recruiter)'
      },
      {
        id: 'sh-4',
        status: 'Wawancara Klien',
        timestamp: '16 Agu 2026, 08:20 WIB',
        title: 'Undangan Interview Teknis dengan Klien (BCA)',
        note: 'Jadwal interview telah dikonfirmasi untuk tanggal 19 Agustus 2026 pukul 14:00 WIB via Google Meet.',
        updatedBy: 'Tim Rekrutmen Outsource'
      }
    ],
    lastUpdated: '16 Agu 2026, 08:20 WIB'
  },
  {
    id: 'app-502',
    jobId: 'job-102',
    candidateId: 'cand-001',
    appliedDate: '14 Agustus 2026, 14:10 WIB',
    currentStatus: 'Review Berkas',
    matchScore: 78,
    matchedSkills: ['TCP/IP & LAN/WAN', 'Troubleshooting Hardware'],
    missingSkills: ['Docker & Containerization', 'CI/CD Pipeline'],
    coverNote: 'Tertarik memperdalam keahlian infrastructure cloud dan automation pada sistem skala besar.',
    statusHistory: [
      {
        id: 'sh-11',
        status: 'Lamaran Dikirim',
        timestamp: '14 Agu 2026, 14:10 WIB',
        title: 'Lamaran Dikirim',
        note: 'Menunggu antrean review tim Talent Bridge Nusantara.',
        updatedBy: 'Sistem Otomatis KaryaLink'
      },
      {
        id: 'sh-12',
        status: 'Review Berkas',
        timestamp: '15 Agu 2026, 10:00 WIB',
        title: 'Sedang Ditinjau Tim Technical Recruiter',
        note: 'Evaluasi portofolio pengelolaan server dan kesesuaian skill container.',
        updatedBy: 'Bapak Arya (DevOps Recruiter)'
      }
    ],
    lastUpdated: '15 Agu 2026, 10:00 WIB'
  },
  {
    id: 'app-503',
    jobId: 'job-104',
    candidateId: 'cand-002',
    appliedDate: '14 Agustus 2026, 16:00 WIB',
    currentStatus: 'Penawaran Kontrak',
    matchScore: 96,
    matchedSkills: [
      'Accurate Accounting',
      'Brevet Pajak A & B',
      'e-Faktur & e-SPT',
      'Microsoft Excel Advanced',
      'Rekonsiliasi Bank'
    ],
    missingSkills: [],
    coverNote: 'Lulusan Akuntansi dengan pengalaman mengelola SPT masa dan Accurate.',
    contractOffer: {
      salaryOffered: 8200000,
      contractLength: '12 Bulan (1 September 2026 - 31 Agustus 2027)',
      startDate: '2026-09-01',
      clientPlacement: 'PT Mayora Indah Tbk Head Office',
      positionTitle: 'Staff Accounting & Tax Pajak Outsource',
      benefitsSummary: 'Gaji Pokok Rp 8.200.000, Tunjangan Makan & Transport Rp 800.000/bln, BPJS Kesehatan & Ketenagakerjaan'
    },
    statusHistory: [
      {
        id: 'sh-21',
        status: 'Lamaran Dikirim',
        timestamp: '14 Agu 2026, 16:00 WIB',
        title: 'Lamaran Dikirim',
        note: 'Lamaran berhasil masuk sistem.',
        updatedBy: 'Sistem'
      },
      {
        id: 'sh-22',
        status: 'Review Berkas',
        timestamp: '14 Agu 2026, 17:30 WIB',
        title: 'Lolos Review Dokumen Brevet',
        note: 'Dokumen lengkap dan terverifikasi.',
        updatedBy: 'HR Penyalur'
      },
      {
        id: 'sh-23',
        status: 'Screening HRD',
        timestamp: '15 Agu 2026, 09:00 WIB',
        title: 'Lolos Tes Teknis Excel & Pajak',
        note: 'Skor tes teknis 95/100.',
        updatedBy: 'HR Penyalur'
      },
      {
        id: 'sh-24',
        status: 'Wawancara Klien',
        timestamp: '15 Agu 2026, 14:00 WIB',
        title: 'User Interview Selesai',
        note: 'Klien Finance Manager Mayora menyetujui kandidat Siti Nur Aisyah.',
        updatedBy: 'Klien Finance Lead'
      },
      {
        id: 'sh-25',
        status: 'Penawaran Kontrak',
        timestamp: '16 Agu 2026, 10:00 WIB',
        title: 'Draft Perjanjian Kerja Waktu Tertentu (PKWT) Telah Dikirim',
        note: 'Offering letter resmi telah diunggah ke dashboard kandidat untuk ditinjau dan ditandatangani.',
        updatedBy: 'Legal & HR PT Karya Mandiri'
      }
    ],
    lastUpdated: '16 Agu 2026, 10:00 WIB'
  },
  {
    id: 'app-504',
    jobId: 'job-103',
    candidateId: 'cand-003',
    appliedDate: '13 Agustus 2026, 11:20 WIB',
    currentStatus: 'Lolos / Penempatan',
    matchScore: 100,
    matchedSkills: [
      'SIO Forklift Kemenaker RI',
      'Reach Truck & Counterbalance',
      'WMS (Warehouse Management System)',
      'Keselamatan Kerja K3 Gudang'
    ],
    missingSkills: [],
    statusHistory: [
      {
        id: 'sh-31',
        status: 'Lamaran Dikirim',
        timestamp: '13 Agu 2026, 11:20 WIB',
        title: 'Lamaran Masuk',
        note: 'SIO Kemenaker terverifikasi valid.',
        updatedBy: 'Sistem'
      },
      {
        id: 'sh-32',
        status: 'Screening HRD',
        timestamp: '13 Agu 2026, 15:00 WIB',
        title: 'Lolos Cek Fisik & SIO',
        note: 'Kandidat siap penempatan shift malam.',
        updatedBy: 'HR Penyalur'
      },
      {
        id: 'sh-33',
        status: 'Wawancara Klien',
        timestamp: '14 Agu 2026, 10:00 WIB',
        title: 'Driving Test Forklift Lolos',
        note: 'Skor manuver reach truck 98%.',
        updatedBy: 'Supervisor Shopee Express'
      },
      {
        id: 'sh-34',
        status: 'Penawaran Kontrak',
        timestamp: '14 Agu 2026, 16:00 WIB',
        title: 'Kontrak Ditandatangani',
        note: 'PKWT 6 bulan aktif.',
        updatedBy: 'Legal HR'
      },
      {
        id: 'sh-35',
        status: 'Lolos / Penempatan',
        timestamp: '15 Agu 2026, 08:00 WIB',
        title: 'Resmi Ditempatkan di Shopee Hub Cikarang',
        note: 'Orientasi kerja dan seragam safety telah diserahkan. Selamat bekerja!',
        updatedBy: 'Talent Deployment Officer'
      }
    ],
    lastUpdated: '15 Agu 2026, 08:00 WIB'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotificationItem[] = [
  {
    id: 'notif-1',
    type: 'interview_invite',
    title: '🔔 Undangan Interview Teknis: IT Support BCA',
    message: 'Selamat! PT Bank Central Asia Tbk mengundang Anda untuk wawancara teknis online pada 19 Agustus 2026 pukul 14:00 WIB.',
    timestamp: '16 Agu 2026, 08:20 WIB',
    read: false,
    relatedJobId: 'job-101',
    relatedApplicationId: 'app-501',
    actionText: 'Lihat Jadwal & Link',
    priority: 'high'
  },
  {
    id: 'notif-2',
    type: 'new_job',
    title: '✨ Lowongan Baru Sesuai Skill Anda (Match 94%)',
    message: 'Lowongan "IT Support & Network Engineer" di Bank BCA cocok dengan 5 keahlian utama profil Anda.',
    timestamp: '15 Agu 2026, 09:00 WIB',
    read: false,
    relatedJobId: 'job-101',
    actionText: 'Lamar Sekarang'
  },
  {
    id: 'notif-3',
    type: 'status_update',
    title: '📋 Update Status: Lamaran Lolos Review Berkas',
    message: 'Berkas lamaran Anda untuk posisi DevOps Support di PT Tokopedia telah diperiksa oleh recruiter.',
    timestamp: '15 Agu 2026, 10:00 WIB',
    read: true,
    relatedJobId: 'job-102',
    relatedApplicationId: 'app-502',
    actionText: 'Cek Status'
  },
  {
    id: 'notif-4',
    type: 'system',
    title: '🚀 Profil Anda Telah Diverifikasi Penyalur',
    message: 'Badge "Verified Talent" telah disematkan pada profil Anda. Kesempatan dilirik perusahaan klien meningkat 3x lipat.',
    timestamp: '14 Agu 2026, 08:00 WIB',
    read: true,
    actionText: 'Buka Profil'
  }
];

export const JOB_CATEGORIES = [
  'Semua Kategori',
  'Teknologi & IT',
  'Logistik & Gudang',
  'Administrasi & Keuangan',
  'Sales & Marketing',
  'Manufaktur & Pabrik',
  'Customer Service & BPO',
  'Fasilitas & Keamanan'
];

export const INDONESIA_LOCATIONS = [
  'Semua Lokasi',
  'Jakarta Pusat',
  'Jakarta Selatan',
  'Jakarta Barat',
  'Jakarta Timur',
  'Jakarta Utara',
  'Bekasi',
  'Cikarang',
  'Karawang',
  'Tangerang',
  'Tangerang Selatan',
  'Surabaya',
  'Bandung'
];
