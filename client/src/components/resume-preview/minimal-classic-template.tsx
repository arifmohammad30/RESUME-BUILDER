import { ResumeData } from "@/types/schema";
import React from "react";
import { formatExperienceDateRange } from './resume-preview';
import { Linkedin, Github, Globe } from "lucide-react";

interface MinimalClassicTemplateProps {
  data: ResumeData;
}

export function MinimalClassicTemplate({ data }: MinimalClassicTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', padding: '40px', maxWidth: '210mm', margin: 'auto', background: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '1px solid #ddd', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{data.firstName} {data.lastName}</h1>
        {data.jobTitle && <p style={{ fontSize: '18px', fontWeight: 'normal', color: '#555', marginBottom: '16px' }}>{data.jobTitle}</p>}
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#555' }}>
          {data.email && <span style={{ display: 'flex', alignItems: 'center' }}>{data.email}</span>}
          {data.phone && <span style={{ display: 'flex', alignItems: 'center' }}>{data.phone}</span>}
          {data.location && <span style={{ display: 'flex', alignItems: 'center' }}>{data.location}</span>}
        </p>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
          {data.website && (
            <a href={data.website} style={{ color: '#007BFF', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }} target="_blank" rel="noopener noreferrer">
              <Globe style={{ width: 14, height: 14 }} /> Website
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} style={{ color: '#007BFF', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }} target="_blank" rel="noopener noreferrer">
              <Linkedin style={{ width: 14, height: 14 }} /> LinkedIn
            </a>
          )}
          {data.github && (
            <a href={data.github} style={{ color: '#007BFF', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }} target="_blank" rel="noopener noreferrer">
              <Github style={{ width: 14, height: 14 }} /> GitHub
            </a>
          )}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.summary && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>SUMMARY</h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>EXPERIENCE</h2>
            {data.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{exp.position}</h3>
                  <div style={{ fontSize: '14px', color: '#555' }}>{formatExperienceDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                </div>
                <div style={{ color: '#333', fontSize: '14px', marginBottom: '4px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>EDUCATION</h2>
            {data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{edu.degree}</h3>
                  <div style={{ fontSize: '14px', color: '#555' }}>{formatExperienceDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                </div>
                <div style={{ color: '#333', fontSize: '14px', marginBottom: '4px' }}>{edu.school}</div>
                {edu.description && <p style={{ fontSize: '14px' }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>PROJECTS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.projects.map((project, i) => (
                <div key={i}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{project.name}</h3>
                  <p style={{ color: '#555', fontSize: '14px', marginTop: '2px', lineHeight: 1.5 }}>{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ background: '#f0f0f0', color: '#555', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', fontSize: '14px' }}>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', fontSize: '14px' }}>
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
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>SKILLS</h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{data.skills.map(skill => skill.name).join(' ・ ')}</p>
          </div>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>CERTIFICATIONS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#007BFF', textDecoration: 'none' }}>{cert.name}</a>
                  ) : (
                    <span style={{ fontSize: '14px' }}>{cert.name}</span>
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