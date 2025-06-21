import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { PersonalInfoForm } from "@/components/resume-form/personal-info-form";
import { ExperienceForm } from "@/components/resume-form/experience-form";
import { EducationForm } from "@/components/resume-form/education-form";
import { SkillsForm } from "@/components/resume-form/skills-form";
import { ProjectsForm } from "@/components/resume-form/projects-form";
import { ResumePreview } from "@/components/resume-preview/resume-preview";
import { useResumeData } from "@/hooks/use-resume-data";
import { useAutoSave } from "@/hooks/use-auto-save";
import { ResumeData } from "@/types/schema";
import { ZoomIn, ZoomOut, Palette, RotateCcw, Download, Home, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  { id: "preview", title: "Preview" }
];

export default function ResumeBuilder() {
  const { resumeData, setResumeData, clearData, isInitialized } = useResumeData();
  const { isSaving } = useAutoSave(resumeData);
  const [zoomLevel, setZoomLevel] = useState(80);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic-professional");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    window.location.href = "/";
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
      const previewEl = document.querySelector("#resume-preview-pdf");
      if (!previewEl) return;
      
      const canvas = await html2canvas(previewEl as HTMLElement, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `${resumeData.firstName}_${resumeData.lastName}_Resume.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-green-400" />
              <span className="text-3xl md:text-4xl font-bold text-green-400 tracking-widest" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Resume Builder
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {isSaving && (
                <span className="text-sm text-gray-500 flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-green-600 mr-2"></div>
                  Saving...
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearData}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoToLandingPage}
                className="text-green-600 hover:bg-green-50"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Stepper steps={steps} currentStep={showPreview ? steps.length - 1 : currentStep} />
        </div>

        {!showPreview ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderStep()}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="flex flex-col items-center w-full max-w-2xl mb-6 gap-4">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 10, 50))}
                  className="text-green-700 hover:bg-green-50"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-green-700">{zoomLevel}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 10, 100))}
                  className="text-green-700 hover:bg-green-50"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  Edit Resume
                </Button>
                <Button
                  onClick={() => setIsTemplateModalOpen(true)}
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Change Template
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div
                id="resume-preview-pdf"
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: "top center",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  margin: "0 auto",
                }}
                className="rounded-lg"
              >
                <ResumePreview 
                  data={resumeData} 
                  template={selectedTemplate}
                  onDownload={handleDownload}
                  onTemplateChange={handleTemplateChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Template Selector Modal */}
        {isTemplateModalOpen && (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateChange}
            onClose={() => setIsTemplateModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}