import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, ExternalLink, Github, Star, Linkedin } from "lucide-react";
import { ResumeData } from "@/types/schema";
import { format } from "date-fns";

interface CreativeTemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
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

  const formatExperienceDateRange = (startDate: string, endDate: string, current?: boolean) => {
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
      className="bg-gray-50 border border-gray-200 shadow-xl rounded-lg overflow-hidden mx-auto print:shadow-none print:rounded-none"
      style={{ maxWidth: '210mm', minHeight: '1120px', margin: 'auto', fontFamily: 'Inter, Arial, sans-serif' }}
    >
      <div className="relative">
        {/* Decorative header with geometric shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-400 to-pink-400 rounded-full opacity-10 -mr-32 -mt-32"></div>
        <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-bl from-blue-400 to-purple-400 rounded-full opacity-10"></div>
        
        <div className="relative p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
              {`${data.firstName || 'John'} ${data.lastName || 'Doe'}`.trim()}
            </h1>
            <div className="flex items-center mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-4"></div>
              <p className="text-2xl text-purple-600 font-bold uppercase tracking-wider">
                {data.jobTitle || 'Your Professional Title'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-gray-600 mt-6 items-center justify-center">
              {data.email && (
                <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-full">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center space-x-2 bg-pink-50 px-3 py-2 rounded-full">
                  <Phone className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-medium">{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{data.location}</span>
                </div>
              )}
              {data.website && (
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <a href={data.website} className="text-sm font-medium text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{data.website}</a>
                </div>
              )}
              {data.linkedin && data.linkedin.trim() !== '' && (
                <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-full">
                  <Linkedin className="w-4 h-4 text-purple-600" />
                  <a href={data.linkedin} className="text-sm font-medium text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              )}
              {data.github && data.github.trim() !== '' && (
                <div className="flex items-center space-x-2 bg-pink-50 px-3 py-2 rounded-full">
                  <Github className="w-4 h-4 text-pink-600" />
                  <a href={data.github} className="text-sm font-medium text-pink-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          {(data.summary && data.summary.trim() !== '') ? (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-l-4 border-purple-400">
              <h2 className="text-xl font-bold text-purple-700 mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Creative Vision
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                {data.summary}
              </p>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-l-4 border-purple-400">
              <h2 className="text-xl font-bold text-purple-700 mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Creative Vision
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                A highly motivated and results-oriented professional with a proven track record of success in various challenging environments. Seeking to leverage strong skills in leadership, problem-solving, and communication to contribute to a dynamic organization.
              </p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-8">
            {/* Left Column - Main Content */}
            <div className="col-span-3 space-y-8">
              {/* Experience Section */}
              {(data.experience && data.experience.length > 0) ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      EXPERIENCE
                    </span>
                    <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  </h2>
                  
                  {data.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-8 relative">
                      <div className="absolute -left-4 top-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{index + 1}</span>
                      </div>
                      <div className="pl-8 border-l-2 border-purple-100 pb-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {exp.position}
                          </h3>
                          <p className="text-purple-600 font-semibold text-lg mb-2">
                            {exp.company}
                          </p>
                          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                            {formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}
                          </span>
                          {exp.description && exp.description.trim() !== '' && (
                            <p className="text-gray-700 leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      EXPERIENCE
                    </span>
                    <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  </h2>
                  <div className="mb-8 relative">
                    <div className="absolute -left-4 top-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">1</span>
                    </div>
                    <div className="pl-8 border-l-2 border-purple-100 pb-6">
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Software Engineer
                        </h3>
                        <p className="text-purple-600 font-semibold text-lg mb-2">
                          Tech Solutions Inc.
                        </p>
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                          Jan 2020 - Present
                        </span>
                        <p className="text-gray-700 leading-relaxed">
                          Developed and maintained web applications using React and Node.js. Implemented new features, optimized performance, and collaborated with cross-functional teams.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {(data.projects && data.projects.length > 0) ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.projects.map((project, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                        <p className="text-gray-600 text-sm mt-2">{project.description}</p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.tags.map((tag) => (
                              <span key={tag} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-4 mt-4">
                          {project.codeUrl && (
                            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 text-sm hover:underline">
                              View Code
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 text-sm hover:underline">
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      PROJECTS
                    </span>
                    <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                  </h2>
                  <div className="grid gap-4">
                    <div className="p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-200 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Portfolio Website
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Developed a personal portfolio website to showcase projects and skills using React, Tailwind CSS, and custom animations.
                      </p>
                      <div className="flex space-x-3">
                        <a 
                          href="#" 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 flex items-center"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                        <a 
                          href="#" 
                          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 flex items-center"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-2 space-y-6">
              {/* Skills Section */}
              {(data.skills && data.skills.length > 0) ? (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                  <h2 className="text-xl font-bold text-purple-700 mb-4">
                    SKILLS
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <Badge 
                        key={skill.id}
                        className="bg-purple-600 text-white hover:bg-purple-700 text-xs font-medium"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                  <h2 className="text-xl font-bold text-purple-700 mb-4">
                    SKILLS
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      className="bg-purple-600 text-white hover:bg-purple-700 text-xs font-medium"
                    >
                      React
                    </Badge>
                    <Badge 
                      className="bg-pink-600 text-white hover:bg-pink-700 text-xs font-medium"
                    >
                      Node.js
                    </Badge>
                    <Badge 
                      className="bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium"
                    >
                      TypeScript
                    </Badge>
                  </div>
                </div>
              )}

              {/* Education Section */}
              {(data.education && data.education.length > 0) ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                  <h2 className="text-xl font-bold text-blue-700 mb-4">
                    EDUCATION
                  </h2>
                  <div className="space-y-4">
                    {data.education.map((edu, index) => (
                      <div key={edu.id} className="mb-8 relative">
                        <div className="pl-8 border-l-2 border-blue-100 pb-6">
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                            <p className="text-blue-600 font-semibold text-lg mb-2">{edu.school}</p>
                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</span>
                            {edu.description && edu.description.trim() !== '' && (
                              <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                  <h2 className="text-xl font-bold text-blue-700 mb-4">
                    EDUCATION
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                        Master of Science in Computer Science
                      </h3>
                      <p className="text-blue-600 font-medium mb-1">
                        University of XYZ
                      </p>
                      <span className="text-sm text-gray-600">
                        Sep 2021 - May 2023
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        Specialized in Artificial Intelligence and Machine Learning.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}