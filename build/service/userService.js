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
exports.authenticate = exports.updateUser = exports.addUser = exports.getAll = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const retourParams_1 = require("../common/retourParams");
const userModel_1 = __importDefault(require("../models/userModel"));
const params_1 = __importDefault(require("../common/params"));
//Liste des utilisateurs
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.findAll()
            .then(resultat => {
            if (resultat.length > 0) {
                return res.status(retourParams_1.response.succes.statut).json({ data: resultat });
            }
            else {
                return res.status(retourParams_1.response.errRessource.statut).json({ message: retourParams_1.response.errRessource.message });
            }
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.getAll = getAll;
//Création d'un utilisateur
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, login, status } = req.body;
    if (!firstname || !lastname || !email || !password || !login || !status) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield userModel_1.default.findOne({ where: { email: email } })
            .then(retour => {
            if (retour !== null) {
                return res.status(retourParams_1.response.errRes.statut).json({ message: retourParams_1.response.errRes.message });
            }
            else {
                scriptMdp(password).then(salt => {
                    req.body.password = salt;
                    userModel_1.default.create(Object.assign({}, req.body))
                        .then(result => {
                        if (result !== null) {
                            return res.status(retourParams_1.response.succes.statut).json({ message: retourParams_1.response.succes.message });
                        }
                        else {
                            return res.status(retourParams_1.response.errServeur.statut).json({ message: retourParams_1.response.errServeur.message });
                        }
                    });
                }).catch(error => {
                    return res.status(retourParams_1.response.errServeur.statut).json({ message: retourParams_1.response.errServeur.message });
                });
            }
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.addUser = addUser;
//mises à jour utilisateur
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstname, lastname, email, login, status } = req.body;
    if (!id || !firstname || !lastname || !email || !login || !status) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield userModel_1.default.findOne({ where: { id: id } })
            .then(retour => {
            if (retour !== null) {
                userModel_1.default.update(req.body, { where: { id: id } })
                    .then(result => {
                    if (result !== null) {
                        return res.status(retourParams_1.response.succes.statut).json({ message: retourParams_1.response.succes.message });
                    }
                    else {
                        return res.status(retourParams_1.response.errServeur.statut).json({ message: retourParams_1.response.errServeur.message });
                    }
                });
            }
            else {
                return res.status(retourParams_1.response.errRessource.statut).json({ message: retourParams_1.response.errRessource.message });
            }
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.updateUser = updateUser;
//fonction d'authentification
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(retourParams_1.response.errSaisi.statut).json({ message: retourParams_1.response.errSaisi.message });
    }
    try {
        yield userModel_1.default.findOne({ where: { login: login } })
            .then(resultat => {
            if (resultat !== null) {
                scriptMdp(password)
                    .then(result => {
                    compareScript(password, resultat.password)
                        .then(vresult => {
                        if (vresult) {
                            const token = jsonwebtoken_1.default.sign({
                                id: resultat.id,
                                firstname: resultat.firstname,
                                lastname: resultat.lastname,
                                email: resultat.email,
                                login: resultat.login,
                                status: resultat.status
                            }, (params_1.default.SECRETKEY), { expiresIn: params_1.default.EXPIRE });
                            return res.status(retourParams_1.response.succes.statut).json({ data: token });
                        }
                    }).catch(error => {
                        return res.status(retourParams_1.response.errRessource.statut).json({ message: error });
                    });
                }).catch(error => {
                    return res.status(retourParams_1.response.errRessource.statut).json({ message: error });
                });
            }
            else {
                return res.status(retourParams_1.response.errRessource.statut).json({ message: retourParams_1.response.errRessource.message });
            }
        });
    }
    catch (error) {
        console.log('erreur interne survenue !', error);
    }
});
exports.authenticate = authenticate;
const scriptMdp = (pass) => {
    return bcrypt_1.default.hash(pass, Number(params_1.default.SECRETKEY));
};
const compareScript = (password, spassword) => {
    return bcrypt_1.default.compare(password, spassword);
};
