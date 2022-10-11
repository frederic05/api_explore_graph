"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cnx_1 = __importDefault(require("../bd/cnx"));
const sequelize_1 = require("sequelize");
class CLigneOperation extends sequelize_1.Model {
}
CLigneOperation.init({
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
    },
    value: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: false,
    },
    produit: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: cnx_1.default,
    paranoid: true,
    modelName: 'LigneOperation',
    freezeTableName: true,
    schema: "sc_devteam"
});
exports.default = CLigneOperation;
