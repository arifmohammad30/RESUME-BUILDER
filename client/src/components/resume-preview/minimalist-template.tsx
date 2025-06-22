import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github, Globe } from "lucide-react";

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ 
      background: '#fff', 
      border: '1px solid #E5E7EB', 
      borderRadius: 12, 
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)', 
      width: '100%',
      maxWidth: '210mm',
      minHeight: '297mm',
      margin: 'auto', 
      fontFamily: 'Georgia, Inter, serif', 
      color: '#222',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        borderBottom: '1px solid #E5E7EB', 
        padding: '40px 48px 32px 48px', 
        textAlign: 'center',
        background: '#FAFAFA'
      }}>
        <div style={{ 
          fontSize: 36, 
          fontWeight: 700, 
          letterSpacing: 1,
          marginBottom: 8,
          color: '#1F2937'
        }}>
          {data.firstName} {data.lastName}
        </div>
        {data.jobTitle && (
          <div style={{ 
            fontSize: 18, 
            fontWeight: 500, 
            marginBottom: 16, 
            color: '#6B7280',
            fontStyle: 'italic'
          }}>
            {data.jobTitle}
          </div>
        )}
        <div style={{ 
          color: '#6B7280', 
          fontSize: 15, 
          marginTop: 8, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 20
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
              <Globe style={{ width: 16, height: 16, color: '#6B7280' }} />
              <a href={data.website} style={{ color: '#6B7280', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </span>
          )}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Linkedin style={{ width: 16, height: 16, color: '#6B7280' }} />
              <a href={data.linkedin} style={{ color: '#6B7280', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Github style={{ width: 16, height: 16, color: '#6B7280' }} />
              <a href={data.github} style={{ color: '#6B7280', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {/* Summary */}
          {data.summary && data.summary.trim() !== '' && (
            <div>
              <div style={{ 
                fontWeight: 600, 
                fontSize: 20, 
                color: '#374151', 
                marginBottom: 12, 
                borderLeft: '3px solid #E5E7EB', 
                paddingLeft: 16,
                letterSpacing: '0.5px'
              }}>
                Profile
              </div>
              <div style={{ 
                color: '#374151', 
                fontSize: 15, 
                lineHeight: 1.7,
                textAlign: 'justify',
                fontFamily: 'Georgia, serif'
              }}>
                {data.summary}
              </div>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <div style={{ 
                fontWeight: 600, 
                fontSize: 20, 
                color: '#374151', 
                marginBottom: 16, 
                borderLeft: '3px solid #E5E7EB', 
                paddingLeft: 16,
                letterSpacing: '0.5px'
              }}>
                Experience
              </div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: 6
                  }}>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: 16, 
                      color: '#1F2937',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {exp.position}
                    </div>
                    <div style={{ 
                      color: '#6B7280', 
                      fontSize: 13, 
                      fontWeight: 500,
                      textAlign: 'right',
                      fontStyle: 'italic'
                    }}>
                      {formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: 14, 
                    fontWeight: 500,
                    marginBottom: 8,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {exp.company}
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: 14, 
                    lineHeight: 1.6,
                    textAlign: 'justify',
                    fontFamily: 'Georgia, serif'
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
                fontWeight: 600, 
                fontSize: 20, 
                color: '#374151', 
                marginBottom: 16, 
                borderLeft: '3px solid #E5E7EB', 
                paddingLeft: 16,
                letterSpacing: '0.5px'
              }}>
                Education
              </div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: 6
                  }}>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: 16, 
                      color: '#1F2937',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{ 
                      color: '#6B7280', 
                      fontSize: 13, 
                      fontWeight: 500,
                      textAlign: 'right',
                      fontStyle: 'italic'
                    }}>
                      {formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}
                    </div>
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: 14, 
                    fontWeight: 500,
                    marginBottom: 8,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {edu.school}
                  </div>
                  {edu.description && edu.description.trim() !== '' && (
                    <div style={{ 
                      color: '#374151', 
                      fontSize: 14, 
                      lineHeight: 1.6,
                      textAlign: 'justify',
                      fontFamily: 'Georgia, serif'
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
                fontWeight: 600, 
                fontSize: 20, 
                color: '#374151', 
                marginBottom: 16, 
                borderLeft: '3px solid #E5E7EB', 
                paddingLeft: 16,
                letterSpacing: '0.5px'
              }}>
                Skills
              </div>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 12
              }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ 
                    color: '#374151', 
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif'
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
                fontWeight: 600,
                fontSize: 20,
                color: '#374151',
                marginBottom: 16,
                borderLeft: '3px solid #E5E7EB',
                paddingLeft: 16,
                letterSpacing: '0.5px'
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
                        textDecoration: 'underline',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {cert.name}
                    </a>
                  ) : (
                    <div style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: '#1F2937',
                      fontFamily: 'Inter, sans-serif'
                    }}>
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
                fontWeight: 600, 
                fontSize: 20, 
                color: '#374151', 
                marginBottom: 16, 
                borderLeft: '3px solid #E5E7EB', 
                paddingLeft: 16,
                letterSpacing: '0.5px'
              }}>
                Projects
              </div>
              {data.projects.map((project, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <div style={{ 
                    fontWeight: 600, 
                    fontSize: 16, 
                    color: '#1F2937',
                    marginBottom: 8,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {project.name}
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: 14, 
                    lineHeight: 1.6,
                    marginBottom: 8,
                    textAlign: 'justify',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {project.description}
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 8, 
                      marginBottom: 8
                    }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ 
                          background: '#F3F4F6', 
                          color: '#4B5563', 
                          borderRadius: 4, 
                          padding: '4px 10px', 
                          fontSize: 12,
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif'
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
                          color: '#6B7280', 
                          fontSize: 13,
                          textDecoration: 'underline',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          color: '#6B7280', 
                          fontSize: 13,
                          textDecoration: 'underline',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
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