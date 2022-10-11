import request     from 'supertest';
import app         from '../common/serveurParams';
import sequelize   from '../bd/cnx'
import {response}  from '../common/retourParams';

describe('Nouvelle suite de test produit', ()=>{

      beforeEach(() => { sequelize; });
      afterEach(() => { sequelize; });

      //liste des lignes opérations
        describe('liste des ligne opération', ()=>{
               //test avec supertest
               it('retourne 404 quand aucune ligne operation est trouvé', async()=>{
                const res = await request(app).get('/ligneOperationList');
                expect(res.statusCode).toEqual(response.errRessource.statut);
               });  

               it('retourne 200 quand au moins une ligne operation est trouvé', async()=>{
                const res = await request(app).get('/ligneOperationList');
                expect(res.statusCode).toEqual(response.succes.statut);
               });    
        });

        //Insertion d'une ligne opération
        describe('Ajout des produits', ()=>{
            
            it('Retourne 400 quand les valeurs ne sont pas passer', async()=>{
                const res = await request(app).post('/ligneOperationAdd')
                                  .send({
                                    "code": "",
                                    "libelle": "",
                                    "value": "",
                                    "produit": 1
                                });
                     expect(res.statusCode).toEqual(response.errSaisi.statut);  
            });

            it('Retourne 201 quand la ligne operation existe', async()=>{
                const res = await request(app).post('/ligneOperationAdd')
                                  .send({
                                    "code": "CAC40",
                                    "libelle": "CAC40",
                                    "value": "145",
                                    "produit": 1
                                });
                     expect(res.statusCode).toEqual(response.errRes.statut);  
            });

            it('Retourne 200 lorsque la ligne opération est creer ', async()=>{
              const res = await request(app).post('/ligneOperationAdd')
                                .send({
                                    "code": "CAC40",
                                    "libelle": "CAC40",
                                    "value": "145",
                                    "produit": 1
                                });
                   expect(res.statusCode).toEqual(response.succes.statut);  
           });
        });       
    });