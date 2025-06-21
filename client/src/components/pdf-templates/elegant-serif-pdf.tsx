import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

Font.register({
  family: "Georgia",
  fonts: [
    { src: "/fonts/Georgia-Regular.ttf" }, // Assuming you have Georgia fonts available or provide a path
    { src: "/fonts/Georgia-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAF9F6',
    padding: 40,
    fontFamily: 'Georgia',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 8,
    color: '#333',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 11,
    color: '#666',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 8,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftColumn: {
    width: '45%',
    paddingRight: 20,
  },
  rightColumn: {
    width: '55%',
    paddingLeft: 20,
    borderLeft: '1px solid #ddd',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#444',
    marginBottom: 12,
    borderBottom: '1px solid #ccc',
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
    color: '#333',
  },
  text: {
    fontSize: 11,
    color: '#555',
    lineHeight: 1.4,
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 10,
    color: '#777',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2,
  },
  link: {
    color: '#0056b3',
    textDecoration: 'underline',
    fontSize: 11,
    marginRight: 10,
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
                <View key={i} style={{ marginBottom: 12 }}>
                  <Text style={styles.subheading}>{edu.degree}, {edu.school}</Text>
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
                <Text key={i} style={styles.listItem}>• {cert.name} ({cert.year})</Text>
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
                <View key={i} style={{ marginBottom: 16 }}>
                  <Text style={styles.subheading}>{exp.position} at {exp.company}</Text>
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
                <View key={i} style={{ marginBottom: 12 }}>
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
        </View>
      </View>
    </Page>
  </Document>
); 