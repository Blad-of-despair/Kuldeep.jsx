import {
  SiJavascript, SiTypescript, SiPython,
  SiReact, SiNextdotjs, SiTailwindcss,
  SiMongodb, SiMysql, SiNetlify, SiRailway,
  SiExpress, SiNodedotjs, SiGit, SiGithub, SiPostman
} from 'react-icons/si';
import {
  FaJava, FaHtml5, FaCss3, FaMobileAlt,
  FaServer, FaShieldAlt, FaTerminal, FaDatabase,
  FaBrain, FaRobot, FaNetworkWired, FaExchangeAlt,
  FaLaptopCode, FaTasks, FaProjectDiagram
} from 'react-icons/fa';

export const skillCategories = [
  {
    title: 'Core Languages',
    skills: [
      { name: 'JavaScript (ES6+)', icon: SiJavascript, level: 'Advanced' },
      { name: 'TypeScript', icon: SiTypescript, level: 'Intermediate' },
      { name: 'Python', icon: SiPython, level: 'Intermediate' },
      { name: 'Java', icon: FaJava, level: 'Intermediate' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', icon: SiReact, level: 'Advanced' },
      { name: 'Next.js', icon: SiNextdotjs, level: 'Intermediate' },
      { name: 'HTML5 & CSS3', icon: FaHtml5, level: 'Advanced' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 'Advanced' },
      { name: 'Responsive Design', icon: FaMobileAlt, level: 'Advanced' },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 'Advanced' },
      { name: 'Express.js', icon: SiExpress, level: 'Advanced' },
      { name: 'RESTful APIs', icon: FaServer, level: 'Advanced' },
      { name: 'JWT Authentication', icon: FaShieldAlt, level: 'Advanced' },
      { name: 'Server-Side Logic', icon: FaTerminal, level: 'Advanced' },
      { name: 'Webhooks', icon: FaExchangeAlt, level: 'Intermediate' },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'MongoDB & Atlas', icon: SiMongodb, level: 'Advanced' },
      { name: 'SQL Databases', icon: SiMysql, level: 'Intermediate' },
      { name: 'Netlify Deployment', icon: SiNetlify, level: 'Advanced' },
      { name: 'Railway Cloud', icon: SiRailway, level: 'Intermediate' },
    ],
  },
  {
    title: 'AI & Automation',
    skills: [
      { name: 'Gemini API Integration', icon: FaBrain, level: 'Intermediate' },
      { name: 'Prompt Engineering', icon: FaRobot, level: 'Advanced' },
      { name: 'n8n & Node-RED', icon: FaNetworkWired, level: 'Intermediate' },
      { name: 'Workflow Automation', icon: FaProjectDiagram, level: 'Advanced' },
    ],
  },
  {
    title: 'Developer Tools & Practices',
    skills: [
      { name: 'Git & GitHub', icon: SiGit, level: 'Advanced' },
      { name: 'VS Code', icon: FaLaptopCode, level: 'Advanced' },
      { name: 'Postman', icon: SiPostman, level: 'Advanced' },
      { name: 'Agile & SDLC', icon: FaTasks, level: 'Intermediate' },
      { name: 'Project Management', icon: FaProjectDiagram, level: 'Advanced' },
    ],
  },
];
