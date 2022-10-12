import {tokenVerif} from '../controlleur/verifToken';
import app from '../common/serveurParams';
import request from 'supertest';

describe('Suite de test verification token', ()=>{

    let req ={
        headers:{
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImZpcnN0bmFtZSI6IkdiYW1lbGUiLCJsYXN0bmFtZSI6InJvc2UiLCJlbWFpbCI6InJvc2UwMDRAZ21haWwuY29tIiwibG9naW4iOiJyb3NlQCIsInN0YXR1cyI6dHJ1ZSwiaWF0IjoxNjY1NTgyNjExLCJleHAiOjE2NjU1ODI2MTR9.tTroHDz1MMhPzKzWNg3y6kthRL0dHKsOSshQvWYBWCY"
        }
    } 
               //test avec supertest
               it('retourne 401 si le token est invalide ou null', async()=>{
                const res =  await request(app).post('/verificationToken')
                .send(req);
                expect(res.statusCode).toEqual(401);
               });        
    });