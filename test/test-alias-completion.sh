#!/bin/bash

[ "$#" -lt "1" ] && echo 'Alias name not specified' && exit 1

# load alias completion
source "$HOME/.nca/completion.sh"

ALIAS_NAME="$1"

COMP_WORDS=()
COMP_LINE=""

for arg in "$@"; do
    # wrap arguments that contain one or more spaces between quotes
    if [[ "$arg" == *" "* ]]; then
        sanitizedArg="\"$arg\""
    else
        sanitizedArg="$arg"
    fi

    COMP_LINE="$COMP_LINE$sanitizedArg "

    COMP_WORDS+=("$sanitizedArg")
done

# adds an empty character because completion is triggered
# inserting a space followed by pressing tab character
COMP_WORDS+=("")

COMP_POINT=${#COMP_LINE}

# COMP_CWORD index = COMP_WORDS.length -1
COMP_CWORD=$(( ${#COMP_WORDS[@]} - 1 ))


# run with export DEBUG=true; ./test-alias-completion.sh
if [ "$DEBUG" = true ]; then
    printf "\n--------\n"
    printf "input args:  "
    printf "'%s' " "$@"
    printf "\n--------\n"
    printf "'%s' " "${COMP_WORDS[@]}"
    printf "\n--------\n"
    printf "comp line: %s" "${COMP_LINE}"
    printf "\n--------\n"
    printf "alias name %s, comp cword %s" "$ALIAS_NAME" "$COMP_CWORD"
    printf "\n--------\n"
fi


# invoke alias completion
"_nca_${ALIAS_NAME}_yargs_completions"

# print completion
printf '%s\n' "${COMPREPLY[@]}"
