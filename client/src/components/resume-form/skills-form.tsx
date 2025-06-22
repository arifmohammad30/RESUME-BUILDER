import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skill } from "@/types/schema";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, XCircle, BadgeCheck } from "lucide-react";
import { useState } from "react";

const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.string().min(1, "Skill level is required"),
});

const skillsSchema = z.object({
  skills: z.array(skillSchema),
});

type SkillsFormValues = z.infer<typeof skillsSchema>;

interface SkillsFormProps {
  data: { skills: Skill[] };
  onChange: (data: { skills: Skill[] }) => void;
  onSave: () => void;
  onBack: () => void;
}

export function SkillsForm({ data, onChange, onSave, onBack }: SkillsFormProps) {
  const [newSkillName, setNewSkillName] = useState("");

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: (data.skills || []).map(skill => ({ ...skill, level: skill.level || "" })),
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const handleAdd = () => {
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: newSkillName.trim(),
      level: "Intermediate" // Default level
    };

    // Update form state
    append(newSkill);
    
    // Update parent component state
    onChange({ skills: [...data.skills, newSkill] });
    
    // Clear input
    setNewSkillName("");
  };

  const handleRemove = (index: number) => {
    // Update form state
    remove(index);
    
    // Update parent component state
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    onChange({ skills: updatedSkills });
  };

  const onSubmit = (values: SkillsFormValues) => {
    // Ensure all skills have the level property
    const skillsWithLevel = values.skills.map(skill => ({
      ...skill,
      level: skill.level || "Intermediate"
    }));
    onChange({ skills: skillsWithLevel });
    onSave();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10 space-y-6" style={{ fontFamily: 'Roboto Flex, Inter, Arial, sans-serif' }}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-700" style={{ fontFamily: 'inherit' }}>Skills</h2>
        <p className="text-gray-600 text-sm sm:text-base">List your relevant skills.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormItem>
              <FormLabel><BadgeCheck className="inline w-4 h-4 mr-1 text-green-600" />Add a new skill</FormLabel>
              <FormControl>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="e.g., JavaScript, Project Management"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAdd();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAdd} 
                    className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 rounded-lg transition font-semibold"
                    disabled={!newSkillName.trim()}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          </div>

          {fields.length > 0 && (
            <div className="space-y-4 rounded-xl border p-4 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Your Skills</h3>
              <div className="flex flex-wrap gap-2">
                {fields.map((skill, index) => (
                  <Badge key={skill.id} variant="secondary" className="flex items-center space-x-1 pr-1 bg-green-100 text-green-800">
                    <span>{skill.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(index)}
                      className="h-auto p-0 text-green-700 hover:text-red-500"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto border-green-500 text-green-700 hover:bg-green-50">
              Back
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 rounded-lg transition font-semibold"
              disabled={fields.length === 0}
            >
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
