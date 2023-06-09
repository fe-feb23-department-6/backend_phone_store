/* eslint-disable max-len */
/* eslint-disable no-console */
import { Phones } from './models/Phones';
import { Products } from './models/Products';
import { dbInit } from './utils/dbInit';
import fs from 'fs';
import path from 'path';

const seedInitialPhones = async() => {
  try {
    const phonesFolderPath = path.join(__dirname, '..', 'public', 'api', 'phones');

    const phoneFiles = fs.readdirSync(phonesFolderPath);

    const phoneDataArray = [];

    for (const phoneFile of phoneFiles) {
      const phoneFilePath = path.join(phonesFolderPath, phoneFile);
      const phoneFileContent = fs.readFileSync(phoneFilePath, 'utf-8');
      const phoneData = JSON.parse(phoneFileContent);

      phoneDataArray.push(phoneData);
    }

    await Phones.bulkCreate(phoneDataArray);
  } catch (error) {
    console.log('Error seeding data:', error);
  }
};

const seedInitialProducts = async() => {
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

const sync = async() => {
  dbInit();

  await Phones.sync({ alter: true });
  await Products.sync({ alter: true });

  await seedInitialPhones();
  await seedInitialProducts();
};

sync();
