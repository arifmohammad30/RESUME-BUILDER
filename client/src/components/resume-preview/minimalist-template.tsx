import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github } from "lucide-react";

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, boxShadow: '0 2px 12px #0001', width: 800, minHeight: 1120, margin: 'auto', fontFamily: 'Georgia, Inter, serif', color: '#222' }}>
      <div style={{ borderBottom: '1px solid #E5E7EB', padding: '40px 48px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>{data.firstName} {data.lastName}</div>
        <div style={{ color: '#6B7280', fontSize: 15, marginTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.email}</span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.phone}</span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.location}</span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Linkedin style={{ width: 16, height: 16, color: '#374151' }} />
              <a href={data.linkedin} style={{ color: '#374151', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Github style={{ width: 16, height: 16, color: '#374151' }} />
              <a href={data.github} style={{ color: '#374151', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: '32px 48px' }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#374151', marginBottom: 8, borderLeft: '3px solid #E5E7EB', paddingLeft: 12 }}>Profile</div>
            <div style={{ color: '#374151', fontSize: 15 }}>{data.summary}</div>
          </div>
        )}
        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#374151', marginBottom: 8, borderLeft: '3px solid #E5E7EB', paddingLeft: 12 }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                <div style={{ color: '#222', fontSize: 13 }}>{exp.company}</div>
                <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#374151', marginBottom: 8, borderLeft: '3px solid #E5E7EB', paddingLeft: 12 }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{edu.degree}</div>
                <div style={{ color: '#6B7280', fontSize: 13 }}>{edu.school}</div>
                <div style={{ color: '#6B7280', fontSize: 13 }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{edu.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#374151', marginBottom: 8, borderLeft: '3px solid #E5E7EB', paddingLeft: 12 }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ background: '#F3F4F6', color: '#222', borderRadius: 6, padding: '2px 12px', fontSize: 13 }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: '#374151', marginBottom: 8, borderLeft: '3px solid #E5E7EB', paddingLeft: 12 }}>Projects</div>
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{project.name}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{project.description}</div>
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ background: '#F3F4F6', color: '#222', borderRadius: 6, padding: '2px 12px', fontSize: 13 }}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none' }}>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none' }}>
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
  );
} 