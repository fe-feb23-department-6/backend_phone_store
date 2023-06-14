import { Op, WhereOptions } from 'sequelize';
import { SortType } from '../types/SortType';

export const filterProducts = (query?: SortType, category?: string) => {
  const whereConditions: WhereOptions = {};

  if (query) {
    whereConditions.name = { [Op.iLike]: `%${query}%` };
  }

  if (category) {
    whereConditions.category = category;
  }

  return whereConditions;
};
