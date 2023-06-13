'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "router", {
    enumerable: true,
    get: function() {
        return router;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _products = require("../controllers/products");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/', _products.productsController.getProducts);
router.get('/new', _products.productsController.getNewestProducts);
