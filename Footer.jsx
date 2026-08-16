import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <span>© 2026 Rishu Raj. Crafted with passion.</span>
          <a href="#top" className={styles.back}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
