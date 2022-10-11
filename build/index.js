"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importation des modules internes
const params_1 = __importDefault(require("./common/params"));
const serveurParams_1 = __importDefault(require("./common/serveurParams"));
const cnx_1 = __importDefault(require("./bd/cnx"));
//connexion à la base de données
cnx_1.default.authenticate()
    .then(() => { console.log('application connected database with succes !'); })
    .catch(err => console.log('data base connected error !', err));
//demarrage du serveur
try {
    serveurParams_1.default.listen(params_1.default.PORT, () => console.log(`serveur listen: http://${params_1.default.ADRESS}:${params_1.default.PORT}`));
}
catch (error) {
    console.log(`Error occurred: ${error}`);
}
