import React from 'react';
import { DEFAULT_SEO } from '../../data/seo';

const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_SEO.defaultImage,
  jsonLd = null,
}) => {
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph tags */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export default SEO;
