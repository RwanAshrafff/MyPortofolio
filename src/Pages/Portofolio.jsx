import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const projectsData = [
  {
    id: "nuverse-virtual-campus",
    category: "grad",
    Title: "NUVerse - Intelligent AI-Driven Virtual Campus Exploration System",
    Description: "NUVerse is a multi-platform virtual campus experience for Nile University designed to help first-year students choose the right major and feel more confident about university life.",
    Link: "https://nuverse-three.vercel.app",
    Drive: "https://drive.google.com/drive/folders/1wAtNN0z6fOAIXAYL6CzojywWc1Yb5wfb?usp=sharing",
    Space: "https://huggingface.co/spaces/RwanAshraf/AdmissionOfficer/tree/main",
    Img: "/nuverse.png",
    Github: "https://github.com/RwanAshrafff/nuverse-web-portal",
    TechStack: ["Next.js", "TypeScript", "AI", "Virtual Reality", "3D Simulation", "Hugging Face Spaces"],
    Features: [
      {
        label: "Core Objective",
        icon: "🎯",
        items: [
          "Help first-year students discover the right major and understand themselves better",
        ],
      },
      {
        label: "VR Experience",
        icon: "🥽",
        items: [
          "Virtual circuits and chemistry lab simulations",
          "Bilingual voice-to-voice AI professor in English and Arabic",
        ],
      },
      {
        label: "Web Platform",
        icon: "🌐",
        items: [
          "360-degree university view",
          "Bilingual chatbot acting as an admission officer for quick queries",
          "RIASEC-inspired quiz to guide students toward the right major",
        ],
      },
      {
        label: "Deployment",
        icon: "🚀",
        items: [
          "Website deployed on Azure and Vercel",
          "AI experiences deployed on Hugging Face Spaces",
        ],
      },
    ],
  },
  {
    id: "forssa-learning-platform",
    category: "software",
    Title: "Forssa - Full-Stack Learning Platform",
    Description: "A full-stack learning platform inspired by Udemy and Coursera, powered by a .NET backend and focused on making quality education accessible through free access, financial aid, role-based learning tools, and a personalized home feed.",
    Link: "https://forssa-frontend-puce.vercel.app/",
    Img: "/forssa.png",
    Github: "https://github.com/SherifAhmedd/Forssa-Frontend",
    TechStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel", "ASP.NET Core", "Azure"],
    Features: [
      {
        label: "Access Control",
        icon: "🔐",
        items: [
          "Student, instructor, and admin role-based access control",
        ],
      },
      {
        label: "Learning Tools",
        icon: "📚",
        items: [
          "Course browsing, enrollment, financial aid requests, and PDF certificates",
          "Personalized home feed with follow/unfollow activity updates",
        ],
      },
      {
        label: "Instructor Dashboard",
        icon: "📊",
        items: [
          "Multi-step course creation wizard",
          "Analytics dashboard for enrollment and revenue tracking",
        ],
      },
      {
        label: "Payments",
        icon: "💳",
        items: [
          "Stripe checkout and webhook-based enrollment flow",
        ],
      },
    ],
  },
  {
    id: "bank-system",
    category: "software",
    Title: "Bank System",
    Description: "A backend banking system built with .NET for account management, deposits, withdrawals, transfers, and transaction history using layered architecture.",
    Link: "https://github.com/RwanAshrafff/Bank_System",
    Img: "/banking.jpg",
    Github: "https://github.com/RwanAshrafff/Bank_System",
    TechStack: [".NET 9", "ASP.NET Core", "Entity Framework Core", "SQL Server", "xUnit"],
    Features: [
      {
        label: "Banking Operations",
        icon: "🏦",
        items: ["Create accounts, deposit money, withdraw money, and transfer funds between accounts"],
      },
      {
        label: "Architecture",
        icon: "🧱",
        items: ["Layered design across Domain, Application, Infrastructure, and API projects"],
      },
      {
        label: "Data & Testing",
        icon: "🧪",
        items: ["SQL Server persistence with unit tests for core business logic"],
      },
    ],
  },
  {
    id: "hospital-management-system",
    category: "software",
    Title: "Hospital Management System (Django)",
    Description: "Web app that centralizes patients, doctors, appointments, billing, and medical records to reduce paperwork and errors.",
    Link: "https://github.com/RwanAshrafff/Hospital-Management-System",
    Img: "/project-hospital-management.jpg",
    Github: "https://github.com/RwanAshrafff/Hospital-Management-System",
    TechStack: ["Django", "PostgreSQL", "Bootstrap", "REST"],
    Features: [
      {
        label: "Access & Security",
        icon: "🔐",
        items: ["Role-based access control for staff and doctors"],
      },
      {
        label: "Operations",
        icon: "🏥",
        items: ["Appointment scheduling", "Billing and invoicing"],
      },
      {
        label: "Records",
        icon: "📋",
        items: ["Medical record tracking", "Full audit trails for accountability"],
      },
    ],
  },
  {
    id: "time-management-system",
    category: "software",
    Title: "Time Management System (Java)",
    Description: "Personal assistant that organizes daily tasks, prioritizes deadlines, and reduces procrastination through reminders and smart scheduling.",
    Link: "https://github.com/RwanAshrafff/Time-Management-Java-Application",
    Img: "/project-time-management.jpg",
    Github: "https://github.com/RwanAshrafff/Time-Management-Java-Application",
    TechStack: ["Java", "JavaFX", "MySQL", "OOP"],
    Features: [
      {
        label: "Planning",
        icon: "📅",
        items: ["Daily and weekly planner with task prioritization"],
      },
      {
        label: "Productivity",
        icon: "⏱️",
        items: ["Smart reminders to reduce procrastination"],
      },
      {
        label: "Design",
        icon: "🎨",
        items: ["Clean and minimal UI focused on clarity"],
      },
    ],
  },
  {
    id: "maze-generator-solver",
    category: "software",
    Title: "Maze Generator & Solver (Python)",
    Description: "Generates complex mazes and solves them in real time using BFS, DFS, and A* to showcase algorithm efficiency.",
    Link: "https://github.com/RwanAshrafff/Maze-Generator-and-solver-",
    Img: "/project-maze-generator.jpg",
    Github: "https://github.com/RwanAshrafff/Maze-Generator-and-solver-",
    TechStack: ["Python", "BFS", "DFS", "A*"],
    Features: [
      {
        label: "Generation",
        icon: "🔀",
        items: ["Multiple maze generation algorithms"],
      },
      {
        label: "Visualization",
        icon: "🖼️",
        items: ["Side-by-side real-time pathfinding visualizer"],
      },
      {
        label: "Analysis",
        icon: "📈",
        items: ["Performance comparison across BFS, DFS, and A* strategies"],
      },
    ],
  },
  {
    id: "stem-charm",
    category: "ai",
    Title: "STEMmy - Multimodal AI Tutoring System",
    Description: "An intelligent tutoring system combining NLP, humor-aware responses, facial emotion recognition, speech-to-text, and sign language interpretation to enhance STEM education through adaptive and engaging learning experiences.",
    Link: "https://github.com/RwanAshrafff/Stemmy.git",
    Img: "/multimodal.png",
    Logo: "/stemmy.jpg",
    Github: "https://github.com/RwanAshrafff/Stemmy.git",
    TechStack: ["Python", "React", "FastAPI", "BERT", "YOLO", "LLaMA", "Machine Learning", "Deep Learning"],
    Features: [
      {
        label: "NLP & Language",
        icon: "🧠",
        items: [
          "94.33% accuracy in humor detection using transformer-based classifier",
          "83.42% semantic understanding with BERT for context-aware responses",
        ],
      },
      {
        label: "Vision & Emotion",
        icon: "👁️",
        items: [
          "YOLO-based facial expression recognition for emotion-aware tutoring",
        ],
      },
      {
        label: "RAG & Knowledge",
        icon: "📡",
        items: [
          "Enhanced RAG pipeline with topic classification to reduce LLM hallucinations",
          "80%+ accuracy in STEM subject classification with cosine-similarity retrieval",
        ],
      },
      {
        label: "Multimodal Input",
        icon: "🎙️",
        items: [
          "Speech-to-text voice input",
          "Sign language interpretation support",
        ],
      },
    ],
  },
  {
    id: "sentiment-analysis",
    category: "ai",
    Title: "Tweet Sentiment Classification (PySpark vs Python)",
    Description: "ML project comparing sentiment classification models using PySpark (distributed) and scikit-learn (single-node) on real-world tweet datasets.",
    Link: "https://github.com/RwanAshrafff/Sentiment_Analysis-",
    Img: "/project-tweet-sentiment.jpg",
    Github: "https://github.com/RwanAshrafff/Sentiment_Analysis-",
    TechStack: ["PySpark", "Python", "scikit-learn", "Docker", "Machine Learning"],
    Features: [
      {
        label: "Classification",
        icon: "🏷️",
        items: ["Three-class sentiment detection: positive, negative, and neutral"],
      },
      {
        label: "Framework Comparison",
        icon: "⚖️",
        items: ["Side-by-side benchmark of PySpark MLlib vs Python scikit-learn"],
      },
      {
        label: "Algorithms",
        icon: "🔬",
        items: ["Logistic Regression", "Naive Bayes", "SVM", "Random Forest"],
      },
    ],
  },
  {
    id: "ecommerce-recommendation-system",
    category: "ai",
    Title: "E-Commerce Product Recommendation System",
    Description: "An end-to-end analytics and recommendation pipeline that combines data engineering, association rule mining, customer segmentation, and business intelligence.",
    Link: "https://github.com/RwanAshrafff/ecommerce-recommendation-system",
    Img: "/CustomerInsights.png",
    Github: "https://github.com/RwanAshrafff/ecommerce-recommendation-system",
    TechStack: ["Python", "SQL", "PostgreSQL", "Pandas", "scikit-learn", "Power BI", "Machine Learning"],
    Features: [
      {
        label: "Data Pipeline",
        icon: "📦",
        items: ["Medallion architecture with Bronze, Silver, and Gold layers"],
      },
      {
        label: "Recommendation Engine",
        icon: "🛒",
        items: ["FP-Growth association rule mining for cross-selling insights"],
      },
      {
        label: "Customer Intelligence",
        icon: "📊",
        items: ["RFM-based segmentation and customer value prediction"],
      },
    ],
  },
  {
    id: "arabic-sentiment-analysis",
    category: "ai",
    Title: "Arabic Sentiment Analysis",
    Description: "Arabic NLP project focused on preprocessing, feature extraction, and sentiment classification using traditional machine learning and word embeddings.",
    Link: "https://github.com/RwanAshrafff/Arabic-Sentiment-Analysis",
    Img: "/arabic-sentiment-analysis.png",
    Github: "https://github.com/RwanAshrafff/Arabic-Sentiment-Analysis",
    TechStack: ["Python", "NLP", "NLTK", "Gensim", "scikit-learn", "TensorFlow", "Keras"],
    Features: [
      {
        label: "Preprocessing",
        icon: "🧹",
        items: ["Arabic text cleaning, normalization, tokenization, and stopword removal"],
      },
      {
        label: "Feature Extraction",
        icon: "🧠",
        items: ["BoW, TF-IDF, n-grams, AraVec, and FastText embeddings"],
      },
      {
        label: "Models",
        icon: "⚙️",
        items: ["Logistic Regression, Arabert, Marbert, Camelbert, and Qarib"],
      },
    ],
  },
];

