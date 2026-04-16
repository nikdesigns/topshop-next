'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HOME_HERO_SLIDES } from '@/lib/home-hero-slides';

const slides = HOME_HERO_SLIDES;

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide];
  const currentSlideIsExternal = currentSlide.href.startsWith('https://');

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  function showPrevSlide() {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function showNextSlide() {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }

  return (
    <section
      className="hero-carousel hero-carousel-rich"
      aria-label="Top Shop highlights"
    >
      <div className="hero-viewport hero-viewport-rich">
        {slides.map((slide, index) => (
          <Link
            key={slide.title}
            href={slide.href}
            className={
              index === activeSlide ? 'hero-slide active' : 'hero-slide'
            }
            target={slide.href.startsWith('https://') ? '_blank' : undefined}
            rel={
              slide.href.startsWith('https://')
                ? 'noopener noreferrer'
                : undefined
            }
            aria-hidden={index !== activeSlide}
            tabIndex={index === activeSlide ? 0 : -1}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              priority={index === 0}
              className="hero-image"
            />
          </Link>
        ))}

        <div className="hero-rich-overlay" aria-hidden="true" />

        <div className="hero-content hero-content-rich">
          <Badge variant="secondary" className="hero-rich-kicker">
            <Trophy size={12} aria-hidden="true" />
            <span>Top Shop Awards</span>
          </Badge>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.34, ease: 'easeOut' }}
              className="hero-copy-block"
            >
              <h1>{currentSlide.title}</h1>
              <p className="hero-subtitle">{currentSlide.subtitle}</p>
              <div className="hero-actions hero-actions-rich">
                <Button asChild variant="secondary">
                  <Link
                    href={currentSlide.href}
                    target={currentSlideIsExternal ? '_blank' : undefined}
                    rel={
                      currentSlideIsExternal ? 'noopener noreferrer' : undefined
                    }
                  >
                    Learn more
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href={currentSlide.href}
                    target={currentSlideIsExternal ? '_blank' : undefined}
                    rel={
                      currentSlideIsExternal ? 'noopener noreferrer' : undefined
                    }
                  >
                    {currentSlide.ctaLabel}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-arrow-controls" aria-label="Slide controls">
          <Button
            variant="outline"
            size="icon"
            onClick={showPrevSlide}
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={showNextSlide}
            aria-label="Next slide"
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div
        className="hero-controls hero-controls-rich"
        aria-label="Slide controls"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={index === activeSlide ? 'dot active' : 'dot'}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show ${slide.title}`}
            aria-pressed={index === activeSlide}
          />
        ))}
      </div>
    </section>
  );
}
