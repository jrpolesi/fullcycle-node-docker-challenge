FROM node:21

WORKDIR /home/app

RUN \
  apt update && \
  apt install -y wget netcat-traditional && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

COPY . /home/app

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]