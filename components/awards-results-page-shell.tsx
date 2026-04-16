import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type LogoConfig = {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
};

export function AwardsResultsPageShell({
  shellClass,
  namespace,
  title,
  breadcrumbLabel,
  titleImageSrc,
  logo,
  singleIntroColumn = false,
  introContent,
  listingContent,
}: {
  shellClass: string;
  namespace: string;
  title: string;
  breadcrumbLabel: string;
  titleImageSrc: string;
  logo?: LogoConfig;
  singleIntroColumn?: boolean;
  introContent: ReactNode;
  listingContent: ReactNode;
}) {
  return (
    <div className={`app-shell ${shellClass}`}>
      <SiteHeader />
      <main>
        <section className={`${namespace}-page-title`}>
          <div className={`${namespace}-page-title-bg`} aria-hidden="true">
            <Image
              src={titleImageSrc}
              alt=""
              fill
              sizes="100vw"
              className={`${namespace}-page-title-image`}
              priority
            />
          </div>
          <div className="section-pad">
            <div className={`content-wrap ${namespace}-page-title-content`}>
              <h1>{title}</h1>
              <p>
                <Link href="/">Home</Link> / <span>{breadcrumbLabel}</span>
              </p>
            </div>
          </div>
        </section>

        <section className={`${namespace}-intro section-pad`}>
          <div className={`content-wrap ${namespace}-intro-grid${singleIntroColumn ? ' is-single' : ''}`}>
            {logo ? (
              <aside className={`${namespace}-logo-card`}>
                <h2>{logo.heading}</h2>
                <Image
                  src={logo.imageSrc}
                  alt={logo.imageAlt}
                  width={logo.width}
                  height={logo.height}
                  className={`${namespace}-logo`}
                />
              </aside>
            ) : null}

            <article className={`${namespace}-copy`}>{introContent}</article>
          </div>
        </section>

        {listingContent}
      </main>
      <SiteFooter />
    </div>
  );
}
