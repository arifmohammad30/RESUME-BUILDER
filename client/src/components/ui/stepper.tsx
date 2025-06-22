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
  const percent = ((currentStep + 1) / steps.length) * 100;
  return (
    <div className="w-full flex flex-col items-center mb-6">
      {/* Progress Bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between w-full mt-4 text-sm text-gray-500 font-medium">
        <span>{`Step ${currentStep + 1} of ${steps.length}`}</span>
        <span className="text-green-700 font-semibold">{steps[currentStep]?.title}</span>
      </div>
    </div>
  );
} 