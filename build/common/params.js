"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appParams = {
    PORT: process.env.PORT,
    ADRESS: process.env.ADRESS,
    BDname: process.env.BD,
    BDuserName: process.env.USERNAME,
    BDpassWord: process.env.PASSWORD,
    BDhostName: process.env.HOSTNAME,
    BDdriver: process.env.DB_DRIVER,
    BDport: process.env.PORT_DATABASE,
};
exports.default = appParams;
