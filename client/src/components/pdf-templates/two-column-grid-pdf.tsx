import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    padding: 32,
    color: '#1F2937',
    minHeight: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
    backgroundColor: '#F3F4F6',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 12,
    color: '#6B7280',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    marginHorizontal: 8,
  },
  mainContent: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: 32,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#DBEAFE',
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#1D4ED8',
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    color: '#374151',
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
    color: '#2563EB',
    textDecoration: 'none',
    fontSize: 12,
    marginRight: 16,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  },
});

interface TwoColumnGridPDFProps {
  data: ResumeData;
}

export const TwoColumnGridPDF = ({ data }: TwoColumnGridPDFProps) => (
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

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Column: Summary, Experience, Projects */}
        <View style={styles.leftColumn}>
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
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
                <View key={i} style={styles.projectCard}>
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
        </View>

        {/* Right Column: Education, Skills, Certifications */}
        <View style={styles.rightColumn}>
          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 24 }}>
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
        </View>
      </View>
    </Page>
  </Document>
); 