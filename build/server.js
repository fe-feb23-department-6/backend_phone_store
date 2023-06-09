'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dbInit = require("./utils/dbInit");
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _products = require("./routes/products");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
(0, _dbInit.dbInit)();
app.use((0, _cors.default)());
app.use('/products', express.json(), _products.router);
app.listen(PORT, ()=>{
    // eslint-disable-next-line no-console
    console.log(`server is working on http://localhost:${PORT}`);
});
