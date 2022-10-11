"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cnx_1 = __importDefault(require("../bd/cnx"));
const sequelize_1 = require("sequelize");
class CProfil extends sequelize_1.Model {
}
CProfil.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    libelle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: cnx_1.default,
    paranoid: true,
    modelName: 'CProfil',
    freezeTableName: true,
    schema: "sc_devteam"
});
exports.default = CProfil;
