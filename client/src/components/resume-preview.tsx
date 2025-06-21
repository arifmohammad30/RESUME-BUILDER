import { ResumeData } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Download } from "lucide-react";
import { TemplateType } from "@/lib/pdf-generator";
import { ClassicProfessionalTemplate } from "@/components/resume-preview/classic-professional-template";
import { ModernBlueTemplate } from "@/components/resume-preview/modern-blue-template";
import { MinimalistTemplate } from "@/components/resume-preview/minimalist-template";
import { CreativeGradientTemplate } from "@/components/resume-preview/creative-gradient-template";
import { ElegantBWTemplate } from "@/components/resume-preview/elegant-bw-template";
import { TechStartupTemplate } from "@/components/resume-preview/tech-startup-template";
import { ModernSidebarTemplate } from "@/components/resume-preview/modern-sidebar-template";

interface ResumePreviewProps {
  data: ResumeData;
  zoomLevel?: number;
  template: TemplateType;
  onDownload: () => void;
  onTemplateChange?: (template: TemplateType) => void;
}

export function ResumePreview({ data, zoomLevel = 100, template, onDownload }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template) {
      case "modern-blue":
        return <ModernBlueTemplate data={data} />;
      case "minimalist":
        return <MinimalistTemplate data={data} />;
      case "creative-gradient":
        return <CreativeGradientTemplate data={data} />;
      case "elegant-bw":
        return <ElegantBWTemplate data={data} />;
      case "tech-startup":
        return <TechStartupTemplate data={data} />;
      case "modern-sidebar":
        return <ModernSidebarTemplate data={data} />;
      case "classic-professional":
      default:
        return <ClassicProfessionalTemplate data={data} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDownload}
          className="text-[#4B5563] hover:bg-[#E5E7EB]"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Resume Preview */}
      <div className="relative w-full rounded-lg p-4 bg-gray-100">
        <div
          ref={resumeRef}
          className="mx-auto bg-white shadow-lg"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-in-out',
            overflow: 'hidden',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
} 