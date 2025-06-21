import { pdf, Document, Page } from "@react-pdf/renderer";
import { ResumeData } from "@/types/schema";
import { ClassicProfessionalPDF } from "@/components/pdf-templates/classic-professional-pdf";
import { ModernBluePDF } from "@/components/pdf-templates/modern-blue-pdf";
import { MinimalistPDF } from "@/components/pdf-templates/minimalist-pdf";
import { CreativeGradientPDF } from "@/components/pdf-templates/creative-gradient-pdf";
import { ElegantBWPDF } from "@/components/pdf-templates/elegant-bw-pdf";
import { TechStartupPDF } from "@/components/pdf-templates/tech-startup-pdf";
import { ModernSidebarPDF } from "@/components/pdf-templates/modern-sidebar-pdf";
import { MinimalClassicPDF } from "@/components/pdf-templates/minimal-classic-pdf";
import { ElegantSerifPDF } from "@/components/pdf-templates/elegant-serif-pdf";
import { SidebarHighlightPDF } from "@/components/pdf-templates/sidebar-highlight-pdf";
import { TwoColumnGridPDF } from "@/components/pdf-templates/two-column-grid-pdf";
import { DarkThemePDF } from "@/components/pdf-templates/dark-theme-pdf";
import { normalizeUrl } from "@/lib/utils";

export type TemplateType =
  | "classic-professional"
  | "modern-blue"
  | "minimalist"
  | "creative-gradient"
  | "elegant-bw"
  | "tech-startup"
  | "modern-sidebar"
  | "minimal-classic"
  | "elegant-serif"
  | "sidebar-highlight"
  | "two-column-grid"
  | "dark-theme";

export const generatePDF = async (data: ResumeData, template: TemplateType = "classic-professional") => {
  const templates = {
    "classic-professional": ClassicProfessionalPDF,
    "modern-blue": ModernBluePDF,
    "minimalist": MinimalistPDF,
    "creative-gradient": CreativeGradientPDF,
    "elegant-bw": ElegantBWPDF,
    "tech-startup": TechStartupPDF,
    "modern-sidebar": ModernSidebarPDF,
    "minimal-classic": MinimalClassicPDF,
    "elegant-serif": ElegantSerifPDF,
    "sidebar-highlight": SidebarHighlightPDF,
    "two-column-grid": TwoColumnGridPDF,
    "dark-theme": DarkThemePDF,
  };

  // Normalize all URLs in ResumeData
  const normalizedData: ResumeData = {
    ...data,
    linkedin: normalizeUrl(data.linkedin),
    github: normalizeUrl(data.github),
    website: normalizeUrl(data.website),
    projects: data.projects.map((proj) => ({
      ...proj,
      liveUrl: normalizeUrl(proj.liveUrl),
      codeUrl: normalizeUrl(proj.codeUrl),
    })),
  };

  const SelectedTemplate = templates[template];
  const blob = await pdf(SelectedTemplate({ data: normalizedData })).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.firstName}_${data.lastName}_Resume.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
