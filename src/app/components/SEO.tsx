import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = '9LMNTS Studio — Futuristic Web Experiences & Creative Operating Systems', 
  description = '9LMNTS Studio delivers high-performance, futuristic web applications powered by our proprietary Event OS, Sound Clash OS, and true black cyber aesthetics.', 
  keywords = '9LMNTS, Studio, Cyber Aesthetic, Futuristic Web Design, Event OS, Sound Clash OS, Web Development, Supabase, True Black, Neon Orange',
  canonicalUrl = 'https://9lmntsstudio.com',
  ogImage = '/imports/logo.png' // Default placeholder based on available logo
}) => {
  const fullTitle = title.includes('9LMNTS Studio') ? title : `${title} | 9LMNTS Studio`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content="#050505" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
};
