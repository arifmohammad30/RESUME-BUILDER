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
    <div className="w-full py-3 md:py-6 lg:py-8 flex flex-col items-center">
      <div className="flex items-center justify-center gap-0 relative w-full max-w-2xl px-1 md:px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1 min-w-0">
            <div className="relative z-10">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 rounded-full border-2 transition-all duration-300 shadow-md",
                  index < currentStep
                    ? "bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white"
                    : index === currentStep
                    ? "bg-white border-green-600 text-green-700 shadow-lg"
                    : "bg-gray-200 border-gray-300 text-gray-400"
                )}
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              >
                {index < currentStep ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                ) : (
                  <span className="text-xs sm:text-sm md:text-base font-medium">{index + 1}</span>
                )}
              </div>
              {/* Progress bar */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-1/2 left-full w-full h-0.5 sm:h-1 md:h-2 -translate-y-1/2 z-0 transition-all duration-300",
                    index < currentStep ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gray-300"
                  )}
                  style={{ width: "100%", borderRadius: 3 }}
                />
              )}
            </div>
            <div className="mt-1.5 md:mt-2 lg:mt-3 text-center px-0.5">
              <span
                className={cn(
                  "text-xs sm:text-sm md:text-base font-bold leading-tight break-words hyphens-auto",
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