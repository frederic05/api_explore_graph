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
describe('Nouvelle suite de test prifil utilisateur', () => {
    beforeAll(() => {
        cnx_1.default.authenticate();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        cnx_1.default.close();
    }));
    let tokenData;
    describe('suite de test authentification utilisateur', () => {
        it('Retour 400 quand un champ obligatoire est vide !', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/authentification')
                .send({
                "login": "",
                "password": ""
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errSaisi.statut);
        }));
        it('Retour 404 quand lors les acces ne sont pas correcte !', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/authentification')
                .send({
                "login": "tttest",
                "password": "ddffrr"
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errRessource.statut);
        }));
        it('Retourne 200 quand quand les acces sont bon', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode, body } = yield (0, supertest_1.default)(serveurParams_1.default).post('/authentification')
                .send({
                "login": "rose@",
                "password": "12345"
            });
            tokenData = body;
            expect(statusCode).toEqual(retourParams_1.response.succes.statut);
        }));
    });
    describe('liste des utilisateurs', () => {
        it('Retourne 404 quand aucun utilisateur trouvé', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).get('/userList');
            expect(res.statusCode).toEqual(retourParams_1.response.errRessource.statut);
        }));
        //test avec supertest
        it('Retourn 200 quand au moins un utilisateur est trouvé ', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('TOKEN DATA', tokenData);
            const res = yield (0, supertest_1.default)(serveurParams_1.default).get('/userList')
                .set('Authorization', `Bearer ${tokenData.data}`);
            expect(res.statusCode).toEqual(retourParams_1.response.succes.statut);
            expect(Array.isArray(res.body)).toBeTruthy();
        }));
    });
    //Insertion d'un utlisateur
    describe('Ajout des utlisateurs des utilisateurs', () => {
        it('Retour 400 quand un champ obligatoire est vide !', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/userAdd')
                .send({
                firstname: "",
                lastname: "",
                email: "",
                password: "daniel",
                login: "daniel@",
                status: true
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errSaisi.statut);
        }));
        it('Retour 201 quand utilisateur existe', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/userAdd')
                .send({
                firstname: "Nguessan",
                lastname: "yapi frederic daniel",
                email: "daniel005@gmail.com",
                password: "daniel",
                login: "daniel@",
                status: true
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errRes.statut);
        }));
        it('Retourne 200 quand utilisateur est creer', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/userAdd')
                .send({
                firstname: "Nguessan",
                lastname: "yapi frederic daniel",
                email: "daniel005@gmail.com",
                password: "daniel",
                login: "daniel@",
                status: true
            });
            expect(res.statusCode).toEqual(retourParams_1.response.succes.statut);
        }));
    });
    describe('Modification informations utilisateur', () => {
        it('Retour 400 quand un champ obligatoire est vide !', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).put('/userUpdate')
                .send({
                id: "",
                firstname: "",
                lastname: "",
                email: "",
                login: "daniel@",
                status: true
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errSaisi.statut);
        }));
        it('Retour 404 quand utilisateur introuvable', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).put('/userUpdate')
                .send({
                id: 2,
                firstname: "Nguessan",
                lastname: "yapi frederic daniel",
                email: "daniel005@gmail.com",
                password: "daniel",
                login: "daniel@",
                status: true
            });
            expect(res.statusCode).toEqual(retourParams_1.response.errRessource.statut);
        }));
        it('Retourne 200 quand utilisateur est mis à jour', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(serveurParams_1.default).put('/userUpdate')
                .send({
                id: 30,
                firstname: "Gbamele",
                lastname: "rose NEW",
                email: "rose004@gmail.com",
                login: "rose@",
                status: true
            });
            expect(res.statusCode).toEqual(retourParams_1.response.succes.statut);
        }));
    });
});
