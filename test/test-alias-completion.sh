#!/bin/bash

# load completion
source "$HOME/.nca/completion.sh"

COMP_WORDS=(mainAlias)
COMP_LINE='mainAlias'
COMP_POINT=${#COMP_LINE}
COMP_CWORD=1

_nca_yargs_completions

# print completion
printf '%s\n' "${COMPREPLY[@]}"
