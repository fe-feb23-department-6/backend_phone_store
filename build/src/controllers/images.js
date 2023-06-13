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
const getImage = async (req, res)=>{
    try {
        const imagePath = req.url.substring(1);
        const image = await _images.imagesService.getOneImage(imagePath);
        res.sendFile(image, (err)=>{
            if (err) {
                res.status(404).send('Image not found');
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
const imagesController = {
    getImage
};
