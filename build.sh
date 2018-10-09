#!/bin/sh
cat source/s01/*.md | \
pandoc -t revealjs -f markdown -s - --css ../css/estilo.css  \
 -o slides/s01.html
