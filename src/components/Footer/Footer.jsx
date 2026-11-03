import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiMail, HiArrowUp } from 'react-icons/hi';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerBrand}>
          <h3>Kuldeep Maurya</h3>
          <p>Full-Stack MERN Developer crafting robust and scalable web applications.</p>
        </div>

        <div className={styles.footerSocial}>
          <a
            href="https://www.linkedin.com/in/kuldeep-maurya-38030b2aa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a href="mailto:mauryakuldeep9180@gmail.com" aria-label="Email">
            <HiMail />
          </a>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Kuldeep Maurya. All rights reserved.</p>
          <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to top">
            <HiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