const experienceData = [
  {
    id: "ghabour-auto-ai-engineer",
    Position: "AI Engineer Trainee",
    Company: "Ghabbour (GB Corp)",
    Duration: "October 2026 - Present",
    Description: "Working on voice agents and AI bots to support practical business solutions.",
    Skills: ["Voice Agents", "AI Bots", "Conversational AI"],
    Img: "/exp-ghabour-auto.png"
  },
  {
    id: "etisalat-internship",
    Position: "AI Engineer Internship",
    Company: "E& (Etisalat)",
    Duration: "August 2025 - September 2025",
    Description: "Worked as a data engineer focusing on data cleaning, processing, and extracting valuable insights from telecommunications data.",
    Skills: ["Data Engineering", "Data Cleaning", "Data Analysis", "Insights Generation", "Problem Solving"],
    Img: "/exp-etisalat.png"
  },
  {
    id: "naid-internship",
    Position: "Computer Vision Internship",
    Company: "NAID (National Academy of Information Technology for Persons with Disabilities)",
    Duration: "July - August 2025",
    Description: "Worked on machine learning projects focused on computer vision and data analysis using advanced Python techniques.",
    Skills: ["Machine Learning", "Data Analysis", "Python", "AI"],
    Img: "/exp-naid.png"
  },
  {
    id: "gdg-dotnet-mentor",
    Position: ".NET Mentor",
    Company: "GDG - Nile University",
    Duration: "March 2025 - June 2025",
    Description: "Mentored students in Software Engineering course, providing guidance and support throughout their .NET projects at Google Developer Groups club.",
    Skills: [".NET", "Mentoring", "Software Engineering", "Project Guidance"],
    Img: "/exp-gdg.png"
  },
  {
    id: "python-ta",
    Position: "Junior Python Teaching Assistant",
    Company: "Nile University",
    Duration: "September 2024 - March 2025",
    Description: "Mentoring and assisting students in Python programming, providing guidance on code quality and best practices.",
    Skills: ["Python", "Mentoring", "Teaching", "Code Review"],
    Img: "/exp-nile-university.jpg"
  },
];

