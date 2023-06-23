"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "emailService", {
    enumerable: true,
    get: function() {
        return emailService;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const transporter = _nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});
function send({ email , subject , html  }) {
    return transporter.sendMail({
        from: 'Auth API',
        to: email,
        subject,
        text: '',
        html
    });
}
function sendActivationLink(email, token) {
    const link = `${process.env.CLIENT_URL}/activation/${token}`;
    return send({
        email,
        subject: 'Account activation',
        html: `
      <h1>Account activation</h1>
      <a href="${link}">${link}</a>
    `
    });
}
const emailService = {
    send,
    sendActivationLink
};
