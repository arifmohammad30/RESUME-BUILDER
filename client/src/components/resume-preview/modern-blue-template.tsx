import { ResumeData } from '@/types/schema';
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { formatExperienceDateRange } from './resume-preview';

export function ModernBlueTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="flex bg-gray-50 rounded-2xl shadow-lg w-[800px] min-h-[1120px] overflow-hidden font-['Inter',_sans-serif] mx-auto">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white w-[220px] p-8 flex flex-col items-start">
        <h1 className="font-bold text-3xl mb-4 text-left w-full">{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p className="text-sm mb-4 opacity-90 text-left w-full">{data.jobTitle}</p>}

        <div className="border-b border-white border-opacity-30 w-full mb-6" />

        {/* Contact Info */}
        <div className="mb-6 w-full flex flex-col gap-2">
          {data.email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" />{data.email}</div>}
          {data.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" />{data.phone}</div>}
          {data.location && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" />{data.location}</div>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline"><Linkedin className="w-4 h-4" />LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline"><Github className="w-4 h-4" />GitHub</a>}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6 w-full">
            <h2 className="font-semibold text-lg mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-white bg-opacity-20 text-white rounded-md px-3 py-1 text-xs">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="w-full">
            <h2 className="font-semibold text-lg mb-3">CERTIFICATIONS</h2>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-sm mb-1 opacity-90">{cert.name} ({cert.year})</p>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-10">
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base text-gray-800">{exp.position}</h3>
                    <div className="text-blue-600 text-sm">{exp.company}</div>
                  </div>
                  <span className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                {exp.description && <ul className="list-disc list-inside text-sm text-gray-700"><li>{exp.description}</li></ul>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">EDUCATION</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base text-gray-800">{edu.degree}</h3>
                    <div className="text-blue-600 text-sm">{edu.school}</div>
                  </div>
                  <span className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</span>
                </div>
                {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">PROJECTS</h2>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-6">
                <h3 className="font-bold text-base text-gray-800">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {project.codeUrl && (
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 