"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizationRole = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(403);
    }
    const token = jsonwebtoken_1.default.verify(authorization.split(" ")[1], process.env.SECRET_KEY);
    req.user = token;
    if (req.user.role != 1) {
        return res.status(401).json({
            msg: 'Not authorized'
        });
    }
    else {
        return next();
    }
};
exports.authorizationRole = authorizationRole;
