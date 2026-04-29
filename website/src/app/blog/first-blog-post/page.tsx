import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './BlogPost.module.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FirstBlogPost() {
  return (
    <main>
      <Navbar />
      <article className={styles.article}>
        <div className={`container ${styles.container}`}>
          <Link href="/about" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to About
          </Link>
          
          <header className={styles.header}>
            <div className={styles.tags}>
                <span className={styles.category}>Experience</span>
                <span className={styles.date}>March 2026</span>
            </div>
            <h1 className={styles.title}>My Journey in Web Development<span>.</span></h1>
          </header>
          
          <div className={styles.content}>
            <p>Web development started as a hobby and turned into a passion. From creating simple visual layouts to building full-stack platforms with robust architectures using Next.js and MongoDB. It has been a wild ride of continuous learning, and exploring new libraries, tools, and best practices. Sharing what I know has always been a goal of mine, and this blog is the start of documenting my daily progress.</p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
