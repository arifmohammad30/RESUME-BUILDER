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
import { ResumeData } from "@/types/schema";
import { ArrowRight, RotateCcw, User, Mail, Phone, MapPin, Globe, Linkedin, Github, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  jobTitle: z.string().optional(),
  summary: z.string().min(1, "Professional summary is required"),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
  onSave: () => void;
  onBack: () => void;
}

export function PersonalInfoForm({ data, onChange, onSave, onBack }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      location: data.location || "",
      jobTitle: data.jobTitle || "",
      summary: data.summary || "",
      website: data.website || "",
      linkedin: data.linkedin || "",
      github: data.github || "",
    },
    mode: "onChange",
  });

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to start fresh? All your data will be cleared.")) {
      // Clear all form fields
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        jobTitle: "",
        summary: "",
        website: "",
        linkedin: "",
        github: "",
      });
      onChange({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        jobTitle: "",
        summary: "",
        website: "",
        linkedin: "",
        github: "",
      });
    }
  };

  const onSubmit = (values: PersonalInfoFormValues) => {
    onChange(values);
    onSave();
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto Flex, Inter, Arial, sans-serif' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-green-700" style={{ fontFamily: 'inherit' }}>Personal Information</h2>
          <p className="text-gray-600">Let's start with your basic information. This will be the foundation of your resume.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearData}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Fresh
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 space-y-4 border border-green-200 rounded-lg shadow-sm bg-green-50/20">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><User className="inline w-4 h-4 mr-1 text-green-600" />First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ firstName: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><User className="inline w-4 h-4 mr-1 text-green-600" />Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ lastName: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><Mail className="inline w-4 h-4 mr-1 text-green-600" />Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ email: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><Phone className="inline w-4 h-4 mr-1 text-green-600" />Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ phone: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location and Job Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><MapPin className="inline w-4 h-4 mr-1 text-green-600" />Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="San Francisco, CA" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ location: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><FileText className="inline w-4 h-4 mr-1 text-green-600" />Professional Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Senior Software Engineer" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ jobTitle: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Professional Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><FileText className="inline w-4 h-4 mr-1 text-green-600" />Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                      rows={4}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onChange({ summary: e.target.value });
                      }}
                    />
                  </FormControl>
                  <p className="text-sm text-gray-500 mt-1">
                    Keep it concise but impactful. This is often the first thing recruiters read.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Online Presence */}
          <Card className="p-6 space-y-4 border border-green-200 rounded-lg shadow-sm bg-green-50/20">
            <h3 className="text-lg font-semibold text-green-700">Online Presence (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><Globe className="inline w-4 h-4 mr-1 text-green-600" />Personal Website</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://yourwebsite.com" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ website: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><Linkedin className="inline w-4 h-4 mr-1 text-green-600" />LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://linkedin.com/in/yourprofile" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ linkedin: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><Github className="inline w-4 h-4 mr-1 text-green-600" />GitHub Profile</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://github.com/yourusername" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChange({ github: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Back to Home
            </Button>
            <Button 
              type="submit"
              disabled={!form.formState.isValid}
              className="bg-green-600 hover:bg-green-700"
            >
              Next: Experience <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
