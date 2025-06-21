import { useEffect, useState } from "react";
import { ResumeData } from "@/types/schema";

export function useAutoSave(resumeData: ResumeData) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const saveData = async () => {
      setIsSaving(true);
      
      // Simulate a small delay to show saving state
      await new Promise(resolve => setTimeout(resolve, 300));
      
      try {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        setLastSaved(new Date());
      } catch (error) {
        console.error('Failed to save resume data:', error);
      } finally {
        setIsSaving(false);
      }
    };

    // Debounce the save operation
    const timeoutId = setTimeout(saveData, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  return {
    isSaving,
    lastSaved,
  };
}
