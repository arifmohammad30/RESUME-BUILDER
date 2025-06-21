import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register a monospace font for PDF
Font.register({
  family: "Courier New",
  fonts: [
    { src: "/fonts/Courier_New_Regular.ttf" }, // Assuming you have font files available
    { src: "/fonts/Courier_New_Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#111827', // Dark background
    fontFamily: 'Courier New',
    color: '#F9FAFB', // White/light text
    padding: 40,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // Subtle divider
  },
  name: {
    fontSize: 38,
    fontWeight: 700,
    marginBottom: 8,
    color: '#60A5FA', // Blue accent
  },
  jobTitle: {
    fontSize: 18,
    color: '#D1D5DB',
    marginBottom: 15,
  },
  contactInfo: {
    fontSize: 11,
    color: '#9CA3AF',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 10,
  },
  section: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // Subtle divider
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#34D399', // Green accent
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 700,
    color: '#E5E7EB',
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    color: '#D1D5DB',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 11,
    color: '#D1D5DB',
    marginBottom: 2,
  },
  link: {
    color: '#60A5FA',
    textDecoration: 'underline',
    fontSize: 10,
    marginRight: 10,
  },
});

interface DarkThemePDFProps {
  data: ResumeData;
}

export const DarkThemePDF = ({ data }: DarkThemePDFProps) => (
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
            <View key={i} style={{ marginBottom: 15 }}>
              <Text style={styles.subheading}>{exp.position} at {exp.company}</Text>
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
            <View key={i} style={{ marginBottom: 15 }}>
              <Text style={styles.subheading}>{edu.degree}, {edu.school}</Text>
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
            <View key={i} style={{ marginBottom: 15 }}>
              <Text style={styles.subheading}>{project.name}</Text>
              {project.description && <Text style={styles.text}>{project.description}</Text>}
              <Text style={{ flexDirection: 'row', marginTop: 3 }}>
                {project.liveUrl && <Link src={project.liveUrl} style={styles.link}>Live Demo</Link>}
                {project.codeUrl && <Link src={project.codeUrl} style={styles.link}>Code</Link>}
              </Text>
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

      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          {data.certifications.map((cert, i) => (
            <Text key={i} style={styles.listItem}>• {cert.name} ({cert.year})</Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
); 