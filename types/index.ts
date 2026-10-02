export type Category = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  image: string;
  gallery: string[];
  categoryId: string;
  seller: string;
  sellerRating: number;
  delivery: string;
  stock: number;
  colors: { name: string; value: string }[];
  specs: { label: string; value: string }[];
  badge?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  color: string;
};
