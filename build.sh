#!/bin/sh
cat source/$1/*.md | \
pandoc -t revealjs -f markdown -s - --css ../css/estilo.css  \
 -o slides/$1.html
