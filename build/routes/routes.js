"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userService_1 = require("../service/userService");
const verifToken_1 = require("../controlleur/verifToken");
const Sproduit_1 = require("../service/Sproduit");
const userProfilService_1 = require("../service/userProfilService");
const SligneOperation_1 = require("../service/SligneOperation");
exports.router = (0, express_1.Router)();
//Router AUthentification
exports.router.post('/authentification', userService_1.authenticate);
//Router utilisateur
exports.router.get('/userList', verifToken_1.tokenVerif, userService_1.getAll);
exports.router.post('/userAdd', userService_1.addUser);
exports.router.put('/userUpdate', userService_1.updateUser);
//Router profil
exports.router.get('/profilList', userProfilService_1.getProfil);
exports.router.post('/profilAdd', userProfilService_1.addProfil);
exports.router.put('/profilUdpate', userProfilService_1.UpdateProfil);
//Router produit
exports.router.get('/produitList', Sproduit_1.getProduit);
exports.router.post('/produitAdd', Sproduit_1.addProduit);
exports.router.put('/produitUpdate', Sproduit_1.UpdateProduit);
//Router ligne Opération
exports.router.get('/ligneOperationList', SligneOperation_1.getLigneOperation);
exports.router.post('/ligneOperationAdd', SligneOperation_1.addLigneOperation);
exports.router.put('/ligneOperationAUpdate', SligneOperation_1.UpdateLigneOperation);
//test verification tokoen 
exports.router.post('/verificationToken', verifToken_1.tokenVerif);
//Router AUthentification
exports.router.post('/authentification', userService_1.authenticate);
/******************** ROUTE AVEC VERIFICATION DU TOKEN ************************$ */
/*
//Router utilisateur
router.get('/userList', tokenVerif, getAll);
router.post('/userAdd', tokenVerif, addUser);
router.put('/userUpdate', tokenVerif, updateUser);
//Router profil
router.get('/profilList', tokenVerif, getProfil);
router.post('/profilAdd', tokenVerif, addProfil);
router.put('/profilUdpate', tokenVerif, UpdateProfil);
//Router produit
router.get('/produitList', tokenVerif, getProduit);
router.post('/produitAdd', tokenVerif, addProduit);
router.put('/produitUpdate', tokenVerif, UpdateProduit);
//Router ligne Opération
router.get('/ligneOperationList', tokenVerif, getLigneOperation);
router.post('/ligneOperationAdd', tokenVerif, addLigneOperation);
router.put('/ligneOperationAUpdate', tokenVerif, UpdateLigneOperation);
*/
