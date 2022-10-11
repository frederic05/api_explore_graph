"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getAll = void 0;
const retourParams_1 = require("../common/retourParams");
const userModel_1 = __importDefault(require("../models/userModel"));
//Liste des utilisateurs
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.findAll()
            .then(resultat => {
            if (resultat.length > 0) {
                return res.status(retourParams_1.response.succes.statut).json({ data: resultat });
            }
            else {
                return res.status(retourParams_1.response.errRessource.statut).json({ message: retourParams_1.response.errRessource.message });
            }
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.getAll = getAll;
//Création d'un utilisateur
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, login, status } = req.body;
    if (!firstname || !lastname || !email || !password || !login || !status) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield userModel_1.default.findOne({ where: { email: email } })
            .then(retour => {
            if (retour !== null) {
                return res.status(retourParams_1.response.errRes.statut).json({ message: retourParams_1.response.errRes.message });
            }
            else {
                userModel_1.default.create(Object.assign({}, req.body))
                    .then(result => {
                    if (result !== null) {
                        return res.status(retourParams_1.response.succes.statut).json({ message: retourParams_1.response.succes.message });
                    }
                    else {
                        return res.status(retourParams_1.response.errServeur.statut).json({ message: retourParams_1.response.errServeur.message });
                    }
                });
            }
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.addUser = addUser;
