#!/bin/sh
cat source/$1/*.md | \
pandoc -t revealjs -f markdown -s - --css ../css/estilo.css  \
 -o slides/$1.html

cat source/$1/*.md | grep -v theme | sed 's/incremental/.theme/' | \
pandoc -t beamer -f markdown -s - -o slides/$1.pdf
