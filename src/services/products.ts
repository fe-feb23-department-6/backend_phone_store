'use strict';
import { Products } from '../models/Products';
import { SortType } from '../types/sortType';
import { sortProducts } from '../utils/sortProducts';
// import { getProductsWithUrl } from '../utils/getProductsWithUrl';
import { filterProducts } from '../utils/filterProducts';
// import { sequelize } from '../server';
import { literal } from 'sequelize';
// import sequelize from 'sequelize/types/sequelize';

const getProductsWithPagination = async(
  pageNumber: number,
  limitNumber: number,
  sort: SortType,
  query?: SortType,
) => {
  const offset = (pageNumber - 1) * limitNumber;
  const sortOptions = sortProducts(sort);

  const whereConditions = query ? filterProducts(query) : {};

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

export const productsService = {
  getProductsWithPagination,
  getNewProducts,
  getHotProducts,
};
