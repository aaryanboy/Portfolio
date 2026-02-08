'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './ContactPage.module.css';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  
  // =========================================================================
  // EMAILJS CONFIGURATION
jdn
jej
  // 1. Log in to https://www.emailjs.com/
  // 2. Create an account and add an Email Service (e.g., Gmail)
  // 3. Create an Email Template with variables: {{name}}, {{email}}, {{subject}}, {{message}}
  // 4. Paste your IDs below:
  // =========================================================================
  const SERVICE_ID = "service_vocgy1k";
  const TEMPLATE_ID = "template_xq59w69";
  const PUBLIC_KEY = "Y6oMB_oUuvkqvI5aH";
  // =========================================================================

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'' | 'sending' | 'success' | 'error'>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!SERVICE_ID) {
      alert("Email service not configured.");
      return;
    }

    setStatus('sending');

    // Using sendForm automatically maps input 'name' attributes to template variables
    if (form.current) {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, (error) => {
            console.log(error.text);
            setStatus('error');
        });
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section}>
        <div className={`container ${styles.container}`}>
          <div className={`${styles.header} animate-fade-in`}>
            <h1>Get in Touch<span>.</span></h1>
            <p>I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.</p>
          </div>

          <div className={`${styles.content} animate-fade-in`}>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <h3>Email</h3>
                <p>aaryanboy12@gmail.com</p>
              </div>
              <div className={styles.infoItem}>
                <h3>Location</h3>
                <p>Bhaktapur, Nepal</p>
              </div>
              <div className={styles.infoItem}>
                <h3>Socials</h3>
                <div className={styles.socialLinks}>
                <a href="https://github.com/aaryanboy">GitHub</a>
              <a href="https://www.linkedin.com/in/aryan-bajracharya/">LinkedIn</a>
              <a href="https://www.instagram.com/aaryan_boy12/">Instagram</a>
                </div>
              </div>
            </div>

            <form ref={form} className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your Name"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your Email"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="How can I help?"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your Message..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && (
                <div className={styles.successMessage}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
               {status === 'error' && (
                <div className={styles.successMessage} style={{color: '#ff6b6b'}}>
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
