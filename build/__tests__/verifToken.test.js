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
const serveurParams_1 = __importDefault(require("../common/serveurParams"));
const supertest_1 = __importDefault(require("supertest"));
describe('Suite de test verification token', () => {
    let req = {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImZpcnN0bmFtZSI6IkdiYW1lbGUiLCJsYXN0bmFtZSI6InJvc2UiLCJlbWFpbCI6InJvc2UwMDRAZ21haWwuY29tIiwibG9naW4iOiJyb3NlQCIsInN0YXR1cyI6dHJ1ZSwiaWF0IjoxNjY1NTgyNjExLCJleHAiOjE2NjU1ODI2MTR9.tTroHDz1MMhPzKzWNg3y6kthRL0dHKsOSshQvWYBWCY"
        }
    };
    //test avec supertest
    it('retourne 401 si le token est invalide ou null', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(serveurParams_1.default).post('/verificationToken')
            .send(req);
        expect(res.statusCode).toEqual(401);
    }));
});
