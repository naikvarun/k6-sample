FROM node as builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm install 
COPY ./src ./
RUN npm build

FROM node:slim
WORKDIR /app
COPY --from=builder ./dist/ ./
COPY ./package.json ./
RUN npm install --omit=dev
CMD [ "npm", "run", "start" ]
