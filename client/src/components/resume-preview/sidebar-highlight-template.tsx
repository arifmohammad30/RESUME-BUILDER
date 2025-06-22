import { ResumeData } from "@/types/schema";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import { formatExperienceDateRange } from './resume-preview';

interface SidebarHighlightTemplateProps {
  data: ResumeData;
}

export function SidebarHighlightTemplate({ data }: SidebarHighlightTemplateProps) {
  const sidebarStyles: React.CSSProperties = {
    width: '33.333333%',
    backgroundColor: '#1F2937',
    color: 'white',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const mainContentStyles: React.CSSProperties = {
    width: '66.666667%',
    backgroundColor: 'white',
    padding: '40px',
    overflow: 'auto'
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '16px',
    borderBottom: '2px solid #D1D5DB',
    paddingBottom: '8px'
  };
  
  return (
    <div style={{ display: 'flex', background: '#F9FAFB', width: '100%', maxWidth: '210mm', minHeight: '297mm', overflow: 'hidden', fontFamily: 'Poppins, sans-serif', margin: 'auto' }}>
      {/* Left Sidebar */}
      <div style={sidebarStyles}>
        {/* Profile Photo (Optional) */}
        {/* {data.profilePhoto && <img src={data.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mb-6 object-cover" />} */}

        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px', textAlign: 'center' }}>{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p style={{ fontSize: '16px', fontWeight: 'normal', color: '#D1D5DB', marginBottom: '24px', textAlign: 'center' }}>{data.jobTitle}</p>}

        <div style={{ borderBottom: '1px solid #4B5563', width: '100%', marginBottom: '24px' }} />

        {/* Contact Info */}
        <div style={{ marginBottom: '24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><Mail style={{ width: 14, height: 14, color: '#9CA3AF' }} />{data.email}</div>}
          {data.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><Phone style={{ width: 14, height: 14, color: '#9CA3AF' }} />{data.phone}</div>}
          {data.location && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><MapPin style={{ width: 14, height: 14, color: '#9CA3AF' }} />{data.location}</div>}
          {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'white', textDecoration: 'underline' }}><Globe style={{ width: 14, height: 14, color: '#9CA3AF' }} />Website</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'white', textDecoration: 'underline' }}><Linkedin style={{ width: 14, height: 14, color: '#9CA3AF' }} />LinkedIn</a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'white', textDecoration: 'underline' }}><Github style={{ width: 14, height: 14, color: '#9CA3AF' }} />GitHub</a>}
        </div>

        {/* Skills with Progress Bars */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '16px' }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <p style={{ fontSize: '14px', marginBottom: '4px' }}>{skill.name}</p>
                  <div style={{ width: '100%', backgroundColor: '#4B5563', borderRadius: '9999px', height: '8px' }}>
                    <div
                      style={{ backgroundColor: '#2DD4BF', height: '8px', borderRadius: '9999px', width: `${(parseFloat(skill.level) / 5) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.certifications && data.certifications.length > 0 && (
          <div style={{ marginTop: '24px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'semibold', marginBottom: '16px' }}>Certifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'white', textDecoration: 'underline' }}>{cert.name}</a>
                  ) : (
                    <p style={{ fontSize: '14px' }}>{cert.name}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={mainContentStyles}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Summary */}
          {data.summary && (
            <div>
              <h2 style={sectionTitleStyles}>Summary</h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6 }}>{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#1F2937' }}>{exp.position}</h3>
                      <p style={{ fontSize: '14px', color: '#6B7280' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                    </div>
                    <p style={{ fontSize: '16px', color: '#3B82F6', marginBottom: '8px' }}>{exp.company}</p>
                    {exp.description && <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.5 }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.projects.map((project, i) => (
                  <div key={i} style={{ borderLeft: '4px solid #3B82F6', paddingLeft: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#1F2937' }}>{project.name}</h3>
                    <p style={{ color: '#4B5563', fontSize: '14px', marginTop: '4px' }}>{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'underline' }}>
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'underline' }}>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 style={sectionTitleStyles}>Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'semibold', color: '#1F2937' }}>{edu.degree}</h3>
                      <p style={{ fontSize: '14px', color: '#6B7280' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                    </div>
                    <p style={{ fontSize: '16px', color: '#3B82F6', marginBottom: '8px' }}>{edu.school}</p>
                    {edu.description && <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '4px' }}>{edu.description}</p>}
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