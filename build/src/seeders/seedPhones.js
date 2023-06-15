/* eslint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedInitialPhones", {
    enumerable: true,
    get: function() {
        return seedInitialPhones;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _Phones = require("../models/Phones");
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
