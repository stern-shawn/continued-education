FROM node:alpine

# Workaround for react-scripts messing with react in docker
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