const certificatesData = [
  { id: "packt-neo4j", Img: "/cert-packt-neo4j.png" },
  { id: "microsoft-fullstack", Img: "/cert-microsoft-fullstack.jpg" },
  { id: "sprints-microsoft-summer", Img: "/cert-sprints-microsoft-summer.jpg" },
  { id: "etisalat-internship", Img: "/cert-etisalat-internship.jpg" },
  { id: "naid-computer-vision", Img: "/cert-naid-computer-vision.jpg" },
  { id: "gdg-dotnet-mentor", Img: "/cert-gdg-dotnet-mentor.jpg" },
  { id: "junior-ta-appreciation", Img: "/cert-junior-ta-appreciation.jpg" },
  { id: "icpc-honorable-2023", Img: "/cert-icpc-honorable-2023.jpg" },
  { id: "icpc-seventieth-2024", Img: "/cert-icpc-seventieth-2024.jpg" },
  { id: "digitopia-2025", Img: "/cert-digitopia-2025.jpg" },
  { id: "deans-honor-fall-2024", Img: "/cert-deans-honor-fall-2024.jpg" },
  { id: "deans-honor-spring-2025", Img: "/cert-deans-honor-spring-2025.jpg" },
  { id: "deans-honor-fall-2025", Img: "/deans-honour3.jpeg" },
];

