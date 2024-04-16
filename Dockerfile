FROM hub.yottab.io/library/node:20-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . .

RUN mv /app/entrypoint.sh /entrypoint.sh \
    && chmod 755 /entrypoint.sh \ 
    && npm run build

EXPOSE 5656

ENTRYPOINT ["/entrypoint.sh"]
