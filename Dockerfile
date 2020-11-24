FROM node:15.2.1

LABEL maintainer="Prashanth Sams"

RUN apt-get update
RUN apt-get install -y

RUN npm install -g jake

RUN mkdir /workspace
WORKDIR /workspace

ENTRYPOINT ["/bin/bash"]