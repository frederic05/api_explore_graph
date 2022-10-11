import request     from 'supertest';
import app         from '../common/serveurParams';
import sequelize   from '../bd/cnx'
import {response}  from '../common/retourParams';

describe('Nouvelle suite de test utilisateur', ()=>{

      beforeEach(() => { sequelize; });
      afterEach(() => { sequelize; });

      //liste des utlisateurs
        describe('list profil des utilisateurs', ()=>{
               //test avec supertest
               it('retourne 404 quand aucun profil est trouvé', async()=>{
                const res = await request(app).get('/profilList');
                expect(res.statusCode).toEqual(response.errRessource.statut);
               });  

               it('retourne 200 quand un profil est trouvé', async()=>{
                const res = await request(app).get('/profilList');
                expect(res.statusCode).toEqual(response.succes.statut);
               });    
        });

        //Insertion d'un utlisateur
        describe('Ajout profil des utilisateurs', ()=>{
            
            it('Retourne 400 quand les valeurs ne sont pas passer', async()=>{
                const res = await request(app).post('/profilAdd')
                                  .send({
                                    "libelle": ""
                                    });
                     expect(res.statusCode).toEqual(response.errSaisi.statut);  
            });

            it('Retourne 201 dans l\' utilisateur existe', async()=>{
                const res = await request(app).post('/profilAdd')
                                  .send({
                                    "libelle": "SUPERVISEUR"
                                    });
                     expect(res.statusCode).toEqual(response.errRes.statut);  
            });

            it('Retourne 200 lorsque utilisateur est creer ', async()=>{
              const res = await request(app).post('/profilAdd')
                                .send({
                                  "libelle": "SUPERVISEUR"
                                  });
                   expect(res.statusCode).toEqual(response.succes.statut);  
           });
        });       
    });