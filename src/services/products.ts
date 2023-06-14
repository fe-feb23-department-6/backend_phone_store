'use strict';
import { Products } from '../models/Products';
import { SortType } from '../types/sortType';
import { sortProducts } from '../utils/sortProducts';
import { filterProducts } from '../utils/filterProducts';
import { literal } from 'sequelize';
import { Phones } from '../models/Phones';
import { sequelize } from '../server';

const getProductsWithPagination = async(
  pageNumber: number,
  limitNumber: number,
  sort: SortType,
  query?: SortType,
  category?: string,
) => {
  const offset = (pageNumber - 1) * limitNumber;
  const sortOptions = sortProducts(sort);

  const whereConditions = query ? filterProducts(query) : {};

  if (category) {
    whereConditions.category = category;
  }

  try {
    const products = await Products.findAndCountAll({
      where: whereConditions,
      order: sortOptions,
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(products.count / limitNumber);

    return {
      products: products.rows,
      currentPage: pageNumber,
      totalPages: totalPages,
    };
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

const getNewProducts = async() => {
  const sortOptions = sortProducts('newest');

  try {
    const newProducts = await Products.findAll({
      order: sortOptions,
      limit: 10,
    });

    return newProducts;
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

const getHotProducts = async() => {
  try {
    const hotPriceProducts = await Products.findAll({
      order: literal('(full_price - price) DESC'),
      limit: 10,
    });

    return hotPriceProducts;
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

const getProductById = async(phoneId: string) => {
  try {
    const product = await Phones.findByPk(phoneId);

    return product;
  } catch (error) {
    throw new Error('Failed to get product');
  }
};

const getRecommendedProducts = async() => {
  try {
    const recommendedProducts = await Products.findAll({
      order: sequelize?.random(),
      limit: 10,
    });

    return recommendedProducts;
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

// const getProductsByArrayID = async(ids: string[]) => {
//   try {
//     const addedProducts = await Products.findAll({
//       where: {
//         phone_id: {
//           [Op.in]: ids,
//         },
//       },
//     });

//     return addedProducts;
//   } catch (error) {
//     throw new Error('Failed to get products');
//   }
// };

export const productsService = {
  getProductsWithPagination,
  getNewProducts,
  getHotProducts,
  getProductById,
  getRecommendedProducts,
  // getProductsByArrayID,
};
