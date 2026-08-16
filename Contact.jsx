import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    ;[leftRef, rightRef].forEach((r, i) => {
      gsap.fromTo(r.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: r.current, start: 'top 88%' }
        }
      )
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); e.target.reset() }, 3000)
  }

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.grid}>
          <div ref={leftRef} className={styles.left}>
            <p className="eyebrow">Get in Touch</p>
            <h2 className={styles.heading}>Let's Create Something Extraordinary</h2>
            <p className={styles.sub}>Have a project in mind? I'd love to hear about it. Let's build something amazing together.</p>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Email</span>
                <a href="mailto:rishurebel979@gmail.com">rishurebel979@gmail.com</a>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Location</span>
                <span>Ludhiana, Punjab, India</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Availability</span>
                <span className={styles.avail}><span className={styles.dot} />Open to opportunities</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Socials</span>
                <div className={styles.socials}>
                  <a href="https://github.com/rishu-o2" target="_blank" rel="noopener">GitHub</a>
                  <a href="https://www.linkedin.com/in/rishu-raj-723718315/" target="_blank" rel="noopener">LinkedIn</a>
                  <a href="https://www.instagram.com/latewithrishu/" target="_blank" rel="noopener">Instagram</a>
                </div>
              </div>
            </div>
          </div>
          <div ref={rightRef} className={styles.right}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea rows={5} placeholder="Tell me about your project..." required />
              </div>
              <button type="submit" className={sent ? styles.sent : styles.submit}>
                {sent ? 'Message Sent ✓' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
