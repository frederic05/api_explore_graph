"use strict";
//definition ded paramtres de connexion à la base de données
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const params_1 = __importDefault(require("../common/params"));
//importation des variables de connection à la base de données 
const bdName = params_1.default.BDname;
const bdUsername = params_1.default.BDuserName;
const bdPassword = params_1.default.BDpassWord;
const bdHostname = params_1.default.BDhostName;
const dbDriver = params_1.default.BDdriver;
const bdPort = params_1.default.BDport;
const sequelize = new sequelize_1.Sequelize(bdName, bdUsername, bdPassword, {
    host: bdHostname,
    dialect: dbDriver,
    port: Number(bdPort) || 5432,
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    }
});
/*(async () => {
    await sequelize.sync({ alter: false })
                   .then(res => console.log("synchronisation effectuée avec succes !"))
                   .catch(err => console.log("error synchronisation !", err));
  })();*/
exports.default = sequelize;
