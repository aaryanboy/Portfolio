import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './BlogPost.module.css';
import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';

export default function QACertificatePost() {
  return (
    <main className={styles.mainWrapper}>
      <Navbar />
      <div className={styles.newspaperBackground}>
        <div className={styles.pageLayout}>
          <article className={styles.newspaperContainer}>
          <div className={styles.topBar}>
            <Link href="/about" className={styles.backLink}>
              <ArrowLeft size={14} />
              BACK
            </Link>
            <span className={styles.date}>APRIL 2026</span>
          </div>

          <div className={styles.thickLine}></div>

          <header className={styles.header}>
            <p className={styles.kicker}>SKILL SHIKSHYA</p>
            <h1 className={styles.mainHeadline}>2-Day Q/A Workshop</h1>
            <h2 className={styles.subHeadline}>CERTIFICATE & EXPERIENCE</h2>
          </header>

          <div className={styles.thickLine}></div>
          
          <div className={styles.byline}>
            <span className={styles.author}>By <strong>Aryan Bajracharya</strong></span>
            <span className={styles.category}>
              <Award size={14} /> CERTIFICATE EARNED
            </span>
          </div>

          <div className={styles.doubleLine}></div>

          {/* Mobile Feature Image - Only visible on small screens */}
          <div className={`${styles.sideImageWrapper} ${styles.mobileOnly}`}>
            <figure className={styles.figureNone}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/qa-workshop/certificate.jpg" alt="QA Certificate" className={styles.imageRounded} />
              <figcaption className={styles.sideFigcaption}>Official certificate of completion, issued by Skill Shikshya</figcaption>
            </figure>
          </div>

            <div className={styles.mainColumn}>
              <p className={styles.firstParagraph}>
                <span className={styles.dropCap}>W</span>e attended a two-day Quality Assurance
                workshop, and on the first day, I was a bit nervous. I went with my friend, and we didn&apos;t 
                even bring our laptops because we thought it wouldn&apos;t be necessary. When we arrived, 
                everyone was already seated, and we were the last two to arrive.
              </p>
              <p>
                The room was completely full, and it was silent as we walked in. We didn&apos;t even have bags, 
                so it felt really awkward. We sat at the back corner, and since everyone else had laptops, 
                we felt out of place. We also talked to a friend who had an internship there, and he borrowed 
                his laptop. That turned out to be a lifesaver. On that first day, we learned the fundamentals 
                of Quality Assurance — what it is, how it&apos;s done, which platforms need it, which companies 
                use it, and the career prospects in QA. We wrapped up the day on a high note, asking questions 
                and getting answers.
              </p>

              <blockquote className={styles.blockquote}>
                &quot;Understanding QA in theory is one thing — seeing it applied to real-world projects is another entirely.&quot;
              </blockquote>

              <p>
                The next day, we brought our laptops, and we were among the first to arrive. Since no one was 
                there yet, we took the initiative to set up the chairs as on the previous day. We made close 
                connections on the first day, so we made many friends. We exchanged Instagram handles, and 
                planned to keep in touch. On the second day, we had already downloaded Postman the night before. 
                The instructor taught us how to use it, why it&apos;s so useful, and gave us a hands-on crash course.
              </p>

              <h3 className={styles.sectionTitle}>The Power of Postman</h3>
              <p>
                The second day shifted from theory to practical application. The spotlight was on API testing — an 
                indispensable tool for QA engineers. We tested routes with exceptions, applications, common error 
                scenarios, all of it. We used Postman as our primary tool, allowing testers to simulate requests, 
                examine responses, and ensure that data flows smoothly and accurately.
              </p>

              <div className={styles.imageWrapperRow}>
                <figure className={styles.figureBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/qa-workshop/all.jpg" alt="The workshop atmosphere" className={styles.image} />
                  <figcaption>The workshop atmosphere</figcaption>
                </figure>
                <figure className={styles.figureBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/qa-workshop/me.jpg" alt="Hands-on Postman session" className={styles.image} />
                  <figcaption>Hands-on Postman learning session</figcaption>
                </figure>
              </div>

              <p>
                Understanding QA in theory is one thing, but communicating it within real-world projects is another. 
                The workshop emphasized how critical QA is in strong competitive development. Even a single minor 
                defect in production can lead to cascading failures, proving that quality assurance is not an obstacle, 
                but the bedrock of sustainable software engineering.
              </p>

              <p>
                The immersive aspect of learning on-site proved to be uniquely engaging. Collaborative exercises 
                and direct feedback kept us focused and comprehension significantly above standard online courses. 
                I sincerely and profoundly thank Sumana Ghimire and the entire Skill Shikshya team for their 
                unwavering support and guidance throughout the event. Armed with these new frameworks and skills, 
                I look forward to rigorously applying these principles in my upcoming projects, elevating the 
                caliber of my work one test case at a time.
              </p>
            </div>
          
            <div className={styles.bottomFooterInfo}>
               <span>SKILL SHIKSHYA — QA WORKSHOP 2026</span>
            </div>
          </article>

          <aside className={styles.sidePaperContainer}>
            <div className={styles.sideColumn}>
              {/* Feature Image moved to sidebar - Only visible on large screens */}
              <div className={`${styles.sideImageWrapper} ${styles.desktopOnly}`}>
                <figure className={styles.figureNone}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/qa-workshop/certificate.jpg" alt="QA Certificate" className={styles.imageRounded} />
                  <figcaption className={styles.sideFigcaption}>Official certificate of completion, issued by Skill Shikshya</figcaption>
                </figure>
              </div>

              <div className={styles.sideBox}>
                <h5>KEY TAKEAWAYS</h5>
                <ul>
                  <li>1. Fundamentals of Quality Assurance</li>
                  <li>2. Developing a proper QA testing mindset</li>
                  <li>3. Practical usage of Postman for API testing</li>
                  <li>4. Understanding how QA is used in production projects</li>
                </ul>
              </div>

              <div className={styles.sideBox}>
                <h5>ABOUT THE EVENT</h5>
                <p>
                  Organized by <strong>Skill Shikshya</strong>, this two-day immersive workshop offered students hands-on 
                  experience in software QA and API testing with Postman.
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