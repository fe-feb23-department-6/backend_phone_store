'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "productsService", {
    enumerable: true,
    get: function() {
        return productsService;
    }
});
const _Products = require("../models/Products");
const _sortProducts = require("../utils/sortProducts");
const _filterProducts = require("../utils/filterProducts");
const _sequelize = require("sequelize");
const _Phones = require("../models/Phones");
const _server = require("../server");
const getProductsWithPagination = async (pageNumber, limitNumber, sort, query, category)=>{
    const offset = (pageNumber - 1) * limitNumber;
    const sortOptions = (0, _sortProducts.sortProducts)(sort);
    const whereConditions = query ? (0, _filterProducts.filterProducts)(query) : {};
    if (category) {
        whereConditions.category = category;
    }
    try {
        const products = await _Products.Products.findAndCountAll({
            where: whereConditions,
            order: sortOptions,
            offset,
            limit: limitNumber
        });
        const totalPages = Math.ceil(products.count / limitNumber);
        return {
            products: products.rows,
            currentPage: pageNumber,
            totalPages: totalPages
        };
    } catch (error) {
        throw new Error('Failed to get products');
    }
};
const getNewProducts = async ()=>{
    const sortOptions = (0, _sortProducts.sortProducts)('newest');
    try {
        const newProducts = await _Products.Products.findAll({
            order: sortOptions,
            limit: 10
        });
        return newProducts;
    } catch (error) {
        throw new Error('Failed to get products');
    }
};
const getHotProducts = async ()=>{
    try {
        const hotPriceProducts = await _Products.Products.findAll({
            order: (0, _sequelize.literal)('(full_price - price) DESC'),
            limit: 10
        });
        return hotPriceProducts;
    } catch (error) {
        throw new Error('Failed to get products');
    }
};
const getProductById = async (phoneId)=>{
    try {
        const product = await _Phones.Phones.findByPk(phoneId);
        return product;
    } catch (error) {
        throw new Error('Failed to get product');
    }
};
const getRecommendedProducts = async ()=>{
    try {
        const recommendedProducts = await _Products.Products.findAll({
            order: _server.sequelize?.random(),
            limit: 10
        });
        return recommendedProducts;
    } catch (error) {
        throw new Error('Failed to get products');
    }
};
const productsService = {
    getProductsWithPagination,
    getNewProducts,
    getHotProducts,
    getProductById,
    getRecommendedProducts
};
