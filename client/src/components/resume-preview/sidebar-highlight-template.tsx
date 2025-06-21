import { ResumeData } from "@/types/schema";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { formatExperienceDateRange } from './resume-preview';

interface SidebarHighlightTemplateProps {
  data: ResumeData;
}

export function SidebarHighlightTemplate({ data }: SidebarHighlightTemplateProps) {
  return (
    <div className="flex bg-gray-50 rounded-2xl shadow-lg w-[800px] min-h-[1120px] overflow-hidden font-['Poppins',_sans-serif] mx-auto">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-8 flex flex-col items-center">
        {/* Profile Photo (Optional) */}
        {/* {data.profilePhoto && <img src={data.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mb-6 object-cover" />} */}

        <h1 className="text-3xl font-bold mb-1 text-center">{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p className="text-lg font-medium text-gray-300 mb-6 text-center">{data.jobTitle}</p>}

        <div className="border-b border-gray-600 w-full mb-6" />

        {/* Contact Info */}
        <div className="mb-6 w-full flex flex-col gap-2">
          {data.email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-gray-400" />{data.email}</div>}
          {data.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-gray-400" />{data.phone}</div>}
          {data.location && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-gray-400" />{data.location}</div>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline"><Linkedin className="w-4 h-4 text-gray-400" />LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline"><Github className="w-4 h-4 text-gray-400" />GitHub</a>}
        </div>

        {/* Skills with Progress Bars */}
        {data.skills && data.skills.length > 0 && (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="mb-3">
                <p className="text-sm mb-1">{skill.name}</p>
                {/* Simple progress bar representation */}
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-teal-400 h-2.5 rounded-full"
                    style={{ width: `${(parseFloat(skill.level) / 5) * 100 || 0}%` }} // Assuming skill.level is 1-5 or similar
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 bg-white p-10">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Summary</h2>
            <p className="text-base text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <div className="text-blue-700 text-sm">{exp.company}</div>
                <div className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                {exp.description && <ul className="list-disc list-inside text-sm text-gray-700"><li>{exp.description}</li></ul>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Projects</h2>
            <div className="space-y-6">
              {data.projects.map((project, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
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

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <div className="text-blue-700 text-sm">{edu.school}</div>
                <div className="text-gray-500 text-xs mb-1">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 