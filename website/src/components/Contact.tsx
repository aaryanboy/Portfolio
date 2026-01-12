import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Get in Touch<span>.</span></h2>
          <p className={styles.description}>
            Have a project in mind or just want to say hi? Feel free to reach out. 
            I am always open to new opportunities and collaborations.
          </p>
          <div className={styles.links}>
            <a href="mailto:aaryanboy12@gmail.com" className={styles.email}>aaryanboy12@gmail.com</a>
            <div className={styles.socials}>
              <a href="https://github.com/aaryanboy">GitHub</a>
              <a href="https://www.linkedin.com/in/aryan-bajracharya/">LinkedIn</a>
              <a href="https://www.instagram.com/aaryan_boy12/">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
