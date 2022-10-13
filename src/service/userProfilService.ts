import { RequestHandler, Request, Response, NextFunction } from 'express';
import   CProfil          from '../models/userProfilModel';
import {response }        from '../common/retourParams';

//liste des profils
export const getProfil: RequestHandler = async(req, res, next)=>{
    try {
          await CProfil.findAll()
          .then(resultat =>{
                if(resultat.length > 0){
                    return res.status(response.succes.statut).json(resultat);
                }else{
                    return res.status(response.errRessource.statut).json({message: response.errRessource.message});
                }
          })      
    } catch (error) {
        console.log('erreur interne survenue !', error);
    }
}

//Creation d'un profil utilisateur
export const addProfil: RequestHandler = async(req, res, next)=>{
    
    const {libelle}: CProfil = req.body;
    
    if(!libelle){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {

    await CProfil.findOne({where :{libelle: libelle}})
    .then(resultat =>{
        if(resultat !== null){
            return res.status(response.errRes.statut).json({message : response.errRes.message});
        }else{
            CProfil.create({...req.body})
            .then(result =>{
                if(result !== null){
                    return res.status(response.succes.statut).json({message : response.succes.message});
                } else{
                    return res.status(response.errServeur.statut).json({message : response.errServeur.message});
                }
            }) 
        }
    })
    .catch(error=>{
        console.log('erreur interne survenue !', error);
    })
    

    
   } catch (error) {
    console.log('erreur interne survenue !', error);
   }
}

//mises à jour profil
export const UpdateProfil: RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{

    const {id, libelle}: CProfil = req.body;

    if(!id || !libelle){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {
          await CProfil.findOne({ where: { id : id} })
                .then(retour =>{
                    if(retour !== null){
                        CProfil.update(req.body, {where : {id: id}})
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
