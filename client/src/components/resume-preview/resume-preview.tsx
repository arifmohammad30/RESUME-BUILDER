import { ResumeData } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, Palette, X, Download } from "lucide-react";
import { generatePDF, TemplateType } from "@/lib/pdf-generator";
import { ClassicProfessionalTemplate } from "@/components/resume-preview/classic-professional-template";
import { ModernBlueTemplate } from "@/components/resume-preview/modern-blue-template";
import { MinimalistTemplate } from "@/components/resume-preview/minimalist-template";
import { CreativeGradientTemplate } from "@/components/resume-preview/creative-gradient-template";
import { ElegantBWTemplate } from "@/components/resume-preview/elegant-bw-template";
import { TechStartupTemplate } from "@/components/resume-preview/tech-startup-template";
import { ModernSidebarTemplate } from "@/components/resume-preview/modern-sidebar-template";
import { MinimalClassicTemplate } from "@/components/resume-preview/minimal-classic-template";
import { ElegantSerifTemplate } from "@/components/resume-preview/elegant-serif-template";
import { SidebarHighlightTemplate } from "@/components/resume-preview/sidebar-highlight-template";
import { TwoColumnGridTemplate } from "@/components/resume-preview/two-column-grid-template";
import { DarkThemeTemplate } from "@/components/resume-preview/dark-theme-template";

const templates: { id: TemplateType; name: string }[] = [
  { id: "classic-professional", name: "Classic Professional" },
  { id: "modern-blue", name: "Modern Blue" },
  { id: "minimalist", name: "Minimalist" },
  { id: "creative-gradient", name: "Creative Gradient" },
  { id: "elegant-bw", name: "Elegant Black & White" },
  { id: "tech-startup", name: "Tech Startup" },
  { id: "modern-sidebar", name: "Modern Sidebar" },
  { id: "minimal-classic", name: "Minimal Classic (ATS-Friendly)" },
  { id: "elegant-serif", name: "Elegant Serif (For Senior Roles / Creative Jobs)" },
  { id: "sidebar-highlight", name: "Sidebar Highlight (Creative + Compact)" },
  { id: "two-column-grid", name: "Two-Column Grid (Modern Corporate)" },
  { id: "dark-theme", name: "Dark Theme (Modern, Standout)" },
];

interface ResumePreviewProps {
  data: ResumeData;
  zoomLevel?: number;
  template: TemplateType;
  onDownload: () => void;
  onTemplateChange?: (template: TemplateType) => void;
  className?: string;
}

export function ResumePreview({ data, zoomLevel = 100, template, onDownload, onTemplateChange, className }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      await generatePDF(data, template);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

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
      case "minimal-classic":
        return <MinimalClassicTemplate data={data} />;
      case "elegant-serif":
        return <ElegantSerifTemplate data={data} />;
      case "sidebar-highlight":
        return <SidebarHighlightTemplate data={data} />;
      case "two-column-grid":
        return <TwoColumnGridTemplate data={data} />;
      case "dark-theme":
        return <DarkThemeTemplate data={data} />;
      case "classic-professional":
      default:
        return <ClassicProfessionalTemplate data={data} />;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
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

      {/* Template Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Choose a Template</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsTemplateModalOpen(false)}
                className="text-[#4B5563] hover:bg-[#E5E7EB]"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {templates.map((t) => (
                <Card
                  key={t.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-gray-100",
                    template === t.id ? "border-2 border-green-500" : ""
                  )}
                  onClick={() => {
                    onTemplateChange?.(t.id);
                    setIsTemplateModalOpen(false);
                  }}
                >
                  <div className="font-medium">{t.name}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Utility: Format 'YYYY-MM' or 'YYYY-MM-DD' to 'MMM YYYY'
export function formatMonthYear(dateStr?: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}

// Utility: Format date range for experience
export function formatExperienceDateRange(start?: string, end?: string, current?: boolean): string {
  const startFmt = formatMonthYear(start);
  const endFmt = current ? 'Present' : formatMonthYear(end);
  return startFmt + (endFmt ? ` - ${endFmt}` : '');
}
