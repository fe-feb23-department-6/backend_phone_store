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
const _authentication = require("../controllers/authentication");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.post('/registration', _authentication.authController.register);
router.get('/activation/:activationToken', _authentication.authController.activate);
router.post('/login', _authentication.authController.login);
router.post('/logout', _authentication.authController.logout);
router.get('/refresh', _authentication.authController.refresh);
