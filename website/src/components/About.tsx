import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <h2 className={styles.sectionTitle}>About Me<span>.</span></h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Who I am</h3>
            <p>
              I am a passionate software developer based in Nepal, with a strong foundation in building modern web applications. 
              I love solving complex problems and turning ideas into reality through code.
            </p>
          </div>
          <div className={styles.card}>
            <h3>What I do</h3>
            <p>
              I specialize in frontend and backend development using technologies like React, Next.js, Node.js, and TypeScript. 
              I am always curious to learn new things and improve my skills.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Projects</h3>
            <p>
              Over the years, I have worked on various projects, from small apps to larger scale projects. 
              I focus on performance, accessibility, and user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
