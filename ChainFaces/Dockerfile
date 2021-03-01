FROM node:12.18.1
WORKDIR /usr/src/app
ENV CI=true
COPY package.json ./
RUN npm install
COPY . .
WORKDIR ./client
RUN npm install
WORKDIR /usr/src/app
EXPOSE 80
CMD ["npm", "start"]