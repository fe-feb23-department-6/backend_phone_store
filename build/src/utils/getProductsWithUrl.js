"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getProductsWithUrl", {
    enumerable: true,
    get: function() {
        return getProductsWithUrl;
    }
});
const _constants = require("../constants");
const getProductsWithUrl = (products)=>{
    const productsWithURL = products.map((product)=>{
        const fullImageUrl = `${_constants.BASE_URL}/${product.image}`;
        return {
            id: product.id,
            category: product.category,
            phoneId: product.phoneId,
            itemId: product.itemId,
            name: product.name,
            fullPrice: product.fullPrice,
            price: product.price,
            screen: product.screen,
            capacity: product.capacity,
            color: product.color,
            ram: product.ram,
            year: product.year,
            image: fullImageUrl
        };
    });
    return productsWithURL;
};
