import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    color: '#222',
    minHeight: '100%',
  },
  header: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: "#4F46E5",
    borderRadius: 8,
  },
  name: {
    fontSize: 30,
    fontWeight: 800,
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 15,
    color: "#E0E7FF",
    marginBottom: 8,
    textAlign: 'center',
  },
  contact: {
    fontSize: 15,
    color: "#E0E7FF",
    marginBottom: 2,
    textAlign: 'center',
  },
  contactLink: {
    fontSize: 15,
    color: "#60A5FA",
    marginLeft: 8,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: "#60A5FA",
  },
  sectionTitleAlt: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: "#F472B6",
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
    color: "#222",
    marginBottom: 4,
  },
  company: {
    fontSize: 13,
    color: "#F472B6",
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
    color: "#222",
    marginBottom: 4,
  },
  school: {
    fontSize: 13,
    color: "#F472B6",
    marginBottom: 4,
  },
  skills: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 13,
    backgroundColor: "#F472B6",
    color: "#fff",
    borderRadius: 8,
    padding: "2 12",
  },
  projects: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#222",
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
    gap: 8,
    marginBottom: 8,
  },
  projectTag: {
    fontSize: 13,
    backgroundColor: "#F472B6",
    color: "#fff",
    borderRadius: 8,
    padding: "2 12",
  },
  projectLinks: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  projectLink: {
    fontSize: 13,
    color: "#F472B6",
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

interface CreativeGradientPDFProps {
  data: ResumeData;
}

export const CreativeGradientPDF = ({ data }: CreativeGradientPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
        {data.jobTitle && <Text style={styles.jobTitle}>{data.jobTitle}</Text>}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          {data.email && <Text style={styles.contact}>{data.email}</Text>}
          {data.phone && <Text style={styles.contact}>{data.phone}</Text>}
          {data.location && <Text style={styles.contact}>{data.location}</Text>}
          {data.website && <Link src={data.website} style={styles.contactLink}>Website</Link>}
          {data.linkedin && <Link src={data.linkedin} style={styles.contactLink}>LinkedIn</Link>}
          {data.github && <Link src={data.github} style={styles.contactLink}>GitHub</Link>}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
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

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitleAlt}>Projects</Text>
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
          <Text style={styles.sectionTitleAlt}>Certifications</Text>
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
    </Page>
  </Document>
); 