import { Project, Skill, NavLink, SocialLink } from '@/types'

export const OWNER = {
  name: 'Faridz MP',
  title: 'Full-Stack Developer',
  tagline: 'Building digital experiences that matter.',
  bio: 'Saya adalah full-stack developer yang passionate dalam membangun aplikasi web modern yang performatif dan berdampak. Fokus pada clean code, user experience yang luar biasa, dan solusi yang scalable.',
  email: 'faridzmuhamadpermana@gmail.com',
  location: 'Bandung, Indonesia',
  availability: 'Open to opportunities',
  github: 'https://github.com/FaridzMP',
  linkedin: 'https://linkedin.com/in/faridzmp',
  instagram: 'https://instagram.com/faridzmp__',
  resume: 'https://drive.google.com/file/d/12MApc2Lp2pHsIVynZgYdMKluMJlJfu53/view?usp=drivesdk',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: OWNER.github, icon: 'FiGithub' },
  { label: 'LinkedIn', href: OWNER.linkedin, icon: 'FiLinkedin' },
  { label: 'Instagram', href: OWNER.instagram, icon: 'FiInstagram' },
  { label: 'Email', href: `mailto:${OWNER.email}`, icon: 'FiMail' },
]

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Filing Website',
    description: 'Platform perusahaan konstruksi untuk pengarsipan administrasi perusahaan meliputi surat resmi dan sertifikasi perusahaan.',
    longDescription: 'Dibangun dengan Laravel dan React.ts, platform ini menangani ribuan pengarsipan dokumen penting perusahaan.',
    tech: ['Laravel', 'TypeScript', 'Node.js', 'MySQL', 'Nginx', 'React'],
    github: 'https://github.com/Bumi-Rekayasa-Mandiri/aplikasi-filing',
    featured: true,
    category: 'web',
  },
  {
    id: 'project-2',
    title: 'Aplikasi E-Commerce Markas iPhone',
    description: 'Aplikasi untuk pembelian Smartphone dan Accessories Apple berkualitas.',
    tech: ['Next.js', 'Node.js', 'Typescript', 'MySQL', 'Tailwind CSS', 'Gemini API', 'TiDB', 'Vercel'],
    github: 'https://github.com/FaridzMP/markasiphone',
    preview: 'https://markasiphone.vercel.app/',
    featured: true,
    category: 'web',
  },
  {
    id: 'project-3',
    title: 'Aplikasi E-Commerce Seadanya Apple',
    description: 'Aplikasi untuk pembelian Smartphone (Apple dan Android) serta Laptop bekas berkualitas (MacOS dan Windows).',
    tech: ['Node.js', 'Typescript', 'Express', 'PostgreSQL', 'Supabase', 'Gemini API'],
    github: 'https://github.com/Seadanya-Store/website-seadanya-store',
    preview: 'https://seadanya-store.github.io/website-seadanya-store/',
    featured: true,
    category: 'web',
  },
  {
    id: 'project-4',
    title: 'Portfolio Dashboard',
    description: 'Dashboard analytics personal dengan visualisasi data interaktif dan laporan performa real-time.',
    tech: ['React', 'Chart.js', 'Node.js', 'MySQL'],
    github: 'https://github.com/FaridzMP',
    featured: false,
    category: 'web',
  },
]

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React / Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend' },
  { name: 'HTML / CSS', level: 95, category: 'frontend' },
  { name: 'Vanilla.js', level: 85, category: 'frontend' },
  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express.js', level: 88, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'backend' },
  { name: 'MySQL', level: 78, category: 'backend' },
  { name: 'Laravel', level: 72, category: 'backend' },
  // Tools
  { name: 'Git / GitHub', level: 90, category: 'tools' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Linux / CLI', level: 82, category: 'tools' },
  { name: 'Figma', level: 70, category: 'tools' },
]

export const STATS = [
  { label: 'Projects Completed', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Months Experience', value: '9+' },
  { label: 'GitHub Commits', value: '100+' },
]
