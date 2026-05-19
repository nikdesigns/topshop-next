'use client';

import { Toaster } from 'sonner';

export function SiteToaster() {
  return (
    <Toaster
      position="top-right"
      closeButton
      richColors
      expand
      visibleToasts={4}
      toastOptions={{
        style: {
          borderRadius: '12px',
          border: '1px solid rgba(11, 39, 83, 0.2)',
          background: '#ffffff',
          color: '#10203a',
          boxShadow: '0 14px 30px rgba(11, 39, 83, 0.15)',
        },
      }}
    />
  );
}

