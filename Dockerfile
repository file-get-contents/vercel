FROM node:lts

ARG USERNAME=node
ARG UID=1000

RUN apt-get update\
    && apt-get install -y 

COPY . /home/${USERNAME}/next
RUN chown -R node:node /home/${USERNAME}/next
RUN npm i -g vercel