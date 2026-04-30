'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>PORTFOLIO<span>.</span></Link>
        </div>

        <button 
          className={`${styles.mobileToggle} ${isMenuOpen ? styles.open : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ''}`}>
          <Link href="/#projects" onClick={closeMenu}>Projects</Link>
          <Link href="/#skills" onClick={closeMenu}>Skills</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/resume" onClick={closeMenu}>Resume</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
