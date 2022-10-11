import request     from 'supertest';
import app         from '../common/serveurParams';
import sequelize   from '../bd/cnx'
import {response}  from '../common/retourParams';

describe('Nouvelle suite de test produit', ()=>{

      beforeEach(() => { sequelize; });
      afterEach(() => { sequelize; });

      //liste des utlisateurs
        describe('liste des produits', ()=>{
               //test avec supertest
               it('retourne 404 quand aucun produit est trouvé', async()=>{
                const res = await request(app).get('/produitList');
                expect(res.statusCode).toEqual(response.errRessource.statut);
               });  

               it('retourne 200 quand un produit est trouvé', async()=>{
                const res = await request(app).get('/produitList');
                expect(res.statusCode).toEqual(response.succes.statut);
               });    
        });

        //Insertion d'un utlisateur
        describe('Ajout des produits', ()=>{
            
            it('Retourne 400 quand les valeurs ne sont pas passer', async()=>{
                const res = await request(app).post('/produitAdd')
                                  .send({
                                    "code": "",
                                    "libelle": ""
                                });
                     expect(res.statusCode).toEqual(response.errSaisi.statut);  
            });

            it('Retourne 201 quand le produit existe', async()=>{
                const res = await request(app).post('/produitAdd')
                                  .send({
                                    "code": "CAC40",
                                    "libelle": "CAC40"
                                });
                     expect(res.statusCode).toEqual(response.errRes.statut);  
            });

            it('Retourne 200 lorsque le produit est creer ', async()=>{
              const res = await request(app).post('/produitAdd')
                                .send({
                                    "code": "CAC40",
                                    "libelle": "CAC40"
                                });
                   expect(res.statusCode).toEqual(response.succes.statut);  
           });
        });       
    });