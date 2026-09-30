export const profile = {
  name: "Sundharavel G",
  title: "Gen AI Python Developer Intern",
  status: "Intern at Vetri Technology Solutions",
  location: "Tuticorin, Tamil Nadu",
  bio: "Frontend-focused developer with strong foundations in React, JavaScript, and modern UI engineering, currently expanding into Python and Generative AI at Vetri Technology Solutions.",
  roles: [
    "Frontend Developer",
    "React Developer",
    "Full Stack Developer",
    "Python Developer",
    "Gen AI Developer",
  ],
  email: "ganesans0407@gmail.com",
  github: "https://github.com/sundhar1704",
  cvUrl: "/cv/Sundharavel-G-Resume.pdf", // drop your resume PDF into public/cv/
};

export const metrics = [
  { value: "5+", label: "Shipped Interactive Apps" },
  { value: "2026", label: "Active Vetri Tech Internship" },
  { value: "100%", label: "Real Live Verified Demos" },
  { value: "B.Com.", label: "Graduate & Tech Explorer" },
];

export const skillGroups = [
  {
    title: "Frontend Architecture",
    tag: "Primary Depth",
    desc: "Semantic HTML structure, clean styling systems, and scalable component architecture.",
    footer: ["Production Ready", "High Proficiency"],
    skills: ["HTML5", "CSS3", "JavaScript", "React.js"],
  },
  {
    title: "Styling & Mobile",
    tag: "Adaptive UI",
    desc: "Utility-first CSS ecosystems and cross-platform native smartphone components.",
    footer: ["Mobile & Layouts", "Interactive"],
    skills: ["Tailwind", "Bootstrap", "React Native", "Vercel"],
  },
  {
    title: "AI & Tooling",
    tag: "Active Growth",
    desc: "Backend scripting and generative intelligence training at Vetri Technology Solutions.",
    footer: ["Institute Trained", "Advancing"],
    skills: ["Python", "Gen AI / LLMs", "Git", "VS Code"],
  },
];

export interface Project {
  id: string;
  category: "react" | "react-native" | "js-html";
  windowUrl: string;
  liveUrl: string;
  repoUrl?: string;
  badge: string;
  tag: string;
  title: string;
  desc: string;
  stack: string[];
  mobile?: boolean;
}

export const projects: Project[] = [
  {
    id: "hopehands",
    category: "react",
    windowUrl: "charity-iota-olive.vercel.app",
    liveUrl: "https://charity-iota-olive.vercel.app/",
    repoUrl: "https://github.com/sundhar1704",
    badge: "React App",
    tag: "Non-Profit Portal · Production Deployed",
    title: "Charity Donation Platform",
    desc: "Modern donor-engagement platform featuring modular donation calculators, real-time cause trackers, interactive volunteer onboarding forms, and fluid responsiveness.",
    stack: ["React.js", "CSS3 Modules", "Vercel"],
  },
  {
    id: "groco",
    category: "react",
    windowUrl: "ecommerce-web-ivory-zeta.vercel.app",
    liveUrl: "https://ecommerce-web-ivory-zeta.vercel.app/",
    repoUrl: "https://github.com/sundhar1704",
    badge: "React App",
    tag: "Retail & Commerce · Production Deployed",
    title: "Full-Featured E-Commerce Hub",
    desc: "E-commerce platform equipped with real-time cart state management, category filtering, product spotlight carousels, and responsive order simulation.",
    stack: ["React.js", "Context API", "Tailwind CSS"],
  },
  {
    id: "foodflow",
    category: "react-native",
    windowUrl: "food-folw.vercel.app",
    liveUrl: "https://food-folw.vercel.app/",
    badge: "React Native Mobile",
    tag: "Mobile Experience · Cross-Platform UI",
    title: "FoodFlow Delivery Application",
    desc: "A smooth mobile food ordering flow with fast tactile gesture navigation, live cart computation, restaurant card carousels, and order checkout previews.",
    stack: ["React Native", "Mobile Components", "JavaScript"],
    mobile: true,
  },
  {
    id: "fashion",
    category: "js-html",
    windowUrl: "sundhar1704.github.io/FashionProject",
    liveUrl: "https://sundhar1704.github.io/FashionProject/",
    badge: "Editorial Web",
    tag: "Editorial & Branding · GitHub Pages",
    title: "Fashion Editorial Lookbook",
    desc: "High-aesthetic editorial fashion portal engineered with clean semantic HTML, bespoke CSS grid layouts, smooth CSS keyframe transitions, and responsive mobile drawers.",
    stack: ["HTML5", "CSS3 Grid", "JavaScript"],
  },
  {
    id: "weather",
    category: "js-html",
    windowUrl: "sundhar1704.github.io/weatherproject",
    liveUrl: "https://sundhar1704.github.io/weatherproject/WEATHER.HTML",
    repoUrl: "https://github.com/sundhar1704",
    badge: "API Integration",
    tag: "Live Data & APIs · Live Service",
    title: "Live Global Weather Radar",
    desc: "Real-time atmospheric intelligence dashboard querying RESTful weather endpoints. Features dynamic condition backgrounds, multi-day forecasting, humidity and pressure calculations, and responsive search autosuggest.",
    stack: ["JavaScript Fetch API", "REST API", "HTML5/CSS3", "Dynamic DOM"],
  },
];

