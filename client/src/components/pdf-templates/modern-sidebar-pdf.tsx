import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFA',
    fontFamily: "Helvetica",
    color: '#222',
  },
  sidebar: {
    width: 200,
    backgroundColor: "#14B8A6",
    padding: 32,
    color: "#FFFFFF",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 8,
    color: "#FFFFFF",
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: 'center',
  },
  contact: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLink: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 8,
    textDecoration: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.25,
    width: '100%',
    marginVertical: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: "#14B8A6",
  },
  sidebarSectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 8,
    color: "#FFFFFF",
  },
  summary: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#374151",
  },
  experience: {
    marginBottom: 16,
  },
  position: {
    fontSize: 15,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
  },
  company: {
    fontSize: 13,
    color: "#14B8A6",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.5,
  },
  education: {
    marginBottom: 16,
  },
  degree: {
    fontSize: 15,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
  },
  school: {
    fontSize: 13,
    color: "#14B8A6",
    marginBottom: 4,
  },
  skills: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skill: {
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    color: "#FFFFFF",
    padding: "2 10",
    borderRadius: 8,
    opacity: 0.8,
  },
  projects: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 8,
  },
  projectTags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  projectTag: {
    fontSize: 12,
    backgroundColor: "#F0FDFA",
    color: "#14B8A6",
    padding: "2 10",
    borderRadius: 8,
  },
  projectLinks: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  projectLink: {
    fontSize: 13,
    color: "#14B8A6",
    textDecoration: 'none',
  },
  certifications: {
    marginBottom: 16,
  },
  certification: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  certificationYear: {
    fontSize: 13,
    color: "#6B7280",
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
        {data.jobTitle && <Text style={styles.jobTitle}>{data.jobTitle}</Text>}
        {data.location && <Text style={styles.contact}>{data.location}</Text>}
        
        <View style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, width: '100%' }}>
          {data.email && <Text style={styles.contact}>{data.email}</Text>}
          {data.phone && <Text style={styles.contact}>{data.phone}</Text>}
          {data.website && <Link src={data.website} style={styles.contactLink}>Website</Link>}
          {data.linkedin && <Link src={data.linkedin} style={styles.contactLink}>LinkedIn</Link>}
          {data.github && <Link src={data.github} style={styles.contactLink}>GitHub</Link>}
        </View>

        <View style={styles.divider} />

        {/* Skills in Sidebar */}
        {data.skills && data.skills.length > 0 && (
          <View style={{ width: '100%' }}>
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
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experience}>
                <Text style={styles.position}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>{`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}</Text>
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
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.school}>{`${edu.school} | ${edu.startDate} - ${edu.current ? "Present" : edu.endDate}`}</Text>
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
                <Text style={styles.projectTitle}>{project.name}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                {project.tags && project.tags.length > 0 && (
                  <View style={styles.projectTags}>
                    {project.tags.map((tag, tagIndex) => (
                      <Text key={tagIndex} style={styles.projectTag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                )}
                <View style={styles.projectLinks}>
                  {project.codeUrl && <Link src={project.codeUrl} style={styles.projectLink}>View Code</Link>}
                  {project.liveUrl && <Link src={project.liveUrl} style={styles.projectLink}>Live Demo</Link>}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.certifications}>
                {cert.url ? (
                  <Link src={cert.url} style={styles.certification}>{cert.name}</Link>
                ) : (
                  <Text style={styles.certification}>{cert.name}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
); 