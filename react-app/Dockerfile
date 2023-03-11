FROM node:latest
WORKDIR /usr/src/react
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

#CMD ["npm","start"]