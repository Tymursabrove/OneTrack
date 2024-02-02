# Build Image
FROM node:19 as builder

# ENV NODE_ENV production
ENV VITE_ONE_BACKEND_API https://app-api.one-track.io/

WORKDIR /usr/src/app

# Copy package json
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Deployment image
FROM node:19

ENV NODE_ENV production

WORKDIR /usr/src/app

# Copy needed data
COPY package*.json ./

# Copy from builder image
COPY --from=builder /usr/src/app/build/ build/
COPY --from=builder /usr/src/app/node_modules/ node_modules/
COPY server/server.js server/server.js
COPY server/handlers.js server/handlers.js
COPY server/countryCodesHelper.js server/countryCodesHelper.js

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
