import { Order } from "sequelize";
import { ParsedQs } from 'qs';

export const filterProducts = (sort: string | ParsedQs | string[] | ParsedQs[]) => {
  let filterOptions: Order = [['year', 'DESC']];

  if (sort === 'cheapest') {
    filterOptions = [['price', 'ASC']];
  } else if (sort === 'expensive') {
    filterOptions = [['price', 'DESC']];
  } else if (sort === 'newest') {
    filterOptions = [['year', 'DESC']];
  }

  return filterOptions;
}