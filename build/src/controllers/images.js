'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "imagesController", {
    enumerable: true,
    get: function() {
        return imagesController;
    }
});
const _images = require("../services/images");
const getImage = (req, res)=>{
    const imagePath = req.url.substring(1);
    const image = _images.imagesService.getOneImage(imagePath);
    res.sendFile(image, (err)=>{
        if (err) {
            console.error('Error sending image:', err);
            res.status(404).send('Image not found');
        }
    });
};
const imagesController = {
    getImage
};
