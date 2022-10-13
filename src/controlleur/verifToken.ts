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

    const token: string = req.headers.authorization && extraBaerer(req.headers.authorization)
    
    if(!token){
        return res.status(401).send({message: 'token non present!'})
    } 

    // varifier la validiter du toke
    try {
        let vrecord = funTest(token)
                   if(!vrecord){
                    return res.status(401).send({message: 'session expirée vueillez vous reconnecter !'});
                    }
                    next()
    } catch (error) {       
        console.log('error', error)
    }
    }

    const funTest = <T>(token: string):T | null=>{
        try {         
            return jwt.verify(token, (appParams.SECRETKEY) as string) as T;
          } catch (error) {
            return null;
          }
    }