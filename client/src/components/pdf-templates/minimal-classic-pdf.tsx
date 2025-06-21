import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register Arial font for PDF
Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/Arial-Regular.ttf" }, // Assuming you have Arial font files available
    { src: "/fonts/Arial-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Arial",
    color: '#000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5', // Light gray border
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subheading: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 9,
    color: '#555',
    marginBottom: 2,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 2,
  },
  link: {
    color: '#0056b3',
    textDecoration: 'underline',
    fontSize: 9,
    marginRight: 5,
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

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={styles.subheading}>{edu.degree}, {edu.school}</Text>
              <Text style={styles.dateRange}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
              {edu.description && <Text style={styles.text}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={styles.subheading}>{exp.position} - {exp.company}</Text>
              <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
              {exp.description && <Text style={styles.text}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {data.projects.map((project, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
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

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          {data.certifications.map((cert, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <Text style={styles.listItem}>• {cert.name} ({cert.year})</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
); 