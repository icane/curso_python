#!/bin/sh

if [[ $# -eq 0 ]] ; then
    echo './build.sh s0N'
    exit 0
fi

echo "Generating revealjs slides for $1..."
cat source/$1/*.md | \
pandoc -t revealjs -f markdown -s - --css ../css/estilo.css  \
 -o slides/$1.html

echo "Generating pdf document for $1..."
cat source/$1/*.md | grep -v solarized | \
sed 's/incremental/.dummy/i;
 s/\(.*\)\(code\/.*\)/\1https:\/\/icane.github.io\/curso_python\/slides\/\2/'\
| pandoc -t beamer -f markdown -s - -o slides/$1.pdf

