import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github } from "lucide-react";

export function TechStartupTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ background: '#F8FAFC', borderRadius: 18, boxShadow: '0 4px 24px #0002', width: 800, minHeight: 1120, overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif', color: '#222', margin: 'auto' }} className="mx-auto">
      <div style={{ background: 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)', padding: '32px 48px', color: '#fff', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
        <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: 1 }}>{data.firstName} {data.lastName}</div>
        <div style={{ fontSize: 15, marginTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: '#fff' }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.email}</span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.phone}</span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.location}</span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Linkedin style={{ width: 16, height: 16, color: '#06B6D4' }} />
              <a href={data.linkedin} style={{ color: '#06B6D4', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Github style={{ width: 16, height: 16, color: '#7C3AED' }} />
              <a href={data.github} style={{ color: '#7C3AED', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: '32px 48px' }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#7C3AED', fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>About</div>
            <div style={{ color: '#374151', fontSize: 15 }}>{data.summary}</div>
          </div>
        )}
        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#06B6D4', fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{exp.position}</div>
                <div style={{ color: '#7C3AED', fontSize: 13 }}>{exp.company}</div>
                <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#06B6D4', fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{edu.degree}</div>
                <div style={{ color: '#7C3AED', fontSize: 13 }}>{edu.school}</div>
                <div style={{ color: '#6B7280', fontSize: 13 }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{edu.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#7C3AED', fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ background: '#06B6D4', color: '#fff', borderRadius: 8, padding: '2px 12px', fontSize: 13, fontWeight: 600 }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#7C3AED', fontWeight: 800, fontSize: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Projects</div>
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{project.name}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{project.description}</div>
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ background: '#7C3AED', color: '#fff', borderRadius: 8, padding: '2px 12px', fontSize: 13, fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#7C3AED', fontSize: 13, textDecoration: 'none' }}>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#7C3AED', fontSize: 13, textDecoration: 'none' }}>
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