import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-8 flex flex-col items-center">
      <div className="flex items-center justify-center gap-0 relative w-full max-w-2xl">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1 min-w-0">
            <div className="relative z-10">
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 shadow-md",
                  index < currentStep
                    ? "bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white"
                    : index === currentStep
                    ? "bg-white border-green-600 text-green-700 shadow-lg"
                    : "bg-gray-200 border-gray-300 text-gray-400"
                )}
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {/* Progress bar */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-1/2 left-full w-full h-2 -translate-y-1/2 z-0 transition-all duration-300",
                    index < currentStep ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gray-300"
                  )}
                  style={{ width: "100%", height: 6, borderRadius: 3 }}
                />
              )}
            </div>
            <div className="mt-3 text-center w-24">
              <span
                className={cn(
                  "text-base font-bold leading-tight",
                  index <= currentStep ? "text-green-700" : "text-gray-400"
                )}
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              >
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 