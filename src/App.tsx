import { useState } from "react";
import Hero from "./components/Hero";
import QuickMetrics from "./components/QuickMetrics";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import VoiceAssistant from "./components/VoiceAssistant";
import Navbar from "./components/Navbar";

function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0faf8] text-slate-900">
      <Hero onOpenAssistant={() => setAssistantOpen(true)} />
      <QuickMetrics />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
      <VoiceAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
      <Navbar />
    </div>
  );
}

export default App;
