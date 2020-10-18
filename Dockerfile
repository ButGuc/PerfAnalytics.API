FROM node:13.12.0-alpine

ENV NODE_ENV=production \
    NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH

RUN apk add --no-cache tini

RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --only=production

RUN npm cache clean --force

COPY --chown=node:node . ./

COPY --chown=node:node .env ./

EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]

CMD sed -i "s/#PORT/$PORT/g" .env && npm run pretypeorm && npm run typeorm migration:run && npm start
