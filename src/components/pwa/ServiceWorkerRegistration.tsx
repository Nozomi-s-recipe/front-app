'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service worker registration successful:', registration);
        })
        .catch((err) => {
          console.log('Service worker registration failed:', err);
        });
    }
  }, []);

  return null;
}
