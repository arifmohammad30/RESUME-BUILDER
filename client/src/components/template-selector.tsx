import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { TemplateType } from "@/lib/pdf-generator";

const templates = [
  { id: "classic-professional" as TemplateType, name: "Classic Professional" },
  { id: "modern-blue" as TemplateType, name: "Modern Blue" },
  { id: "minimalist" as TemplateType, name: "Minimalist" },
  { id: "creative-gradient" as TemplateType, name: "Creative Gradient" },
  { id: "elegant-bw" as TemplateType, name: "Elegant Black & White" },
  { id: "tech-startup" as TemplateType, name: "Tech Startup" },
  { id: "modern-sidebar" as TemplateType, name: "Modern Sidebar" },
  { id: "minimal-classic" as TemplateType, name: "Minimal Classic (ATS-Friendly)" },
  { id: "elegant-serif" as TemplateType, name: "Elegant Serif (For Senior Roles / Creative Jobs)" },
  { id: "sidebar-highlight" as TemplateType, name: "Sidebar Highlight (Creative + Compact)" },
  { id: "two-column-grid" as TemplateType, name: "Two-Column Grid (Modern Corporate)" },
  { id: "dark-theme" as TemplateType, name: "Dark Theme (Modern, Standout)" },
];

const templateColors = [
  { bgColor: "bg-blue-100", textColor: "text-blue-900" },
  { bgColor: "bg-emerald-100", textColor: "text-emerald-900" },
  { bgColor: "bg-rose-100", textColor: "text-rose-900" },
  { bgColor: "bg-amber-100", textColor: "text-amber-900" },
  { bgColor: "bg-indigo-100", textColor: "text-indigo-900" },
  { bgColor: "bg-teal-100", textColor: "text-teal-900" },
  { bgColor: "bg-purple-100", textColor: "text-purple-900" },
  { bgColor: "bg-pink-100", textColor: "text-pink-900" },
  { bgColor: "bg-lime-100", textColor: "text-lime-900" },
  { bgColor: "bg-cyan-100", textColor: "text-cyan-900" },
  { bgColor: "bg-orange-100", textColor: "text-orange-900" },
  { bgColor: "bg-fuchsia-100", textColor: "text-fuchsia-900" },
];

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  onClose: () => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  onClose,
}: TemplateSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[950px] max-h-[90vh] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Choose a Template</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 overflow-y-auto pr-1">
          {templates.map((t, index) => {
            const { bgColor, textColor } = templateColors[index % templateColors.length];
            const isSelected = selectedTemplate === t.id;

            return (
              <Card
                key={t.id}
                onClick={() => {
                  onSelectTemplate(t.id);
                  onClose();
                }}
                className={cn(
                  "relative aspect-[4/5] cursor-pointer rounded-lg transition-all duration-200 p-2",
                  bgColor,
                  textColor,
                  isSelected
                    ? "ring-4 ring-green-500 shadow-lg"
                    : "border border-gray-200 hover:scale-105"
                )}
              >
                {/* Wireframe that varies by template */}
                <div className="absolute inset-0 p-2 flex flex-col gap-2">
                  {/* Common header line */}
                  <div className="h-3 w-3/4 bg-gray-300 rounded"></div>

                  {t.id.includes("sidebar") ? (
                    <div className="flex flex-grow gap-2 mt-1">
                      <div className="w-1/4 h-full bg-gray-400 rounded"></div>
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  ) : t.id.includes("grid") ? (
                    <div className="grid grid-cols-2 gap-1 flex-grow">
                      <div className="h-3 bg-gray-300 rounded col-span-1"></div>
                      <div className="h-3 bg-gray-300 rounded col-span-1"></div>
                      <div className="h-3 bg-gray-300 rounded col-span-2"></div>
                    </div>
                  ) : t.id.includes("minimal") ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                      <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="h-3 w-full bg-gray-300 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                      <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                    </div>
                  )}
                </div>

                {/* Template label */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full text-center px-2">
                  <p className="text-xs font-semibold truncate">{t.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
