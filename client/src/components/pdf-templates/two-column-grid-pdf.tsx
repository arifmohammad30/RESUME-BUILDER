import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register Helvetica as a sans-serif font for PDF
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "/fonts/Helvetica.ttf" }, // Assuming Helvetica.ttf is available or a common alternative
    { src: "/fonts/Helvetica-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    padding: 30,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#F0F4F8', // Light gray background for header
    paddingVertical: 15,
    borderBottom: '1px solid #D9E2EC',
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: '#2C3E50', // Dark corporate blue/gray
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    color: '#5F7285',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 5,
  },
  mainContent: {
    flexDirection: 'row',
    flexGrow: 1,
    borderTop: '1px solid #D9E2EC',
    paddingTop: 20,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 20,
    borderRight: '1px solid #D9E2EC',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2C3E50',
    marginBottom: 10,
    borderBottom: '1px solid #AAB8C6',
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  subheading: {
    fontSize: 12,
    fontWeight: 700,
    color: '#34495E',
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
    color: '#5F7285',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 9,
    color: '#777',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 10,
    color: '#5F7285',
    marginBottom: 2,
  },
  link: {
    color: '#3498DB',
    textDecoration: 'underline',
    fontSize: 9,
    marginRight: 8,
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
          {data.linkedin && <Link src={data.linkedin} style={styles.contactItem}>LinkedIn</Link>}
          {data.github && <Link src={data.github} style={styles.contactItem}>GitHub</Link>}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Column: Experience, Projects */}
        <View style={styles.leftColumn}>
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
        </View>

        {/* Right Column: Education, Skills, Certifications, Summary (optional) */}
        <View style={styles.rightColumn}>
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

          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
              <Text style={styles.text}>{data.summary}</Text>
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
); 