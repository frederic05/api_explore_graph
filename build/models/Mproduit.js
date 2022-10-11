"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cnx_1 = __importDefault(require("../bd/cnx"));
const sequelize_1 = require("sequelize");
class Cproduit extends sequelize_1.Model {
}
Cproduit.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    libelle: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: cnx_1.default,
    paranoid: true,
    modelName: 'Produit',
    freezeTableName: true,
    schema: "sc_devteam"
});
exports.default = Cproduit;
