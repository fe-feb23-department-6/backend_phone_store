'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authMiddleware", {
    enumerable: true,
    get: function() {
        return authMiddleware;
    }
});
const _jwtService = require("../services/jwtService");
const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    const [, accessToken] = authHeader.split(' ');
    if (!accessToken) {
        res.sendStatus(401);
        return;
    }
    const userData = _jwtService.jwtService.validateAccessToken(accessToken);
    if (!userData) {
        res.sendStatus(401);
        return;
    }
    next();
};
