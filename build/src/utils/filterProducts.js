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
const filterProducts = (query)=>{
    const whereConditions = {};
    whereConditions.name = {
        [_sequelize.Op.iLike]: `%${query}%`
    };
    return whereConditions;
};
