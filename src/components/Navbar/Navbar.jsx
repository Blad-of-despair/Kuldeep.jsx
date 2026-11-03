import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { HiSun, HiMoon, HiMenu, HiX, HiColorSwatch } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ThemePicker from '../ThemePicker/ThemePicker';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header ref={navRef} className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#home" className={styles.logo}>
          kuldeep<span className={styles.logoAccent}>.jsx</span>
        </a>

        {/* Status Badge */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span>Open to Opportunities</span>
        </div>

        {/* Desktop Nav */}
        <nav className={styles.navLinks}>
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${
                activeSection === item.href.substring(1) ? styles.active : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.navActions}>
          <button
            onClick={() => setThemePickerOpen(true)}
            className={styles.themeToggle}
            aria-label="Open Theme Picker"
          >
            <HiColorSwatch />
          </button>

          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HiSun /> : <HiMoon />}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ThemePicker isOpen={themePickerOpen} onClose={() => setThemePickerOpen(false)} />
    </header>
  );
};

export default Navbar;
