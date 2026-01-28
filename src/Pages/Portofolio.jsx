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
    id: "hospital-management-system",
    Title: "Hospital Management System (Django)",
    Description: "Web app that centralizes patients, doctors, appointments, billing, and medical records to reduce paperwork and errors.",
    Link: "https://github.com/RwanAshrafff/Hospital-Management-System",
    Img: "/project-hospital-management.jpg",
    Github: "https://github.com/RwanAshrafff/Hospital-Management-System",
    TechStack: ["Django", "PostgreSQL", "Bootstrap", "REST"],
    Features: [
      "Role-based access for staff and doctors",
      "Appointment scheduling and billing",
      "Medical record tracking and audit trails"
    ],
  },
  {
    id: "time-management-system",
    Title: "Time Management System (Java)",
    Description: "Personal assistant that organizes daily tasks, prioritizes deadlines, and reduces procrastination through reminders and smart scheduling.",
    Link: "https://github.com/RwanAshrafff/Time-Management-Java-Application",
    Img: "/project-time-management.jpg",
    Github: "https://github.com/RwanAshrafff/Time-Management-Java-Application",
    TechStack: ["Java", "JavaFX", "MySQL", "OOP"],
    Features: [
      "Daily and weekly planner with prioritization",
      "Reminders to cut down procrastination",
      "Simple UI focused on clarity"
    ],
  },
  {
    id: "maze-generator-solver",
    Title: "Maze Generator & Solver (Python)",
    Description: "Generates complex mazes and solves them in real time using BFS, DFS, and A* to showcase algorithm efficiency.",
    Link: "https://github.com/RwanAshrafff/Maze-Generator-and-solver-",
    Img: "/project-maze-generator.jpg",
    Github: "https://github.com/RwanAshrafff/Maze-Generator-and-solver-",
    TechStack: ["Python", "BFS", "DFS", "A*"],
    Features: [
      "Multiple generation algorithms",
      "Side-by-side pathfinding visualizer",
      "Performance comparison across strategies"
    ],
  },
  {
    id: "sentiment-analysis",
    Title: "Tweet Sentiment Classification (PySpark vs Python)",
    Description: "ML project comparing sentiment classification models using PySpark (distributed) and scikit-learn (single-node) on real-world tweet datasets.",
    Link: "https://github.com/RwanAshrafff/Sentiment_Analysis-",
    Img: "/project-tweet-sentiment.jpg",
    Github: "https://github.com/RwanAshrafff/Sentiment_Analysis-",
    TechStack: ["PySpark", "Python", "scikit-learn", "Docker", "Machine Learning"],
    Features: [
      "Sentiment classification (positive, negative, neutral)",
      "PySpark MLlib vs Python scikit-learn comparison",
      "Multiple ML algorithms: Logistic Regression, Naive Bayes, SVM, Random Forest"
    ],
  },
];

const experienceData = [
  {
    id: "etisalat-internship",
    Position: "Data Engineer Internship",
    Company: "E& (Etisalat)",
    Duration: "August 2025",
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
  { id: "etisalat-internship", Img: "/cert-etisalat-internship.jpg" },
  { id: "naid-computer-vision", Img: "/cert-naid-computer-vision.jpg" },
  { id: "gdg-dotnet-mentor", Img: "/cert-gdg-dotnet-mentor.jpg" },
  { id: "junior-ta-appreciation", Img: "/cert-junior-ta-appreciation.jpg" },
  { id: "icpc-honorable-2023", Img: "/cert-icpc-honorable-2023.jpg" },
  { id: "icpc-seventieth-2024", Img: "/cert-icpc-seventieth-2024.jpg" },
  { id: "microsoft-fullstack", Img: "/cert-microsoft-fullstack.jpg" },
  { id: "sprints-microsoft-summer", Img: "/cert-sprints-microsoft-summer.jpg" },
  { id: "digitopia-2025", Img: "/cert-digitopia-2025.jpg" },
  { id: "deans-honor-fall-2024", Img: "/cert-deans-honor-fall-2024.jpg" },
  { id: "deans-honor-spring-2025", Img: "/cert-deans-honor-spring-2025.jpg" },
];

const techStacks = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", language: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", language: "Python" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", language: "C++" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", language: "C#" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", language: "Django" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original-wordmark.svg", language: ".NET" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", language: "Pandas" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", language: "Docker" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", language: "PostgreSQL" },
  { icon: "/javascript.svg", language: "JavaScript" },
  { icon: "/reactjs.svg", language: "React" },
  { icon: "/tailwind.svg", language: "Tailwind" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
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
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const projectsToUse = projects.length > 0 ? projects : projectsData;
  const certificatesToUse = certificates.length > 0 ? certificates : certificatesData;
  
  const displayedProjects = showAllProjects ? projectsToUse : projectsToUse.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificatesToUse : certificatesToUse.slice(0, initialItems);

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
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          AI and data-focused work from Nile University, internships, and mentoring—plus the certifications that shaped my path.
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
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projectsToUse.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
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