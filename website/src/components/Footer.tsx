'use client';

import styles from './Footer.module.css';
import { Github, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/aaryanboy" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aryan-bajracharya/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <div className={styles.footerText}>
            <p>&copy; {new Date().getFullYear()} Some paths are meant to be walked slowly.</p>
            <p>Inspired heavily by my friend -Rijan Buddhacharya</p>
          </div>

          <button 
            className={styles.backToTop} 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
