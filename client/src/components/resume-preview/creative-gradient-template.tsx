import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github } from "lucide-react";

export function CreativeGradientTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', width: 800, minHeight: 1120, overflow: 'hidden', fontFamily: 'Roboto Flex, Inter, Arial, sans-serif', color: '#222', margin: 'auto' }} className="mx-auto">
      {/* Gradient Bar */}
      <div style={{ height: 18, background: 'linear-gradient(90deg, #F472B6 0%, #60A5FA 100%)' }} />
      <div style={{ padding: '40px 48px' }}>
        <div style={{ fontWeight: 800, fontSize: 30, color: '#F472B6', letterSpacing: 1, fontFamily: 'inherit' }}>{data.firstName} {data.lastName}</div>
        <div style={{ color: '#6B7280', fontSize: 15, marginBottom: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.email}</span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.phone}</span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{data.location}</span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ marginLeft: 12 }}>
              <Linkedin style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4, color: '#60A5FA' }} />
              <a href={data.linkedin} style={{ color: '#60A5FA', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ marginLeft: 12 }}>
              <Github style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4, color: '#F472B6' }} />
              <a href={data.github} style={{ color: '#F472B6', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>About Me</div>
            <div style={{ color: '#374151', fontSize: 15 }}>{data.summary}</div>
          </div>
        )}
        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Experience</div>
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
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{edu.degree}</div>
                <div style={{ color: '#F472B6', fontSize: 13 }}>{edu.school} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{edu.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ background: '#F472B6', color: '#fff', borderRadius: 8, padding: '2px 12px', fontSize: 13 }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Projects</div>
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{project.name}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{project.description}</div>
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ background: '#F472B6', color: '#fff', borderRadius: 8, padding: '2px 12px', fontSize: 13 }}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#F472B6', fontSize: 13, textDecoration: 'none' }}>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#F472B6', fontSize: 13, textDecoration: 'none' }}>
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