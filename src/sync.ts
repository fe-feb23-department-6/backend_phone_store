/* eslint-disable no-console */
import { dbInit } from './utils/dbInit';
import { Phones } from './models/Phones';
import { Products } from './models/Products';
import { Cart } from './models/Cart';
import { Favorites } from './models/Favorites';
import { OrderDetails } from './models/OrderDetails';
import { Orders } from './models/Orders';
import { Users } from './models/Users';
import { seedInitialPhones } from './seeders/seedPhones';
import { seedInitialProducts } from './seeders/seedProducts';

export const sync = async() => {
  try {
    dbInit();
    await Phones.sync({ alter: true });
    await Products.sync({ alter: true });
    await Users.sync({ alter: true });
    await Orders.sync({ alter: true });
    await OrderDetails.sync({ alter: true });
    await Cart.sync({ alter: true });
    await Favorites.sync({ alter: true });
    await seedInitialPhones();
    await seedInitialProducts();
  } catch (error) {
    console.log(error);
  }
};

sync();
