export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface CategoriesApiResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Category[];
}
