import React from 'react';
import { FaFolder, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <div>
        <div className={styles.cardHeader}>
          <FaFolder className={styles.folderIcon} />
          <div className={styles.projectLinks}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="GitHub Repository"
            >
              <FaGithub />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Live Demo"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>

        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
      </div>

      <div className={styles.techStackList}>
        {project.techStack.map(tech => (
          <span key={tech} className={styles.techTag}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
