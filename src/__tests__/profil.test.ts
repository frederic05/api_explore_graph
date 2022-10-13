import request     from 'supertest';
import app         from '../common/serveurParams';
import sequelize   from '../bd/cnx'
import {response}  from '../common/retourParams';

describe('Nouvelle suite de test profil utilisateur', ()=>{

      beforeEach(() => { sequelize });
      afterEach(() => { sequelize; });

      //liste des utlisateurs
        describe('list profil des utilisateurs', ()=>{
               //test avec supertest
               it('retourne 404 quand aucun profil est trouvé', async()=>{
                const res = await request(app).get('/profilList');
                expect(res.statusCode).toEqual(response.errRessource.statut);
               });  

               it('retourne 200 quand un profil est trouvé', async()=>{
                const {body, statusCode} = await request(app).get('/profilList');

                /*expect(body).toEqual(
                  expect.arrayContaining([
                    expect.objectContaining({id: expect.any(Number),
                      libelle:   expect.any(String),
                      createdAt: expect.any(Date),
                      updatedAt: expect.any(Date),
                      deletedAt: expect.any(Date)
                    })])
                )*/
                expect(statusCode).toBe(response.succes.statut);
               });    
        });

        //Insertion d'un utlisateur
        describe('Ajout profil des utilisateurs', ()=>{
            
            it('Retourne 400 quand les valeurs ne sont pas passer', async()=>{
                const res = await request(app).post('/profilAdd')
                                  .set('Content-Type', 'application/json')
                                  .send({
                                    "libelle": ""
                                    });
                     expect(res.statusCode).toEqual(response.errSaisi.statut);  
            });

            it('Retourne 201 lorsque le profil utilisateur existe', async()=>{
                const res = await request(app).post('/profilAdd')
                                  .send({
                                    "libelle": "SUPERVISEUR"
                                    });
                     expect(res.statusCode).toEqual(response.errRes.statut);  
            });

            it('Retourne 200 lorsque le profil utilisateur est creer ', async()=>{
              const res = await request(app).post('/profilAdd')
                                .send({
                                  "libelle": "SUPERVISEUR"
                                  });
                   expect(res.statusCode).toEqual(response.succes.statut);  
           });
        });  
        
        describe('Modification informations profil utilisateur', ()=>{
               
          it('Retour 400 quand un champ obligatoire est vide !', async()=>{
            const res = await request(app).put('/profilUdpate')
                        .send({
                          id : "",
                          "libelle": ""
                          });
           expect(res.statusCode).toEqual(response.errSaisi.statut);  
          });
  
          it('Retour 404 quand le profil utilisateur est introuvable', async()=>{
            const res = await request(app).put('/profilUdpate')
                              .send({
                                id : 11,
                                "libelle": "SUPERVISEUR"
                                });
                 expect(res.statusCode).toEqual(response.errRessource.statut);  
          }); 
          
          it('Retourne 200 quand le profil utilisateur est mis à jour', async()=>{
            const res = await request(app).put('/profilUdpate')
                         .set('Content-Type', 'application/json')
                         .send({
                          id : 4,
                          "libelle": "SUPERVISEUR NEW"
                          });
            expect(res.statusCode).toEqual(response.succes.statut);  
          });        
         });
    });