'use strict';
import { Request as Req, Response as Res } from 'express';

import { productsService } from '../services/products';

const BASE_URL = 'https://backend-phone-store.onrender.com'

const getProducts = async(req: Req, res: Res) => {
  const products = await productsService.getAll();

  const productsWithURL = products.map(product => {
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
  })

  res.send(productsWithURL);
};

export const productsController = {
  getProducts,
};
