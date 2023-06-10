'use strict';
import { Request as Req, Response as Res } from 'express';

import { imagesService } from '../services/images';

const getImage = (req: Req, res: Res) => {
  const imagePath = req.url.substring(1);
  const image = imagesService.getOneImage(imagePath)

  res.sendFile(image, (err) => {
    if (err) {
      console.error('Error sending image:', err);
      res.status(404).send('Image not found');
    }
  });
}

export const imagesController = {
  getImage,
};