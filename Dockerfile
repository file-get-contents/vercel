FROM node:lts

ARG USERNAME=node
ARG UID=1000

RUN apt-get update\
    && apt-get install -y 

RUN echo root:0405 | chpasswd


#RUN useradd -m -s /bin/bash -d /home/${USERNAME} -u ${UID} -g users ${USERNAME}

COPY . /home/${USERNAME}/vite
RUN chown -R node:node /home/${USERNAME}/vite
