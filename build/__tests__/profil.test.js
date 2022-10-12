"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const serveurParams_1 = __importDefault(require("../common/serveurParams"));
const cnx_1 = __importDefault(require("../bd/cnx"));
const retourParams_1 = require("../common/retourParams");
describe('Nouvelle suite de test profil utilisateur', () => {
    beforeEach(() => { cnx_1.default; });
    afterEach(() => { cnx_1.default; });
    //liste des utlisateurs
    describe('list profil des utilisateurs', () => {
        //test avec supertest
        it('retourne 404 quand aucun profil est trouvé', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).get('/profilList');
            expect(res.statusCode).toEqual(retourParams_1.response.errRessource.statut);
        }));
        it('retourne 200 quand un profil est trouvé', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).get('/profilList');
            expect(res.statusCode).toEqual(retourParams_1.response.succes.statut);
        }));
    });
    //Insertion d'un utlisateur
    describe('Ajout profil des utilisateurs', () => {
        it('Retourne 400 quand les valeurs ne sont pas passer', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/profilAdd')
                .send({
                "libelle": ""
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errSaisi.statut);
        }));
        it('Retourne 201 lorsque le profil utilisateur existe', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/profilAdd')
                .send({
                "libelle": "SUPERVISEUR"
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errRes.statut);
        }));
        it('Retourne 200 lorsque le profil utilisateur est creer ', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/profilAdd')
                .send({
                "libelle": "SUPERVISEUR"
            });
            expect(res.statusCode).toEqual(retourParams_1.response.succes.statut);
        }));
    });
    describe('Modification informations profil utilisateur', () => {
        it('Retour 400 quand un champ obligatoire est vide !', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).put('/profilUdpate')
                .send({
                id: "",
                "libelle": ""
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errSaisi.statut);
        }));
        it('Retour 404 quand le profil utilisateur est introuvable', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).put('/profilUdpate')
                .send({
                id: 11,
                "libelle": "SUPERVISEUR"
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errRessource.statut);
        }));
        it('Retourne 200 quand le profil utilisateur est mis à jour', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).put('/profilUdpate')
                .send({
                id: 4,
                "libelle": "SUPERVISEUR NEW"
            });
            expect(res.statusCode).toEqual(retourParams_1.response.succes.statut);
        }));
    });
});
