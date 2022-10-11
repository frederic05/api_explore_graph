import { RequestHandler } from 'express';
import {response }        from '../common/retourParams';
import User               from '../models/userModel';


//Liste des utilisateurs
export const getAll: RequestHandler = async(req, res, next)=>{
    try {
          await User.findAll()
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

//Création d'un utilisateur
export const addUser: RequestHandler = async(req, res, next)=>{

    const {firstname, lastname, email, password, login, status}: User = req.body;

    if(!firstname || !lastname || !email || !password || !login || !status){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {
          await User.findOne({ where: { email : email} })
                .then(retour =>{
                    if(retour !== null){
                        return res.status(response.errRes.statut).json({message: response.errRes.message});
                    }else{
                        
                        User.create({...req.body})
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
