export const resumeTemplates = {
  professional: {
    name: "Professional",
    description: "Clean and traditional design perfect for corporate environments",
    primaryColor: "#2563EB",
    fontFamily: "Inter",
  },
  modern: {
    name: "Modern",
    description: "Contemporary design with bold typography and creative layout",
    primaryColor: "#059669",
    fontFamily: "Inter",
  },
  creative: {
    name: "Creative",
    description: "Artistic design for creative professionals and designers",
    primaryColor: "#7C3AED",
    fontFamily: "Inter",
  },
  minimal: {
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    primaryColor: "#374151",
    fontFamily: "Inter",
  },
} as const;

export type TemplateKey = keyof typeof resumeTemplates;
