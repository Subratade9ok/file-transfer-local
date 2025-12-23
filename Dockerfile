FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:css
EXPOSE 3000
CMD ["node", "src/server.js"]
