import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Some paths are meant to be walked slowly.</p>
        <p>Inspired heavily by my friend -Rijan Buddhacharya</p>
      </div>
    </footer>
  );
}
