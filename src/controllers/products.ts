'use strict';
import { Request as Req, Response as Res } from 'express';

// import { productsService } from '../services/products';
import { FindOptions, Order } from 'sequelize';
import { Products } from '../models/Products';

const BASE_URL = 'https://backend-phone-store.onrender.com'

const getProducts = async(req: Req, res: Res) => {
  const { page = '1', limit = '16', sort = 'newest' } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;

  let filterOptions: Order = [['year', 'DESC']];

  if (sort === 'cheapest') {
    filterOptions = [['price', 'ASC']];
  } else if (sort === 'expensive') {
    filterOptions = [['price', 'DESC']];
  } else if (sort === 'newest') {
    filterOptions = [['year', 'DESC']];
  }

  try {
    const products = await Products.findAndCountAll({
      order: filterOptions,
      offset: offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(products.count / limitNumber);

    const productsWithURL = products.rows.map(product => {
      const fullImageUrl = `${BASE_URL}/${product.image}`;
  
      return {
        id: product.id,
        category: product.category,
        phoneId: product.phoneId,
        itemId: product.itemId,
        name: product.name,
        fullPrice: product.fullPrice,
        price: product.price,
        screen: product.screen,
        capacity: product.capacity,
        color: product.color,
        ram: product.ram,
        year: product.year,
        image: fullImageUrl,
      }
    });

    res.json({
      products: productsWithURL,
      currentPage: pageNumber,
      totalPages: totalPages,
    })
  } catch (error) {
    res.status(500);
  }
};

export const productsController = {
  getProducts,
};