export const experience = {
  role: "Gen AI Python Developer Intern",
  company: "Vetri Technology Solutions · Tirunelveli, Tamil Nadu",
  started: "Started 24 August 2026",
  desc: "Actively contributing to enterprise software initiatives, focusing on foundational Python backend workflows, automated scripts, and exploring Generative AI patterns, prompt engineering pipelines, and modern web integrations.",
  pillars: [
    { title: "Python Systems", desc: "Data operations, scripting & logic" },
    { title: "Generative AI", desc: "LLM pipelines & prompt models" },
  ],
  education: {
    degree: "Bachelor of Commerce (B.Com.)",
    school: "V.O. Chidambaram College, Tuticorin",
    year: "Graduation: 2024",
    desc: "Gained rigorous quantitative, financial, and analytical problem-solving fundamentals, providing a disciplined foundation for algorithmic thinking and business software logic.",
  },
};

export const learning = [
  {
    title: "Python Programming",
    status: "Currently Learning",
    desc: "Advancing through object-oriented design, modules, API servers, and data manipulation.",
  },
  {
    title: "Generative AI & LLMs",
    status: "Developing Skill",
    desc: "Exploring prompt architectures, LangChain concepts, and intelligent agent integrations.",
  },
];

// Q&A knowledge base for the voice assistant — keep this in sync with the
// content above so the assistant never says something the site doesn't.
export const assistantFaq: { q: string[]; a: string }[] = [
  {
    q: ["who are you", "who is sundharavel", "tell me about yourself", "about you"],
    a: `I'm Sundharavel G, a Gen AI Python Developer Intern at Vetri Technology Solutions. I'm a frontend-focused developer with strong foundations in React and JavaScript, now expanding into Python and Generative AI.`,
  },
  {
    q: ["what do you do", "what is your role", "current job", "internship"],
    a: `I'm currently interning as a Gen AI Python Developer at Vetri Technology Solutions in Tirunelveli, working on Python backend workflows and Generative AI patterns like prompt engineering.`,
  },
  {
    q: ["skills", "tech stack", "technologies", "what can you build"],
    a: `My core stack is HTML5, CSS3, JavaScript and React.js. I also work with Tailwind CSS, Bootstrap and React Native for mobile, and I'm currently building up Python and Generative AI skills.`,
  },
  {
    q: ["projects", "what have you built", "portfolio", "show me your work"],
    a: `I've shipped five projects: a Charity Donation Platform, a full e-commerce hub called GroCo, a FoodFlow mobile delivery app, a Fashion Editorial Lookbook, and a live Global Weather Radar. They're all in the projects section with live demo links.`,
  },
  {
    q: ["education", "degree", "college", "qualification"],
    a: `I hold a Bachelor of Commerce, B.Com., from V.O. Chidambaram College in Tuticorin, graduating in 2024.`,
  },
  {
    q: ["contact", "hire", "email", "reach you", "get in touch"],
    a: `You can reach me directly at ganesans0407@gmail.com, or use the contact form right on this page — it comes straight to my inbox.`,
  },
  {
    q: ["resume", "cv", "download resume"],
    a: `You can download my resume using the CV button near the top of the page.`,
  },
];
