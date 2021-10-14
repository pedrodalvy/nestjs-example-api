FROM node:16-alpine3.12

RUN apk add --no-cache bash

ADD .docker/entrypoint.sh /usr/local/bin/
RUN ["chmod", "+x", "/usr/local/bin/entrypoint.sh"]
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

USER node

WORKDIR /home/node/app
