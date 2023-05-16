FROM node:16.15.0-alpine as dependencies
WORKDIR /app
RUN chown -R node:node /app
USER node

COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:16.15.0-alpine as runner
WORKDIR /app
RUN chown -R node:node /app
RUN apk update && apk add tzdata && ln -fs /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
USER node

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build

EXPOSE 6001

CMD ["yarn", "start:server"]