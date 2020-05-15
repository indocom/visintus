FROM node:12.16.0

WORKDIR /app/webclient

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/webclient/node_modules/.bin:$PATH

COPY package.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]