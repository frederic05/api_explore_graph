import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { RequestHandler, Request, Response, NextFunction } from 'express';
import {response }        from '../common/retourParams';
import User               from '../models/userModel';
import appParams          from '../common/params'; 


//Liste des utilisateurs
export const getAll: RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{
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
export const addUser: RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{

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
                        scriptMdp(password).then(salt=>{
                            req.body.password  = salt;
                            User.create({...req.body})
                                .then(result =>{
                                        if(result !== null){
                                            return res.status(response.succes.statut).json({message : response.succes.message});
                                        }else{
                                            return res.status(response.errServeur.statut).json({message : response.errServeur.message});
                                        }
                                        })  
                                }).catch(error=>{
                                    return res.status(response.errServeur.statut).json({message : response.errServeur.message});
                                })                           
                    }
                })                   
   } catch (error) {
            console.log('erreur interne survenue !', error);
   }
}

//mises à jour utilisateur
export const updateUser: RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{

    const {id, firstname, lastname, email,login, status}: User = req.body;

    if(!id || !firstname || !lastname || !email || !login || !status){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

   try {
          await User.findOne({ where: { id : id} })
                .then(retour =>{
                    if(retour !== null){
                        User.update(req.body, {where : {id: id}})
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

//fonction d'authentification
export const authenticate: RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{
    
    const {login, password} = req.body

    if (!login || !password){
        return res.status(response.errSaisi.statut).json({message : response.errSaisi.message});
    }

    try {      
       await User.findOne({where :{login: login}})
        .then(resultat=>{
            if(resultat !== null){
                scriptMdp(password)
                .then(result=>{                         
                    compareScript(password, resultat.password)
                    .then(vresult=>{
                        if(vresult){
                            const token = jwt.sign({
                                    id:         resultat.id,
                                    firstname:  resultat.firstname,
                                    lastname:   resultat.lastname,
                                    email:      resultat.email,
                                    login:      resultat.login,
                                    status:     resultat.status
                                
                            },(appParams.SECRETKEY) as string,{expiresIn : appParams.EXPIRE});
                            return res.status(response.succes.statut).json({data: token});
                        }
                    }).catch(error=>{
                        return res.status(response.errRessource.statut).json({message: error});
                    })
                }).catch(error=>{
                    return res.status(response.errRessource.statut).json({message: error});
                })
            }else{
                return res.status(response.errRessource.statut).json({message: response.errRessource.message});
            }
        })
    } catch (error) {
        console.log('erreur interne survenue !', error);
    }

}

const scriptMdp = (pass: string): Promise<string>  =>{
    return bcrypt.hash(pass, Number(appParams.SECRETKEY))
}

const compareScript = (password: string, spassword:string): Promise<boolean> =>{
    return bcrypt.compare(password, spassword);
}
