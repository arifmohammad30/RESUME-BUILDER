import { ResumeData } from "@/types/schema";
import React from "react";
import { formatExperienceDateRange } from './resume-preview';

interface ElegantSerifTemplateProps {
  data: ResumeData;
}

export function ElegantSerifTemplate({ data }: ElegantSerifTemplateProps) {
  return (
    <div className="bg-[#FAF9F6] text-gray-800 p-10 max-w-[210mm] mx-auto font-['Georgia',_serif]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-2 text-gray-900">{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p className="text-xl font-medium text-gray-700 uppercase tracking-wider mb-4">{data.jobTitle}</p>}
        <p className="text-base text-gray-600">
          {data.email && <span className="mr-4">{data.email}</span>}
          {data.phone && <span className="mr-4">{data.phone}</span>}
          {data.location && <span className="mr-4">{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mr-4">LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        {/* Left Column */}
        <div>
          {data.education && data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold uppercase text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-gray-700 text-sm font-serif">{edu.school}</div>
                  <div className="text-gray-500 text-xs mb-1 font-serif">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold uppercase text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Skills</h2>
              <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold uppercase text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <p className="text-base text-gray-700">{cert.name} ({cert.year})</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold uppercase text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Professional Summary</h2>
              <p className="text-base text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold uppercase text-gray-700 mb-4 border-b-2 border-gray-300 pb-2">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <div className="text-gray-700 text-sm font-serif">{exp.company}</div>
                  <div className="text-gray-500 text-xs mb-1 font-serif">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  {exp.description && <ul className="list-disc list-inside text-sm text-gray-700"><li>{exp.description}</li></ul>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project, i) => (
                  <div key={i} className="pl-4 border-l-2 border-gray-300">
                    <h3 className="font-serif font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 text-sm mt-1 font-serif">{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-serif">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 mt-3">
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:underline font-serif">
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:underline font-serif">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 