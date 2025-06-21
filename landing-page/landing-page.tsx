import { Button } from "./src/components/ui/button";
import { FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import styles from './landing-page.module.css';

export default function LandingPage() {
  const handleStartBuilding = () => {
    // Point to the separate builder application
    // This will be updated after deploying the builder app to Netlify
    window.location.href = process.env.VITE_BUILDER_URL || "https://resumegenius-builder.netlify.app";
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">ResumeGenius</h1>
        <p className="text-xl mb-8">Professional Resume Builder</p>
        <Button 
          onClick={handleStartBuilding}
          className="bg-white text-blue-500 hover:bg-gray-100"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
} 