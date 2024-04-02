FROM hub.yottab.io/library/node:18-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . .

RUN mv /app/entrypoint.sh /entrypoint.sh \
    && chmod 755 /entrypoint.sh \ && npm install
    && npm run build

EXPOSE 5656

ENTRYPOINT ["/entrypoint.sh"]
