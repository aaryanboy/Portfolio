import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Animated fire/ember particles */}
      <div className={styles.particles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      {/* Decorative corner runes */}
      <div className={`${styles.cornerRune} ${styles.topLeft}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M10 90 L10 10 L90 10" />
          <circle cx="10" cy="10" r="4" fill="currentColor" />
          <path d="M20 80 L20 20 L80 20" opacity="0.5" />
        </svg>
      </div>
      <div className={`${styles.cornerRune} ${styles.topRight}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M90 90 L90 10 L10 10" />
          <circle cx="90" cy="10" r="4" fill="currentColor" />
          <path d="M80 80 L80 20 L20 20" opacity="0.5" />
        </svg>
      </div>
      <div className={`${styles.cornerRune} ${styles.bottomLeft}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M10 10 L10 90 L90 90" />
          <circle cx="10" cy="90" r="4" fill="currentColor" />
          <path d="M20 20 L20 80 L80 80" opacity="0.5" />
        </svg>
      </div>
      <div className={`${styles.cornerRune} ${styles.bottomRight}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M90 10 L90 90 L10 90" />
          <circle cx="90" cy="90" r="4" fill="currentColor" />
          <path d="M80 20 L80 80 L20 80" opacity="0.5" />
        </svg>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={`${styles.content} animate-fade-in`}>
          <div className={styles.runeDecor}>⚔</div>
          <h2 className={styles.subtitle}>Hi, I am</h2>
          <h1 className={styles.title}>Aryan<span>.</span></h1>
          <p className={styles.description}>
            I build reliable and user-friendly software, turning ideas into digital solutions. 
            I specialize in full-stack development with a focus on modern web technologies.
          </p>
          <div className={styles.actions}>
            <a href="/resume" className={styles.primaryBtn}>
              <span className={styles.btnIcon}>⚔</span>
              View Resume
            </a>
            <a href="/contact" className={styles.secondaryBtn}>
              <span className={styles.btnIcon}>✉</span>
              Contact Me
            </a>
          </div>
        </div>
        <div className={`${styles.imageWrapper} animate-fade-in`}>
          {/* Animated ring effect */}
          <div className={styles.ring}></div>
          <div className={styles.ring2}></div>
          <div className={styles.circle}></div>
          <Image 
            src="/images/profile.jpg" 
            alt="Profile Avatar" 
            width={400} 
            height={400} 
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
