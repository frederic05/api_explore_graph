import { RequestHandler, Request, Response, NextFunction} from 'express';
import {response }        from '../common/retourParams';
import CLigneOperation              from '../models/MligneOperation';

//Liste des produits
export const getLigneOperation: RequestHandler = async(req, res, next)=>{
    try {
          await CLigneOperation.findAll()
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
export const addLigneOperation: RequestHandler = async(req, res, next)=>{

    const {code, libelle, value, produit}: CLigneOperation = req.body;

    if(!code || !libelle || !value || !produit){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {
          await CLigneOperation.findOne({ where: { code: code } })
                .then(retour =>{
                    if(retour !== null){
                        return res.status(response.errRes.statut).json({message: response.errRes.message});
                    }else{
                        
                        CLigneOperation.create({...req.body})
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

//mises à jour ligne opération
export const UpdateLigneOperation: RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{

    const {id, code, libelle, value, produit}: CLigneOperation = req.body;

    if(!id || !code|| !libelle || !value|| !produit){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {
          await CLigneOperation.findOne({ where: { id : id} })
                .then(retour =>{
                    if(retour !== null){
                        CLigneOperation.update(req.body, {where : {id: id}})
                                .then(result =>{
                                        if(result !== null){
                                            return res.status(response.succes.statut).json({message : response.succes.message});
                                        }else{
                                            return res.status(response.errServeur.statut).json({message : response.errServeur.message});
                                        }
                                        })                  
                    }else{
                        return res.status(response.errRessource.statut).json({message: response.errRessource.message});                        
                    }
                })                   
   } catch (error) {
            console.log('erreur interne survenue !', error);
   }
}