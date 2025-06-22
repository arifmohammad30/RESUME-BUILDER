import { Document, Page, Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register Inter font
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 500 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    fontFamily: 'Helvetica',
    color: '#222',
    minHeight: '100%',
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#1F2937',
    color: '#fff',
    padding: 32,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
    width: '67%',
    backgroundColor: '#fff',
    padding: 40,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#D1D5DB',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    width: '100%',
    marginBottom: 24,
  },
  sectionTitleSidebar: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
    width: '100%',
    textAlign: 'left',
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contactIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  skillSection: {
    width: '100%',
    marginBottom: 24,
  },
  skillName: {
    fontSize: 12,
    marginBottom: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#4B5563',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#20C997',
    borderRadius: 4,
  },
  sectionTitleMain: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 8,
  },
  experienceItem: {
    marginBottom: 24,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1F2937',
    marginBottom: 4,
  },
  experienceSubtitle: {
    fontSize: 14,
    color: '#2563EB',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
  },
  projectItem: {
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    paddingLeft: 16,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1F2937',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 1.5,
    marginBottom: 8,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 10,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  link: {
    color: '#2563EB',
    textDecoration: 'none',
    fontSize: 12,
  },
  dateRange: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
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
        {/* Name and Job Title */}
        <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
        {data.jobTitle && <Text style={styles.jobTitle}>{data.jobTitle}</Text>}

        <View style={styles.divider} />

        {/* Contact Info */}
        <Text style={styles.sectionTitleSidebar}>CONTACT</Text>
        {data.email && <Text style={styles.contactInfo}><Text style={styles.contactIcon}>✉️</Text>{data.email}</Text>}
        {data.phone && <Text style={styles.contactInfo}><Text style={styles.contactIcon}>📞</Text>{data.phone}</Text>}
        {data.location && <Text style={styles.contactInfo}><Text style={styles.contactIcon}>📍</Text>{data.location}</Text>}
        {data.website && <Link src={data.website} style={styles.contactInfo}><Text style={styles.contactIcon}>🌐</Text>Website</Link>}
        {data.linkedin && <Link src={data.linkedin} style={styles.contactInfo}><Text style={styles.contactIcon}>🔗</Text>LinkedIn</Link>}
        {data.github && <Link src={data.github} style={styles.contactInfo}><Text style={styles.contactIcon}>💻</Text>GitHub</Link>}

        <View style={styles.divider} />

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.skillSection}>
            <Text style={styles.sectionTitleSidebar}>SKILLS</Text>
            {data.skills.map((skill, i) => (
              <View key={i} style={{ marginBottom: 12, width: '100%' }}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${(parseFloat(skill.level) / 5) * 100 || 0}%` }]} />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.sectionTitleSidebar}>CERTIFICATIONS</Text>
            {data.certifications.map((cert, i) => (
              cert.url ? (
                <Link key={i} src={cert.url} style={styles.contactInfo}>{cert.name}</Link>
              ) : (
                <Text key={i} style={styles.contactInfo}>{cert.name}</Text>
              )
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
              <View key={i} style={{ marginBottom: 24 }}>
                <Text style={styles.experienceTitle}>{exp.position}</Text>
                <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                {exp.description && <Text style={styles.experienceDescription}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.experienceItem}>
            <Text style={styles.sectionTitleMain}>PROJECTS</Text>
            {data.projects.map((project, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.name}</Text>
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

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.experienceItem}>
            <Text style={styles.sectionTitleMain}>EDUCATION</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 24 }}>
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.experienceSubtitle}>{edu.school}</Text>
                <Text style={styles.dateRange}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
                {edu.description && <Text style={styles.experienceDescription}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
); 