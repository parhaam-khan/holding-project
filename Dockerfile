FROM hub.yottab.io/library/bitnami/node:20.0.0

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . .

RUN mv /app/entrypoint.sh /entrypoint.sh \
    && chmod 755 /entrypoint.sh \
    && npm run build

EXPOSE 5656

ENTRYPOINT ["/entrypoint.sh"]
