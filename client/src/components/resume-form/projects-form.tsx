import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/schema";
import { PlusCircle, Trash2, Github, ExternalLink, X, LayoutDashboard, FileText, Tags } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  codeUrl: z.string().default(""),
  liveUrl: z.string().default(""),
  tags: z.array(z.string()).default([]),
});

const projectsSchema = z.object({
  projects: z.array(projectSchema),
});

type ProjectsFormValues = z.infer<typeof projectsSchema>;

interface ProjectsFormProps {
  data: { projects: Project[] };
  onChange: (data: { projects: Project[] }) => void;
  onSave: () => void;
  onBack: () => void;
}

export function ProjectsForm({ data, onChange, onSave, onBack }: ProjectsFormProps) {
  const [newTag, setNewTag] = useState("");
  const form = useForm<ProjectsFormValues>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: data.projects.length > 0 ? data.projects : [{
        id: crypto.randomUUID(),
        name: "",
        description: "",
        codeUrl: "",
        liveUrl: "",
        tags: [],
      }]
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  useEffect(() => {
    if (data.projects) {
      form.reset({
        projects: data.projects.map(proj => ({
          ...proj,
          codeUrl: proj.codeUrl || "",
          liveUrl: proj.liveUrl || "",
          tags: proj.tags || [],
        }))
      });
    }
  }, [data.projects, form]);

  const handleAdd = () => {
    onChange({
      projects: [
        ...data.projects,
        { id: crypto.randomUUID(), name: "", description: "", codeUrl: "", liveUrl: "", tags: [] }
      ]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      projects: data.projects.filter((proj) => proj.id !== id)
    });
  };

  const handleAddTag = (projectIndex: number) => {
    if (newTag.trim()) {
      const currentTags = form.getValues(`projects.${projectIndex}.tags`) || [];
      if (!currentTags.includes(newTag.trim())) {
        form.setValue(`projects.${projectIndex}.tags`, [...currentTags, newTag.trim()]);
        const values = form.getValues();
        onChange({ projects: values.projects });
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (projectIndex: number, tagToRemove: string) => {
    const currentTags = form.getValues(`projects.${projectIndex}.tags`) || [];
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    form.setValue(`projects.${projectIndex}.tags`, updatedTags);
    const values = form.getValues();
    onChange({ projects: values.projects });
  };

  const onSubmit = (values: ProjectsFormValues) => {
    onSave();
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto Flex, Inter, Arial, sans-serif' }}>
      <div>
        <h2 className="text-2xl font-bold text-green-700" style={{ fontFamily: 'inherit' }}>Projects</h2>
        <p className="text-gray-600">Add your notable projects and their details.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {data.projects.map((project, index) => (
            <Card key={project.id} className="p-6 space-y-4 border border-green-200 rounded-lg shadow-sm bg-green-50/20">
              <div className="flex justify-end items-center">
                {data.projects.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(project.id)}
                    className="h-auto p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      <LayoutDashboard className="inline w-4 h-4 mr-1 text-green-600" />
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., E-commerce Website" {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      <FileText className="inline w-4 h-4 mr-1 text-green-600" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, its features, and your role..."
                        className="min-h-[100px]"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`projects.${index}.codeUrl`}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        View Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/repo"
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.liveUrl`}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-project.com"
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>
                  <Tags className="inline w-4 h-4 mr-1 text-green-600" />
                  Technologies & Tools
                </FormLabel>
                <div className="flex flex-wrap gap-2">
                  {form.watch(`projects.${index}.tags`)?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(index, tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology or tool..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(index);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddTag(index)}
                    className="whitespace-nowrap"
                  >
                    Add Tag
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAdd}
            className="w-full border-green-500 text-green-700 hover:bg-green-50"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Project
          </Button>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={onBack} className="border-green-500 text-green-700 hover:bg-green-50">
              Back
            </Button>
            <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
