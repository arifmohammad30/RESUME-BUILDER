import { Document, Page, Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register Inter font
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 500 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Inter",
    color: '#222',
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
  },
  header: {
    borderBottom: '2px solid #15803D',
    padding: '40px 48px 24px 48px',
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: '#15803D',
    marginBottom: 8,
  },
  contactInfo: {
    color: '#6B7280',
    fontSize: 15,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    color: '#15803D',
    textDecoration: 'underline',
    fontSize: 15,
  },
  content: {
    padding: '32px 48px',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#15803D',
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8,
  },
  summary: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 1.5,
  },
  experience: {
    marginBottom: 16,
  },
  position: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
  },
  company: {
    color: '#15803D',
    fontSize: 13,
    marginBottom: 2,
  },
  date: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 4,
  },
  description: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 1.4,
  },
  education: {
    marginBottom: 16,
  },
  degree: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
  },
  school: {
    color: '#15803D',
    fontSize: 13,
    marginBottom: 2,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    background: '#DCFCE7',
    color: '#15803D',
    borderRadius: 6,
    padding: '2px 12px',
    fontSize: 13,
  },
  projects: {
    marginBottom: 16,
  },
  projectTitle: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
    color: '#111827',
  },
  projectDescription: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  projectLink: {
    color: '#15803D',
    fontSize: 13,
    textDecoration: 'underline',
  },
  certifications: {
    marginBottom: 16,
  },
  certificationName: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
    color: '#111827',
  },
  certificationLink: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
    color: '#15803D',
    textDecoration: 'underline',
  },
});

interface ClassicProfessionalPDFProps {
  data: ResumeData;
}

export const ClassicProfessionalPDF = ({ data }: ClassicProfessionalPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
          <View style={styles.contactInfo}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
            {data.linkedin && <Link src={data.linkedin} style={styles.contactItem}>
              <Text style={styles.link}>LinkedIn</Text>
            </Link>}
            {data.github && <Link src={data.github} style={styles.contactItem}>
              <Text style={styles.link}>GitHub</Text>
            </Link>}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Summary */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp, index) => (
                <View key={index} style={styles.experience}>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>{`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}</Text>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.education}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.school}>{edu.school} | {edu.startDate} - {edu.current ? "Present" : edu.endDate}</Text>
                  {edu.description && <Text style={styles.description}>{edu.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skills}>
                {data.skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert, index) => (
                <View key={index} style={styles.certifications}>
                  {cert.url ? (
                    <Link src={cert.url} style={styles.certificationLink}>
                      {cert.name}
                    </Link>
                  ) : (
                    <Text style={styles.certificationName}>{cert.name}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.projects}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  <View style={styles.projectLinks}>
                    {project.liveUrl && <Link src={project.liveUrl} style={styles.projectLink}>Live Demo</Link>}
                    {project.codeUrl && <Link src={project.codeUrl} style={styles.projectLink}>Code</Link>}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
); 