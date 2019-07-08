FROM node AS build
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build/ .
