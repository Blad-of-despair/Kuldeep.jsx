import React, { useEffect, useRef } from 'react';
import { FaGraduationCap, FaCertificate, FaAward } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Education.module.css';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.education-item',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 80%',
          },
        }
      );
    }, educationRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className={styles.education} ref={educationRef}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Education & Certifications</h2>
          <p className={styles.sectionSubtitle}>
            Academic background and professional certifications in software development.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={`${styles.timelineItem} education-item`}>
            <div className={styles.iconWrapper}>
              <FaGraduationCap className={styles.icon} />
            </div>
            <div className={styles.itemContent}>
              <span className={styles.badge}>2023 - 2026</span>
              <h3 className={styles.itemTitle}>Bachelor of Computer Applications (BCA)</h3>
              <p className={styles.institution}>School of Management Sciences, Lucknow University</p>
              <div className={styles.details}>
                <span className={styles.grade}>CGPA: 7.84 / 10.0</span>
                <span className={styles.status}>Graduated July 2026</span>
              </div>
            </div>
          </div>

          <div className={`${styles.timelineItem} education-item`}>
            <div className={styles.iconWrapper}>
              <FaGraduationCap className={styles.icon} />
            </div>
            <div className={styles.itemContent}>
              <span className={styles.badge}>Class 12</span>
              <h3 className={styles.itemTitle}>Class 12 (Higher Secondary)</h3>
              <p className={styles.institution}>Swarnim Public School, Lucknow</p>
              <div className={styles.details}>
                <span className={styles.grade}>Percentage: 74%</span>
                <span className={styles.status}>CBSE Board | PCM Stream</span>
              </div>
            </div>
          </div>

          <div className={`${styles.timelineItem} education-item`}>
            <div className={styles.iconWrapper}>
              <FaCertificate className={styles.icon} />
            </div>
            <div className={styles.itemContent}>
              <span className={styles.badge}>Professional Certification</span>
              <h3 className={styles.itemTitle}>Java Full Stack Development</h3>
              <p className={styles.institution}>Infosys Springboard</p>
              <p className={styles.description}>
                Comprehensive training in Java backend development, Spring Framework, and full-stack architecture.
              </p>
            </div>
          </div>

          <div className={`${styles.timelineItem} education-item`}>
            <div className={styles.iconWrapper}>
              <FaAward className={styles.icon} />
            </div>
            <div className={styles.itemContent}>
              <span className={styles.badge}>Professional Certification</span>
              <h3 className={styles.itemTitle}>AI & Automation Tools</h3>
              <p className={styles.institution}>Multiple Platforms</p>
              <ul className={styles.certList}>
                <li>Gemini API Integration & Prompt Engineering</li>
                <li>n8n Workflow Automation</li>
                <li>Node-RED for IoT & Backend Automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
