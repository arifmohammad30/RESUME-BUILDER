import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: 'Helvetica',
    color: '#000',
    minHeight: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#374151',
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    marginHorizontal: 6,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subheading: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 2,
    color: '#111827',
  },
  company: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 2,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.4,
    marginBottom: 2,
    color: '#374151',
  },
  dateRange: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 2,
    color: '#374151',
  },
  link: {
    color: '#2563EB',
    textDecoration: 'underline',
    fontSize: 12,
    marginRight: 16,
  },
  projectItem: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 10,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  lastSection: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
});

interface MinimalClassicPDFProps {
  data: ResumeData;
}

export const MinimalClassicPDF = ({ data }: MinimalClassicPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
        {data.jobTitle && <Text style={styles.jobTitle}>{data.jobTitle}</Text>}
        <View style={styles.contactInfo}>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
          {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          {data.website && <Link src={data.website} style={styles.contactItem}>Website</Link>}
          {data.linkedin && <Link src={data.linkedin} style={styles.contactItem}>LinkedIn</Link>}
          {data.github && <Link src={data.github} style={styles.contactItem}>GitHub</Link>}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.subheading}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
              {exp.description && <Text style={styles.text}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.subheading}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.dateRange}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
              {edu.description && <Text style={styles.text}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {data.projects.map((project, i) => (
            <View key={i} style={styles.projectItem}>
              <Text style={styles.subheading}>{project.name}</Text>
              {project.description && <Text style={styles.text}>{project.description}</Text>}
              {project.tags && project.tags.length > 0 && (
                <View style={styles.projectTags}>
                  {project.tags.map((tag, tagIndex) => (
                    <Text key={tagIndex} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              )}
              <View style={styles.projectLinks}>
                {project.codeUrl && <Link src={project.codeUrl} style={styles.link}>View Code</Link>}
                {project.liveUrl && <Link src={project.liveUrl} style={styles.link}>Live Demo</Link>}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <Text style={styles.text}>{data.skills.map(skill => skill.name).join(', ')}</Text>
        </View>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          {data.certifications.map((cert, i) => (
            cert.url ? (
              <Link key={i} src={cert.url} style={styles.listItem}>• {cert.name}</Link>
            ) : (
              <Text key={i} style={styles.listItem}>• {cert.name}</Text>
            )
          ))}
        </View>
      )}
    </Page>
  </Document>
); 