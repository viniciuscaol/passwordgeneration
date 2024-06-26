# Usar uma imagem base oficial do Node.js
FROM node:14

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código do aplicativo para o diretório de trabalho
COPY . .

# Expor a porta em que o aplicativo será executado
EXPOSE 80

# Comando para iniciar o aplicativo
CMD ["node", "server.js"]
