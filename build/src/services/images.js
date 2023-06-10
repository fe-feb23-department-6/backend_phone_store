"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "imagesService", {
    enumerable: true,
    get: function() {
        return imagesService;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getOneImage(imagePath) {
    const absoluteImagePath = _path.default.join(__dirname, '../../public', imagePath);
    return absoluteImagePath;
}
const imagesService = {
    getOneImage
};
