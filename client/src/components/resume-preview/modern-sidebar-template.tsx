import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export function ModernSidebarTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ display: 'flex', background: '#F0FDFA', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px #0001', width: '100%', maxWidth: '210mm', minHeight: '297mm', margin: 'auto' }}>
      {/* Sidebar */}
      <div style={{ background: 'linear-gradient(180deg, #14B8A6 0%, #0E7490 100%)', color: '#fff', width: 200, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>{data.firstName} {data.lastName}</div>
        {data.jobTitle && <div style={{ fontSize: 13, marginBottom: 24, textAlign: 'center' }}>{data.jobTitle}</div>}
        <div style={{ fontSize: 13, marginBottom: 24, textAlign: 'center' }}>{data.location}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, width: '100%' }}>
          {data.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><Mail style={{ width: 16, height: 16, marginRight: 2 }} />{data.email}</div>}
          {data.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><Phone style={{ width: 16, height: 16, marginRight: 2 }} />{data.phone}</div>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#fff', textDecoration: 'underline' }}><Globe style={{ width: 16, height: 16, marginRight: 2 }} />Website</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#fff', textDecoration: 'underline' }}><Linkedin style={{ width: 16, height: 16, marginRight: 2 }} />LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#fff', textDecoration: 'underline' }}><Github style={{ width: 16, height: 16, marginRight: 2 }} />GitHub</a>}
        </div>
        <div style={{ height: 1, background: '#fff4', width: '100%', margin: '24px 0' }} />
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {data.skills.map((skill, i) => (
            <span key={i} style={{ background: '#fff2', color: '#fff', borderRadius: 8, padding: '2px 10px', fontSize: 12 }}>{skill.name}</span>
          ))}
        </div>
        <div style={{ height: 1, background: '#fff4', width: '100%', margin: '24px 0' }} />
        {data.certifications && data.certifications.length > 0 && (
          <div style={{width: '100%'}}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.certifications.map((cert, i) => (
                <div key={i}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: 13, textDecoration: 'underline' }}>{cert.name}</a>
                  ) : (
                    <span style={{ fontSize: 13 }}>{cert.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, background: '#fff', padding: 40, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Summary */}
          {data.summary && (
            <div>
              <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 8, borderBottom: '2px solid #F0FDFA', paddingBottom: 4 }}>Profile</div>
              <div style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>{data.summary}</div>
            </div>
          )}
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 12, borderBottom: '2px solid #F0FDFA', paddingBottom: 4 }}>Experience</div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{exp.position}</div>
                    <div style={{ color: '#6B7280', fontSize: 13, fontStyle: 'italic' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  </div>
                  <div style={{ color: '#0E7490', fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{exp.company}</div>
                  <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 12, borderBottom: '2px solid #F0FDFA', paddingBottom: 4 }}>Education</div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{edu.degree}</div>
                    <div style={{ color: '#6B7280', fontSize: 13, fontStyle: 'italic' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  </div>
                  <div style={{ color: '#0E7490', fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{edu.school}</div>
                  <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5 }}>{edu.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 12, borderBottom: '2px solid #F0FDFA', paddingBottom: 4 }}>Projects</div>
              {data.projects.map((project, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{project.name}</div>
                  <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.5, marginBottom: 8 }}>{project.description}</div>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ background: '#F0FDFA', color: '#14B8A6', borderRadius: 8, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#14B8A6', fontSize: 13, textDecoration: 'underline' }}>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#14B8A6', fontSize: 13, textDecoration: 'underline' }}>
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