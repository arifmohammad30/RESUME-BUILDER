import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export function ModernSidebarTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ display: 'flex', background: '#F0FDFA', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px #0001', width: 800, minHeight: 1120 }}>
      {/* Sidebar */}
      <div style={{ background: 'linear-gradient(180deg, #14B8A6 0%, #0E7490 100%)', color: '#fff', width: 200, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>{data.firstName} {data.lastName}</div>
        <div style={{ fontSize: 13, marginBottom: 24, textAlign: 'center' }}>{data.location}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, width: '100%' }}>
          {data.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><Mail style={{ width: 16, height: 16, marginRight: 2 }} />{data.email}</div>}
          {data.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><Phone style={{ width: 16, height: 16, marginRight: 2 }} />{data.phone}</div>}
          {data.location && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><MapPin style={{ width: 16, height: 16, marginRight: 2 }} />{data.location}</div>}
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
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, background: '#fff', padding: 40 }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Profile</div>
            <div style={{ color: '#374151', fontSize: 15 }}>{data.summary}</div>
          </div>
        )}
        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                <div style={{ color: '#14B8A6', fontSize: 13 }}>{exp.company}</div>
                <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{edu.degree}</div>
                <div style={{ color: '#14B8A6', fontSize: 13 }}>{edu.school} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{edu.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#14B8A6', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Projects</div>
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{project.name}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{project.description}</div>
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ background: '#F0FDFA', color: '#14B8A6', borderRadius: 8, padding: '2px 10px', fontSize: 12 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#14B8A6', fontSize: 13, textDecoration: 'none' }}>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#14B8A6', fontSize: 13, textDecoration: 'none' }}>
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