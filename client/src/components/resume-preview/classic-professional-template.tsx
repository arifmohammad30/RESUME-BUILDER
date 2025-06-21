import { ResumeData } from '@/types/schema';
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github } from "lucide-react";

export function ClassicProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', width: 800, minHeight: 1120, margin: 'auto', fontFamily: 'Inter, Arial, sans-serif', color: '#222' }}>
      <div style={{ borderBottom: '2px solid #15803D', padding: '40px 48px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#15803D', marginBottom: 8 }}>{data.firstName} {data.lastName}</div>
        <div style={{ color: '#6B7280', fontSize: 15, marginTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.email}</span></span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.phone}</span></span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>{data.location}</span></span>}
          {data.linkedin && data.linkedin.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Linkedin style={{ width: 16, height: 16, color: '#15803D' }} />
              <a href={data.linkedin} style={{ color: '#15803D', textDecoration: 'underline', fontSize: 15 }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          )}
          {data.github && data.github.trim() !== '' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Github style={{ width: 16, height: 16, color: '#15803D' }} />
              <a href={data.github} style={{ color: '#15803D', textDecoration: 'underline', fontSize: 15 }} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: '32px 48px' }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#15803D', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Professional Summary</div>
            <div style={{ color: '#374151', fontSize: 15 }}>{data.summary}</div>
          </div>
        )}
        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#15803D', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                <div style={{ color: '#15803D', fontSize: 13 }}>{exp.company}</div>
                <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 4 }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#15803D', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{edu.degree}</div>
                <div style={{ color: '#15803D', fontSize: 13 }}>{edu.school} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                <div style={{ color: '#374151', fontSize: 14 }}>{edu.description}</div>
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#15803D', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ background: '#DCFCE7', color: '#15803D', borderRadius: 6, padding: '2px 12px', fontSize: 13 }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#15803D', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Projects</div>
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 mt-1">
                  {project.codeUrl && (
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#15803D', 
                        fontSize: 13,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#15803D', 
                        fontSize: 13,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
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