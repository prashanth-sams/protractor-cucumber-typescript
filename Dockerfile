FROM node:latest

LABEL maintainer="Prashanth Sams"

RUN npm install -g jake

RUN mkdir /workspace
WORKDIR /workspace

ENTRYPOINT ["/bin/bash"]