'use strict';

import { Products } from '../models/Products';

const getProductsByIds = async(phoneIds: string[]): Promise<Products[]> => {
  try {
    const products = await Products.findAll({
      where: {
        phone_id: phoneIds,
      },
    });

    return products;
  } catch (error) {
    throw new Error('Failed to get products');
  }
};

export const customListService = {
  getProductsByIds,
};
