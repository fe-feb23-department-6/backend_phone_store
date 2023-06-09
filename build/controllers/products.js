'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "productsController", {
    enumerable: true,
    get: function() {
        return productsController;
    }
});
const _products = require("../services/products");
const getProducts = async (req, res)=>{
    const products = await _products.productsService.getAll();
    res.send(products);
};
const productsController = {
    getProducts
};
