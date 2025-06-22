import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github, Globe } from "lucide-react";

export function CreativeGradientTemplate({ data }: { data: ResumeData }) {
  return (
    <div 
      style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', width: '100%', maxWidth: '210mm', minHeight: '297mm', overflow: 'hidden', fontFamily: 'Roboto Flex, Inter, Arial, sans-serif', color: '#222', margin: 'auto' }} 
      className="mx-auto"
    >
      {/* Gradient Bar */}
      <div style={{ height: 18, background: 'linear-gradient(90deg, #F472B6 0%, #60A5FA 100%)' }} />
      <div style={{ padding: '40px 48px', flex: 1, overflow: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 30, color: '#F472B6', letterSpacing: 1, fontFamily: 'inherit', marginBottom: 4 }}>{data.firstName} {data.lastName}</div>
          {data.jobTitle && <div style={{ fontSize: 16, color: '#60A5FA', marginBottom: 12, fontWeight: 600 }}>{data.jobTitle}</div>}
          <div style={{ color: '#6B7280', fontSize: 15, marginBottom: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{data.email}</span>}
            {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{data.phone}</span>}
            {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{data.location}</span>}
            {data.website && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe style={{ width: 16, height: 16, color: '#60A5FA' }} /><a href={data.website} style={{ color: '#60A5FA', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Website</a></span>}
            {data.linkedin && data.linkedin.trim() !== '' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Linkedin style={{ width: 16, height: 16, verticalAlign: 'middle', color: '#60A5FA' }} />
                <a href={data.linkedin} style={{ color: '#60A5FA', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </span>
            )}
            {data.github && data.github.trim() !== '' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Github style={{ width: 16, height: 16, verticalAlign: 'middle', color: '#F472B6' }} />
                <a href={data.github} style={{ color: '#F472B6', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">GitHub</a>
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Summary */}
          {data.summary && (
            <div>
              <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: 1 }}>About Me</div>
              <div style={{ color: '#374151', fontSize: 15 }}>{data.summary}</div>
            </div>
          )}
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: 1 }}>Experience</div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                  <div style={{ color: '#F472B6', fontSize: 13 }}>{exp.company}</div>
                  <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  <div style={{ color: '#374151', fontSize: 14 }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: 1 }}>Education</div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{edu.degree}</div>
                  <div style={{ color: '#F472B6', fontSize: 13 }}>{edu.school}</div>
                  <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  <div style={{ color: '#374151', fontSize: 14 }}>{edu.description}</div>
                </div>
              ))}
            </div>
          )}
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: 1 }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ background: 'linear-gradient(90deg, #F472B6 0%, #EC4899 100%)', color: '#fff', borderRadius: 16, padding: '4px 14px', fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <div style={{ color: '#F472B6', fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: 1 }}>Certifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', fontWeight: 600, fontSize: 14, textDecoration: 'underline' }}>{cert.name}</a>
                    ) : (
                      <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>{cert.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: 1 }}>Projects</div>
              {data.projects.map((project, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{project.name}</div>
                  <div style={{ color: '#374151', fontSize: 14, marginBottom: 8 }}>{project.description}</div>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ background: '#E0E7FF', color: '#4338CA', borderRadius: 16, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', fontSize: 13, textDecoration: 'underline' }}>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', fontSize: 13, textDecoration: 'underline' }}>
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