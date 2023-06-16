'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "customListController", {
    enumerable: true,
    get: function() {
        return customListController;
    }
});
const _customList = require("../services/customList");
const getProductsByIds = async (req, res)=>{
    const phoneIds = typeof req.query.phoneIds === 'string' ? req.query.phoneIds.split(',') : [];
    if (phoneIds.length === 0) {
        res.sendStatus(400);
        return;
    }
    try {
        const products = await _customList.customListService.getProductsByIds(phoneIds);
        if (products.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.json(products);
    } catch (error) {
        res.sendStatus(500);
    }
};
const customListController = {
    getProductsByIds
};
