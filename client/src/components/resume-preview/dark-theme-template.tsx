import { ResumeData } from "@/types/schema";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { formatExperienceDateRange } from './resume-preview';

interface DarkThemeTemplateProps {
  data: ResumeData;
}

export function DarkThemeTemplate({ data }: DarkThemeTemplateProps) {
  return (
    <div className="bg-[#111827] text-[#F9FAFB] p-10 max-w-[210mm] mx-auto font-['Fira_Code','Ubuntu_Mono',_monospace]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-2 text-blue-400">{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p className="text-xl text-gray-300 mb-4">{data.jobTitle}</p>}
        <p className="text-sm text-gray-400 flex justify-center flex-wrap gap-x-4">
          {data.email && <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{data.email}</span>}
          {data.phone && <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{data.phone}</span>}
          {data.location && <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center"><Linkedin className="w-3 h-3 mr-1" />LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center"><Github className="w-3 h-3 mr-1" />GitHub</a>}
        </p>
      </div>

      {data.summary && (
        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">SUMMARY</h2>
          <p className="text-base leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-100">{exp.position}</h3>
              <div className="text-green-300 text-sm">{exp.company}</div>
              <div className="text-gray-400 text-xs mb-1">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
              {exp.description && <ul className="list-disc list-inside text-sm text-gray-300"><li>{exp.description}</li></ul>}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-100">{edu.degree}</h3>
              <div className="text-green-300 text-sm">{edu.school}</div>
              <div className="text-gray-400 text-xs mb-1">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
              {edu.description && <p className="text-sm text-gray-300 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#10B981', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Projects</div>
          {data.projects.map((project, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#E5E7EB' }}>{project.name}</div>
              <div style={{ color: '#9CA3AF', fontSize: 14 }}>{project.description}</div>
              {project.tags && project.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ background: '#374151', color: '#10B981', borderRadius: 6, padding: '2px 12px', fontSize: 13 }}>{tag}</span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontSize: 13, textDecoration: 'none' }}>
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontSize: 13, textDecoration: 'none' }}>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">SKILLS</h2>
          <p className="text-base text-gray-300">{data.skills.map(skill => skill.name).join(', ')}</p>
        </div>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-8 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">CERTIFICATIONS</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <p className="text-base text-gray-300">{cert.name} ({cert.year})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 