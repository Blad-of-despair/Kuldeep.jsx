import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from './projectsData';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'Blad-of-despair';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`;
const CACHE_KEY = `gh_projects_${GITHUB_USERNAME}`;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const MAX_PROJECTS = 5;

// Known non-project repos to skip
const EXCLUDE_NAMES = new Set(['Blad-of-despair', 'Hello-world', 'domian_expanded']);

// Local fallback if the GitHub API is unreachable
const toFallbackCard = (p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  language: p.techStack?.[0] || '—',
  stars: 0,
  url: p.githubUrl,
});

const FALLBACK_PROJECTS = projectsData
  .filter((p) => p.githubUrl)
  .slice(0, MAX_PROJECTS)
  .map(toFallbackCard);

// Tasteful humanization of repo names: "focus-guard" -> "Focus Guard"
const prettifyName = (name) =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const transformRepo = (repo) => ({
  id: String(repo.id),
  title: prettifyName(repo.name),
  description: repo.description || 'No description provided yet.',
  language: repo.language || '—',
  stars: repo.stargazers_count || 0,
  updatedAt: repo.pushed_at ? repo.pushed_at.slice(0, 10) : null,
  url: repo.html_url,
});

const pickTopProjects = (repos) =>
  repos
    .filter((r) => !r.fork && !EXCLUDE_NAMES.has(r.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, MAX_PROJECTS)
    .map(transformRepo);

// Module-level in-flight promise so StrictMode's double effect fires a single request
let inFlightFetch = null;

const fetchGitHubProjects = async () => {
  if (!inFlightFetch) {
    inFlightFetch = (async () => {
      // Try the session cache first
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { at, projects } = JSON.parse(cached);
          if (projects?.length && Date.now() - at < CACHE_TTL) return projects;
        }
      } catch {
        /* cache unavailable — ignore */
      }

      const res = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      const repos = await res.json();
      if (!Array.isArray(repos)) throw new Error('Unexpected GitHub payload');

      const projects = pickTopProjects(repos);
      if (!projects.length) throw new Error('No projects found');

      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), projects }));
      } catch {
        /* ignore */
      }
      return projects;
    })().finally(() => {
      inFlightFetch = null;
    });
  }
  return inFlightFetch;
};

const Projects = () => {
  const projectsRef = useRef(null);
  const [projects, setProjects] = useState(null); // null = loading
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-anim',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, projectsRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchGitHubProjects()
      .then((list) => {
        if (!cancelled) setProjects(list);
      })
      .catch((err) => {
        console.warn('Falling back to local project data:', err.message);
        if (!cancelled) setProjects(FALLBACK_PROJECTS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const goTo = (next, dir) => {
    if (!projects?.length) return;
    setDirection(dir);
    setIndex((next + projects.length) % projects.length);
  };

  const current = projects?.[index] || null;
  const total = projects?.length || 0;

  return (
    <section id="projects" className={styles.projects} ref={projectsRef}>
      <div className="container">
        <div className={`${styles.sectionHeader} projects-anim`}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionSubtitle}>
            Pulled live from my GitHub — here are my latest 5 builds.
          </p>
        </div>

        {!current ? (
          <div className={`${styles.carousel} projects-anim`}>
            <div className={`${styles.card} ${styles.skeleton}`}>
              <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
              <div className={styles.skeletonBlock}>
                <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonTextShort}`} />
              </div>
              <div className={styles.skeletonFooter}>
                <div className={`${styles.skeletonLine} ${styles.skeletonChip}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonBtn}`} />
              </div>
            </div>
          </div>
        ) : (
          <div className={`${styles.carousel} projects-anim`}>
            <div className={styles.viewport}>
              <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={() => goTo(index - 1, -1)}
                aria-label="Previous project"
              >
                <HiChevronLeft />
              </button>

              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.article
                  key={current.id}
                  className={styles.card}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 90, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -90, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex}>
                      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoLink}
                      aria-label={`Open ${current.title} on GitHub`}
                    >
                      <FaGithub />
                    </a>
                  </div>

                  <h3 className={styles.projectTitle}>{current.title}</h3>
                  <p className={styles.projectDescription}>{current.description}</p>

                  <div className={styles.metaRow}>
                    <span className={styles.languageChip}>
                      <span className={styles.languageDot} />
                      {current.language}
                    </span>
                    {current.stars > 0 && (
                      <span className={styles.starsChip}>
                        <FaStar /> {current.stars}
                      </span>
                    )}
                    {current.updatedAt && (
                      <span className={styles.updatedLabel}>Updated {current.updatedAt}</span>
                    )}
                  </div>

                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.seeMore}
                  >
                    See more <FaExternalLinkAlt />
                  </a>
                </motion.article>
              </AnimatePresence>

              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={() => goTo(index + 1, 1)}
                aria-label="Next project"
              >
                <HiChevronRight />
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Project slides">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  aria-label={`Go to project ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAll}
            >
              View all on GitHub <FaExternalLinkAlt />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
