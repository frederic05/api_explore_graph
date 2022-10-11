"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
exports.response = {
    errSaisi: {
        statut: 400,
        message: "Vueillez saisir tous les champs obligatoire !"
    },
    errRessource: {
        statut: 404,
        message: "La ressource demandée est introuvable!"
    },
    errServeur: {
        statut: 500,
        message: "erreur interne du serveur !"
    },
    errServeurAuthorise: {
        statut: 401,
        message: "Une autherisation est requise !"
    },
    succes: {
        statut: 200,
        message: "Enregistrement effectué avec succès !"
    },
    errRes: {
        statut: 201,
        message: "cette ressouce existe!"
    }
};
