/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { Phones } from '../models/Phones';

export const seedInitialPhones = async() => {
  try {
    const phonesFolderPath = path.join(
      __dirname, '..', 'public', 'api', 'phones',
    );

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
