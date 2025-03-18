# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Instala as dependências do projeto e o Nest CLI globalmente
RUN npm install && npm install -g @nestjs/cli

#RUN npm install

# Bundle app source
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "start:prod"]