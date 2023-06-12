import { Products } from '../models/Products';
import { filterProducts } from '../utils/filterProdacts';
import { getProductsWitUrl } from '../utils/getProductsWitUrl';
import { ParsedQs } from 'qs';

const getProductsWithPagination = async (pageNumber: number, limitNumber: number, sort: string | ParsedQs | string[] | ParsedQs[]) => {
  const offset = (pageNumber - 1) * limitNumber;
  const filterOption = filterProducts(sort);

  try {
    const products = await Products.findAndCountAll({
      order: filterOption,
      offset: offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(products.count / limitNumber);

    const productsWithURL = getProductsWitUrl(products.rows);

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
