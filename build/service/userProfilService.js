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
exports.addProfil = exports.getProfil = void 0;
const userProfilModel_1 = __importDefault(require("../models/userProfilModel"));
const retourParams_1 = require("../common/retourParams");
//liste des profils
const getProfil = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userProfilModel_1.default.findAll()
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
exports.getProfil = getProfil;
//Creation d'un profil utilisateur
const addProfil = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { libelle } = req.body;
    if (!libelle || libelle === null) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield userProfilModel_1.default.findOne({ where: { libelle: libelle } })
            .then(resultat => {
            if (resultat !== null) {
                return res.status(retourParams_1.response.errRes.statut).json({ message: retourParams_1.response.errRes.message });
            }
            else {
                userProfilModel_1.default.create(Object.assign({}, req.body))
                    .then(result => {
                    if (result !== null) {
                        return res.status(retourParams_1.response.succes.statut).json({ message: retourParams_1.response.succes.message });
                    }
                    else {
                        return res.status(retourParams_1.response.errServeur.statut).json({ message: retourParams_1.response.errServeur.message });
                    }
                });
            }
        })
            .catch(error => {
            console.log('erreur interne survenue !', error);
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.addProfil = addProfil;
