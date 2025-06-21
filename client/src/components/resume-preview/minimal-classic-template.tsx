import { ResumeData } from "@/types/schema";
import React from "react";
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github } from "lucide-react";

interface MinimalClassicTemplateProps {
  data: ResumeData;
}

export function MinimalClassicTemplate({ data }: MinimalClassicTemplateProps) {
  return (
    <div className="font-['Arial',sans-serif] text-black p-8 max-w-[210mm] mx-auto bg-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">{data.firstName} {data.lastName}</h1>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.email}</span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.phone}</span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.location}</span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Linkedin style={{ width: 16, height: 16, color: '#2563eb' }} />
              <a href={data.linkedin} style={{ color: '#2563eb', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Github style={{ width: 16, height: 16, color: '#2563eb' }} />
              <a href={data.github} style={{ color: '#2563eb', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </p>
      </div>

      {data.summary && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-lg font-bold mb-2">SUMMARY</h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-lg font-bold mb-2">EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="font-semibold text-sm">{exp.position}</h3>
              <div className="text-gray-700 text-xs">{exp.company}</div>
              <div className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
              {exp.description && <ul className="list-disc list-inside text-xs"><li>{exp.description}</li></ul>}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-lg font-bold mb-2">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="font-semibold text-sm">{edu.degree}</h3>
              <div className="text-gray-700 text-xs">{edu.school}</div>
              <div className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
              {edu.description && <p className="text-xs">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
          <div className="space-y-6">
            {data.projects.map((project, i) => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-3">
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:underline">
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-lg font-bold mb-2">SKILLS</h2>
          <p className="text-sm">{data.skills.map(skill => skill.name).join(', ')}</p>
        </div>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-lg font-bold mb-2">CERTIFICATIONS</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <p className="text-sm">{cert.name} - {cert.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 