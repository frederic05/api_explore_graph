import request from 'supertest';
import app from '../common/serveurParams';
import sequelize from '../bd/cnx';
import {response}  from '../common/retourParams';

describe('Nouvelle suite de test prifil utilisateur', ()=>{

    beforeEach(() => {
        sequelize;
      });
      
      afterEach(() => {
        sequelize;
      });

        describe('liste des utilisateurs', ()=>{
                it('Retourne 404 quand aucun utilisateur trouvé', async()=>{

                    const res = await request(app).get('/userList');
                                expect(res.statusCode).toEqual(response.errRessource.statut);
                });
               //test avec supertest
                it('Retourn 200 quand au moins un utilisateur est trouvé ', async()=>{
                const res = await request(app).get('/userList');
                        expect(res.statusCode).toEqual(response.succes.statut);
                });
       });

       //Insertion d'un utlisateur
       describe('Ajout des utlisateurs des utilisateurs', ()=>{
               
                it('Retour 400 quand un champ obligatoire est vide !', async()=>{
                  const res = await request(app).post('/userAdd')
                              .send({
                                       firstname: "",
                                       lastname: "",
                                       email: "",
                                       password: "daniel",
                                       login: "daniel@",
                                       status: true
                                   });
                 expect(res.statusCode).toEqual(response.errSaisi.statut);  
                });

                it('Retour 201 quand utilisateur existe', async()=>{
                  const res = await request(app).post('/userAdd')
                                    .send({
                                             firstname: "Nguessan",
                                             lastname: "yapi frederic daniel",
                                             email: "daniel005@gmail.com",
                                             password: "daniel",
                                             login: "daniel@",
                                             status: true
                                         });
                       expect(res.statusCode).toEqual(response.errRes.statut);  
                }); 
                
                it('Retourne 200 quand utilisateur est creer', async()=>{
                  const res = await request(app).post('/userAdd')
                               .send({
                                        firstname: "Nguessan",
                                        lastname: "yapi frederic daniel",
                                        email: "daniel005@gmail.com",
                                        password: "daniel",
                                        login: "daniel@",
                                        status: true
                                    });
                  expect(res.statusCode).toEqual(response.succes.statut);  
                });        
       });

       describe('suite de test authentification utilisateur', ()=>{
        
                it('Retour 400 quand un champ obligatoire est vide !', async()=>{
                  const res =  await request(app).post('/authentification')
                                    .send({
                                      "login": "",
                                      "password": ""
                                  });
                  expect(res.statusCode).toEqual(response.errSaisi.statut); 
                });

                it('Retour 404 quand lors les acces ne sont pas correcte !', async()=>{
                  const res =  await request(app).post('/authentification')
                                    .send({
                                      "login": "tttest",
                                      "password": "ddffrr"
                                  });
                  expect(res.statusCode).toEqual(response.errRessource.statut); 
                });

                it('Retourne 200 quand quand les acces sont bon', async()=>{
                  const res = await request(app).post('/authentification')
                              .send({
                                "login": "rose@",
                                "password": "12345"
                            });
                  expect(res.statusCode).toEqual(response.succes.statut);  
                });

       });
    });