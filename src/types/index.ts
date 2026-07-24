export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  github?: string
  preview?: string
  live?: string
  image?: string
  featured: boolean
  category: 'web' | 'mobile' | 'backend' | 'other'
}

export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other'
  icon?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string[]
  tech: string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}
