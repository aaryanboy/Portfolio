import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './BlogPost.module.css';
import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QA: Hunting Bugs Workshop — Aryan Bajracharya',
  description: 'A look into the 2-day QA: Hunting Bugs workshop organized by SkillShikshya. January 2026.',
};

export default function QaWorkshopBlog() {
  return (
    <main className={styles.mainWrapper}>
      <Navbar />
      <div className={styles.newspaperBackground}>
        <div className={styles.pageLayout}>
          <article className={styles.newspaperContainer}>
            <div className={styles.topBar}>
              <Link href="/#blog" className={styles.backLink}>
                <ArrowLeft size={14} />
                BACK
              </Link>
              <span className={styles.date}>JANUARY 19, 2026</span>
            </div>

            <div className={styles.thickLine}></div>

            <header className={styles.header}>
              <p className={styles.kicker}>SkillShikshya</p>
              <h1 className={styles.mainHeadline}>QA: Hunting Bugs Workshop</h1>
              <h2 className={styles.subHeadline}>Experience</h2>
            </header>

            <div className={styles.thickLine}></div>

            <div className={styles.byline}>
              <span className={styles.author}>By <strong>Aryan Bajracharya</strong></span>
              <span className={styles.category}>
                <Award size={14} /> Experience
              </span>
            </div>

            <div className={styles.doubleLine}></div>

            {/* Mobile Feature Image */}
            <div className={`${styles.sideImageWrapper} ${styles.mobileOnly}`}>
              <figure className={styles.figureNone}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/qa-workshop/certificate.jpg"
                  alt="QA Workshop Certificate"
                  className={styles.imageRounded}
                />
                <figcaption className={styles.sideFigcaption}>
                  Certificate of participation from the SkillShikshya QA workshop
                </figcaption>
              </figure>
            </div>

            <div className={styles.mainColumn}>
              <p className={styles.firstParagraph}>
                <span className={styles.dropCap}>I</span>n January 2026, I had the opportunity to participate in a free 2-day hands-on Quality Assurance workshop titled <strong>&quot;QA: Hunting Bugs&quot;</strong>, organized by <strong>SkillShikshya</strong>. It was an intensive session that introduced me to the core fundamentals of QA and manual software testing.
              </p>

              <p>
                As someone who spends a lot of time writing code and developing applications, stepping into the mindset of a QA engineer was incredibly eye-opening. Software development is all about building systems up, whereas Quality Assurance teaches you how to systematically analyze, probe, and identify potential weak spots to ensure robustness.
              </p>

              <p>
                Over the course of the two days, the workshop covered the essential basics of the testing lifecycle. We explored how to write clear, actionable test cases, define test scenarios, and document bugs with precise steps to reproduce. Being able to run manual tests on real-world scenarios helped solidify the theoretical concepts we discussed.
              </p>

              <blockquote className={styles.blockquote}>
                &quot;Quality is not an act, it is a habit.&quot;
                <cite>— Aristotle</cite>
              </blockquote>

              <h3 className={styles.sectionTitle}>What I Learned</h3>

              <p>
                The workshop was highly practical. Beyond learning the definitions of smoke testing, regression testing, and boundary value analysis, we were given hands-on exercises to search for bugs in real applications. Understanding how to think like an end-user—and, more importantly, how to think like a user who is trying to break the system—was one of my biggest takeaways.
              </p>

              <p>
                Collaborating with other participants during the bug-hunting exercises made the experience even more engaging. We compared notes, discussed edge cases, and worked together to document our findings clearly.
              </p>

              <div className={styles.imageWrapperRow}>
                <figure className={styles.figureBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/qa-workshop/all.jpg"
                    alt="Workshop Session"
                    className={styles.image}
                  />
                  <figcaption>Collaborating and learning alongside other participants during the classroom session</figcaption>
                </figure>
              </div>

              <p>
                At the end of the workshop, receiving the Certificate of Participation felt rewarding. It marks not only two days of focused learning but also a new perspective that I will bring back to my own development projects. Writing code is only half the battle; ensuring it stands up to real-world usage and edge cases is what makes it a great product.
              </p>
            </div>

            <div className={styles.bottomFooterInfo}>
              <span>SkillShikshya — QA: HUNTING BUGS 2026</span>
            </div>
          </article>

          <aside className={styles.sidePaperContainer}>
            <div className={styles.sideColumn}>
              {/* Feature Image - Desktop */}
              <div className={`${styles.sideImageWrapper} ${styles.desktopOnly}`}>
                <figure className={styles.figureNone}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/qa-workshop/certificate.jpg"
                    alt="QA Workshop Certificate"
                    className={styles.imageRounded}
                  />
                  <figcaption className={styles.sideFigcaption}>
                    Certificate of participation from the SkillShikshya QA workshop
                  </figcaption>
                </figure>
              </div>

              <div className={styles.sideBox}>
                <h5>Key Takeaways</h5>
                <ul>
                  <li>1. Understanding the fundamentals of Quality Assurance (QA)</li>
                  <li>2. Learning the basics of manual testing and bug hunting</li>
                  <li>3. Writing structured test cases and bug reports</li>
                  <li>4. Shifting to an end-user testing mindset</li>
                </ul>
              </div>

              <div className={styles.sideBox}>
                <h5>About the Workshop</h5>
                <p>
                  A 2-day free training session organized by <strong>SkillShikshya</strong> focusing on hands-on manual testing, bug detection, and QA methodologies.
                </p>
              </div>

              <div className={styles.sideBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/qa-workshop/outside.jpg"
                  alt="SkillShikshya Outside Office"
                  className={styles.imageRounded}
                  style={{ marginBottom: '1rem' }}
                />
                <h5>Venue &amp; Atmosphere</h5>
                <p>
                  The session was held at the SkillShikshya training facility, fostering a collaborative learning environment for aspiring developers and QA professionals.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}
