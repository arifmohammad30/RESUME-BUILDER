import { ResumeData } from "@/types/schema";
import React from "react";
import { formatExperienceDateRange } from './resume-preview';

interface TwoColumnGridTemplateProps {
  data: ResumeData;
}

export function TwoColumnGridTemplate({ data }: TwoColumnGridTemplateProps) {
  return (
    <div className="font-['Segoe_UI',_sans-serif] text-gray-800 max-w-[210mm] mx-auto bg-white border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="text-center bg-gray-100 p-8 border-b border-gray-300">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p className="text-lg text-gray-700 mb-4">{data.jobTitle}</p>}
        <p className="text-sm text-gray-600 flex justify-center flex-wrap gap-x-4">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>}
        </p>
      </div>

      <div className="grid grid-cols-2 divide-x divide-gray-300 p-8">
        {/* Left Column */}
        <div className="pr-8">
          {data.experience && data.experience.length > 0 && (
            <div className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">EXPERIENCE</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <div className="text-blue-700 text-base">{exp.company}</div>
                  <div className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  {exp.description && <ul className="list-disc list-inside text-sm text-gray-700 mt-1"><li>{exp.description}</li></ul>}
                </div>
              ))}
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
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
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
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

        {/* Right Column */}
        <div className="pl-8">
          {data.education && data.education.length > 0 && (
            <div className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">EDUCATION</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-blue-700 text-base">{edu.school}</div>
                  <div className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">SKILLS</h2>
              <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">CERTIFICATIONS</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <p className="text-base text-gray-700">{cert.name} ({cert.year})</p>
                </div>
              ))}
            </div>
          )}

          {/* Summary can be placed here if it's optional and fits */}
          {data.summary && (
            <div className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">SUMMARY</h2>
              <p className="text-base text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 