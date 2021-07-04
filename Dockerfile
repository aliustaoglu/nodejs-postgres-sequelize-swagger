FROM node:12.13.0-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install
# Generate swagger document
RUN npm run genswag

# Sync Postgres database schema
RUN npm run dbsync 

EXPOSE 3000
CMD [ "npm", "run", "pm2" ]