"use client";

import styles from './BlogList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '@/data/blogs';
import { ArrowRight } from 'lucide-react';

export default function BlogList({ limit, title = "Blog & Certificates", sectionId }: { limit?: number, title?: string, sectionId?: string }) {
  // Sort blogs to put latest first (assuming latest is at the end of array for now, let's reverse it)
  const sortedBlogs = [...blogs].reverse();
  const displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs;

  return (
    <section id={sectionId} className={styles.blogSection}>
      <div className={styles.wallOverlay}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className={styles.sectionTitle}>{title.replace('.', '')}<span>.</span></h2>
        
        <div className={styles.grid}>
          {displayedBlogs.map((blog, idx) => {
            // Deterministically assign a design variation based on index
            const designNumber = (idx % 2) + 1;
            const designClass = styles[`design${designNumber}`] || styles.design1;
            
            return (
            <Link 
              href={`/blog/${blog.id}`} 
              key={blog.id} 
              className={`${styles.card} ${designClass}`} 
              style={{ 
                animationDelay: `${idx * 0.1}s`, 
                textDecoration: 'none',
                /* Random slight rotation for that pinned look */
                transform: `rotate(${Math.sin(idx * 45) * 2}deg)` 
              }}
            >
              {designNumber === 2 ? (
                <>
                  <div className={`${styles.pin} ${styles.pinLeft}`}></div>
                  <div className={`${styles.pin} ${styles.pinRight}`}></div>
                </>
              ) : (
                <div className={styles.pin}></div>
              )}
              
              <div className={styles.posterHeader}>
                <h3>{blog.title}</h3>
                <div className={styles.tags}>
                  <span className={styles.category}>{blog.category}</span>
                  <span className={styles.date}>{blog.date}</span>
                </div>
              </div>

              {blog.image && (
                <div className={styles.posterImageWrapper}>
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className={styles.posterImage} 
                    unoptimized
                  />
                </div>
              )}

              <div className={styles.content}>
                <p>{blog.excerpt}</p>
                
                <div className={styles.readMore}>
                  Read More
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
