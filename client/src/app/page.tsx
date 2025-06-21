import { useState } from "react";
import { ResumePreview } from "@/components/resume-preview";
import { TemplateSelector } from "@/components/template-selector";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { TemplateType } from "@/lib/pdf-generator";
import { generatePDF } from "@/lib/pdf-generator";
import { useResumeData } from "@/lib/hooks/use-resume-data";

export default function Home() {
  const { data } = useResumeData();
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic-professional");

  const handleDownload = async () => {
    try {
      await generatePDF(data, selectedTemplate);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            Choose Template
          </Button>
        </div>
      </div>

      <ResumePreview
        data={data}
        template={selectedTemplate}
        onDownload={handleDownload}
        onTemplateChange={setSelectedTemplate}
      />

      {isTemplateModalOpen && (
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
    </main>
  );
} 