FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY . /app
EXPOSE 1337
CMD npm start





