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
require("dotenv/config");
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _products = require("./routes/products");
const _customList = require("./routes/customList");
const _images = require("./routes/images");
const _users = require("./routes/users");
const _authentication = require("./routes/authentication");
const _orders = require("./routes/orders");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
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
app.use((0, _cors.default)({
    origin: [
        'http://localhost:3000',
        process.env.CLIENT_URL,
        'https://fe-feb23-department-6.github.io'
    ],
    credentials: true
}));
app.use((0, _cookieparser.default)());
app.use(_express.default.json());
app.use('/public', _express.default.static(_path.default.join(__dirname, 'public')));
app.use(_images.router);
app.use('/', _express.default.json(), _authentication.router);
app.get('/', (req, res, next)=>{
    if (req.url === '/') {
        return res.redirect('/docs');
    }
    next();
});
app.use('/docs', _swaggeruiexpress.default.serve, _swaggeruiexpress.default.setup(_product_catalogjson.default));
app.use('/products', _products.router);
app.use('/cart', _customList.router);
app.use('/favorites', _customList.router);
app.use('/users', _users.router);
app.use('/orders', _orders.router);
app.listen(PORT, ()=>{
    console.log(`server is working on http://localhost:${PORT}`);
});
