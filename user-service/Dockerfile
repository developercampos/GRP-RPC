# Usa a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
#WORKDIR /app

# Copia os arquivos do projeto
#COPY package.json yarn.lock ./

# Instala as dependências
#RUN yarn install --production

# Copia o restante do código
#COPY . .

# Compila o TypeScript
#RUN yarn build

# Expõe a porta da aplicação
#EXPOSE 3000

# Inicia o serviço
#CMD ["yarn", "start:prod"]


WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]