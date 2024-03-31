FROM node:alpine
WORKDIR /app
COPY package.json .
RUN yarn
EXPOSE 8000
COPY . .
CMD ["yarn", "dev", "--debug"]