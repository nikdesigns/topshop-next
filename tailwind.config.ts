import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      typography: {
        topshop: {
          css: {
            maxWidth: 'none',
            color: 'var(--color-body-muted)',
            lineHeight: '1.47',
            letterSpacing: '-0.374px',
            p: {
              marginTop: '0',
              marginBottom: '0.875rem',
              fontSize: '17px',
              lineHeight: '1.47',
              letterSpacing: '-0.374px',
              color: 'var(--color-body-muted)',
            },
            strong: {
              color: 'var(--color-text-dark)',
              fontWeight: '600',
            },
            a: {
              color: '#0066cc',
              textDecoration: 'none',
              fontWeight: '500',
            },
            'a:hover': {
              textDecoration: 'underline',
            },
            ul: {
              marginTop: '0.5rem',
              marginBottom: '1rem',
              paddingLeft: '1.2rem',
            },
            ol: {
              marginTop: '0.5rem',
              marginBottom: '1rem',
              paddingLeft: '1.2rem',
            },
            li: {
              marginTop: '0.15rem',
              marginBottom: '0.15rem',
            },
            h3: {
              color: 'var(--color-text-dark)',
              fontSize: '21px',
              lineHeight: '1.19',
              letterSpacing: '0.231px',
              fontWeight: '600',
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            blockquote: {
              color: 'var(--color-text-dark)',
              borderLeftColor: 'rgba(0, 113, 227, 0.32)',
              fontWeight: '500',
              fontStyle: 'normal',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
