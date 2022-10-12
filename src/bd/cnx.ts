//definition ded paramtres de connexion à la base de données

import {Dialect, Sequelize } from "sequelize";
import appParams from '../common/params'
//importation des variables de connection à la base de données 
const bdName     = appParams.BDname as string
const bdUsername = appParams.BDuserName as string
const bdPassword = appParams.BDpassWord
const bdHostname = appParams.BDhostName
const dbDriver   = appParams.BDdriver as Dialect
const bdPort     = appParams.BDport 

const sequelize = new Sequelize(bdName, bdUsername, bdPassword, {
    host   : bdHostname,
    dialect: dbDriver,
    port   : Number(bdPort) || 5432,
    pool   : {
               min: 0,
               max: 5,
               acquire: 30000,
               idle: 10000,
    }
});

/*(async () => {
    await sequelize.sync({ alter: false })
                   .then(res => console.log("synchronisation effectuée avec succes !"))
                   .catch(err => console.log("error synchronisation !", err));
  })();*/

export default sequelize;