import { Router } from "express";
import {getAll, addUser, updateUser, authenticate} from '../service/userService';
import {tokenVerif} from '../controlleur/verifToken'
import {getProduit, addProduit, UpdateProduit } from '../service/Sproduit';
import {getProfil, addProfil, UpdateProfil} from '../service/userProfilService';
import {getLigneOperation, addLigneOperation, UpdateLigneOperation} from '../service/SligneOperation';


export const router = Router()

//Router AUthentification
router.post('/authentification', authenticate);
//Router utilisateur
router.get('/userList', getAll);
router.post('/userAdd', addUser);
router.put('/userUpdate', updateUser);
//Router profil
router.get('/profilList', getProfil);
router.post('/profilAdd', addProfil);
router.put('/profilUdpate', UpdateProfil);
//Router produit
router.get('/produitList', getProduit);
router.post('/produitAdd', addProduit);
router.put('/produitUpdate', UpdateProduit);
//Router ligne Opération
router.get('/ligneOperationList', getLigneOperation);
router.post('/ligneOperationAdd', addLigneOperation);
router.put('/ligneOperationAUpdate', UpdateLigneOperation);

//test verification tokoen 

router.post('/verificationToken', tokenVerif);

//Router AUthentification
router.post('/authentification', authenticate);

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
