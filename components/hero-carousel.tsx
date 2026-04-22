'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HOME_HERO_SLIDES } from '@/lib/home-hero-slides';

const slides = HOME_HERO_SLIDES;

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

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
