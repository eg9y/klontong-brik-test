FROM node:18

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "dev"]