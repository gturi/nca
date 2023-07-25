#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then set -o xtrace; fi
export SHELLOPTS

cd "$(dirname "$0")"

cd ..

FILE=$(readlink -f ./test/test-config.yml)
export ncaMainConfigFilePath="$FILE"

# shellcheck disable=SC2068
# SC2068 is not relevant since $@ needs to expand to multiple words
./bin/nca $@
