'use strict';
import { Request as Req, Response as Res } from 'express';

import { imagesService } from '../services/images';

const getImage = async(req: Req, res: Res) => {
  try {
    const imagePath = req.url.substring(1);
    const image = await imagesService.getOneImage(imagePath);

    res.sendFile(image, (err) => {
      if (err) {
        res.status(404).send('Image not found');
      }
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const imagesController = {
  getImage,
};
