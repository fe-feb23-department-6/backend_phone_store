import { Order } from "sequelize";
import { SortType } from "../types/sortType";

export const filterProducts = (sort: SortType) => {
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