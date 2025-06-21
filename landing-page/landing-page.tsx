import { Button } from "./src/components/ui/button";
import { FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import styles from './landing-page.module.css';

export default function LandingPage() {
  const handleStartBuilding = () => {
    // Point to the separate builder application
   
    window.location.href = process.env.VITE_BUILDER_URL || "https://your-builder-app.netlify.app";
  };

  return (
    <div className={`min-h-screen relative ${styles.landingRoot}`}>
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/landing.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-8 relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-green-400" />
              <span className={`text-3xl md:text-5xl font-bold text-green-400 tracking-widest ${styles.poppinsFont}`}>Resume Builder</span>
            </div>
            <Button
              variant="ghost"
              className="text-blue-700 bg-blue-100 hover:!text-white hover:!bg-blue-600 hover:!shadow-lg hover:!scale-105 transform transition-all duration-300 ease-in-out border border-blue-200 hover:!border-blue-500"
              onClick={handleStartBuilding}
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-start relative">
          <div className="container mx-auto px-6 md:px-8 relative">
            <div className="max-w-3xl flex flex-col items-start text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow">
                Create Your Professional Resume in Minutes
              </h1>
              <p className="text-xl text-yellow-100 mb-8 leading-relaxed drop-shadow" style={{ color: '#fefce8' }}>
                Stand out from the crowd with a beautifully designed resume that highlights your skills and experience.
              </p>
              {/* Features (Short) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-start w-full">
                <div className="flex items-center space-x-3 text-green-300 text-left justify-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Professional Templates</span>
                </div>
                <div className="flex items-center space-x-3 text-green-300 text-left justify-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Easy to Use Editor</span>
                </div>
                <div className="flex items-center space-x-3 text-green-300 text-left justify-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Export to PDF</span>
                </div>
                <div className="flex items-center space-x-3 text-green-300 text-left justify-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Free to Use</span>
                </div>
              </div>
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-white text-gray-900 hover:!bg-[#38bdf8] hover:!text-white rounded-lg shadow-lg transition-all duration-300 mt-4 md:mt-8 self-start"
                onClick={handleStartBuilding}
              >
                Start Building Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Full Services/Features Section */}
        <section className="relative z-10 pt-12 pb-8">
          <div className="container mx-auto px-6 md:px-8 relative">
            <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white rounded-lg shadow-lg max-w-xs">
                <FileText className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-green-900">Professional Templates</h3>
                <p className="text-gray-700">Choose from a variety of ATS-friendly designs.</p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white rounded-lg shadow-lg max-w-xs">
                <ArrowRight className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-green-900">PDF Export</h3>
                <p className="text-gray-700">Download your resume instantly in PDF format.</p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white rounded-lg shadow-lg max-w-xs">
                <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-green-900">Easy-to-Use Editor</h3>
                <p className="text-gray-700">Intuitive form-based builder—no design skills needed.</p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white rounded-lg shadow-lg max-w-xs">
                <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-green-900">Free to Use</h3>
                <p className="text-gray-700">Build and download your resume without any payment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 pt-12 pb-8">
          <div className="container mx-auto px-6 md:px-8 relative">
            <h2 className="text-3xl font-bold text-white mb-12 text-center drop-shadow">What Our Users Say</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full md:w-[350px] flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-3">AS</div>
                <p className="text-green-500 italic mb-2">"This tool helped me get hired faster. The templates are modern and professional."</p>
                <div className="text-green-700 font-semibold">Aditi Sharma</div>
                <div className="text-gray-500 text-sm">Software Developer</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full md:w-[350px] flex flex-col items-center md:items-start text-center md:text-left">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-14 h-14 rounded-full mb-3" />
                <p className="text-green-500 italic mb-2">"Super easy to use and the PDF export is instant. Highly recommended!"</p>
                <div className="text-green-700 font-semibold">Rahul Verma</div>
                <div className="text-gray-500 text-sm">Product Manager</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative z-10 pt-12 pb-8">
          <div className="container mx-auto px-6 md:px-8 relative">
            <h2 className="text-3xl font-bold text-white mb-12 text-center drop-shadow">Pricing</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                <div className="p-6 bg-white border-2 border-green-500 rounded-lg shadow-lg flex flex-col items-center text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">💼 <span className="text-green-700">Free Plan</span></div>
                  <ul className="text-green-500 mb-4 space-y-2">
                    <li>✔️ Unlimited resumes</li>
                    <li>✔️ Access to all templates</li>
                    <li>✔️ Free PDF download</li>
                  </ul>
                  <div className="text-green-700 font-semibold mb-2">No Sign-Up Required</div>
                  <Button className="bg-green-500 text-white w-full mt-2 hover:!bg-blue-600 hover:!text-white" onClick={handleStartBuilding}>Start for Free</Button>
                </div>
                <div className="p-6 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center text-center opacity-60 cursor-not-allowed">
                  <div className="text-4xl font-bold text-gray-400 mb-2">🚀 <span className="text-green-700">Pro Plan</span></div>
                  <ul className="text-green-500 mb-4 space-y-2">
                    <li>Unlimited resumes</li>
                    <li>Premium templates</li>
                    <li>Advanced analytics</li>
                  </ul>
                  <div className="text-gray-400 font-semibold mb-2">Coming Soon</div>
                  <Button className="bg-gray-300 text-gray-500 w-full mt-2 hover:!bg-blue-100 hover:!text-blue-700" disabled>Coming Soon</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative z-10 pt-12 pb-8">
          <div className="container mx-auto px-6 max-w-2xl relative">
            <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow">Contact Us</h2>
            <form className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-left">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Name</label>
                <input type="text" className="w-full border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Email</label>
                <input type="email" className="w-full border border-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Message</label>
                <textarea className="w-full border border-green-200 rounded px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" placeholder="How can we help you?" />
              </div>
              <Button type="submit" className="bg-green-500 text-white w-full hover:!bg-blue-600 hover:!text-white">Submit</Button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8">
          <div className="text-center text-white/60 text-sm"  style={{ color: '#fefce8' }}>
            © 2024 ResumeGenius. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
} 