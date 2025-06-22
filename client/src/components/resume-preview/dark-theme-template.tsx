import { ResumeData } from "@/types/schema";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import { formatExperienceDateRange } from './resume-preview';

interface DarkThemeTemplateProps {
  data: ResumeData;
}

export function DarkThemeTemplate({ data }: DarkThemeTemplateProps) {
  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#34D399',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #374151',
    letterSpacing: '1px'
  };

  return (
    <div style={{ backgroundColor: '#111827', color: '#E5E7EB', padding: '40px', maxWidth: '210mm', minHeight: '297mm', margin: 'auto', fontFamily: 'Fira Code, Ubuntu Mono, monospace' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', color: '#60A5FA' }}>{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p style={{ fontSize: '20px', color: '#D1D5DB', marginBottom: '16px' }}>{data.jobTitle}</p>}
        <p style={{ fontSize: '14px', color: '#9CA3AF', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 24px' }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail style={{ width: 14, height: 14 }} />{data.email}</span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone style={{ width: 14, height: 14 }} />{data.phone}</span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin style={{ width: 14, height: 14 }} />{data.location}</span>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe style={{ width: 14, height: 14 }} />Website</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px' }}><Linkedin style={{ width: 14, height: 14 }} />LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px' }}><Github style={{ width: 14, height: 14 }} />GitHub</a>}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {data.summary && (
          <div>
            <h2 style={sectionTitleStyles}>SUMMARY</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#D1D5DB' }}>{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div>
            <h2 style={sectionTitleStyles}>EXPERIENCE</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#F9FAFB' }}>{exp.position}</h3>
                    <p style={{ fontSize: '14px', color: '#9CA3AF' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <p style={{ fontSize: '16px', color: '#6EE7B7', marginBottom: '8px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '14px', color: '#D1D5DB', lineHeight: 1.5 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div>
            <h2 style={sectionTitleStyles}>EDUCATION</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#F9FAFB' }}>{edu.degree}</h3>
                    <p style={{ fontSize: '14px', color: '#9CA3AF' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                  </div>
                  <p style={{ fontSize: '16px', color: '#6EE7B7', marginBottom: '8px' }}>{edu.school}</p>
                  {edu.description && <p style={{ fontSize: '14px', color: '#D1D5DB' }}>{edu.description}</p>}
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
                  <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#F9FAFB' }}>{project.name}</h3>
                  <p style={{ color: '#D1D5DB', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ background: '#1F2937', color: '#6EE7B7', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6EE7B7', fontSize: '14px', textDecoration: 'underline' }}>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6EE7B7', fontSize: '14px', textDecoration: 'underline' }}>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 style={sectionTitleStyles}>SKILLS</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#D1D5DB' }}>{data.skills.map(skill => skill.name).join(' ・ ')}</p>
          </div>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 style={sectionTitleStyles}>CERTIFICATIONS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#6EE7B7', textDecoration: 'underline' }}>{cert.name}</a>
                  ) : (
                    <span style={{ fontSize: '16px', color: '#F9FAFB' }}>{cert.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 