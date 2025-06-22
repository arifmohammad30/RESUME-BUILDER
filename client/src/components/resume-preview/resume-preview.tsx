import { ResumeData } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Palette, X, Download, Loader2, ZoomIn, ZoomOut, Pencil } from "lucide-react";
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
import { TemplateSelector } from "../template-selector";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  onTemplateChange?: (template: TemplateType) => void;
  className?: string;
  isLoading?: boolean;
  onEdit?: () => void;
}

export function ResumePreview({ data, template, onTemplateChange, className, isLoading, onEdit }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const a4WidthPx = 210 * 3.78;
      // Default scale is 0.8 for all devices
      let newBaseScale = 0.8;
      if (width < a4WidthPx * 0.8 + 40) {
        newBaseScale = (width - 40) / a4WidthPx;
      }
      setBaseScale(newBaseScale);
      setScale(newBaseScale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setScale(s => Math.min(s * 1.2, 2)); // Zoom in by 20%, max 200%
    } else {
      // Zoom out by 20%, but don't go smaller than the base scale
      setScale(s => Math.max(s / 1.2, baseScale));
    }
  };

  const handleDownload = async () => {
    // Start timer
    setCountdown(30);
    const intervalId = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    setTimerId(intervalId);

    try {
      setIsDownloading(true);
      await generatePDF(data, template);
    } catch (error) {
      const err = error as any;
      console.error("Error generating PDF:", err, err?.message, err?.stack);
      alert("Failed to generate PDF. " + (err?.message || ""));
    } finally {
      setIsDownloading(false);
      // Clear timer
      clearInterval(intervalId);
      setTimerId(null);
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
    <div className={cn("relative w-full min-h-screen flex flex-col items-center p-2 sm:p-4 overflow-hidden", className)} style={{ background: '#f8fafc' }}>
      {/* Unified Header with Controls */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 mt-2 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-green-700" style={{ fontFamily: 'Roboto Slab, Inter, Arial, sans-serif' }}>Preview & Download</h2>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border-green-300 text-green-700 hover:bg-green-50"
            onClick={() => setIsTemplateModalOpen(true)}
            title="Change Template"
          >
            <Palette className="w-5 h-5 text-green-600" />
            Templates
          </Button>
        </div>
        
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full p-0"
            onClick={() => handleZoom('in')}
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full p-0"
            onClick={() => handleZoom('out')}
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
          {onEdit && (
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full p-0"
              onClick={onEdit}
              title="Edit Resume"
            >
              <Pencil className="w-5 h-5 text-green-700" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm shadow-md rounded-full"
            onClick={handleDownload}
            disabled={isDownloading}
            title="Download PDF"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 text-green-700 animate-spin" />
            ) : (
              <Download className="w-5 h-5 text-green-700" />
            )}
          </Button>
          {isDownloading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Generating...</span>
              <span>({countdown}s)</span>
            </div>
          )}
        </div>
      </div>

      <div 
        className="flex-1 w-full flex items-center justify-center overflow-auto"
        ref={resumeRef}
        data-resume-preview
        style={{ minHeight: '100vh' }}
      >
        {/* A4 Page Container */}
        <div 
          className="bg-white shadow-lg mx-auto"
          style={{ 
            width: '210mm',
            height: '297mm',
            minWidth: '210mm',
            minHeight: '297mm',
            maxWidth: '210mm',
            maxHeight: '297mm',
            transform: `scale(${scale})`,
            transformOrigin: 'center top',
            transition: 'transform 0.2s ease-out',
            willChange: 'transform',
            boxSizing: 'content-box',
            margin: '0 auto',
            display: 'block',
          }}
        >
          {renderTemplate()}
        </div>
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-30 rounded-2xl">
            <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
          </div>
        )}
      </div>

      {isTemplateModalOpen && (
        <TemplateSelector
          selectedTemplate={template}
          onSelectTemplate={(t) => {
            if (onTemplateChange) onTemplateChange(t);
            setIsTemplateModalOpen(false);
          }}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
    </div>
  );
}

export function formatMonthYear(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function formatExperienceDateRange(start?: string, end?: string, current?: boolean): string {
  const startFormatted = formatMonthYear(start);
  const endFormatted = current ? 'Present' : formatMonthYear(end);
  
  if (!startFormatted) return '';
  if (!endFormatted) return startFormatted;
  
  return `${startFormatted} - ${endFormatted}`;
}