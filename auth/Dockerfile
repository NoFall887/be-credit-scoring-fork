FROM node

ENV HOME /app

WORKDIR $HOME

COPY package.json .
RUN npm install
RUN npm i -g nodemon

COPY . .

# CMD ["nodemon", "./app/index.js"]

CMD ["npm", "run", "dev"]
