import { useState } from "react";
import { ResumeData } from "@/types/schema";
import { PersonalInfoForm } from "./personal-info-form";
import { ExperienceForm } from "./experience-form";
import { EducationForm } from "./education-form";
import { SkillsForm } from "./skills-form";
import { ProjectsForm } from "./projects-form";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "../resume-preview";
import { TemplateType } from "@/lib/pdf-generator";
import { generatePDF } from "@/lib/pdf-generator";

const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "preview", label: "Preview" },
];

export function ResumeFormContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic-professional");
  const [resumeData, setResumeData] = useState<ResumeData>({
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
  });

  const handleDataChange = (data: Partial<ResumeData>) => {
    console.log("Data changed:", data);
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const handleSave = () => {
    console.log("Saving step:", currentStep);
    console.log("Current resume data:", resumeData);
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDownload = async () => {
    try {
      await generatePDF(resumeData, selectedTemplate);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleSave}
            onBack={handleBack}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleSave}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleSave}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleSave}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ProjectsForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleSave}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <ResumePreview
            data={resumeData}
            template={selectedTemplate}
            onDownload={handleDownload}
            onTemplateChange={setSelectedTemplate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-6 md:mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px] md:min-w-0 px-1 md:px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div
                className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 transition-all duration-200 shadow-sm flex-shrink-0
                  ${index < currentStep ? "bg-[#4ADE80] border-[#4ADE80] text-white" :
                    index === currentStep ? "bg-white border-[#4ADE80] text-[#4ADE80] shadow-md" :
                    "bg-gray-100 border-gray-300 text-gray-400"}
                `}
                style={{ minWidth: 20 }}
              >
                <span className="text-xs sm:text-xs md:text-sm font-medium">{index + 1}</span>
              </div>
              <div
                className={`ml-0.5 md:ml-1 lg:ml-2 text-xs sm:text-xs md:text-sm font-semibold transition-colors duration-200 break-words hyphens-auto
                  ${index === currentStep ? "text-[#4ADE80]" : index < currentStep ? "text-[#4ADE80] opacity-70" : "text-gray-400"}
                `}
              >
                {step.label}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 sm:h-1 w-6 sm:w-8 md:w-16 mx-0.5 md:mx-1 lg:mx-2 rounded-full transition-all duration-200 flex-shrink-0
                    ${index < currentStep ? "bg-[#4ADE80]" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStep()}
      </div>
    </div>
  );
} 