import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github, Globe } from "lucide-react";

export function ElegantBWTemplate({ data }: { data: ResumeData }) {
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
      <div style={{ borderBottom: '2px solid #222', padding: '40px 48px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>{data.firstName} {data.lastName}</div>
        {data.jobTitle && <div style={{ fontSize: 15, marginTop: 8, textAlign: 'center', fontStyle: 'italic', color: '#444' }}>{data.jobTitle}</div>}
        <div style={{ color: '#444', fontSize: 15, marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.email}</span></span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.phone}</span></span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.location}</span></span>}
        </div>
        <div style={{ color: '#444', fontSize: 14, marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          {data.website && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe style={{ width: 14, height: 14, color: '#222' }} /><a href={data.website} style={{ color: '#222', textDecoration: 'none', borderBottom: '1px solid #888' }} target="_blank" rel="noopener noreferrer">Website</a></span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Linkedin style={{ width: 14, height: 14, color: '#222' }} />
              <a href={data.linkedin} style={{ color: '#222', textDecoration: 'none', borderBottom: '1px solid #888' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Github style={{ width: 14, height: 14, color: '#222' }} />
              <a href={data.github} style={{ color: '#222', textDecoration: 'none', borderBottom: '1px solid #888' }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: '32px 48px', flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Summary */}
          {data.summary && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 12, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4 }}>Profile</div>
              <div style={{ color: '#333', fontSize: 15, lineHeight: 1.6 }}>{data.summary}</div>
            </div>
          )}
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 12, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4 }}>Experience</div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{exp.position}</div>
                    <div style={{ color: '#444', fontSize: 13, fontStyle: 'italic' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  </div>
                  <div style={{ color: '#222', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{exp.company}</div>
                  <div style={{ color: '#333', fontSize: 14, lineHeight: 1.5 }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 12, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4 }}>Education</div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{edu.degree}</div>
                    <div style={{ color: '#444', fontSize: 13, fontStyle: 'italic' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  </div>
                  <div style={{ color: '#222', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{edu.school}</div>
                  <div style={{ color: '#333', fontSize: 14, lineHeight: 1.5 }}>{edu.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 12, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4 }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ color: '#111', fontSize: 14, fontWeight: 500 }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 12, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4 }}>Certifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: 14, color: '#111', textDecoration: 'none', borderBottom: '1px solid #888' }}>{cert.name}</a>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{cert.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 12, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4 }}>Projects</div>
              {data.projects.map((project, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{project.name}</div>
                  <div style={{ color: '#333', fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>{project.description}</div>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ background: '#eee', color: '#333', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#444', fontSize: 13, textDecoration: 'none', borderBottom: '1px solid #888' }}>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#444', fontSize: 13, textDecoration: 'none', borderBottom: '1px solid #888' }}>
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