"use client";

import styles from './ExperienceTimeline.module.css';
import Link from 'next/link';
import { ArrowRight, Shield, Calendar } from 'lucide-react';

// Static experience/event data — add new entries here directly
const events = [
  {
    id: 'participated-in-art-competetion',
    title: 'Participated in Art Competition',
    date: 'October, 2022',
    category: 'Experience',
    subHeadline: 'USAid Initiative',
    excerpt: 'A fun and memorable experience stepping into creative expression through an art competition organized under the USAid initiative.',
    href: '/blog/participated-in-art-competetion',
  },
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
        <p className={styles.subtitle}>Chronicle of Journeys & Achievements</p>

        <div className={styles.timelineContainer}>
          {/* Vertical Runic Timeline Line */}
          <div className={styles.timelineLine}>
            <div className={styles.lineGlow}></div>
          </div>

          <div className={styles.eventsList}>
            {events.map((event, idx) => {
              const alignmentClass = idx % 2 === 0 ? styles.leftAlign : styles.rightAlign;

              return (
                <div key={event.id} className={`${styles.timelineNode} ${alignmentClass}`}>
                  {/* Central Node Indicator */}
                  <div className={styles.nodeIndicator}>
                    <div className={styles.nodeDot}></div>
                    <div className={styles.nodeRipple}></div>
                  </div>

                  {/* Quest Card */}
                  <Link
                    href={event.href}
                    className={styles.questCard}
                    style={{ animationDelay: `${idx * 0.15}s` }}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
