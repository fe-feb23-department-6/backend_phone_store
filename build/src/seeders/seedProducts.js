/* eslint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedInitialProducts", {
    enumerable: true,
    get: function() {
        return seedInitialProducts;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _Products = require("../models/Products");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const seedInitialProducts = async ()=>{
    try {
        const productsFilePath = _path.default.join(__dirname, '..', 'public', 'api', 'phones.json');
        const productsFileContent = _fs.default.readFileSync(productsFilePath, 'utf-8');
        const productsData = JSON.parse(productsFileContent);
        await _Products.Products.bulkCreate(productsData);
    } catch (error) {
        console.log('Error seeding data:', error);
    }
};
