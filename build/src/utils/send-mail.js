"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("dotenv/config");
const _emailService = require("../services/emailService");
_emailService.emailService.send({
    email: 'mohev55475@byorby.com',
    subject: 'Test',
    html: '123'
});