const techStacks = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original-wordmark.svg", language: ".NET" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", language: "Spring Boot" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", language: "C#" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", language: "C++" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", language: "Python" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", language: "Java" },
  { icon: "/javascript.svg", language: "JavaScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", language: "Pandas" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", language: "Docker" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", language: "PostgreSQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", language: "MySQL" },
  { icon: "/sql.svg", language: "SQL" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  // Handle hash-based tab switching
  useEffect(() => {
    if (location.hash === '#Portofolio' || location.hash.includes('projects')) {
      setValue(1); // Switch to Projects tab
    }
  }, [location.hash]);


  useEffect(() => {
    setProjects(projectsData);
    setCertificates(certificatesData);
    localStorage.setItem("projects", JSON.stringify(projectsData));
    localStorage.setItem("certificates", JSON.stringify(certificatesData));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    setShowAllCertificates(prev => !prev);
  }, []);

  const projectsToUse = projects.length > 0 ? projects : projectsData;
  const certificatesToUse = certificates.length > 0 ? certificates : certificatesData;
  const displayedCertificates = showAllCertificates ? certificatesToUse : certificatesToUse.slice(0, initialItems);
  const projectSections = [
    {
      key: "grad",
      title: "Grad Project",
      description: "Capstone and final-year work bridging AI, VR, and real-world impact. Ranked first place among 80+ ITCS projects.",
      icon: "🎓",
      accent: "from-amber-500 to-orange-500",
      glow: "rgba(251,191,36,0.15)",
      border: "border-amber-500/30",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    {
      key: "ai",
      title: "AI Projects",
      description: "Machine learning, NLP, and intelligent systems built to solve real problems.",
      icon: "🤖",
      accent: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.15)",
      border: "border-violet-500/30",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    },
    {
      key: "software",
      title: "Software Projects",
      description: "Full-stack applications and engineering projects with clean architecture.",
      icon: "💻",
      accent: "from-cyan-500 to-blue-500",
      glow: "rgba(6,182,212,0.15)",
      border: "border-cyan-500/30",
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    },
  ];

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="px-4 sm:px-[5%] md:px-[10%] w-full max-w-[100vw] sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-6 sm:pb-10 px-2" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portofolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          I developed my AI and web development skills through hands-on projects, internships, and courses.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Experience"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(2)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        <div className="relative">
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {experienceData.map((exp, index) => (
                <div
                  key={exp.id || index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 p-6 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative z-10 space-y-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                          {exp.Position}
                        </h3>
                        <p className="text-purple-400 font-medium text-sm md:text-base mt-1">{exp.Company}</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">{exp.Duration}</p>
                      </div>

                      <p className="text-gray-300/80 text-sm leading-relaxed">
                        {exp.Description}
                      </p>

                      <div className="pt-2">
                        <p className="text-gray-400 text-xs font-semibold mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.Skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 rounded-full text-xs bg-white/5 text-blue-300 border border-blue-500/20 hover:border-blue-500/50 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="space-y-14 w-full">
              {projectSections.map((section, sectionIndex) => {
                const sectionProjects = projectsToUse.filter((project) => project.category === section.key);

                if (sectionProjects.length === 0) return null;

                return (
                  <section key={section.key} className="space-y-6">
                    {/* ── Section Header ── */}
                    <div
                      data-aos="fade-up"
                      data-aos-duration="800"
                      className="relative flex items-center gap-4"
                    >
                      {/* Glowing icon badge */}
                      <div
                        className={`relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border ${section.border} bg-white/5 shadow-lg`}
                        style={{ boxShadow: `0 0 20px ${section.glow}` }}
                      >
                        <span className="text-2xl leading-none select-none">{section.icon}</span>
                      </div>

                      {/* Title + description + count */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3
                            className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${section.accent} bg-clip-text text-transparent leading-tight`}
                          >
                            {section.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${section.badge}`}
                          >
                            {sectionProjects.length} {sectionProjects.length === 1 ? "project" : "projects"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{section.description}</p>
                      </div>

                      {/* Gradient rule */}
                      <div className={`hidden sm:block flex-1 h-px bg-gradient-to-r ${section.accent} opacity-20`} />
                    </div>

                    {/* ── Cards grid ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                      {sectionProjects.map((project, index) => (
                        <div
                          key={project.id || `${section.key}-${index}`}
                          data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                          data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                        >
                          <CardProject
                            Img={project.Img}
                            Title={project.Title}
                            Description={project.Description}
                            Link={project.Link}
                            Github={project.Github}
                            id={project.id}
                            TechStack={project.TechStack}
                            accentGradient={section.accent}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={certificate.id || index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>
            {certificatesToUse.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 w-full">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
