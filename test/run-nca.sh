#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then set -o xtrace; fi
export SHELLOPTS

cd "$(dirname "$0")"

cd ..

FILE=$(readlink -f ./test/test-config.yml)
ncaMainConfigFilePath="$FILE" node ./dist/index.js $@
