import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github } from "lucide-react";

export function ElegantBWTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ background: '#fff', border: '2px solid #222', borderRadius: 12, boxShadow: '0 2px 12px #0002', width: 800, minHeight: 1120, margin: 'auto', fontFamily: 'Montserrat, Arial, sans-serif', color: '#111' }}>
      <div style={{ borderBottom: '2px solid #222', padding: '40px 48px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>{data.firstName} {data.lastName}</div>
        <div style={{ color: '#444', fontSize: 15, marginTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.email}</span></span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.phone}</span></span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.location}</span></span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Linkedin style={{ width: 16, height: 16, color: '#222' }} />
              <a href={data.linkedin} style={{ color: '#222', textDecoration: 'underline', fontSize: 15 }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Github style={{ width: 16, height: 16, color: '#222' }} />
              <a href={data.github} style={{ color: '#222', textDecoration: 'underline', fontSize: 15 }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: '32px 48px' }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 8, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1 }}>Profile</div>
            <div style={{ color: '#222', fontSize: 15 }}>{data.summary}</div>
          </div>
        )}
        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 8, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1 }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{exp.position}</div>
                <div style={{ color: '#222', fontSize: 13 }}>{exp.company}</div>
                <div style={{ color: '#444', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                <div style={{ color: '#222', fontSize: 14 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 8, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1 }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{edu.degree}</div>
                <div style={{ color: '#444', fontSize: 13 }}>{edu.school} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                <div style={{ color: '#222', fontSize: 14 }}>{edu.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 8, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1 }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ background: '#fff', color: '#111', border: '1px solid #222', borderRadius: 6, padding: '2px 12px', fontSize: 13 }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111', marginBottom: 8, borderBottom: '1px solid #222', textTransform: 'uppercase', letterSpacing: 1 }}>Projects</div>
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{project.name}</div>
                <div style={{ color: '#222', fontSize: 14 }}>{project.description}</div>
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ background: '#fff', color: '#111', border: '1px solid #222', borderRadius: 6, padding: '2px 12px', fontSize: 13 }}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#444', fontSize: 13, textDecoration: 'none' }}>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#444', fontSize: 13, textDecoration: 'none' }}>
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