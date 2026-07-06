"use client";

import styles from './Projects.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Github, ExternalLink, Copy, Check, Maximize2, X } from 'lucide-react';

const projects = [
  {
    title: "Full Stack E-Commerce Platform",
    description: "A modern, full-featured e-commerce platform built with Next.js, MongoDB, and eSewa payment integration. Designed for mini markets with dual-role functionality for owners and customers.",
    details: "Features dual dashboards for shop owners and customers, real-time inventory management, and native eSewa payment integration for local transactions. Built with a focus on performance and a clean, mobile-first shopping experience tailored for small mini-market businesses.",
    image: "/images/ecommerse.png",
    tags: ["Next.js", "MongoDB", "eSewa API"],
    github: "https://github.com/aaryanboy/ecom",
    live: "https://na-pukhu-mini-market.vercel.app/"
  },
  {
    title: "Shopify Store",
    description: "Hoodie store using shopify made as my e-commerce project.. with shopify partner plan.. ",
    details: "A hoodie storefront built on Shopify's partner plan, with custom theme tweaks and Pinterest-driven marketing to test organic traffic and conversion strategies outside a typical paid-ads funnel.",
    image: "/images/shopify.png",
    tags: ["Shopify", "Pinterest"],
    live: "https://aryan-bmc.myshopify.com/",
    password: "GOD"
  },
  {
    title: "TopDown RPG",
    description: "A 2D game made with Kaboom.js and vite config.",
    details: "A top-down 2D RPG prototype exploring game-loop architecture, tile-based collision, and sprite animation using Kaboom.js, bundled with a lightweight Vite configuration for fast iteration.",
    image: "/images/rpg-topdown.png",
    tags: ["React Native", "KaboomJS", "Vite"],
    github: "https://github.com/aaryanboy/jsgame",
    live: "https://jsgame-rpg.vercel.app/"
  },
  {
    title: "FrontEnd Pratice",
    description: "First making figma design and copying it to nextjs project ",
    details: "A design-to-code exercise: the layout was designed first in Figma, then translated pixel-by-pixel into a typed Next.js project to practice component structure, spacing systems, and responsive breakpoints.",
    image: "/images/frontend.png",
    tags: ["NextJs", "Figma", "Typescript"],
    github: "https://github.com/aaryanboy/Mini-Job",
    live: "https://mini-job-frontend.vercel.app/",
    figma: "https://www.figma.com/design/4wd6hBQDvceTUOiU4Qu5Ul/minijobs?node-id=2008-3&t=voGUIYUrOe978CEm-1"
  },
  {
    title: "PunyaJewellery",
    description: "Punya Jewelry Shop - Website Welcome to the Punya Jewelry Shop project! This website was built using React, Next.js, and Tailwind CSS to provide a sleek, responsive, and user-friendly interface for customers to explore beautiful jewelry pieces.",
    details: "A storefront for Punya Jewelry Shop, giving customers a sleek way to browse pieces, read about the collection, and get in touch. Built with React, Next.js, and Tailwind CSS with an emphasis on clean, elegant product presentation.",
    image: "/images/jewelry.png",
    tags: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/aaryanboy/PunyaJewellery",
    live: ""
  }
];

export default function Projects() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    if (activeProject !== null) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  const active = activeProject !== null ? projects[activeProject] : null;

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Selected Projects<span>.</span></h2>
        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={styles.card}
              onClick={() => setActiveProject(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setActiveProject(idx); }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
                <div className={styles.expandBtn} aria-hidden="true">
                  <Maximize2 size={16} />
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.tags}>
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className={styles.footer}>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.figma && (
                    <a
                      href={project.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      Figma
                    </a>
                  )}
                  {project.password && (
                    <button
                      onClick={(e) => handleCopy(e, project.password!, project.title)}
                      className={styles.footerLink}
                    >
                      {copiedId === project.title ? <Check size={16} /> : <Copy size={16} />}
                      {copiedId === project.title ? 'Copied' : 'Password'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className={styles.modalBackdrop} onClick={() => setActiveProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setActiveProject(null)}
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <h3 className={styles.modalTitle}>{active.title}</h3>
            <p className={styles.modalSubtitle}>{active.description}</p>

            <div className={styles.modalImageWrapper}>
              <Image
                src={active.image}
                alt={active.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <p className={styles.modalDetails}>{active.details}</p>

            <div className={styles.tags} style={{ marginBottom: '2rem' }}>
              {active.tags.map((tag, tIdx) => (
                <span key={tIdx}>{tag}</span>
              ))}
            </div>

            <div className={styles.modalActions}>
              {active.live && (
                <a href={active.live} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
              {active.github && (
                <a href={active.github} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                  <Github size={18} />
                  Source Code
                </a>
              )}
              {active.figma && (
                <a href={active.figma} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                  <ExternalLink size={18} />
                  Figma
                </a>
              )}
              {active.password && (
                <button
                  onClick={(e) => handleCopy(e, active.password!, active.title)}
                  className={styles.liveBtn}
                >
                  {copiedId === active.title ? <Check size={18} /> : <Copy size={18} />}
                  {copiedId === active.title ? 'Copied' : 'Password'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}