import { Link, Github, Mail, Phone, MapPin, ExternalLink, Linkedin } from "lucide-react";
import { ResumeData } from "@/types/schema";
import { format } from "date-fns";
import { formatExperienceDateRange } from './resume-preview';

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const formatDateRange = (startDate: string, endDate: string, current?: boolean) => {
    if (!startDate) return '';
    
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      let date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        date = new Date(dateStr + '-01');
      }
      if (isNaN(date.getTime())) {
        return '';
      }
      return format(date, 'MMM yyyy'); // Use date-fns format
    };
    
    const start = formatDate(startDate);
    const end = current ? 'Present' : (endDate ? formatDate(endDate) : '');
    
    return end ? `${start} - ${end}` : start;
  };

  return (
    <div 
      id="resume-template"
      className="bg-white shadow-xl rounded-lg overflow-hidden mx-auto print:shadow-none print:rounded-none"
      style={{ maxWidth: '210mm', minHeight: '1120px', margin: 'auto', fontFamily: 'Inter, Arial, sans-serif' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Column - Sidebar */}
        <div className="col-span-1 bg-gray-50 p-4 sm:p-6 md:p-8">
          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3 flex flex-col">
              {data.email && (
                <div className="flex items-center text-sm gap-2"><Mail className="w-4 h-4" /><span>{data.email}</span></div>
              )}
              {data.phone && (
                <div className="flex items-center text-sm gap-2"><Phone className="w-4 h-4" /><span>{data.phone}</span></div>
              )}
              {data.location && (
                <div className="flex items-center text-sm gap-2"><MapPin className="w-4 h-4" /><span>{data.location}</span></div>
              )}
              {data.website && (
                <div className="flex items-center text-sm gap-2"><ExternalLink className="w-4 h-4" /><a href={data.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{data.website}</a></div>
              )}
              {data.linkedin && (
                <div className="flex items-center text-sm gap-2"><Linkedin className="w-4 h-4" /><a href={data.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
              )}
              {data.github && (
                <div className="flex items-center text-sm gap-2"><Github className="w-4 h-4" /><a href={data.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    {cert.url ? (
                      <a href={cert.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {cert.name}
                      </a>
                    ) : (
                      <span>{cert.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Main Content */}
        <div className="col-span-2 p-4 sm:p-6 md:p-8">
          {/* Header Section */}
          <div className="pb-6 mb-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Your Name'}
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-4">
              {data.jobTitle || 'Your Professional Title'}
            </p>
            {data.summary && data.summary.trim() !== '' && (
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {data.summary}
              </p>
            )}
          </div>
          
          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <span className="text-sm text-gray-600">{exp.company}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <span className="text-sm text-gray-600">{edu.school}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</span>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-gray-700">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 mt-1">
                      {project.liveUrl && (
                        <div className="flex items-center space-x-1">
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Live Demo
                          </a>
                        </div>
                      )}
                      {project.codeUrl && (
                        <div className="flex items-center space-x-1">
                          <Github className="w-4 h-4 text-blue-600" />
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Code
                          </a>
                        </div>
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