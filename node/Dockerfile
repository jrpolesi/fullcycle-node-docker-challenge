FROM node:21

WORKDIR /home/app

COPY . /home/app

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]