'use strict';

import { Order } from 'sequelize';
import { SortType } from '../types/SortType';

export const sortProducts = (sort: SortType) => {
  let sortOptions: Order = [['year', 'DESC']];

  switch (sort) {
    case 'cheapest':
      sortOptions = [['price', 'ASC']];
      break;

    case 'expensive':
      sortOptions = [['price', 'DESC']];
      break;

    case 'abc':
      sortOptions = [['name', 'ASC']];
      break;

    case 'zyx':
      sortOptions = [['name', 'DESC']];
      break;

    case 'newest':
    default:
      sortOptions = [['year', 'DESC']];
  }

  return sortOptions;
};
