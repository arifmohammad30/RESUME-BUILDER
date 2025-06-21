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
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    fontFamily: "Inter",
  },
  sidebar: {
    width: 220,
    backgroundColor: '#2563EB',
    color: '#fff',
    padding: 32,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 4,
    textAlign: 'left',
    width: '100%',
  },
  jobTitle: {
    fontSize: 14,
    marginBottom: 24,
    opacity: 0.9,
    textAlign: 'left',
    width: '100%',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    width: '100%',
    marginBottom: 24,
  },
  sectionTitleSidebar: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 6,
  },
  skillBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  sectionTitleMain: {
    fontSize: 20,
    fontWeight: 700,
    color: '#2563EB',
    marginBottom: 16,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
  },
  experienceDate: {
    fontSize: 11,
    color: '#6B7280',
  },
  experienceDescription: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 16,
  },
  educationDegree: {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
  },
  educationSchool: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
  },
  projectTech: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.4,
  },
  projectLink: {
    color: '#2563EB',
    fontSize: 11,
    textDecoration: 'underline',
    marginRight: 12,
  }
});

interface ModernBluePDFProps {
  data: ResumeData;
}

export const ModernBluePDF = ({ data }: ModernBluePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
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

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={{ width: '100%', marginBottom: 24 }}>
            <Text style={styles.sectionTitleSidebar}>SKILLS</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillBadge}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.sectionTitleSidebar}>CERTIFICATIONS</Text>
            {data.certifications.map((cert, i) => (
              <Text key={i} style={styles.contactInfo}>{cert.name} ({cert.year})</Text>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
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
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{exp.position} - {exp.company}</Text>
                  <Text style={styles.experienceDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                {exp.description && <Text style={styles.experienceDescription}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.educationItem}>
            <Text style={styles.sectionTitleMain}>EDUCATION</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationSchool}>{edu.school} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
                {edu.description && <Text style={styles.experienceDescription}>{edu.description}</Text>}
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
                <Text style={styles.projectTech}>{project.technologies}</Text>
                {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  {project.liveLink && <Link src={project.liveLink} style={styles.projectLink}>Live Demo</Link>}
                  {project.repoLink && <Link src={project.repoLink} style={styles.projectLink}>Code</Link>}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
); 