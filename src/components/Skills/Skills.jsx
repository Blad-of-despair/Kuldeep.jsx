import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { skillCategories } from './skillsData';
import styles from './Skills.module.css';

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <SectionHeading
          subtitle="Expertise & Tools"
          title="Technical Skills"
        />

        <div className={styles.skillsGrid}>
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillsList}>
                {category.skills.map(skill => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className={styles.skillItem}>
                      <Icon className={styles.skillIcon} />
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName} title={skill.name}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
