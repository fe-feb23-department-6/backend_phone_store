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
const _getProductsWithUrl = require("../utils/getProductsWithUrl");
const _filterProducts = require("../utils/filterProducts");
const getProductsWithPagination = async (pageNumber, limitNumber, sort, query)=>{
    const offset = (pageNumber - 1) * limitNumber;
    const sortOptions = (0, _sortProducts.sortProducts)(sort);
    const whereConditions = query ? (0, _filterProducts.filterProducts)(query) : {};
    try {
        const products = await _Products.Products.findAndCountAll({
            where: whereConditions,
            order: sortOptions,
            offset,
            limit: limitNumber
        });
        const totalPages = Math.ceil(products.count / limitNumber);
        const productsWithURL = (0, _getProductsWithUrl.getProductsWithUrl)(products.rows);
        return {
            products: productsWithURL,
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
const productsService = {
    getProductsWithPagination,
    getNewProducts
};
