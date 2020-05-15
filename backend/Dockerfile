FROM node:12.16-alpine

# Create app directory
WORKDIR /app

# Install Dependencies
COPY package.json ./
RUN npm install

# add app bundle
COPY . .

EXPOSE 8080

# start app
CMD ["npm", "run", "dev"]