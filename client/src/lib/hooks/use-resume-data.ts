import { useState, useEffect } from "react";
import { ResumeData } from "@/types/schema";

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

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  return {
    data,
    setData,
  };
} 