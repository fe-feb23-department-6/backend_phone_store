import { Products } from '../models/Products';
import { SortType } from '../types/sortType';
import { filterProducts } from '../utils/filterProducts';
import { getProductsWithUrl } from '../utils/getProductsWithUrl';

const getProductsWithPagination = async (
  pageNumber: number, 
  limitNumber: number, 
  sort: SortType
) => {
  const offset = (pageNumber - 1) * limitNumber;
  const filterOption = filterProducts(sort);

  try {
    const products = await Products.findAndCountAll({
      order: filterOption,
      offset: offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(products.count / limitNumber);

    const productsWithURL = getProductsWithUrl(products.rows);

    return {
      products: productsWithURL,
      currentPage: pageNumber,
      totalPages: totalPages,
    };
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

export const productsService = {
  getProductsWithPagination,
};
