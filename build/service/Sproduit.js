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
exports.UpdateProduit = exports.addProduit = exports.getProduit = void 0;
const retourParams_1 = require("../common/retourParams");
const Mproduit_1 = __importDefault(require("../models/Mproduit"));
//Liste des produits
const getProduit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Mproduit_1.default.findAll()
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
exports.getProduit = getProduit;
//Création d'un produit
const addProduit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, libelle } = req.body;
    if (!code || !libelle) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield Mproduit_1.default.findOne({ where: { libelle: libelle } })
            .then(retour => {
            if (retour !== null) {
                return res.status(retourParams_1.response.errRes.statut).json({ message: retourParams_1.response.errRes.message });
            }
            else {
                Mproduit_1.default.create(Object.assign({}, req.body))
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
exports.addProduit = addProduit;
//mises à jour produit
const UpdateProduit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, code, libelle } = req.body;
    if (!id || !code || !libelle) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield Mproduit_1.default.findOne({ where: { id: id } })
            .then(retour => {
            if (retour !== null) {
                Mproduit_1.default.update(req.body, { where: { id: id } })
                    .then(result => {
                    if (result !== null) {
                        return res.status(retourParams_1.response.succes.statut).json({ message: retourParams_1.response.succes.message });
                    }
                    else {
                        return res.status(retourParams_1.response.errServeur.statut).json({ message: retourParams_1.response.errServeur.message });
                    }
                });
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
exports.UpdateProduit = UpdateProduit;
