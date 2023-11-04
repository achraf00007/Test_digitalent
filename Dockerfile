FROM node:16.13.0
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . /usr/src/nuxt-app
RUN npm install
RUN npm run build
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000
CMD ["npm", "start"]

# docker build -t digitalent .
# docker run -p 5000:5000 digitalent