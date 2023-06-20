"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jwtService", {
    enumerable: true,
    get: function() {
        return jwtService;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const generateAccessToken = (user)=>{
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error('JWT Access Secret is not set!');
    }
    return _jsonwebtoken.default.sign(user, secret, {
        expiresIn: '10m'
    });
};
const generateRefreshToken = (user)=>{
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error('JWT Access Secret is not set!');
    }
    return _jsonwebtoken.default.sign(user, secret, {
        expiresIn: '30d'
    });
};
const validateAccessToken = (token)=>{
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error('JWT Access Secret is not set!');
    }
    try {
        return _jsonwebtoken.default.verify(token, secret);
    } catch (error) {
        return null;
    }
};
const validateRefreshToken = (token)=>{
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error('JWT Access Secret is not set!');
    }
    try {
        return _jsonwebtoken.default.verify(token, secret);
    } catch (error) {
        return null;
    }
};
const jwtService = {
    generateAccessToken,
    validateAccessToken,
    generateRefreshToken,
    validateRefreshToken
};
