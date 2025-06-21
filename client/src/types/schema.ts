export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  codeUrl?: string;
  liveUrl?: string;
  tags: string[];
}

export interface Certification {
  id: string;
  name: string;
  year: string;
}

export interface ResumeData {
  firstName: string;
  lastName: string;
  email: string;
  gmail?: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  jobTitle?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications?: Certification[];
} 