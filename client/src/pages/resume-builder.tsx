import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { PersonalInfoForm } from "@/components/resume-form/personal-info-form";
import { ExperienceForm } from "@/components/resume-form/experience-form";
import { EducationForm } from "@/components/resume-form/education-form";
import { SkillsForm } from "@/components/resume-form/skills-form";
import { ProjectsForm } from "@/components/resume-form/projects-form";
import { CertificationsForm } from "@/components/resume-form/certifications-form";
import { ResumePreview } from "@/components/resume-preview/resume-preview";
import { useResumeData } from "@/hooks/use-resume-data";
import { useAutoSave } from "@/hooks/use-auto-save";
import { ResumeData } from "@/types/schema";
import { Palette, RotateCcw, Download, Home, FileText, Pencil, Loader2 } from "lucide-react";
import { ProfessionalTemplate } from "@/components/resume-preview/professional-template";
import { ModernTemplate } from "@/components/resume-preview/modern-template";
import { MinimalTemplate } from "@/components/resume-preview/minimal-template";
import { CreativeTemplate } from "@/components/resume-preview/creative-template";
import { TemplateType, generatePDF } from "@/lib/pdf-generator";
import { TemplateSelector } from "@/components/template-selector";

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "certifications", title: "Certifications" },
  { id: "preview", title: "Preview" }
];

export default function ResumeBuilder() {
  const { resumeData, setResumeData, clearData, isInitialized } = useResumeData();
  const { isSaving } = useAutoSave(resumeData);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic-professional");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleDataChange = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowPreview(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleGoToLandingPage = () => {
    // Redirect to the landing page URL from environment variables, with a fallback.
    const landingPageUrl = import.meta.env.VITE_LANDING_URL || "https://arifmohammad30.github.io/RESUME-BUILDER/";
    window.location.href = landingPageUrl;
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      clearData();
      setCurrentStep(0);
      setShowPreview(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await generatePDF(resumeData, selectedTemplate);
    } catch (error) {
      const err = error as any;
      console.error("Error generating PDF:", err, err?.message, err?.stack);
      alert("Failed to generate PDF. " + (err?.message || ""));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleNext}
            onBack={handleGoToLandingPage}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ProjectsForm
            data={resumeData}
            onChange={handleDataChange}
            onSave={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <CertificationsForm
            data={{ certifications: resumeData.certifications || [] }}
            onChange={certData => handleDataChange(certData)}
            onSave={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="w-7 h-7 text-green-500" />
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-700" style={{ fontFamily: 'Roboto Slab, Inter, Arial, sans-serif' }}>
                Resume Builder
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {isSaving && (
                <span className="text-xs text-gray-500 flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400 mr-2"></div>
                  Saving...
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoToLandingPage}
                className="text-gray-600 hover:bg-gray-100"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {!showPreview ? (
        <div className="container mx-auto px-4 py-8 max-w-3xl flex-1 flex flex-col">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <Stepper steps={steps.slice(0, steps.length - 1)} currentStep={currentStep} />
            <div className="my-6" />
            {renderStep()}
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col">
          <div className="w-full flex justify-between items-center p-4 bg-gray-50 border-b">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsTemplateModalOpen(true)}
            >
              <Palette className="w-5 h-5 text-green-600" />
              <span>Change Template</span>
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="ml-2">Download</span>
            </Button>
          </div>
          <div className="w-full flex-1 relative overflow-auto" data-resume-preview>
            <ResumePreview
              data={resumeData}
              template={selectedTemplate}
              onTemplateChange={handleTemplateChange}
              isLoading={isDownloading}
              onEdit={() => {
                setShowPreview(false);
                setCurrentStep(steps.length - 2);
              }}
            />
          </div>
          {isTemplateModalOpen && (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={(template) => {
                handleTemplateChange(template);
                setIsTemplateModalOpen(false);
              }}
              onClose={() => setIsTemplateModalOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}