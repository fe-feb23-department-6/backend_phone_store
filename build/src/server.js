/* eslint-disable no-console */ 'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sequelize", {
    enumerable: true,
    get: function() {
        return sequelize;
    }
});
const _dbInit = require("./utils/dbInit");
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _products = require("./routes/products");
const _customList = require("./routes/customList");
const _images = require("./routes/images");
const _users = require("./routes/users");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _swaggeruiexpress = /*#__PURE__*/ _interop_require_default(require("swagger-ui-express"));
const _product_catalogjson = /*#__PURE__*/ _interop_require_default(require("./product_catalog.json"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
const sequelize = (0, _dbInit.dbInit)();
app.use((0, _cors.default)());
app.get('/', (req, res, next)=>{
    if (req.url === '/') {
        return res.redirect('/docs');
    }
    next();
});
app.use('/docs', _swaggeruiexpress.default.serve, _swaggeruiexpress.default.setup(_product_catalogjson.default));
app.use('/public', _express.default.static(_path.default.join(__dirname, 'public')));
app.use(_images.router);
app.use('/products', _express.default.json(), _products.router);
app.use('/cart', _express.default.json(), _customList.router);
app.use('/favorites', _express.default.json(), _customList.router);
app.use('/users', _express.default.json(), _users.router);
app.listen(PORT, ()=>{
    console.log(`server is working on http://localhost:${PORT}`);
});
