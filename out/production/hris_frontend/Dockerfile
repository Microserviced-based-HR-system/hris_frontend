# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.10-alpine as build
WORKDIR /reactApp
ENV PATH /reactApp/node_modules/.bin:$PATH
COPY ./package.json ./yarn.lock /reactApp/
RUN yarn
COPY . /reactApp
RUN yarn cache clean --force && yarn build

# Stage 1, based on Nginx, to have only the compiled reactApp, ready for production with Nginx
FROM nginx:1.17.8-alpine
COPY --from=build /reactApp/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]