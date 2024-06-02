export interface PaginatedProductsResponse {
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number | null;
  total: number | null;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  initial_price: number;
  image: string;
  categoryId: string;
}

export interface Response {
  message?: string;
  status: number;
}
