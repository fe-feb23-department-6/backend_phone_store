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
const _orders = require("../controllers/orders");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.post('/', _orders.ordersController.createOrder);
router.get('/', _orders.ordersController.getOrders);
router.get('/:orderId', _orders.ordersController.getOneOrder);
router.delete('/:orderId', _orders.ordersController.deleteOrder);
router.patch('/:orderId', _orders.ordersController.updateOrder);
