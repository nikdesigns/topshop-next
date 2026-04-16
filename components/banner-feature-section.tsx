import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarClock, PlayCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { nominationWindow } from '@/lib/nomination-window';

const HIGHLIGHTS_VIDEO_URL = 'https://player.vimeo.com/video/1075212605';

//test
export function BannerFeatureSection() {
  return (
    <section id="banner1" className="banner-feature-section">
      <div className="banner-feature-grid">
        <article className="banner-video-pane">
          <Image
            src="/assets/images/banners/24.jpg"
            alt="Top Shop Awards 2025 highlights"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="banner-pane-image"
          />

          <div className="banner-video-labels">
            <Badge variant="secondary" className="banner-video-badge">
              2025 Recap
            </Badge>
            <p>MRO Americas Highlights</p>
          </div>

          <Link
            href={HIGHLIGHTS_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="banner-video-play"
            aria-label="Play Top Shop Awards 2025 Highlights"
          >
            <PlayCircle
              size={28}
              className="banner-play-icon"
              aria-hidden="true"
            />
          </Link>

          <div className="banner-video-cta">
            <Image
              src="/assets/images/backgrounds/pattern/1.jpg"
              alt=""
              fill
              sizes="350px"
              className="banner-video-cta-bg"
            />
            <div className="banner-video-cta-content">
              <h4>Top Shop Awards 2025 Highlights</h4>
              <p>
                Watch key moments from the winner celebration and awards
                presentation.
              </p>
              <Link
                href={HIGHLIGHTS_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="banner-video-cta-link"
              >
                Watch recap <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>

        <article id="votebutton" className="banner-story-pane">
          <Image
            src="/assets/images/banners/1.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="banner-pane-image banner-story-image"
          />
          <div className="banner-story-content">
            <Badge variant="secondary" className="banner-story-badge">
              <CalendarClock size={12} aria-hidden="true" />
              {nominationWindow.seasonLabel} Awards Cycle
            </Badge>
            <h3>Why We Created The TOP SHOP Awards</h3>
            <p>
              Aviation is a zero-error industry and flying is the safest means
              of transportation because we make it so. In aviation maintenance,
              perfection is not abstract, it is the daily target.
            </p>
            <Link href="/about-us.html" className="banner-outline-link">
              Know More
            </Link>

            <div className="banner-nomination-card">
              <p className="banner-nomination-icon" aria-hidden="true">
                ↓
              </p>
              <h4>Nominate your favorite shops for a Top Shop Award!</h4>
              <p>
                If you use aviation component repair centers, nominate your
                favorite shops for the category they deserve most and help honor
                the best in the industry.
              </p>
              <p className="banner-hash">#TopShopAwards2026</p>
              {nominationWindow.isOpen ? (
                <Link
                  href="/submit_nomination.html"
                  className="banner-primary-link"
                >
                  Submit Nominations
                </Link>
              ) : (
                <p
                  className="banner-status-chip banner-status-chip--closed"
                  role="status"
                >
                  <XCircle size={16} aria-hidden="true" />
                  Nominations Closed for {nominationWindow.seasonLabel}
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
