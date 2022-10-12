import { Router } from "express";
import {getAll, addUser, authenticate} from '../service/userService';
import {tokenVerif} from '../controlleur/verifToken'
import {getProduit, addProduit } from '../service/Sproduit';
import {getProfil, addProfil} from '../service/userProfilService';
import {getLigneOperation, addLigneOperation} from '../service/SligneOperation';


export const router = Router()

//Router AUthentification
router.post('/authentification', authenticate);
//Router utilisateur
router.get('/userList', tokenVerif, getAll);
router.post('/userAdd', addUser);
//Router profil
router.get('/profilList', getProfil);
router.post('/profilAdd', addProfil);
//Router produit
router.get('/produitList', getProduit);
router.post('/produitAdd', addProduit);
//Router ligne Opération
router.get('/ligneOperationList', getLigneOperation);
router.post('/ligneOperationAdd', addLigneOperation);

//test verification tokoen 

router.post('/verificationToken', tokenVerif);
