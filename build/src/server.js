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
const _images = require("./routes/images");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
const sequelize = (0, _dbInit.dbInit)();
app.use((0, _cors.default)());
app.get('/', (req, res)=>{
    res.send('Server is working.');
});
app.use('/public', _express.default.static(_path.default.join(__dirname, 'public')));
app.use(_images.router);
app.use('/products', _express.default.json(), _products.router);
app.listen(PORT, ()=>{
    console.log(`server is working on http://localhost:${PORT}`);
});
