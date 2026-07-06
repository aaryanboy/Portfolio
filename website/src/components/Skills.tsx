"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './Skills.module.css';
import Image from 'next/image';

interface Skill {
  name: string;
  logo: string;
  level: number; // 1-5
  description: string;
  projects: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Arcana",
    icon: "⚔️",
    skills: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: 5,
        description: "Building dynamic, reactive user interfaces with virtual DOM and component architecture.",
        projects: "Portfolio, CMS Dashboard, E-commerce UI"
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        level: 5,
        description: "Server-side rendering, static site generation, and full-stack React framework.",
        projects: "Next.js 16 Portfolio & CMS"
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        level: 5,
        description: "Strict type safety and compile-time error prevention for robust applications.",
        projects: "Full-Stack Portfolio, Web APIs"
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        level: 4,
        description: "Rapidly styling layouts with utility-first CSS for streamlined UI design.",
        projects: "Contact Pages, Responsive Layouts"
      },
      {
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        level: 4,
        description: "Responsive grid systems and prebuilt component foundations.",
        projects: "Legacy Dashboards"
      }
    ]
  },
  {
    title: "Backend Alchemy",
    icon: "🛡️",
    skills: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: 4,
        description: "Asynchronous JavaScript runtime for fast, event-driven server applications.",
        projects: "Dynamic JSON CMS Endpoints"
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: 4,
        description: "Flexible NoSQL document database for scalable data storage.",
        projects: "CMS Database, Project Inventories"
      },
      {
        name: "Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        level: 4,
        description: "Lightweight REST API endpoints and middleware pipelines.",
        projects: "CMS Backend Services"
      },
      {
        name: "Supabase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
        level: 4,
        description: "Instant database, authentication, and real-time server synchronization.",
        projects: "Realtime Chat Systems, Auth portals"
      }
    ]
  },
  {
    title: "Tools & Masteries",
    icon: "⚡",
    skills: [
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        level: 5,
        description: "Version control, branching strategies, and collaborative workflows.",
        projects: "All Code Repositories"
      },
      {
        name: "VS Code",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        level: 5,
        description: "Primary development environment with custom extensions and shortcuts.",
        projects: "All Project Development"
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        level: 4,
        description: "Visual wireframes and high-fidelity prototype design.",
        projects: "Web UI Design Mockups"
      },
      {
        name: "Vercel",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        level: 5,
        description: "Global deployment platform with serverless edge functions.",
        projects: "React Apps, Static Websites"
      }
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeCategory = skillCategories[activeTab];

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.bgPattern}></div>

      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.sectionTitle}>
            Skill Masteries<span className={styles.accent}>.</span>
          </h2>
          <p className={styles.subtitle}>Technologies &amp; tools I work with</p>
        </div>

        {/* Category Tabs */}
        <div className={`${styles.tabContainer} ${isVisible ? styles.visible : ''}`}>
          {skillCategories.map((category, idx) => (
            <button
              key={idx}
              className={`${styles.tab} ${activeTab === idx ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className={styles.tabIcon}>{category.icon}</span>
              <span className={styles.tabLabel}>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={styles.skillGrid} key={activeTab}>
          {activeCategory.skills.map((skill, sIdx) => (
            <div
              key={skill.name}
              className={`${styles.skillCard} ${isVisible ? styles.cardVisible : ''}`}
              style={{ animationDelay: `${sIdx * 0.06}s` }}
              title={skill.projects}
            >
              <div className={styles.logoWrapper}>
                <Image
                  src={skill.logo}
                  alt={skill.name}
                  width={30}
                  height={30}
                  unoptimized
                />
              </div>

              <div className={styles.cardInfo}>
                <h4 className={styles.skillName}>{skill.name}</h4>
                <p className={styles.description}>{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}