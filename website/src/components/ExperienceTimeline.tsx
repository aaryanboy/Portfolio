"use client";

import styles from './ExperienceTimeline.module.css';
import Link from 'next/link';
import { ArrowRight, Shield, Calendar } from 'lucide-react';

interface ExperienceEvent {
  id: string;            // unique slug, no spaces (used as React key)
  title: string;         // main heading on the card
  date: string;          // display date, e.g. "October, 2022"
  category: string;      // currently just "Experience"
  subHeadline?: string;  // optional smaller line under the title
  excerpt: string;       // 1-2 sentence summary shown on the card
  href: string;          // link to the full blog post / detail page
}

// -----------------------------------------------------------------------
// To add a new "quest" card, copy the TEMPLATE object below into this
// array and fill in your details. Order in the array = order shown on
// the page (left-to-right, top-to-bottom, grid-style).
//
// TEMPLATE — copy this, rename the id, and edit the fields:
//
//   {
//     id: 'your-unique-id-here',
//     title: 'Your Event Title',
//     date: 'Month, Year',
//     category: 'Experience',
//     subHeadline: 'Optional short subtitle', // delete if not needed
//     excerpt: 'One or two sentences describing what happened and why it mattered.',
//     href: '/blog/your-unique-id-here',
//   },
// -----------------------------------------------------------------------
const events: ExperienceEvent[] = [
  {
    id: 'particidfgpated-in-art-competetion',
    title: 'Participated in Art Competition',
    date: 'October, 2022',
    category: 'Experience',
    subHeadline: 'USAid Initiative',
    excerpt: 'A fun and memorable experience stepping into creative expression through an art competition organized under the USAid initiative.',
    href: '/blog/participated-in-art-competetion',
  },
  

  // Add your next quest card below this line 👇

];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className={styles.timelineSection}>
      <div className={styles.bgGlow}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>⚔️</span>
          Quest Journal
          <span className={styles.accent}>.</span>
        </h2>
        <p className={styles.subtitle}>Chronicle of Journeys &amp; Achievements</p>

        <div className={styles.eventsGrid}>
          {events.map((event, idx) => (
            <Link
              key={event.id}
              href={event.href}
              className={styles.questCard}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.questBadge} ${styles.expBadge}`}>
                  <Shield size={14} />
                  QUEST: EXPERIENCE
                </span>
                <span className={styles.questDate}>
                  <Calendar size={12} style={{ marginRight: '4px' }} />
                  {event.date}
                </span>
              </div>

              <h3 className={styles.questTitle}>{event.title}</h3>

              {event.subHeadline && (
                <h4 className={styles.questSubtitle}>{event.subHeadline}</h4>
              )}

              <p className={styles.questExcerpt}>{event.excerpt}</p>

              <div className={styles.questFooter}>
                <span className={styles.readChronicle}>
                  Read Chronicles
                  <ArrowRight size={14} className={styles.arrowIcon} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}