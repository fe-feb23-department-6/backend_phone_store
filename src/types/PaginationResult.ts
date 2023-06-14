import { Products } from '../models/Products';

export type PaginationResult = {
  products: Products[];
  currentPage: number;
  totalPages: number;
};
