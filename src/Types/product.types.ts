export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold: number;
}

export interface ProductsApiResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Product[];
}

export interface ProductDetailsApiResponse {
  data: Product;
}
