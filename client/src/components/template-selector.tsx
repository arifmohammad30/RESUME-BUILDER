import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X, CheckCircle2 } from "lucide-react";
import { TemplateType } from "@/lib/pdf-generator";

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: "classic-professional", name: "Classic Professional", description: "A timeless, ATS-friendly layout." },
  { id: "modern-sidebar", name: "Modern Sidebar", description: "Sleek design with a functional sidebar." },
  { id: "minimalist", name: "Minimalist", description: "A clean, elegant, and straightforward design." },
  { id: "creative-gradient", name: "Creative Gradient", description: "Vibrant design with a gradient header." },
  { id: "two-column-grid", name: "Two-Column Grid", description: "Modern grid-based layout for a structured look." },
  { id: "dark-theme", name: "Dark Theme", description: "A bold, modern design with a dark background." },
  { id: "elegant-serif", name: "Elegant Serif", description: "A sophisticated design for senior or creative roles." },
  { id: "tech-startup", name: "Tech Startup", description: "A modern and clean look for tech roles." },
  { id: "professional", name: "Professional", description: "A clean and classic corporate look." },
  { id: "modern-blue", name: "Modern Blue", description: "A fresh design with cool blue tones." },
  { id: "modern", name: "Modern", description: "A stylish and contemporary layout." },
  { id: "minimal-classic", name: "Minimal Classic", description: "Simple, elegant, and easy to read." },
  { id: "creative", name: "Creative", description: "A unique layout for creative professionals." },
  { id: "elegant-bw", name: "Elegant B&W", description: "A timeless black and white design." },
  { id: "sidebar-highlight", name: "Sidebar Highlight", description: "A compact design with a colored sidebar." },
  { id: "minimal", name: "Minimal", description: "Simple, clean, and focused on content." },
];

const templateColors = [
  { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', selected: 'ring-emerald-500' },
  { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', selected: 'ring-blue-500' },
  { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', selected: 'ring-gray-500' },
  { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', selected: 'ring-purple-500' },
  { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', selected: 'ring-sky-500' },
  { bg: 'bg-gray-800', border: 'border-gray-600', text: 'text-gray-100', selected: 'ring-white' },
  { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', selected: 'ring-rose-500' },
  { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', selected: 'ring-indigo-500' },
  { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-800', selected: 'ring-teal-500' },
  { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-800', selected: 'ring-cyan-500' },
  { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', selected: 'ring-amber-500' },
  { bg: 'bg-lime-50', border: 'border-lime-200', text: 'text-lime-800', selected: 'ring-lime-500' },
  { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-800', selected: 'ring-fuchsia-500' },
  { bg: 'bg-stone-100', border: 'border-stone-200', text: 'text-stone-800', selected: 'ring-stone-500' },
  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-800', selected: 'ring-pink-500' },
  { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800', selected: 'ring-slate-500' },
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
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Choose a Template</h2>
            <p className="text-sm text-gray-500 mt-1">Select a new look for your resume.</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 overflow-y-auto">
          {templates.map((template, index) => {
            const isSelected = selectedTemplate === template.id;
            const colors = templateColors[index % templateColors.length];
            return (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                className={cn(
                  "relative group cursor-pointer border-2 rounded-xl transition-all duration-300 hover:scale-105",
                  isSelected
                    ? `ring-4 ring-offset-2 ${colors.selected} shadow-lg`
                    : `${colors.border} hover:border-green-400 hover:shadow-md`
                )}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1 z-10 shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                <div className={cn("aspect-[3/4] rounded-t-lg p-3 overflow-hidden", colors.bg)}>
                  {/* Visual representation of the template */}
                  <div className="w-full h-full border border-dashed border-gray-400/50 rounded-md flex flex-col p-2 gap-1.5 opacity-80">
                    <div className={cn("h-3 rounded-sm", template.id.includes('dark') ? 'bg-gray-300' : 'bg-gray-400', template.id.includes('gradient') && 'bg-gradient-to-r from-blue-400 to-purple-400', template.id.includes('classic') && 'bg-green-500' )} style={{ width: '60%'}}></div>
                    <div className="flex-grow flex gap-2">
                    {template.id.includes('sidebar') && <div className="w-1/4 h-full bg-gray-400/50 rounded-sm"></div>}
                    <div className="flex-grow flex flex-col gap-1.5">
                      <div className="h-2 w-full bg-gray-400/50 rounded-sm"></div>
                      <div className="h-2 w-[85%] bg-gray-400/50 rounded-sm"></div>
                      <div className="h-2 w-full bg-gray-400/50 rounded-sm mt-1"></div>
                      <div className="h-2 w-[70%] bg-gray-400/50 rounded-sm"></div>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-b-xl">
                  <h3 className={cn("font-semibold truncate", colors.text)}>{template.name}</h3>
                  <p className="text-xs text-gray-500 truncate h-4">{template.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-6 border-t mt-auto flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">Done</Button>
        </div>
      </Card>
    </div>
  );
}
