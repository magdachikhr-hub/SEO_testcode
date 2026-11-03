// import React from "react";
import ImagesJsonLd from "../utils/ImagesJsonLd";
import Seo from "../utils/Seo";
import { useParams } from "react-router-dom";
function Produ() {
  const { id } = useParams();
  console.log(id);
  const ArrImages = [
    {
      id: 1,
      url: "ddd",
      description: "hi",
      inStock: true,
      name: "ფოტო 1",
      image: "https://seo-testcode.vercel.app/images.jpg",
      author: "უცნობი",
      resolution: 1400,
      price: 10,
    },
    {
      id: 2,
      url: "ddd",
      inStock: true,
      description: "hi",
      name: "ფოტო 2",
      image: "https://seo-testcode.vercel.app/York.webp",
      author: "უცნობი",
      resolution: 1400,
      price: 10,
    },
    {
      id: 3,
      inStock: true,
      url: "ddd",
      description: "hi",
      name: "ფოტო 3",
      image: "https://seo-testcode.vercel.app/blackpanther.jpg",
      author: "უცნობი",
      resolution: 1400,
      price: 10,
    },
    {
      id: 4,
      url: "ddd",
      inStock: true,
      description: "hi",
      name: "ფოტო 4",
      image: "https://seo-testcode.vercel.app/flash.jpg",
      author: "უცნობი",
      resolution: 1400,
      price: 10,
    },
  ];
  const found = ArrImages.find((p) => p.id === Number(id));
  console.log(found);
  return (
    <>
      {
        <Seo
          description="My website description"
          canonical="https://example.com/products"
          ogImage="https://example.com/image.jpg"
          ogDescription="Discover our products"
          ogType="product"
          jsonLd={found ? ImagesJsonLd(found) : undefined}
        />
      }
    </>
  );
}

export default Produ;
