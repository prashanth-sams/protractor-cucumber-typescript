#!/bin/bash

docker pull prashanthsams/node-jake-runner:2.0

docker run --name Test01 --rm -t -v $(pwd):/workspace/ \
-u $(id -u ${USER}):$(id -g ${USER}) \
prashanthsams/node-jake-runner:2.0 \
-c "export HOME=/workspace && npm install && npm run webdriver-update && npm test"