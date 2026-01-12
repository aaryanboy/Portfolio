import styles from './Projects.module.css';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Full Stack E-Commerce Platform",
    description: "A modern, full-featured e-commerce platform built with Next.js, MongoDB, and eSewa payment integration. Designed for mini markets with dual-role functionality for owners and customers.",
    image: "/images/project1.png",
    tags: ["Next.js", "MongoDB", "eSewa API"],
    github: "https://github.com/aaryanboy/ecom",
    live: "https://na-pukhu-mini-market.vercel.app/"
  },
  {
    title: "PunyaJewellery",
    description: "Punya Jewelry Shop - Website Welcome to the Punya Jewelry Shop project! This website was built using React, Next.js, and Tailwind CSS to provide a sleek, responsive, and user-friendly interface for customers to explore beautiful jewelry pieces. The website allows users to view products, contact the store, and learn more about the jewelry collection.",
    image: "/images/project3.png",
    tags: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/aaryanboy/PunyaJewellery",
    live: ""
  },
  {
    title: "TopDown RPG",
    description: "A 2D game made with Kaboom.js and vite config.",
    image: "/images/project2.png",
    tags: ["React Native", "KaboomJS", "Vite"],
    github: "https://github.com/aaryanboy/jsgame",
    live: "" 
  }
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Selected Projects<span>.</span></h2>
        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.btnGroup}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                        <Github size={18} />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                        <ExternalLink size={18} />
                        Website
                      </a>
                    )}
                  </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
