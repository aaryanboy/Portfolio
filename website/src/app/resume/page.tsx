'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './ResumePage.module.css';

// react-pdf relies on browser-only APIs (DOMMatrix, canvas, etc.) that
// don't exist in Node, so this must never run during server rendering.
const PdfViewer = dynamic(() => import('./Pdfviewer'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading Viewer...</div>,
});

export default function ResumePage() {
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
            <PdfViewer />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}