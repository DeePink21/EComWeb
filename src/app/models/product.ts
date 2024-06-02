// interface model product

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  product_images: ProductImage[];
  url: string;
  thumbnail: string;
  category_id: number;
}

export interface ProductImage {
  id: number;
  image_url: string;
}