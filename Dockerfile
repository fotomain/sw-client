FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

#  docker run -p 3000:3000 sha256:e39be77e1d0686e001a22e46fb34ac3676b08ea1e7c5fee18a1697523ee64317
