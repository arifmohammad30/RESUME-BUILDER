import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github, Globe } from "lucide-react";

export function TechStartupTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ background: '#F8FAFC', borderRadius: 18, boxShadow: '0 4px 24px #0002', 
      width: '100%', maxWidth: '210mm', minHeight: '297mm', overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif', color: '#222', margin: 'auto' }} className="mx-auto">
      <div style={{ background: 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)', padding: '32px 48px', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: 1 }}>{data.firstName} {data.lastName}</div>
          {data.jobTitle && <div style={{ fontSize: 16, marginTop: 8, opacity: 0.9 }}>{data.jobTitle}</div>}
          <div style={{ fontSize: 14, marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '16px 24px' }}>
            {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{data.email}</span>}
            {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{data.phone}</span>}
            {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{data.location}</span>}
          </div>
          <div style={{ fontSize: 14, marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            {data.website && (
              <a href={data.website} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }} target="_blank" rel="noopener noreferrer">
                <Globe style={{ width: 14, height: 14 }} /> Website
              </a>
            )}
            {data.linkedin && data.linkedin.trim() !== '' && (
              <a href={data.linkedin} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }} target="_blank" rel="noopener noreferrer">
                <Linkedin style={{ width: 14, height: 14 }} /> LinkedIn
              </a>
            )}
            {data.github && data.github.trim() !== '' && (
              <a href={data.github} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }} target="_blank" rel="noopener noreferrer">
                <Github style={{ width: 14, height: 14 }} /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: '32px 48px', flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Summary */}
          {data.summary && (
            <div>
              <div style={{ color: '#7C3AED', fontWeight: 800, fontSize: 18, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>About</div>
              <div style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>{data.summary}</div>
            </div>
          )}
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <div style={{ color: '#06B6D4', fontWeight: 800, fontSize: 18, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Experience</div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{exp.position}</div>
                    <div style={{ color: '#6B7280', fontSize: 13, fontStyle: 'italic' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  </div>
                  <div style={{ color: '#7C3AED', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{exp.company}</div>
                  <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <div style={{ color: '#06B6D4', fontWeight: 800, fontSize: 18, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Education</div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{edu.degree}</div>
                    <div style={{ color: '#6B7280', fontSize: 13, fontStyle: 'italic' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  </div>
                  <div style={{ color: '#7C3AED', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{edu.school}</div>
                  <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>{edu.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <div style={{ color: '#7C3AED', fontWeight: 800, fontSize: 18, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ background: 'linear-gradient(90deg, #7C3AED 0%, #a855f7 100%)', color: '#fff', borderRadius: 16, padding: '4px 14px', fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <div style={{ color: '#06B6D4', fontWeight: 800, fontSize: 18, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Certifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4', fontWeight: 700, fontSize: 14, textDecoration: 'underline' }}>{cert.name}</a>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: 14, color: '#374151' }}>{cert.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <div style={{ color: '#7C3AED', fontWeight: 800, fontSize: 18, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Projects</div>
              {data.projects.map((project, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{project.name}</div>
                  <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5, marginBottom: 8 }}>{project.description}</div>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ background: '#E0E7FF', color: '#4338CA', borderRadius: 16, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#7C3AED', fontSize: 13, textDecoration: 'underline' }}>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#7C3AED', fontSize: 13, textDecoration: 'underline' }}>
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