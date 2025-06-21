import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf" },
    { src: "/fonts/Inter-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Inter-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Inter",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#18181B",
    padding: 20,
    color: "#FFFFFF",
  },
  main: {
    width: "70%",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    color: "#FFFFFF",
  },
  contact: {
    fontSize: 10,
    color: "#A1A1AA",
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 12,
    color: "#18181B",
    borderBottom: "2px solid #E4E4E7",
    paddingBottom: 4,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 12,
    color: "#FFFFFF",
    borderBottom: "2px solid #3F3F46",
    paddingBottom: 4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#3F3F46",
  },
  experience: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    fontWeight: 600,
    color: "#18181B",
  },
  date: {
    fontSize: 10,
    color: "#71717A",
  },
  position: {
    fontSize: 10,
    color: "#3F3F46",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: "#3F3F46",
    lineHeight: 1.5,
  },
  education: {
    marginBottom: 16,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  school: {
    fontSize: 11,
    fontWeight: 600,
    color: "#18181B",
  },
  degree: {
    fontSize: 10,
    color: "#3F3F46",
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#3F3F46",
    color: "#FFFFFF",
    padding: "4 12",
    borderRadius: 4,
  },
  projects: {
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: "#18181B",
  },
  projectDescription: {
    fontSize: 10,
    color: "#3F3F46",
    lineHeight: 1.5,
  },
  link: {
    fontSize: 10,
    color: "#18181B",
    marginLeft: 8,
  },
});

interface ModernSidebarPDFProps {
  data: ResumeData;
}

export const ModernSidebarPDF = ({ data }: ModernSidebarPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
        <Text style={styles.contact}>{data.email}</Text>
        {data.phone && <Text style={styles.contact}>{data.phone}</Text>}
        {data.location && <Text style={styles.contact}>{data.location}</Text>}

        {/* Skills in Sidebar */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
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
                <View style={styles.experienceHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>{`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}</Text>
                </View>
                <Text style={styles.position}>{exp.position}</Text>
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
                <View style={styles.educationHeader}>
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.date}>{`${edu.startDate} - ${edu.current ? "Present" : edu.endDate}`}</Text>
                </View>
                <Text style={styles.degree}>{edu.degree}</Text>
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
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
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                </View>
                <Text style={styles.description}>{project.description}</Text>
                <Text style={{ flexDirection: 'row', marginTop: 3 }}>
                  {project.liveUrl && <Link src={project.liveUrl} style={styles.link}>Live Demo</Link>}
                  {project.codeUrl && <Link src={project.codeUrl} style={styles.link}>Code</Link>}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
); 