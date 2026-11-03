import React from 'react';
import styles from './SectionHeading.module.css';

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className={styles.headingContainer}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.underline}></div>
    </div>
  );
};

export default SectionHeading;
