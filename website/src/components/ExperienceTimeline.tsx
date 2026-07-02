"use client";

import styles from './ExperienceTimeline.module.css';
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import { ArrowRight, Shield, Award, Calendar, ChevronRight } from 'lucide-react';

export default function ExperienceTimeline() {
  // Sort blogs to put latest first (reverse of original data array)
  const sortedEvents = [...blogs].reverse();

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
            {sortedEvents.map((event, idx) => {
              // Determine if event is Experience or Certificate
              const isCert = event.category.toLowerCase().includes('cert');
              const isExp = event.category.toLowerCase().includes('experi'); // handles "Experience" and "Experiance"

              let badgeText = "JOURNAL LOG";
              let badgeIcon = <ChevronRight size={14} />;
              let badgeClass = styles.logBadge;

              if (isCert) {
                badgeText = "ACHIEVEMENT: CERTIFICATE";
                badgeIcon = <Award size={14} />;
                badgeClass = styles.certBadge;
              } else if (isExp) {
                badgeText = "QUEST: EXPERIENCE";
                badgeIcon = <Shield size={14} />;
                badgeClass = styles.expBadge;
              }

              // Alternating alignment classes on desktop
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
                    href={`/blog/${event.id}`} 
                    className={styles.questCard}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className={styles.cardHeader}>
                      <span className={`${styles.questBadge} ${badgeClass}`}>
                        {badgeIcon}
                        {badgeText}
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
