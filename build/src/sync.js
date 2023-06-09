/* eslint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _Phones = require("./models/Phones");
const _Products = require("./models/Products");
const _dbInit = require("./utils/dbInit");
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const seedInitialPhones = async ()=>{
    try {
        const phonesFolderPath = _path.default.join(__dirname, '..', 'public', 'api', 'phones');
        const phoneFiles = _fs.default.readdirSync(phonesFolderPath);
        const phoneDataArray = [];
        for (const phoneFile of phoneFiles){
            const phoneFilePath = _path.default.join(phonesFolderPath, phoneFile);
            const phoneFileContent = _fs.default.readFileSync(phoneFilePath, 'utf-8');
            const phoneData = JSON.parse(phoneFileContent);
            phoneDataArray.push(phoneData);
        }
        await _Phones.Phones.bulkCreate(phoneDataArray);
    } catch (error) {
        console.log('Error seeding data:', error);
    }
};
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
const sync = async ()=>{
    (0, _dbInit.dbInit)();
    await _Phones.Phones.sync({
        alter: true
    });
    await _Products.Products.sync({
        alter: true
    });
    await seedInitialPhones();
    await seedInitialProducts();
};
sync();
