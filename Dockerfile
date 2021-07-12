FROM node:14-alpine

WORKDIR /app
EXPOSE 3000

COPY . ./
RUN yarn --frozen-lockfile
RUN yarn workspaces run build

CMD node packages/backend/dist/index.js