import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github, Globe } from "lucide-react";

export function ClassicProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ 
      background: '#fff', 
      width: '100%',
      height: '100%',
      fontFamily: 'Inter, Arial, sans-serif', 
      color: '#222',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #15803D 0%, #16A34A 100%)', 
        padding: '40px 48px 32px 48px', 
        color: 'white'
      }}>
        <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
          {data.firstName} {data.lastName}
        </div>
        {data.jobTitle && (
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 16, opacity: 0.9 }}>
            {data.jobTitle}
          </div>
        )}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 20,
          fontSize: 14
        }}>
          {data.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{data.email}</span>
            </span>
          )}
          {data.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{data.phone}</span>
            </span>
          )}
          {data.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{data.location}</span>
            </span>
          )}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 20,
          marginTop: 12,
          fontSize: 14
        }}>
          {data.website && data.website.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Globe style={{ width: 16, height: 16 }} />
              <a href={data.website} style={{ color: 'white', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </span>
          )}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Linkedin style={{ width: 16, height: 16 }} />
              <a href={data.linkedin} style={{ color: 'white', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Github style={{ width: 16, height: 16 }} />
              <a href={data.github} style={{ color: 'white', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 48px', flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Summary */}
          {data.summary && data.summary.trim() !== '' && (
            <div>
              <div style={{ 
                color: '#15803D', 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 12,
                borderBottom: '2px solid #15803D',
                paddingBottom: 4
              }}>
                Professional Summary
              </div>
              <div style={{ 
                color: '#374151', 
                fontSize: 15, 
                lineHeight: 1.6,
                textAlign: 'justify'
              }}>
                {data.summary}
              </div>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <div style={{ 
                color: '#15803D', 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 16,
                borderBottom: '2px solid #15803D',
                paddingBottom: 4
              }}>
                Professional Experience
              </div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: 4
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 16, color: '#1F2937' }}>
                      {exp.position}
                    </div>
                    <div style={{ 
                      color: '#6B7280', 
                      fontSize: 13, 
                      fontWeight: 500,
                      textAlign: 'right'
                    }}>
                      {formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  <div style={{ 
                    color: '#15803D', 
                    fontSize: 14, 
                    fontWeight: 600,
                    marginBottom: 8
                  }}>
                    {exp.company}
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: 14, 
                    lineHeight: 1.5,
                    textAlign: 'justify'
                  }}>
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <div style={{ 
                color: '#15803D', 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 16,
                borderBottom: '2px solid #15803D',
                paddingBottom: 4
              }}>
                Education
              </div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: 4
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 16, color: '#1F2937' }}>
                      {edu.degree}
                    </div>
                    <div style={{ 
                      color: '#6B7280', 
                      fontSize: 13, 
                      fontWeight: 500,
                      textAlign: 'right'
                    }}>
                      {formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}
                    </div>
                  </div>
                  <div style={{ 
                    color: '#15803D', 
                    fontSize: 14, 
                    fontWeight: 600,
                    marginBottom: 8
                  }}>
                    {edu.school}
                  </div>
                  {edu.description && edu.description.trim() !== '' && (
                    <div style={{ 
                      color: '#374151', 
                      fontSize: 14, 
                      lineHeight: 1.5,
                      textAlign: 'justify'
                    }}>
                      {edu.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <div style={{ 
                color: '#15803D', 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 16,
                borderBottom: '2px solid #15803D',
                paddingBottom: 4
              }}>
                Skills & Competencies
              </div>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 8
              }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ 
                    background: '#DCFCE7', 
                    color: '#15803D', 
                    borderRadius: 20, 
                    padding: '6px 14px',
                    fontSize: 14,
                    fontWeight: 500
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <div style={{ 
                color: '#15803D', 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 16,
                borderBottom: '2px solid #15803D',
                paddingBottom: 4
              }}>
                Certifications
              </div>
              {data.certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  {cert.url ? (
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        fontWeight: 600, 
                        fontSize: 16, 
                        color: '#1F2937', 
                        textDecoration: 'underline' 
                      }}
                    >
                      {cert.name}
                    </a>
                  ) : (
                    <div style={{ fontWeight: 600, fontSize: 16, color: '#1F2937' }}>
                      {cert.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <div style={{ 
                color: '#15803D', 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 16,
                borderBottom: '2px solid #15803D',
                paddingBottom: 4
              }}>
                Projects & Achievements
              </div>
              {data.projects.map((project, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ 
                    fontWeight: 600, 
                    fontSize: 16, 
                    color: '#1F2937',
                    marginBottom: 8
                  }}>
                    {project.name}
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: 14, 
                    lineHeight: 1.5,
                    marginBottom: 8,
                    textAlign: 'justify'
                  }}>
                    {project.description}
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 6, 
                      marginBottom: 8
                    }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ 
                          background: '#F3F4F6', 
                          color: '#374151', 
                          borderRadius: 12, 
                          padding: '4px 12px', 
                          fontSize: 12,
                          fontWeight: 500
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 16 }}>
                    {project.codeUrl && (
                      <a 
                        href={project.codeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          color: '#15803D', 
                          fontSize: 13,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontWeight: 500
                        }}
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
                        style={{ 
                          color: '#15803D', 
                          fontSize: 13,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontWeight: 500
                        }}
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
    </div>
  );
} 