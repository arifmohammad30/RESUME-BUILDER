import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register Poppins font (assuming you have access to the font files)
Font.register({
  family: "Poppins",
  fonts: [
    { src: "/fonts/Poppins-Regular.ttf" },
    { src: "/fonts/Poppins-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Poppins-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Poppins-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB', // Light gray background for the overall page
    fontFamily: "Poppins",
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#4B5563', // Gray sidebar
    color: '#fff',
    padding: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
    width: '67%',
    backgroundColor: '#fff',
    padding: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 4,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#D1D5DB',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    marginBottom: 20,
  },
  sectionTitleSidebar: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contactIcon: {
    marginRight: 6,
    fontSize: 12,
  },
  skillSection: {
    width: '100%',
    marginBottom: 20,
  },
  skillName: {
    fontSize: 11,
    marginBottom: 4,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#6B7280',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#20C997', // Teal color
    borderRadius: 3,
  },
  sectionTitleMain: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
  },
  experienceSubtitle: {
    fontSize: 11,
    color: '#555',
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
  },
  projectSubtitle: {
    fontSize: 11,
    color: '#555',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.4,
  },
  link: {
    color: '#007BFF',
    textDecoration: 'underline',
    fontSize: 10,
    marginRight: 10,
  },
});

interface SidebarHighlightPDFProps {
  data: ResumeData;
}

export const SidebarHighlightPDF = ({ data }: SidebarHighlightPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Sidebar */}
      <View style={styles.sidebar}>
        {/* Profile Photo (optional - PDF doesn't directly support dynamic images from data without external processing) */}
        {/* Name and Job Title */}
        <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
        {data.jobTitle && <Text style={styles.jobTitle}>{data.jobTitle}</Text>}

        <View style={styles.divider} />

        {/* Contact Info */}
        <Text style={styles.sectionTitleSidebar}>CONTACT</Text>
        {data.email && <Text style={styles.contactInfo}><Text style={styles.contactIcon}>✉️</Text>{data.email}</Text>}
        {data.phone && <Text style={styles.contactInfo}><Text style={styles.contactIcon}>📞</Text>{data.phone}</Text>}
        {data.location && <Text style={styles.contactInfo}><Text style={styles.contactIcon}>📍</Text>{data.location}</Text>}
        {data.linkedin && <Link src={data.linkedin} style={styles.contactInfo}><Text style={styles.contactIcon}>🔗</Text>LinkedIn</Link>}
        {data.github && <Link src={data.github} style={styles.contactInfo}><Text style={styles.contactIcon}>💻</Text>GitHub</Link>}

        <View style={styles.divider} />

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.skillSection}>
            <Text style={styles.sectionTitleSidebar}>SKILLS</Text>
            {data.skills.map((skill, i) => (
              <View key={i} style={{ marginBottom: 10, width: '100%' }}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${(parseFloat(skill.level) / 5) * 100 || 0}%` }]} />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications (if desired in sidebar) */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.sectionTitleSidebar}>CERTIFICATIONS</Text>
            {data.certifications.map((cert, i) => (
              <Text key={i} style={styles.contactInfo}>{cert.name} ({cert.year})</Text>
            ))}
          </View>
        )}
      </View>

      {/* Right Content */}
      <View style={styles.mainContent}>
        {/* Summary */}
        {data.summary && (
          <View style={styles.experienceItem}>
            <Text style={styles.sectionTitleMain}>SUMMARY</Text>
            <Text style={styles.experienceDescription}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.experienceItem}>
            <Text style={styles.sectionTitleMain}>EXPERIENCE</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{exp.position} at {exp.company}</Text>
                <Text style={styles.experienceSubtitle}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                {exp.description && <Text style={styles.experienceDescription}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.projectItem}>
            <Text style={styles.sectionTitleMain}>PROJECTS</Text>
            {data.projects.map((project, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.name}</Text>
                {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
                <Text style={{ flexDirection: 'row', marginTop: 3 }}>
                  {project.liveUrl && <Link src={project.liveUrl} style={styles.link}>Live Demo</Link>}
                  {project.codeUrl && <Link src={project.codeUrl} style={styles.link}>Code</Link>}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.experienceItem}>
            <Text style={styles.sectionTitleMain}>EDUCATION</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{edu.degree}, {edu.school}</Text>
                <Text style={styles.experienceSubtitle}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
                {edu.description && <Text style={styles.experienceDescription}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
); 