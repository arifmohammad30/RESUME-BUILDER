import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAF9F6',
    padding: 40,
    fontFamily: 'Times-Roman',
    color: '#1F2937',
    minHeight: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  name: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 14,
    color: '#6B7280',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    marginHorizontal: 8,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  leftColumn: {
    width: '45%',
  },
  rightColumn: {
    width: '55%',
    borderLeftWidth: 1,
    borderLeftColor: '#D1D5DB',
    paddingLeft: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
    color: '#111827',
  },
  company: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 2,
  },
  link: {
    color: '#6B7280',
    textDecoration: 'none',
    fontSize: 12,
    marginRight: 16,
  },
  projectItem: {
    marginBottom: 24,
    borderLeftWidth: 2,
    borderLeftColor: '#D1D5DB',
    paddingLeft: 16,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#F9FAFB',
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
});

interface ElegantSerifPDFProps {
  data: ResumeData;
}

export const ElegantSerifPDF = ({ data }: ElegantSerifPDFProps) => (
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

      <View style={styles.twoColumnGrid}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 16 }}>
                  <Text style={styles.subheading}>{edu.degree}</Text>
                  <Text style={styles.company}>{edu.school}</Text>
                  <Text style={styles.dateRange}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
                  {edu.description && <Text style={styles.text}>{edu.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.listItem}>• {skill.name}</Text>
              ))}
            </View>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <View style={styles.section}>
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
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.text}>{data.summary}</Text>
            </View>
          )}

          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 24 }}>
                  <Text style={styles.subheading}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                  {exp.description && <Text style={styles.text}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {data.projects.map((project, i) => (
                <View key={i} style={styles.projectItem}>
                  <Text style={styles.subheading}>{project.name}</Text>
                  {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
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
        </View>
      </View>
    </Page>
  </Document>
); 