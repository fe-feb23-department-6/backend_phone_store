import path from 'path';

function getOneImage(imagePath: string) {
  const absoluteImagePath = path.join(__dirname, '../../public', imagePath);

  return absoluteImagePath;
}

export const imagesService = {
  getOneImage,
};
