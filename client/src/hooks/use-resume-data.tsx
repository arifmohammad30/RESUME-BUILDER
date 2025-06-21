import { useState, useCallback, useEffect } from "react";
import { ResumeData, Experience, Education, Project, Skill } from "@/types/schema";

const initialData: ResumeData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

// Generate a unique session ID for each user visit
const getSessionId = () => {
  const sessionId = sessionStorage.getItem('resumeSessionId');
  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    sessionStorage.setItem('resumeSessionId', newSessionId);
    return newSessionId;
  }
  return sessionId;
};

// Check if this is a new session
const isNewSession = () => {
  const lastSessionId = localStorage.getItem('lastSessionId');
  const currentSessionId = getSessionId();
  
  if (lastSessionId !== currentSessionId) {
    localStorage.setItem('lastSessionId', currentSessionId);
    return true;
  }
  return false;
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data on component mount
  useEffect(() => {
    if (isInitialized) return;

    // Check if this is a new session
    if (isNewSession()) {
      // Clear any existing data for new users
      localStorage.removeItem('resumeData');
      setResumeData(initialData);
    } else {
      // Load existing data for returning users in same session
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setResumeData({ ...initialData, ...parsedData });
        } catch (error) {
          console.error('Error parsing saved resume data:', error);
          setResumeData(initialData);
        }
      }
    }
    
    setIsInitialized(true);
  }, [isInitialized]);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData, isInitialized]);

  const clearData = useCallback(() => {
    setResumeData(initialData);
    localStorage.removeItem('resumeData');
  }, []);

  const updateField = useCallback((field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  }, []);

  const updateExperience = useCallback((id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  }, []);

  const updateEducation = useCallback((id: string, field: keyof Education, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  }, []);

  const addProject = useCallback(() => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      codeUrl: "",
      liveUrl: "",
      tags: [],
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id),
    }));
  }, []);

  const updateProject = useCallback((id: string, field: keyof Project, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    }));
  }, []);

  const addSkill = useCallback((skill: Skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.some(s => s.name === skill.name) ? prev.skills : [...prev.skills, skill],
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
  }, []);

  const updateSkill = useCallback((id: string, field: keyof Skill, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  }, []);

  const fillSampleData = useCallback(() => {
    const sampleData: ResumeData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Passionate about creating scalable web applications and leading development teams to deliver high-quality software solutions.",
      experience: [
        {
          id: crypto.randomUUID(),
          company: "Tech Solutions Inc.",
          position: "Senior Full Stack Developer",
          startDate: "2022-01",
          endDate: "",
          current: true,
          description: "Led development of e-commerce platform serving 100K+ users. Built REST APIs using Node.js and Express. Implemented responsive frontend with React and TypeScript. Improved application performance by 40% through code optimization."
        },
        {
          id: crypto.randomUUID(),
          company: "StartupCorp",
          position: "Frontend Developer",
          startDate: "2020-06",
          endDate: "2021-12",
          current: false,
          description: "Developed user interfaces for SaaS application using React and Redux. Collaborated with design team to implement pixel-perfect designs. Integrated third-party APIs and payment systems."
        }
      ],
      education: [
        {
          id: crypto.randomUUID(),
          school: "University of California, Berkeley",
          degree: "Bachelor of Science in Computer Science",
          startDate: "2016-09",
          endDate: "2020-05",
          current: false,
          description: "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Web Development."
        }
      ],
      skills: [
        { id: crypto.randomUUID(), name: "JavaScript", level: "Expert" },
        { id: crypto.randomUUID(), name: "TypeScript", level: "Expert" },
        { id: crypto.randomUUID(), name: "React", level: "Expert" },
        { id: crypto.randomUUID(), name: "Node.js", level: "Advanced" },
        { id: crypto.randomUUID(), name: "Python", level: "Intermediate" },
        { id: crypto.randomUUID(), name: "PostgreSQL", level: "Advanced" },
        { id: crypto.randomUUID(), name: "MongoDB", level: "Advanced" },
        { id: crypto.randomUUID(), name: "AWS", level: "Intermediate" },
        { id: crypto.randomUUID(), name: "Docker", level: "Intermediate" },
        { id: crypto.randomUUID(), name: "Git", level: "Expert" },
        { id: crypto.randomUUID(), name: "Leadership", level: "Advanced" },
        { id: crypto.randomUUID(), name: "Problem Solving", level: "Expert" },
        { id: crypto.randomUUID(), name: "Team Collaboration", level: "Expert" },
        { id: crypto.randomUUID(), name: "Communication", level: "Expert" },
        { id: crypto.randomUUID(), name: "Project Management", level: "Advanced" }
      ],
      projects: [
        {
          id: crypto.randomUUID(),
          name: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
          codeUrl: "https://github.com/johndoe/ecommerce-platform",
          liveUrl: "https://ecommerce-demo.com",
          tags: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
          id: crypto.randomUUID(),
          name: "Task Management App",
          description: "Developed a collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
          codeUrl: "https://github.com/johndoe/task-manager",
          liveUrl: "https://task-manager-demo.com",
          tags: ["React", "Socket.io", "Express", "PostgreSQL"]
        }
      ],
    };
    setResumeData(sampleData);
  }, []);

  return {
    resumeData,
    setResumeData,
    updateField,
    addExperience,
    removeExperience,
    updateExperience,
    addEducation,
    removeEducation,
    updateEducation,
    addProject,
    removeProject,
    updateProject,
    addSkill,
    removeSkill,
    updateSkill,
    fillSampleData,
    clearData,
    isInitialized,
  };
}
