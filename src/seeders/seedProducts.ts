/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { Products } from '../models/Products';

export const seedInitialProducts = async() => {
  try {
    const productsFilePath = path.join(
      __dirname,
      '..',
      'public',
      'api',
      'phones.json',
    );

    const productsFileContent = fs.readFileSync(productsFilePath, 'utf-8');
    const productsData = JSON.parse(productsFileContent);

    await Products.bulkCreate(productsData);
  } catch (error) {
    console.log('Error seeding data:', error);
  }
};
