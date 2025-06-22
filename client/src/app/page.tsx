import { useState } from "react";
import { ResumePreview } from "@/components/resume-preview/resume-preview";
import { TemplateSelector } from "@/components/template-selector";
import { TemplateType } from "@/lib/pdf-generator";
import { useResumeData } from "@/lib/hooks/use-resume-data";

export default function Home() {
  const { data } = useResumeData();
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic-professional");

  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
      </div>

      <ResumePreview
        data={data}
        template={selectedTemplate}
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