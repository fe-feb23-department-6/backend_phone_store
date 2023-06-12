import { Order } from "sequelize";
import { ParsedQs } from 'qs';

export const filterProducts = (sort: string | ParsedQs | string[] | ParsedQs[]) => {
  let filterOptions: Order = [['year', 'DESC']];

  switch (sort) {
    case 'cheapest':
      filterOptions = [['price', 'ASC']];
      break;

    case 'expensive':
      filterOptions = [['price', 'DESC']];
      break

    case 'newest':
    default:
      filterOptions = [['year', 'DESC']];
  }

  return filterOptions;
}