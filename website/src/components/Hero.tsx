import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <div className={`${styles.content} animate-fade-in`}>
          <h2 className={styles.subtitle}>Hi, I am</h2>
          <h1 className={styles.title}>Aryan<span>.</span></h1>
          <p className={styles.description}>
            I build reliable and user-friendly software, turning ideas into digital solutions. 
            I specialize in full-stack development with a focus on modern web technologies.
          </p>
          <div className={styles.actions}>
            <a href="/#projects" className={styles.primaryBtn}>View Projects</a>
            <a href="/contact" className={styles.secondaryBtn}>Contact Me</a>
          </div>
        </div>
        <div className={`${styles.imageWrapper} animate-fade-in`}>
          <div className={styles.circle}></div>
          <Image 
            src="/images/profile.png" 
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
