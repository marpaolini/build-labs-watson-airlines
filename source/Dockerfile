# ------------------------------
# Stage 1: Application Building
# ------------------------------

# DOKERFILE REFERENCE: https://docs.docker.com/engine/reference/builder/

# Import NodeJS image
FROM --platform=linux/amd64 node:current-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY . .
COPY back-end/package*.json ./back-end
RUN cd back-end && mv node_modules ../ && npm install 

# Bundle app source


# ------------------------------
# Stage 2: Application Running
# ------------------------------

# especificacion de puerto
EXPOSE 3001

# Run application
CMD [ "node", "back-end/app.js" ]