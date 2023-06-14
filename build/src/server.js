'use strict';
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = (0, _dbInit.dbInit)();
app.use((0, _cors.default)());
app.get('/', (req, res)=>{
    res.send('Hello world');
});
app.use('/public', express.static(_path.default.join(__dirname, 'public')));
app.use(_images.router);
app.use('/products', express.json(), _products.router);
app.listen(PORT, ()=>{
    // eslint-disable-next-line no-console
    console.log(`server is working on http://localhost:${PORT}`);
});
