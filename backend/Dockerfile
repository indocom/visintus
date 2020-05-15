FROM node:12.16.0

# Create app directory
WORKDIR /app/backend

# Install Dependencies
COPY package.json ./

# # install git before npm i
# RUN apk add --no-cache git
# ENTRYPOINT ["git"]

RUN yarn install

# add app bundle
COPY . .

EXPOSE 8080

# start app
CMD ["yarn", "dev"]