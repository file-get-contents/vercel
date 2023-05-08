FROM node:lts

ARG USERNAME=node
ARG UID=1000

RUN apt-get update\
    && apt-get install -y 

COPY . /home/${USERNAME}/vite
RUN chown -R node:node /home/${USERNAME}/vite
