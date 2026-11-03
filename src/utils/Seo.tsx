import React from "react";

interface SeoProps {
  description: string;
  canonical: string;
  ogImage: string;
  ogDescription: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

const Seo: React.FC<SeoProps> = ({
  description,
  canonical,
  ogImage,
  ogDescription,
  ogType = "website",
  jsonLd,
}) => {
  return (
    <>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  );
};

export default Seo;
