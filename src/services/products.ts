/* eslint-disable no-console */
'use strict';
import { sequelize } from '../server';
import { literal } from 'sequelize';
import { Products } from '../models/Products';
import { Phones } from '../models/Phones';
import { SortType } from '../types/SortType';
import { PaginationResult } from '../types/PaginationResult';
import { sortProducts } from '../utils/sortProducts';
import { filterProducts } from '../utils/filterProducts';

const getProductsWithPagination = async(
  pageNumber: number,
  limitNumber: number,
  sort: SortType,
  query?: SortType,
  category?: string,
): Promise<PaginationResult> => {
  const offset = (pageNumber - 1) * limitNumber;
  const sortOptions = sortProducts(sort);

  const whereConditions = filterProducts(query, category) || {};

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
      totalCount: products.count,
    };
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

const getNewProducts = async(): Promise<Products[]> => {
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

const getHotProducts = async(): Promise<Products[]> => {
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

const getOnePhoneById = async(phoneId: string) => {
  try {
    const product = await Phones.findOne({
      where: {
        id: phoneId,
      },
    });

    return product;
  } catch (error) {
    throw new Error('Failed to get product');
  }
};

const getNamespaceListByProductsId = async(
  namespaceId: string,
): Promise<Phones[]> => {
  try {
    const products = await Phones.findAll({
      where: {
        namespace_id: namespaceId,
      },
    });

    return products;
  } catch (error) {
    throw new Error('Failed to get product');
  }
};

const getOneProductById = async(productId: string) => {
  console.log('GET-ONE-ID productId', productId);

  try {
    const product = await Products.findOne({
      where: {
        id: productId,
      },
    });

    console.log('GET-ONE-ID product', product);

    return product;
  } catch (error) {
    throw new Error('Failed to get product');
  }
};

const getRecommendedProducts = async(): Promise<Products[]> => {
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

export const productsService = {
  getProductsWithPagination,
  getNewProducts,
  getHotProducts,
  getNamespaceListByProductsId,
  getRecommendedProducts,
  getOneProductById,
  getOnePhoneById,
};
