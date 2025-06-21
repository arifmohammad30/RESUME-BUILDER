import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
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
import { Experience } from "@/types/schema";
import { PlusCircle, Trash2, Briefcase, Building2, Calendar, CheckCircle, FileText } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

const experienceSchema = z.object({
  experience: z.array(z.object({
    id: z.string(),
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company name is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().default(""),
    current: z.boolean().default(false),
    description: z.string().min(1, "Description is required"),
  }))
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  data: { experience: Experience[] };
  onChange: (data: { experience: Experience[] }) => void;
  onSave: () => void;
  onBack: () => void;
}

export function ExperienceForm({ data, onChange, onSave, onBack }: ExperienceFormProps) {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: data.experience.length > 0 ? data.experience : [{
        id: crypto.randomUUID(),
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      }]
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  useEffect(() => {
    if (data.experience) {
      form.reset({
        experience: data.experience.map(exp => ({
          ...exp,
          endDate: exp.endDate || "",
          description: exp.description || ""
        }))
      });
    }
  }, [data.experience, form]);

  const handleAdd = () => {
    const newExperienceArr = [
      ...data.experience,
      { id: crypto.randomUUID(), position: "", company: "", startDate: "", endDate: "", current: false, description: "" }
    ];
    onChange({ experience: newExperienceArr });
    form.reset({ experience: newExperienceArr });
  };

  const handleRemove = (id: string) => {
    const newExperienceArr = data.experience.filter((exp) => exp.id !== id);
    onChange({ experience: newExperienceArr });
    form.reset({ experience: newExperienceArr });
  };

  const onSubmit = (values: ExperienceFormValues) => {
    onChange({ experience: values.experience });
    onSave();
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto Flex, Inter, Arial, sans-serif' }}>
      <div>
        <h2 className="text-2xl font-bold text-green-700" style={{ fontFamily: 'inherit' }}>Experience</h2>
        <p className="text-gray-600">Add your work experience.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {data.experience.map((experience, index) => (
            <Card key={experience.id} className="p-6 space-y-4 border border-green-200 rounded-lg shadow-sm bg-green-50/20">
              <div className="flex justify-end items-center">
                {data.experience.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(experience.id)}
                    className="h-auto p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Job Title, Company, Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`experience.${index}.position`}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel><Briefcase className="inline w-4 h-4 mr-1 text-green-600" />Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.company`}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel><Building2 className="inline w-4 h-4 mr-1 text-green-600" />Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Tech Solutions Inc." {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Start Date, End Date, Is Current */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <FormField
                  control={form.control}
                  name={`experience.${index}.startDate`}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel><Calendar className="inline w-4 h-4 mr-1 text-green-600" />Start Date</FormLabel>
                      <FormControl>
                        <Input type="month" {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.endDate`}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel><Calendar className="inline w-4 h-4 mr-1 text-green-600" />End Date</FormLabel>
                      <FormControl>
                        <Input type="month" {...formField} disabled={form.watch(`experience.${index}.current`)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.current`}
                  render={({ field: formField }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={formField.value}
                          onCheckedChange={(checked) => {
                            const updatedExperience = data.experience.map((exp) =>
                              exp.id === experience.id
                                ? {
                                    ...exp,
                                    current: checked as boolean,
                                    endDate: checked ? "" : exp.endDate
                                  }
                                : exp
                            );
                            onChange({ experience: updatedExperience });
                            form.setValue(`experience.${index}.current`, checked as boolean);
                            if (checked) {
                              form.setValue(`experience.${index}.endDate`, "");
                            }
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel><CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />Current</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name={`experience.${index}.description`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel><FileText className="inline w-4 h-4 mr-1 text-green-600" />Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements..."
                        className="min-h-[100px]"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={handleAdd}
            className="w-full border-green-500 text-green-700 hover:bg-green-50"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Experience
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
