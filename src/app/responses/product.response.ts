// interface product list response

import { Product } from '../models/product';

export interface ProductListResponse {
  totalPages: number;
  totalElements: number;
  products: Product[];
}