export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // ID of the parent category
  createdAt: string;
}

export interface SubcategoriesApiResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Subcategory[];
}
