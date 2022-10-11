import { RequestHandler } from 'express';
import {response }        from '../common/retourParams';
import Cproduit              from '../models/Mproduit';

//Liste des produits
export const getProduit: RequestHandler = async(req, res, next)=>{
    try {
          await Cproduit.findAll()
         .then(resultat =>{
            if(resultat.length > 0 ){
                return res.status(response.succes.statut).json({data: resultat});
             }else{
                return res.status(response.errRessource.statut).json({message: response.errRessource.message});
             } 
         })
           
    } catch (error) {
        console.log('erreur interne survenue !', error);
    }
}

//Création d'un produit
export const addProduit: RequestHandler = async(req, res, next)=>{

    const {code, libelle}: Cproduit = req.body;

    if(!code || !libelle){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {
          await Cproduit.findOne({ where: { libelle: libelle } })
                .then(retour =>{
                    if(retour !== null){
                        return res.status(response.errRes.statut).json({message: response.errRes.message});
                    }else{
                        
                        Cproduit.create({...req.body})
                        .then(result =>{
                                if(result !== null){
                                    return res.status(response.succes.statut).json({message : response.succes.message});
                                }else{
                                    return res.status(response.errServeur.statut).json({message : response.errServeur.message});
                                }
                                })                           
                    }
                })                   
   } catch (error) {
            console.log('erreur interne survenue !', error);
   }
}