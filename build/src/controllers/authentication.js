'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authController", {
    enumerable: true,
    get: function() {
        return authController;
    }
});
const _uuid = require("uuid");
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
const _authentication = require("../services/authentication");
const _emailService = require("../services/emailService");
const _Users = require("../models/Users");
const _users = require("../services/users");
const _jwtService = require("../services/jwtService");
const _tokenService = require("../services/tokenService");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function validateEmail(value) {
    if (!value) {
        return 'Email is required';
    }
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;
    if (!emailPattern.test(value)) {
        return 'Email is not valid';
    }
}
const validatePassword = (value)=>{
    if (!value) {
        return 'Password is required';
    }
    if (value.length < 6) {
        return 'At least 6 characters';
    }
};
const login = async (req, res)=>{
    try {
        const { email , password  } = req.body;
        const user = await _users.usersService.getUserByEmail(email);
        if (!user) {
            res.status(400).send('User with this email does not exist');
            return;
        }
        const isPasswordValid = await _bcrypt.default.compare(password, user.dataValues.password);
        if (!isPasswordValid) {
            res.status(400).send('Password is wrong');
            return;
        }
        await sendAuthentication(res, user);
    } catch (error) {
        res.sendStatus(500);
    }
};
const refresh = async (req, res)=>{
    try {
        const { refreshToken  } = req.cookies;
        const userData = _jwtService.jwtService.validateRefreshToken(refreshToken);
        if (!userData || typeof userData === 'string') {
            res.sendStatus(401);
            return;
        }
        const token = await _tokenService.tokenService.getByToken(refreshToken);
        if (!token) {
            res.sendStatus(401);
            return;
        }
        const user = await _users.usersService.getUserByEmail(userData.email);
        if (!user) {
            res.sendStatus(401);
            return;
        }
        await sendAuthentication(res, user);
    } catch (error) {
        res.sendStatus(500);
    }
};
const sendAuthentication = async (res, user)=>{
    const userData = _users.usersService.normalize(user.dataValues);
    const accessToken = _jwtService.jwtService.generateAccessToken(userData);
    const refreshToken = _jwtService.jwtService.generateRefreshToken(userData);
    await _tokenService.tokenService.save(user.dataValues.id, refreshToken);
    res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.send({
        user: userData,
        accessToken
    });
};
const register = async (req, res)=>{
    const { name , email , password  } = req.body;
    const errors = {
        email: validateEmail(email),
        password: validatePassword(password)
    };
    if (errors.email || errors.password) {
        return res.status(400).send('Validation error');
    }
    if (!name || !email || !password) {
        res.sendStatus(400);
        return;
    }
    try {
        const existingUser = await _users.usersService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).send('Email is already taken');
        }
        const activationToken = (0, _uuid.v4)();
        const hash = await _bcrypt.default.hash(password, 10);
        const newUser = await _authentication.authService.createUser(name, email, hash, activationToken);
        await _emailService.emailService.sendActivationLink(email, activationToken);
        const userData = _users.usersService.normalize(newUser.dataValues);
        res.statusCode = 201;
        res.send(userData);
    } catch (error) {
        res.sendStatus(500);
    }
};
const activate = async (req, res)=>{
    try {
        const { activationToken  } = req.params;
        const user = await _Users.Users.findOne({
            where: {
                activationToken
            }
        });
        if (!user) {
            res.sendStatus(404);
            return;
        }
        user.activationToken = null;
        await user?.save();
        await sendAuthentication(res, user);
    } catch (error) {
        res.sendStatus(500);
    }
};
const logout = async (req, res)=>{
    try {
        const { refreshToken  } = req.cookies;
        const userData = _jwtService.jwtService.validateRefreshToken(refreshToken);
        res.clearCookie('refreshToken');
        if (userData && typeof userData !== 'string') {
            await _tokenService.tokenService.remove(userData.id);
        }
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
};
const authController = {
    register,
    activate,
    login,
    refresh,
    logout
};
