"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterProducts", {
    enumerable: true,
    get: function() {
        return filterProducts;
    }
});
const _sequelize = require("sequelize");
const filterProducts = (query, category)=>{
    const whereConditions = {};
    if (query) {
        whereConditions.name = {
            [_sequelize.Op.iLike]: `%${query}%`
        };
    }
    if (category) {
        whereConditions.category = category;
    }
    return whereConditions;
};
