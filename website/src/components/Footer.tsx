import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        <p>Built with Next.js & TypeScript</p>
      </div>
    </footer>
  );
}
