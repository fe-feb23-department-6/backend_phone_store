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
const _getCategory = require("../utils/getCategory");
const getProducts = async (req, res)=>{
    const { page ='1' , limit ='16' , sort ='newest' , query  } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const category = (0, _getCategory.getCategory)(req.path);
    try {
        const paginationData = await _products.productsService.getProductsWithPagination(pageNumber, limitNumber, sort, query, category);
        if (!paginationData.products) {
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
const getHotPriceProducts = async (req, res)=>{
    try {
        const hotPriceProducts = await _products.productsService.getHotProducts();
        res.send(hotPriceProducts);
    } catch (error) {
        res.status(500);
    }
};
const getProductById = async (req, res)=>{
    const { id  } = req.params;
    try {
        const product = await _products.productsService.getProductById(id);
        if (!product) {
            res.sendStatus(404);
            return;
        }
        res.send(product);
    } catch (error) {
        res.status(500);
    }
};
const getRecommendedProducts = async (req, res)=>{
    try {
        const recommendedProducts = await _products.productsService.getRecommendedProducts();
        res.send(recommendedProducts);
    } catch (error) {
        res.status(500);
    }
};
const productsController = {
    getProducts,
    getNewestProducts,
    getHotPriceProducts,
    getProductById,
    getRecommendedProducts
};
