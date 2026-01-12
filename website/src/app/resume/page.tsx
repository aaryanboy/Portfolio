'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './ResumePage.module.css';

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section}>
        <div className={`container ${styles.container}`}>
          <div className={`${styles.header} animate-fade-in`}>
            <h1>My Resume<span>.</span></h1>
            <p>You can view my resume below or download it for offline viewing.</p>
            <div className={styles.actions}>
              <a href="/resume.pdf" download className={styles.downloadBtn}>
                Download CV (PDF)
              </a>
            </div>
          </div>

          <div className={`${styles.resumeBox} animate-fade-in`}>
            {mounted ? (
              <iframe 
                src="/resume.pdf#toolbar=0" 
                className={styles.viewer}
                title="Resume PDF"
              >
                <p>Your browser does not support iframes. 
                  <a href="/resume.pdf">Click here to view the PDF.</a>
                </p>
              </iframe>
            ) : (
              <div className={styles.loading}>Loading Viewer...</div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
