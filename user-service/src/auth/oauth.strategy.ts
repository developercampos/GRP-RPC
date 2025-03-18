import { Request } from 'express';
import passport from 'passport';
import { Strategy as OAuth2Strategy, StrategyOptionsWithRequest } from 'passport-oauth2';
import bcrypt from 'bcrypt';

// Definir interface para o tipo de usuário
interface User {
  id?: string;
  username?: string;
  email?: string;
  password: string; // A propriedade password é obrigatória para o bcrypt.compare
  // Outras propriedades que seu usuário possa ter
}

// Verificar variáveis de ambiente
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.CALLBACK_URL) {
  throw new Error('Variáveis de ambiente obrigatórias não foram definidas: CLIENT_ID, CLIENT_SECRET ou CALLBACK_URL');
}

const options: StrategyOptionsWithRequest = {
  clientID: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  callbackURL: process.env.CALLBACK_URL!,
  authorizationURL: process.env.AUTHORIZATION_URL || 'https://provider.com/oauth2/authorize',
  tokenURL: process.env.TOKEN_URL || 'https://provider.com/oauth2/token',
  scope: ['email', 'profile'],
  passReqToCallback: true,
};

passport.use(new OAuth2Strategy(options, 
  async (req: Request, accessToken: string, refreshToken: string, profile: any, done: Function) => {
    try {
      // Criar um objeto de usuário com o tipo correto
      // Observe que em um caso real, você buscaria este usuário do banco de dados
      const user: User = { 
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
    } catch (error) {
      return done(error, false);
    }
  })
);