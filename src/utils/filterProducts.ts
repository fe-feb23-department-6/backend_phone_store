import { Op, WhereOptions } from "sequelize";
import { SortType } from "../types/sortType";

export const filterProducts = (query: SortType) => {
  const whereConditions: WhereOptions = {}

  whereConditions.name = { [Op.iLike]: `%${query}%` };

  return whereConditions
}