import React, { useState, useEffect, useRef } from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
          },
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section id="contact" className={styles.contact} ref={contactRef}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} contact-anim`}>Get In Touch</h2>
          <p className={`${styles.sectionSubtitle} contact-anim`}>
            I'm open to opportunities, collaborations, and interesting conversations. Let's connect!
          </p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={`${styles.infoCard} contact-anim`}>
              <div className={styles.infoIcon}>
                <HiMail />
              </div>
              <h3 className={styles.infoTitle}>Email</h3>
              <a href="mailto:kuldeep.maurya@example.com" className={styles.infoText}>
                kuldeep.maurya@example.com
              </a>
            </div>

            <div className={`${styles.infoCard} contact-anim`}>
              <div className={styles.infoIcon}>
                <HiPhone />
              </div>
              <h3 className={styles.infoTitle}>Phone</h3>
              <a href="tel:+919235073798" className={styles.infoText}>+91 9235073798</a>
            </div>

            <div className={`${styles.infoCard} contact-anim`}>
              <div className={styles.infoIcon}>
                <HiLocationMarker />
              </div>
              <h3 className={styles.infoTitle}>Location</h3>
              <p className={styles.infoText}>Lucknow, Uttar Pradesh, India</p>
            </div>

            <div className={`${styles.socialLinks} contact-anim`}>
              <a href="https://github.com/Blad-of-despair" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/kuldeep-maurya" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaLinkedin />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`${styles.contactForm} contact-anim`}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className={styles.textarea}
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className={styles.statusSuccess}>Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className={styles.statusError}>Failed to send. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
