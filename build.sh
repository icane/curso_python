#!/bin/sh

if [[ $# -eq 0 ]] ; then
    echo './build.sh s0N'
    exit 0
fi

echo "Generating revealjs slides for $1..."
cat source/$1/*.md | \
pandoc -t revealjs -f markdown -s - --css ../css/estilo.css  \
 -o slides/$1.html


# req: texlive-{core,fontsextra,latexextra}
echo "Generating pdf document for $1..."
cat source/$1/*.md \
| sed 's/incremental/.dummy/i;
 s/theme: solarized/fontsize: 8pt/i;
 s/\.svg/\.png/i;
 s/\(.*\)\(code\/.*\)/\1https:\/\/icane.github.io\/curso_python\/slides\/\2/'\
| pandoc -t beamer -f markdown -s --toc --toc-depth 2 - -o slides/$1.pdf \
&& pdfnup slides/$1.pdf --nup 1x2 --no-landscape --paper a4 --frame true \
 --scale 0.9 --keepinfo -o slides --suffix "nup" --quiet \
&& mv slides/$1{-nup,}.pdf

