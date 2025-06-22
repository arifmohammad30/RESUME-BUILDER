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
import { Certification } from "@/types/schema";
import { Award, PlusCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import React from "react";

const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  url: z.string().optional().refine(
    (val) => !val || /^https?:\/\//.test(val),
    { message: "Please enter a valid URL starting with http:// or https://" }
  ),
});

const certificationsSchema = z.object({
  certifications: z.array(certificationSchema),
});

type CertificationsFormValues = z.infer<typeof certificationsSchema>;

interface CertificationsFormProps {
  data: { certifications: Certification[] };
  onChange: (data: { certifications: Certification[] }) => void;
  onSave: () => void;
  onBack: () => void;
}

export function CertificationsForm({ data, onChange, onSave, onBack }: CertificationsFormProps) {
  const form = useForm<CertificationsFormValues>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: {
      certifications: data.certifications || [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const handleAddCertification = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      url: "",
    });
  };

  const handleRemoveCertification = (index: number) => {
    remove(index);
  };

  const onSubmit = (values: CertificationsFormValues) => {
    // Filter out empty certifications
    const validCertifications = values.certifications.filter(
      cert => cert.name.trim() !== ""
    );
    
    onChange({ certifications: validCertifications });
    onSave();
  };

  // Watch form values to update parent component in real-time
  const watchedValues = form.watch("certifications");
  
  // Update parent component when form values change
  React.useEffect(() => {
    const validCertifications = watchedValues.filter(
      cert => cert.name.trim() !== ""
    );
    onChange({ certifications: validCertifications });
  }, [watchedValues, onChange]);

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10 space-y-6" style={{ fontFamily: 'Roboto Flex, Inter, Arial, sans-serif' }}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-700" style={{ fontFamily: 'inherit' }}>Certifications</h2>
        <p className="text-gray-600 text-sm sm:text-base">Add your professional certifications, licenses, or completed courses.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.length === 0 ? (
            <Card className="p-8 text-center border-2 border-dashed border-green-200 rounded-xl">
              <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No certifications added yet</h3>
              <p className="text-gray-500 mb-4">Add your first certification to showcase your professional development.</p>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCertification}
                className="border-green-500 text-green-700 hover:bg-green-50"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Your First Certification
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 sm:p-6 space-y-4 border border-green-200 rounded-xl shadow-sm bg-gradient-to-br from-green-50/40 to-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-green-700">Certification #{index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCertification(index)}
                      className="h-auto p-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                            <Award className="w-4 h-4 mr-1 text-green-600" />
                            Certification Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., AWS Certified Solutions Architect"
                              {...field}
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                            <Award className="w-4 h-4 mr-1 text-green-600" />
                            Certificate URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/certificate"
                              type="url"
                              {...field}
                              className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {fields.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCertification}
              className="w-full border-green-500 text-green-700 hover:bg-green-50"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Another Certification
            </Button>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack} 
              className="w-full sm:w-auto border-green-500 text-green-700 hover:bg-green-50"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 rounded-lg transition font-semibold"
            >
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 