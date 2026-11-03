interface ProductJsonLdInput {
  name: string;
  image: string;
  description?: string;
  category?: string;
  author?: string;
  url?: string;
  price: number;
  inStock?: boolean;
}

export default function ImagesJsonLd(product: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    category: product.category || "Photography",

    author: {
      "@type": "Person",
      name: product.author || "უცნობი",
    },

    offers: {
      "@type": "Offer",
      url: product.url,
      priceCurrency: "GEL",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}
