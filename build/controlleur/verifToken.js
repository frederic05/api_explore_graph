"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerif = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const params_1 = __importDefault(require("../common/params"));
//varification du type du token
const extraBaerer = (authorization) => {
    if (typeof authorization !== 'string') {
        return false;
    }
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
};
const tokenVerif = (req, res, next) => {
    const token = req.headers.authorization && extraBaerer(req.headers.authorization);
    if (!token) {
        return res.status(401).send({ message: 'token non present!' });
    }
    // varifier la validiter du toke
    try {
        let vrecord = funTest(token);
        if (!vrecord) {
            return res.status(401).send({ message: 'session expirée vueillez vous reconnecter !' });
        }
        next();
    }
    catch (error) {
        console.log('error', error);
    }
};
exports.tokenVerif = tokenVerif;
const funTest = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, (params_1.default.SECRETKEY));
    }
    catch (error) {
        return null;
    }
};
