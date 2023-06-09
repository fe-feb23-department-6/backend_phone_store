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
router.get('/phones', _products.productsController.getProducts);
router.get('/phones/:phoneId', _products.productsController.getNamespaceListByProductsId);
router.get('/tablets', _products.productsController.getProducts);
router.get('/accessories', _products.productsController.getProducts);
router.get('/new', _products.productsController.getNewestProducts);
router.get('/discount', _products.productsController.getHotPriceProducts);
router.get('/:productId', _products.productsController.getOneProductById);
router.get('/:namespaceId/recommended', _products.productsController.getRecommended);
