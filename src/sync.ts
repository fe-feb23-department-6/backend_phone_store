/* eslint-disable no-console */
import { dbInit } from './utils/dbInit';
import { Phones } from './models/Phones';
import { Products } from './models/Products';
import { seedInitialPhones } from './seeders/seedPhones';
import { seedInitialProducts } from './seeders/seedProducts';

export const sync = async() => {
  dbInit();

  await Phones.sync({ force: true });
  await Products.sync({ force: true });
  await seedInitialPhones();
  await seedInitialProducts();
};

sync();
