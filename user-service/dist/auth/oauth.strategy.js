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
const passport_1 = __importDefault(require("passport"));
const passport_oauth2_1 = require("passport-oauth2");
// Verificar variáveis de ambiente
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.CALLBACK_URL) {
    throw new Error('Variáveis de ambiente obrigatórias não foram definidas: CLIENT_ID, CLIENT_SECRET ou CALLBACK_URL');
}
const options = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    authorizationURL: process.env.AUTHORIZATION_URL || 'https://provider.com/oauth2/authorize',
    tokenURL: process.env.TOKEN_URL || 'https://provider.com/oauth2/token',
    scope: ['email', 'profile'],
    passReqToCallback: true,
};
passport_1.default.use(new passport_oauth2_1.Strategy(options, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Criar um objeto de usuário com o tipo correto
        // Observe que em um caso real, você buscaria este usuário do banco de dados
        const user = {
            id: '123',
            username: 'exemplo',
            email: 'usuario@exemplo.com',
            password: '$2b$10$examplehashedpassword' // Hash de senha de exemplo
        };
        const pass = "senha";
        //if (user && (await bcrypt.compare(pass, user.password))) {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        return done(error, false);
    }
})));
