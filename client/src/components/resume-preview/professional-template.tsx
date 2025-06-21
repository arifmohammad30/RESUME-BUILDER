import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";
import { ResumeData } from "@/types/schema";
import { format } from "date-fns";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
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
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };
    
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    
    return end ? `${start} - ${end}` : start;
  };

  return (
    <div 
      id="resume-template"
      className="bg-gray-50 border border-gray-200 shadow-xl rounded-lg overflow-hidden mx-auto print:shadow-none print:rounded-none w-full" 
    >
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Your Name'}
          </h1>
          <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-2">
            {data.jobTitle || 'Your Professional Title'}
          </p>
          {data.summary && data.summary.trim() !== '' && (
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {data.summary}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {data.email && (
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Email:</span>
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Phone:</span>
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Location:</span>
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Website:</span>
              <a href={data.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {data.website}
              </a>
            </div>
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
                    <h3 className="text-lg font-semibold text-gray-900">{exp.company}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.position}</p>
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
                    <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{edu.degree}</p>
                  {edu.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Projects</h2>
            <div className="space-y-6">
              {data.projects.map((project, i) => (
                <div key={i} className="pl-4 border-l-4 border-blue-500">
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
      </div>
    </div>
  );
}
