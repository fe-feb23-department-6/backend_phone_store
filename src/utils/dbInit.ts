/* eslint-disable no-console */
import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';
require('dotenv').config();

const URI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}`
+ `@${process.env.PGHOST}/${process.env.PGDATABASE}`;

export const dbInit = () => {
  try {
    const db = new Sequelize(
      URI,
      {
        models,
        dialectOptions: {
          ssl: true,
        },
      },
    );

    console.log('DB successfully initialized');

    return db;
  } catch (error) {
    console.log('DB failed to connect', error);
  }
};
