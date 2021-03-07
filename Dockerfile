FROM node:14 as deploy
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./.yarnrc.yml .
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

COPY . .
RUN yarn build
ENTRYPOINT [ "yarn", "node", "__sapper__/build" ]