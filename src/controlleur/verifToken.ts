import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import appParams          from '../common/params'; 

//varification du type du token
const extraBaerer = (authorization: string):any =>{
    if(typeof authorization !== 'string'){
        return false
    }
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

export const tokenVerif = (req: Request , res: Response, next: NextFunction) => {

    

    const token = req.headers.authorization && extraBaerer(req.headers.authorization)
    
    if(!token){
        return res.status(401).send({message: 'token non present!'})
    } 
    // varifier la validiter du toke
            jwt.verify(token, (appParams.SECRETKEY) as string, (err: any)=>{
                if(err){
                return res.status(401).send({message: 'session expirée vueillez vous reconnecter !'})
                }
                next()
        });   
      next();
      
    }