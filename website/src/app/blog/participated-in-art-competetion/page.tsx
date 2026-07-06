import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './BlogPost.module.css';
import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Participated in Art Competition — Aryan Bajracharya',
  description: 'A fun experience participating in an art competition organized by USAid. October 2022.',
};

export default function ArtCompetitionBlog() {
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
              <span className={styles.date}>OCTOBER, 2022</span>
            </div>

            <div className={styles.thickLine}></div>

            <header className={styles.header}>
              <p className={styles.kicker}>USAid</p>
              <h1 className={styles.mainHeadline}>Participated in Art Competition</h1>
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
                  src="/images/participated-in-art-competetion/certificate.jpg"
                  alt="Art Competition Certificate"
                  className={styles.imageRounded}
                />
                <figcaption className={styles.sideFigcaption}>
                  Certificate of participation from the USAid art competition
                </figcaption>
              </figure>
            </div>

            <div className={styles.mainColumn}>
              <p className={styles.firstParagraph}>
                <span className={styles.dropCap}>I</span>t was a fun event — one of those spontaneous experiences that you don&apos;t quite plan for but end up remembering long afterward. The competition was organized under the USAid initiative, bringing together young creative minds from different backgrounds.
              </p>

              <p>
                Walking into the venue, there was already a buzz of energy in the room. Participants were setting up their canvases and materials, each one bringing a unique perspective to the theme of the day. I had prepared a piece beforehand, but being in the room surrounded by other artists pushed me to think more deeply about what I wanted to express.
              </p>

              <p>
                The event gave me a chance to step outside of my usual world of code and screens, and engage with art in a more intentional way. Seeing how other participants interpreted the same theme so differently was genuinely eye-opening — a reminder that creativity doesn&apos;t have a single correct form.
              </p>

              <blockquote className={styles.blockquote}>
                &quot;Art is not what you see, but what you make others see.&quot;
                <cite>— Edgar Degas</cite>
              </blockquote>

              <h3 className={styles.sectionTitle}>What I Took Away</h3>

              <p>
                Beyond the competition itself, the event was a fantastic networking opportunity. I connected with people from diverse disciplines — students, teachers, and artists who were all passionate about creative expression. The conversations that happened between brushstrokes were often more meaningful than the art itself.
              </p>

              <p>
                Receiving the certificate at the end felt like validation not just for the artwork, but for showing up and engaging with something new. It&apos;s easy to stay within comfort zones, especially when you&apos;re deep in a technical field. Events like this serve as a reminder that growth happens when you step beyond the familiar.
              </p>

              <div className={styles.imageWrapperRow}>
                <figure className={styles.figureBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/participated-in-art-competetion/certificate.jpg"
                    alt="Art Competition Certificate"
                    className={styles.image}
                  />
                  <figcaption>Official certificate of participation — USAid Art Competition, October 2022</figcaption>
                </figure>
              </div>
            </div>

            <div className={styles.bottomFooterInfo}>
              <span>USAid — ART COMPETITION 2022</span>
            </div>
          </article>

          <aside className={styles.sidePaperContainer}>
            <div className={styles.sideColumn}>
              {/* Feature Image - Desktop */}
              <div className={`${styles.sideImageWrapper} ${styles.desktopOnly}`}>
                <figure className={styles.figureNone}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/participated-in-art-competetion/certificate.jpg"
                    alt="Art Competition Certificate"
                    className={styles.imageRounded}
                  />
                  <figcaption className={styles.sideFigcaption}>
                    Certificate of participation from the USAid art competition
                  </figcaption>
                </figure>
              </div>

              <div className={styles.sideBox}>
                <h5>Key Takeaways</h5>
                <ul>
                  <li>1. Stepping outside the comfort zone of technical work</li>
                  <li>2. Engaging with creative expression intentionally</li>
                  <li>3. Networking with diverse creative minds</li>
                  <li>4. Finding meaning in showing up and participating</li>
                </ul>
              </div>

              <div className={styles.sideBox}>
                <h5>About the Event</h5>
                <p>
                  Organized by <strong>USAid</strong>, this art competition brought together young participants to showcase creative expression through visual art. The event was held in October 2022.
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
