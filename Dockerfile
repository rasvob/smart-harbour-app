FROM node:21.5
WORKDIR /app
COPY package.json /app
RUN npm install
COPY  . /app
CMD ["npx", "vite", "build"]
