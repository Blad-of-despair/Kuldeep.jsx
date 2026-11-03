import React, { useEffect, useRef } from 'react';
import { HiDownload, HiArrowRight, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import gsap from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.glowOrb}></div>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={`${styles.badgeWrapper} hero-anim`}>
            <FaCode />
            <span>MERN Stack & AI Developer</span>
          </div>

          <h1 className={`${styles.title} hero-anim`}>
            Hi, I'm <span className={styles.gradientText}>Kuldeep Maurya</span>
          </h1>

          <p className={`${styles.subtitle} hero-anim`}>
            Building high-performance web applications with modern architecture & AI integration.
          </p>

          <p className={`${styles.description} hero-anim`}>
            BCA Graduate (SGPA 8.71/10) specializing in full-stack engineering, scalable APIs,
            and intelligent agentic systems. Passionate about crafting exceptional digital experiences.
          </p>

          <div className={`${styles.location} hero-anim`}>
            <HiLocationMarker className={styles.locationIcon} />
            <span>Lucknow, Uttar Pradesh, India</span>
          </div>

          <div className={`${styles.actionButtons} hero-anim`}>
            <a href="#projects" className={styles.primaryBtn}>
              Explore Projects <HiArrowRight />
            </a>
            <a href="/Kuldeep MauryaCV.docx" download className={styles.secondaryBtn}>
              Download Resume <HiDownload />
            </a>
          </div>

          <div className={`${styles.socialLinks} hero-anim`}>
            <a href="https://github.com/Blad-of-despair" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/kuldeep-maurya" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={`${styles.heroVisual} hero-anim`}>
          <div className={styles.codeCard}>
            <div className={styles.codeHeader}>
              <span className={`${styles.dot} ${styles.dotRed}`}></span>
              <span className={`${styles.dot} ${styles.dotYellow}`}></span>
              <span className={`${styles.dot} ${styles.dotGreen}`}></span>
            </div>
            <div className={styles.codeBody}>
              <p><span className={styles.keyword}>const</span> developer = &#123;</p>
              <p style={{ paddingLeft: '1.5rem' }}><span className={styles.property}>name</span>: <span className={styles.string}>"Kuldeep Maurya"</span>,</p>
              <p style={{ paddingLeft: '1.5rem' }}><span className={styles.property}>stack</span>: [<span className={styles.string}>"React"</span>, <span className={styles.string}>"Node.js"</span>, <span className={styles.string}>"MongoDB"</span>],</p>
              <p style={{ paddingLeft: '1.5rem' }}><span className={styles.property}>passion</span>: <span className={styles.string}>"Building AI & Web Apps"</span>,</p>
              <p style={{ paddingLeft: '1.5rem' }}><span className={styles.property}>status</span>: <span className={styles.string}>"Open to Opportunities"</span></p>
              <p>&#125;;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
