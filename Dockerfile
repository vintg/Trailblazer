FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY . /app
ENV LISTEN_PORT 8080
EXPOSE 1337
CMD npm start





