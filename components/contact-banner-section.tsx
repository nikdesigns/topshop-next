'use client';

import Image from 'next/image';
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { type FormEvent, useState } from 'react';
import {
  buildMailtoLink,
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_LABEL,
  CONTACT_TEL_HREF,
  CONTACT_WEBSITE_URL,
} from '@/lib/contact';

const testimonials = [
  {
    quote: 'The best decision that we have ever made.',
    name: 'Joe & Jackie Ferrer',
    company: 'Airway Aerospace, Inc.',
    image: '/assets/images/testimonials/thumbs/1.png',
  },
  {
    quote: 'The145 has really boosted our business to the next level.',
    name: 'Ann Justiz',
    company: 'Safe Fuel Systems',
    image: '/assets/images/testimonials/thumbs/2.png',
  },
];

const supportSignals = [
  'Award timeline and eligibility guidance',
  'Nomination and voting process support',
  'Sponsorship and partner opportunities',
];

type SubmitState = 'idle' | 'submitting' | 'submitted';

export function ContactBannerSection() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitState('submitting');

    const formData = new FormData(form);
    const messageLines = [
      'Top Shop Awards Contact Request',
      '',
      `Full Name: ${String(formData.get('fullName') ?? '').trim()}`,
      `Email: ${String(formData.get('email') ?? '').trim()}`,
      `Phone: ${String(formData.get('phone') ?? '').trim()}`,
      `Company Name: ${String(formData.get('companyName') ?? '').trim()}`,
      `Inquiry Type: ${String(formData.get('inquiryType') ?? '').trim()}`,
      '',
      'Details:',
      String(formData.get('details') ?? '').trim(),
    ];

    const mailtoLink = buildMailtoLink({
      subject: 'Top Shop Awards Contact Request',
      body: messageLines.join('\n'),
    });

    window.location.href = mailtoLink;
    setSubmitState('submitted');
  };

  return (
    <>
      <section id="banner2" className="contact-banner-section section-pad">
        <div className="contact-banner-bg" aria-hidden="true">
          <Image
            src="/assets/images/banners/3.jpg"
            alt=""
            fill
            sizes="100vw"
            className="contact-banner-bg-image"
          />
        </div>

        <div className="content-wrap contact-banner-grid">
          <form
            className="contact-form-panel"
            action={CONTACT_MAILTO_HREF}
            method="post"
            encType="text/plain"
            onSubmit={handleSubmit}
            onInput={() => {
              if (submitState === 'submitted') {
                setSubmitState('idle');
              }
            }}
          >
            <header className="contact-form-header">
              <p className="contact-form-eyebrow">
                <Sparkles size={12} aria-hidden="true" />
                Contact Team
              </p>
              <h3>Have questions?</h3>
              <p>Share details and our team will respond with clear next steps.</p>
            </header>

            <div className="contact-trust-row">
              <p className="contact-trust-chip">
                <ShieldCheck size={14} aria-hidden="true" />
                Secure inquiry form
              </p>
              <p className="contact-trust-chip">
                <Clock3 size={14} aria-hidden="true" />
                Typical response in 24 hours
              </p>
            </div>

            <div className="contact-form-grid">
              <label>
                <span>Full Name</span>
                <input type="text" name="fullName" placeholder="Your full name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@company.com" required />
              </label>
              <label>
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="+1 (___) ___-____" required />
              </label>
              <label>
                <span>Company Name</span>
                <input type="text" name="companyName" placeholder="Your company" required />
              </label>
              <label className="full">
                <span>Inquiry Type</span>
                <select name="inquiryType" defaultValue="" required>
                  <option value="" disabled>
                    Select inquiry type
                  </option>
                  <option value="nomination">Nomination Support</option>
                  <option value="voting">Voting Support</option>
                  <option value="partnership">Partnership / Sponsorship</option>
                  <option value="general">General Question</option>
                </select>
              </label>
              <label className="full">
                <span>Details</span>
                <textarea
                  name="details"
                  rows={5}
                  placeholder="Tell us what you need and any deadlines."
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={submitState === 'submitting'}
            >
              <Send size={14} aria-hidden="true" />
              {submitState === 'submitting'
                ? 'Sending...'
                : submitState === 'submitted'
                  ? 'Submitted'
                  : 'Send Message'}
            </button>

            <p className="contact-submit-note" role="status">
              {submitState === 'submitted'
                ? `Your email client should now open with a pre-filled message to ${CONTACT_EMAIL}.`
                : `Static export mode: this sends through your local email client to ${CONTACT_EMAIL}.`}
            </p>
          </form>

          <aside className="contact-testimonials">
            <p className="contact-testimonials-label">Testimonials</p>
            <div className="contact-testimonial-list">
              {testimonials.map((item) => (
                <article key={item.name} className="contact-testimonial-card">
                  <p className="contact-testimonial-quote">{item.quote}</p>
                  <div className="contact-testimonial-meta">
                    <Image src={item.image} alt={item.name} width={56} height={56} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.company}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="contact-signal-list" aria-label="Support focus areas">
              {supportSignals.map((signal) => (
                <p key={signal} className="contact-signal-item">
                  <span aria-hidden="true">•</span>
                  {signal}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="contactInfo" className="contact-info-strip section-pad">
        <div className="content-wrap contact-info-inner">
          <p className="contact-info-note">We will get back to you within 24 hours.</p>
          <div className="contact-info-boxes">
            <a href={CONTACT_TEL_HREF} className="contact-info-box">
              <span className="contact-info-box-icon" aria-hidden="true">
                <Phone size={16} />
              </span>
              <span className="contact-info-box-label">Call Us</span>
              <strong>{CONTACT_PHONE_LABEL}</strong>
            </a>
            <a href={CONTACT_MAILTO_HREF} className="contact-info-box">
              <span className="contact-info-box-icon" aria-hidden="true">
                <Mail size={16} />
              </span>
              <span className="contact-info-box-label">Email Us</span>
              <strong>{CONTACT_EMAIL}</strong>
            </a>
            <a href={CONTACT_WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="contact-info-box">
              <span className="contact-info-box-icon" aria-hidden="true">
                <MapPin size={16} />
              </span>
              <span className="contact-info-box-label">Head Office</span>
              <strong>Park City, Utah, USA</strong>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
