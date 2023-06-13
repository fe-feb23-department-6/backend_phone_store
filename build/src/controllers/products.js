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
    const { page ='1' , limit ='16' , sort ='newest' , query  } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    try {
        const paginationData = await _products.productsService.getProductsWithPagination(pageNumber, limitNumber, sort, query);
        if (paginationData.products.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.json(paginationData);
    } catch (error) {
        res.status(500);
    }
};
const getNewestProducts = async (req, res)=>{
    try {
        const newProducts = await _products.productsService.getNewProducts();
        res.send(newProducts);
    } catch (error) {
        res.status(500);
    }
};
const productsController = {
    getProducts,
    getNewestProducts
};
