import { Products } from '../models/Products';

function getAll() {
  return Products.findAll();
}

export const productsService = {
  getAll,
};
