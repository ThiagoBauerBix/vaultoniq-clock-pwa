FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build

RUN apk --no-cache add curl

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
