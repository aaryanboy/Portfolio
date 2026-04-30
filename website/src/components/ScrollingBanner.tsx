import styles from './ScrollingBanner.module.css';

interface ScrollingBannerProps {
  topFixed?: boolean;
  mirror?: boolean;
  reversed?: boolean;
}

export default function ScrollingBanner({ topFixed = false, mirror = false, reversed = false }: ScrollingBannerProps) {
  const text = "SOFTWARE ENGINEER ✦ FULL STACK DEVELOPER ✦ CREATIVE THINKER ✦ PROBLEM SOLVER ✦ UI/UX ENTHUSIAST ✦ DIGITAL CREATOR ✦ ";
  
  const containerClass = mirror ? styles.topFixedMirror : topFixed ? styles.topFixed : '';

  return (
    <div className={`${styles.bannerContainer} ${containerClass} ${reversed ? styles.reversed : ''}`}>
      <div className={styles.bannerContent}>
        <div className={styles.scrollText}>{text.repeat(3)}</div>
        <div className={styles.scrollText}>{text.repeat(3)}</div>
      </div>
    </div>
  );
}
