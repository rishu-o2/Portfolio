import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xdkzdryg', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
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
                <input
                  type="text" placeholder="Your name" required
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email" placeholder="your@email.com" required
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                  rows={5} placeholder="Tell me about your project..." required
                  value={message} onChange={e => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={status === 'success' ? styles.sent : styles.submit}
                style={status === 'error' ? { borderColor: '#ff6b6b', color: '#ff6b6b' } : {}}
              >
                {status === 'sending' && 'Sending…'}
                {status === 'success' && 'Message Sent ✓'}
                {status === 'error'   && 'Something went wrong. Try again.'}
                {status === 'idle'    && 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
