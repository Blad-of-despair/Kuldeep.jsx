import React from 'react';
import {
  SiReact, SiNextdotjs, SiMongodb, SiExpress,
  SiNodedotjs, SiTailwindcss, SiTypescript, SiJavascript, SiPython
} from 'react-icons/si';
import { FaBrain, FaRobot, FaServer } from 'react-icons/fa';
import styles from './TechTicker.module.css';

const techItems = [
  { name: 'React.js', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Python', icon: SiPython },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'REST APIs', icon: FaServer },
  { name: 'Gemini API', icon: FaBrain },
  { name: 'Prompt Engineering', icon: FaRobot },
];

const TechTicker = () => {
  return (
    <div className={styles.tickerSection}>
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack}>
          {techItems.concat(techItems).map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div key={index} className={styles.tickerItem}>
                <Icon className={styles.tickerIcon} />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechTicker;
