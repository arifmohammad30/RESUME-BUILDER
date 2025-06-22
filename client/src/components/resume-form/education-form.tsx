import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ResumeData, Education } from "@/types/schema";
import { useEffect } from "react";
import { PlusCircle, Trash2, GraduationCap, BookOpen, Calendar, FileText, CheckCircle } from "lucide-react";

const educationSchema = z.object({
  education: z.array(z.object({
    id: z.string(),
    school: z.string().min(1, "School name is required"),
    degree: z.string().min(1, "Degree is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().default(""),
    current: z.boolean().default(false),
    description: z.string().default(""),
  }))
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
  onSave: () => void;
  onBack: () => void;
}

export function EducationForm({ data, onChange, onSave, onBack }: EducationFormProps) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: data.education.length > 0 ? data.education.map(edu => ({
        ...edu,
        endDate: edu.endDate || "",
        description: edu.description || ""
      })) : [{
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      }]
    },
    mode: "onChange"
  });

  const onSubmit = async (values: EducationFormValues) => {
    try {
      // Validate that at least one education entry has all required fields
      const hasValidEntry = values.education.some(edu => 
        edu.school.trim() !== "" && 
        edu.degree.trim() !== "" && 
        edu.startDate.trim() !== ""
      );

      if (!hasValidEntry) {
        console.error("Please fill in all required fields for at least one education entry");
        return;
      }

      // Update parent component with form values
      onChange({ education: values.education });
      
      // Call onSave to proceed to next step
      onSave();
    } catch (error) {
      console.error("Error submitting education form:", error);
    }
  };

  const handleAdd = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    
    const updatedEducation = [...data.education, newEducation];
    onChange({ education: updatedEducation });
    form.setValue("education", updatedEducation);
  };

  const handleRemove = (id: string) => {
    const updatedEducation = data.education.filter(edu => edu.id !== id);
    onChange({ education: updatedEducation });
    form.setValue("education", updatedEducation);
  };

  useEffect(() => {
    if (data.education) {
      const formattedEducation = data.education.map(edu => ({
        ...edu,
        endDate: edu.endDate || "",
        description: edu.description || "",
        startDate: edu.startDate || ""
      }));
      
      form.reset({
        education: formattedEducation
      });
    }
  }, [data.education, form]);

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10 space-y-6" style={{ fontFamily: 'Roboto Flex, Inter, Arial, sans-serif' }}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-700" style={{ fontFamily: 'inherit' }}>Education</h2>
        <p className="text-gray-600 text-sm sm:text-base">Add your educational background.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {form.watch("education").map((education, index) => (
            <div key={education.id} className="p-4 sm:p-6 space-y-4 rounded-xl border border-green-200 shadow-xl bg-gradient-to-br from-green-50/40 to-white">
              <div className="flex justify-between items-center">
                {form.watch("education").length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(education.id)}
                    className="h-auto p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.school`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><GraduationCap className="inline w-4 h-4 mr-1 text-green-600" />School</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            const updatedEducation = form.getValues("education").map((edu) =>
                              edu.id === education.id 
                                ? { ...edu, school: e.target.value }
                                : edu
                            );
                            onChange({ education: updatedEducation });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><BookOpen className="inline w-4 h-4 mr-1 text-green-600" />Degree</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const updatedEducation = form.getValues("education").map((edu) =>
                              edu.id === education.id 
                                ? { ...edu, degree: e.target.value }
                                : edu
                            );
                            onChange({ education: updatedEducation });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><Calendar className="inline w-4 h-4 mr-1 text-green-600" />Start Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          onChange={(e) => {
                            field.onChange(e);
                            const updatedEducation = form.getValues("education").map((edu) =>
                              edu.id === education.id 
                                ? { ...edu, startDate: e.target.value }
                                : edu
                            );
                            onChange({ education: updatedEducation });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><Calendar className="inline w-4 h-4 mr-1 text-green-600" />End Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          disabled={form.watch(`education.${index}.current`)}
                          onChange={(e) => {
                            field.onChange(e);
                            const updatedEducation = form.getValues("education").map((edu) =>
                              edu.id === education.id 
                                ? { ...edu, endDate: e.target.value }
                                : edu
                            );
                            onChange({ education: updatedEducation });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`education.${index}.current`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          form.setValue(`education.${index}.current`, checked as boolean);
                          if (checked) {
                            form.setValue(`education.${index}.endDate`, "");
                          }
                          const updatedEducation = form.getValues("education").map((edu) =>
                            edu.id === education.id 
                              ? { 
                                  ...edu, 
                                  current: checked as boolean,
                                  endDate: checked ? "" : edu.endDate 
                                } 
                              : edu
                          );
                          onChange({ education: updatedEducation });
                        }}
                      />
                    </FormControl>
                    <FormLabel><CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />Currently Studying</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><FileText className="inline w-4 h-4 mr-1 text-green-600" />Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[100px]"
                        onChange={(e) => {
                          field.onChange(e);
                          const updatedEducation = form.getValues("education").map((edu) =>
                            edu.id === education.id 
                              ? { ...edu, description: e.target.value }
                              : edu
                          );
                          onChange({ education: updatedEducation });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAdd}
            className="w-full border-green-500 text-green-700 hover:bg-green-50"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Education
          </Button>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto border-green-500 text-green-700 hover:bg-green-50">
              Back
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 rounded-lg transition font-semibold"
              onClick={() => {
                const values = form.getValues();
                onSubmit(values);
              }}
            >
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
