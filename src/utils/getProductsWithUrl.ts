import { BASE_URL } from '../constants';
import { Products } from '../models/Products';

export const getProductsWithUrl = (products: Products[]) => {
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
    };
  });

  return productsWithURL;
};
