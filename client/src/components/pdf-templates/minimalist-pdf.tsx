import { Document, Page, Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";

// Register Georgia font for minimalist template
Font.register({
  family: "Georgia",
  fonts: [
    { src: "https://fonts.gstatic.com/s/georgia/v18/1_O41XmXGXyjjClJ7D3SeyA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/georgia/v18/1_O41XmXGXyjjClJ7D3SeyA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/georgia/v18/1_O41XmXGXyjjClJ7D3SeyA.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Georgia",
    color: '#222',
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
    border: '1px solid #E5E7EB',
  },
  header: {
    borderBottom: '1px solid #E5E7EB',
    padding: '40px 48px 24px 48px',
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 8,
  },
  contactInfo: {
    color: '#6B7280',
    fontSize: 15,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    color: '#374151',
    textDecoration: 'underline',
    fontSize: 15,
  },
  content: {
    padding: '32px 48px',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: 18,
    color: '#374151',
    marginBottom: 8,
    borderLeft: '3px solid #E5E7EB',
    paddingLeft: 12,
  },
  summary: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 1.5,
  },
  experience: {
    marginBottom: 16,
  },
  position: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
  },
  company: {
    color: '#222',
    fontSize: 13,
    marginBottom: 2,
  },
  date: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 4,
  },
  description: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 1.4,
  },
  education: {
    marginBottom: 16,
  },
  degree: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
  },
  school: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 2,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    background: '#F3F4F6',
    color: '#222',
    borderRadius: 6,
    padding: '2px 12px',
    fontSize: 13,
  },
  projects: {
    marginBottom: 16,
  },
  projectTitle: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
  },
  projectDescription: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  projectTag: {
    background: '#F3F4F6',
    color: '#222',
    borderRadius: 6,
    padding: '2px 12px',
    fontSize: 13,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  projectLink: {
    color: '#6B7280',
    fontSize: 13,
    textDecoration: 'none',
  },
});

interface MinimalistPDFProps {
  data: ResumeData;
}

export const MinimalistPDF = ({ data }: MinimalistPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
          <View style={styles.contactInfo}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
            {data.linkedin && <Link src={data.linkedin} style={styles.contactItem}>
              <Text style={styles.link}>LinkedIn</Text>
            </Link>}
            {data.github && <Link src={data.github} style={styles.contactItem}>
              <Text style={styles.link}>GitHub</Text>
            </Link>}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
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
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.date}>{`${edu.startDate} - ${edu.current ? "Present" : edu.endDate}`}</Text>
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
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.projects}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  {project.tags && project.tags.length > 0 && (
                    <View style={styles.projectTags}>
                      {project.tags.map((tag) => (
                        <Text key={tag} style={styles.projectTag}>{tag}</Text>
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
        </View>
      </View>
    </Page>
  </Document>
); 