'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "customListService", {
    enumerable: true,
    get: function() {
        return customListService;
    }
});
const _Products = require("../models/Products");
const getProductsByIds = async (phoneIds)=>{
    try {
        const products = await _Products.Products.findAll({
            where: {
                phone_id: phoneIds
            }
        });
        return products;
    } catch (error) {
        throw new Error('Failed to get products');
    }
};
const customListService = {
    getProductsByIds
};
