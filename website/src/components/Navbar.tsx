'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <a href="/">PORTFOLIO<span>.</span></a>
        </div>
        <div className={styles.links}>
          <a href="/#projects">Projects</a>
          <a href="/#skills">Skills</a>
          <a href="/#about">About</a>
          <a href="/resume">Resume</a>
          <a href="/contact">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
