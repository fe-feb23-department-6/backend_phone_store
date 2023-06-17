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
const _users = require("../controllers/users");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.post('/', _users.usersController.createUser);
router.get('/:userId', _users.usersController.getUser);
router.get('/:userId/orders/:orderId', _users.usersController.getOneOrderByUser);
router.delete('/:userId', _users.usersController.deleteUser);
router.patch('/:userId', _users.usersController.updateUser);
