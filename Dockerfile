FROM node:argon

RUN mkdir /japura-www

ADD package.json /japura-www/

WORKDIR /japura-www

RUN npm install

COPY . /japura-www/


EXPOSE 3000

ENV NODE_ENV production
ENV DB_SERVER mongodb

CMD ["node","app.js"]


