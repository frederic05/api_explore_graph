//importation des modules internes
import appParams from './common/params';
import app       from './common/serveurParams';
import sequelize from './bd/cnx';

//connexion à la base de données
sequelize.authenticate()
.then(()=>{ console.log('application connected database with succes !') })
.catch(err => console.log('data base connected error !', err));

//demarrage du serveur
try {
    app.listen(appParams.PORT, ()=> console.log(`serveur listen: http://${appParams.ADRESS}:${appParams.PORT}`));
} catch (error) {
    console.log(`Error occurred: ${error}`);
}
