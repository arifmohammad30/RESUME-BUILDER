import { ResumeData } from "@/types/schema";
import React from "react";
import { formatExperienceDateRange } from './resume-preview';

interface TwoColumnGridTemplateProps {
  data: ResumeData;
}

export function TwoColumnGridTemplate({ data }: TwoColumnGridTemplateProps) {
  const columnStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #BFDBFE'
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#1F2937', maxWidth: '210mm', minHeight: '297mm', margin: 'auto', background: '#F9FAFB' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', backgroundColor: '#E5E7EB', padding: '32px', borderBottom: '2px solid #D1D5DB' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p style={{ fontSize: '18px', color: '#4B5563', marginBottom: '16px' }}>{data.jobTitle}</p>}
        <p style={{ fontSize: '14px', color: '#4B5563', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 24px' }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1E40AF', textDecoration: 'underline' }}>Website</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#1E40AF', textDecoration: 'underline' }}>LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ color: '#1E40AF', textDecoration: 'underline' }}>GitHub</a>}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
        {/* Left Column */}
        <div style={{ ...columnStyles, paddingRight: '32px', borderRight: '1px solid #D1D5DB' }}>
          {data.summary && (
            <div>
              <h2 style={sectionTitleStyles}>SUMMARY</h2>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.6 }}>{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>EXPERIENCE</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#111827' }}>{exp.position}</h3>
                    <p style={{ fontSize: '16px', color: '#1E40AF' }}>{exp.company}</p>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                    {exp.description && <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>PROJECTS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.projects.map((project, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#111827' }}>{project.name}</h3>
                    <p style={{ color: '#374151', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ background: '#EBF4FF', color: '#1E40AF', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1E40AF', fontSize: '14px', textDecoration: 'underline' }}>
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1E40AF', fontSize: '14px', textDecoration: 'underline' }}>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={columnStyles}>
          {data.education && data.education.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>EDUCATION</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#111827' }}>{edu.degree}</h3>
                    <p style={{ fontSize: '16px', color: '#1E40AF' }}>{edu.school}</p>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                    {edu.description && <p style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>SKILLS</h2>
              <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#374151', fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>CERTIFICATIONS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#1E40AF', textDecoration: 'underline' }}>{cert.name}</a>
                    ) : (
                      <span style={{ fontSize: '16px', color: '#111827' }}>{cert.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}