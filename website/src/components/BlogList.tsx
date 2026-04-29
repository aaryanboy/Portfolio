"use client";

import styles from './BlogList.module.css';
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import { ArrowRight } from 'lucide-react';

export default function BlogList({ limit, title = "Blog & Certificates" }: { limit?: number, title?: string }) {
  // Sort blogs to put latest first (assuming latest is at the end of array for now, let's reverse it)
  const sortedBlogs = [...blogs].reverse();
  const displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs;

  return (
    <section className={styles.blogSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title.replace('.', '')}<span>.</span></h2>
        
        <div className={styles.grid}>
          {displayedBlogs.map((blog, idx) => (
            <Link href={`/blog/${blog.id}`} key={blog.id} className={styles.card} style={{ animationDelay: `${idx * 0.1}s`, textDecoration: 'none' }}>
              <div className={styles.content}>
                <div className={styles.tags}>
                  <span className={styles.category}>{blog.category}</span>
                  <span className={styles.date}>{blog.date}</span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                
                <div className={styles.readMore}>
                  Read More
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
