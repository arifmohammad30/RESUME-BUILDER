import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";
import { ResumeData } from "@/types/schema";
import { format } from "date-fns";

interface MinimalTemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
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
      return format(date, 'MMM yyyy');
    };
    
    const start = formatDate(startDate);
    const end = current ? 'Present' : (endDate ? formatDate(endDate) : '');
    
    return end ? `${start} - ${end}` : start;
  };

  return (
    <div 
      id="resume-template"
      className="bg-white shadow-xl rounded-lg overflow-hidden mx-auto print:shadow-none print:rounded-none w-full" 
    >
      <div className="p-12 bg-gray-50 border border-gray-200 rounded-xl shadow-xl">
        {/* Header Section */}
        <div className="text-center mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
            {`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-light tracking-wider uppercase">
            {data.jobTitle || 'Your Professional Title'}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 mt-4 mb-8">
            {data.email && (
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span className="text-sm">{data.email}</span></div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span className="text-sm">{data.phone}</span></div>
            )}
            {data.location && (
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span className="text-sm">{data.location}</span></div>
            )}
            {data.linkedin && data.linkedin.trim() !== '' && (
              <div className="flex items-center gap-2"><Linkedin className="w-4 h-4" /><a href={data.linkedin} className="text-sm text-gray-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
            )}
            {data.github && data.github.trim() !== '' && (
              <div className="flex items-center gap-2"><Github className="w-4 h-4" /><a href={data.github} className="text-sm text-gray-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></div>
            )}
          </div>
        </div>
        
        {/* Summary Section */}
        {data.summary && data.summary.trim() !== '' && (
          <div className="mb-12 text-center">
            <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto font-light">
              {data.summary}
            </p>
          </div>
        )}
        
        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center uppercase tracking-widest">
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-8 last:mb-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">
                      {exp.position || 'Position'}
                    </h3>
                    <p className="text-gray-600 font-light">
                      {exp.company || 'Company'}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 font-light">
                    {formatDateRange(exp.startDate || '', exp.endDate || '', exp.current)}
                  </span>
                </div>
                {exp.description && exp.description.trim() !== '' && (
                  <p className="text-gray-700 leading-relaxed font-light">
                    {exp.description}
                  </p>
                )}
                <div className="mt-6 border-b border-gray-100"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center uppercase tracking-widest">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-6 last:mb-0 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {edu.degree || 'Degree'}
                </h3>
                <p className="text-gray-600 font-light">
                  {edu.school || 'School'}
                </p>
                <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>{formatDateRange(edu.startDate || '', edu.endDate || '', edu.current)}</span>
                </div>
                {edu.description && edu.description.trim() !== '' && (
                  <p className="text-gray-700 leading-relaxed font-light mt-2 max-w-3xl mx-auto">
                    {edu.description}
                  </p>
                )}
                <div className="mt-4 border-b border-gray-100"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center uppercase tracking-widest">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="text-gray-700 text-sm font-light px-3 py-1 border border-gray-300 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center uppercase tracking-widest">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-8 last:mb-0 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {project.name || 'Project Name'}
                </h3>
                {project.description && project.description.trim() !== '' && (
                  <p className="text-gray-700 mb-4 font-light max-w-3xl mx-auto">
                    {project.description}
                  </p>
                )}
                <div className="flex justify-center space-x-6">
                  {project.liveLink && project.liveLink.trim() !== '' && (
                    <a 
                      href={project.liveLink} 
                      className="text-gray-600 hover:text-gray-900 flex items-center font-light text-sm"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </a>
                  )}
                  {project.repoLink && project.repoLink.trim() !== '' && (
                    <a 
                      href={project.repoLink} 
                      className="text-gray-600 hover:text-gray-900 flex items-center font-light text-sm"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
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