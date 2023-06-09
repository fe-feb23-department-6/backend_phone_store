"use strict";
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
function getAll() {
    return _Products.Products.findAll();
}
const productsService = {
    getAll
};
