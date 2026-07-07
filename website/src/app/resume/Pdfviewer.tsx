'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './ResumePage.module.css';

// Worker file copied to /public/pdf.worker.min.mjs — must match the
// installed pdfjs-dist version (see package.json).
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [loadError, setLoadError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {loadError ? (
        <div className={styles.loading}>
          Couldn&apos;t load preview.{' '}
          <a href="/resume.pdf" className={styles.downloadBtn} style={{ marginLeft: 8 }}>
            Open PDF
          </a>
        </div>
      ) : containerWidth > 0 ? (
        <Document
          file="/resume.pdf"
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={() => setLoadError(true)}
          loading={<div className={styles.loading}>Loading Viewer...</div>}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      ) : (
        <div className={styles.loading}>Loading Viewer...</div>
      )}
    </div>
  );
}