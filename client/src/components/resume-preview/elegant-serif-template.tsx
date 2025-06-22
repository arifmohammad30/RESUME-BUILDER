import { ResumeData } from "@/types/schema";
import React from "react";
import { formatExperienceDateRange } from './resume-preview';

interface ElegantSerifTemplateProps {
  data: ResumeData;
}

export function ElegantSerifTemplate({ data }: ElegantSerifTemplateProps) {
  const columnStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#4A5568',
    marginBottom: '16px',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: '8px',
    letterSpacing: '1px'
  };
  
  return (
    <div style={{ background: '#F7FAFC', color: '#2D3748', padding: '40px', maxWidth: '210mm', minHeight: '297mm', margin: 'auto', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', color: '#1A202C' }}>{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p style={{ fontSize: '20px', fontWeight: 'normal', color: '#4A5568', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{data.jobTitle}</p>}
        <p style={{ fontSize: '14px', color: '#718096', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '8px 16px' }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2B6CB0', textDecoration: 'underline' }}>Website</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#2B6CB0', textDecoration: 'underline' }}>LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2B6CB0', textDecoration: 'underline' }}>GitHub</a>}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '32px' }}>
        {/* Left Column */}
        <div style={columnStyles}>
          {data.education && data.education.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#2D3748' }}>{edu.degree}</h3>
                  <div style={{ color: '#4A5568', fontSize: '16px' }}>{edu.school}</div>
                  <div style={{ color: '#718096', fontSize: '14px', marginBottom: '4px' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  {edu.description && <p style={{ fontSize: '14px', color: '#4A5568', marginTop: '4px' }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Skills</h2>
              <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#4A5568', fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Certifications</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#2B6CB0', textDecoration: 'underline' }}>{cert.name}</a>
                    ) : (
                      <span style={{ fontSize: '16px', color: '#4A5568' }}>{cert.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={columnStyles}>
          {data.summary && (
            <div>
              <h2 style={sectionTitleStyles}>Professional Summary</h2>
              <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: 1.6 }}>{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#2D3748' }}>{exp.position}</h3>
                  <div style={{ color: '#4A5568', fontSize: '16px' }}>{exp.company}</div>
                  <div style={{ color: '#718096', fontSize: '14px', marginBottom: '4px' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                  {exp.description && <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: 1.5, marginTop: '4px' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.projects.map((project, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#2D3748' }}>{project.name}</h3>
                    <p style={{ color: '#4A5568', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ background: '#EDF2F7', color: '#4A5568', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2B6CB0', fontSize: '14px', textDecoration: 'underline' }}>
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2B6CB0', fontSize: '14px', textDecoration: 'underline' }}>
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
      </div>
    </div>
  );
} 