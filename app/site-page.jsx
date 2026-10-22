'use client';

import { useEffect } from 'react';

export default function SitePage({ html }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/script.js';
    script.dataset.siteScript = 'true';
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
