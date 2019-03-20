#!/bin/bash

if [[ $# -eq 0 ]] || [[ ! $1 =~ (s0[1-6]|index)$ ]] ; then
  echo './build.sh [ s0N [pdf] | index ]'
  exit 0
fi

if [[ $1 = index ]] ; then
  echo "Generating index..."
  docker run --rm -i -v `pwd`:/source pandoc -t revealjs -f markdown \
    -s source/index.md --css css/estilo.css -o index.html
  exit 0
fi

if [[ $# -eq 1 ]]; then
  echo "Generating revealjs slides for $1..."
  cat source/$1/*.md > source/temp.md
  docker run --rm -i -v `pwd`:/source pandoc -t revealjs -f markdown \
    -s source/temp.md --css ../css/estilo.css --slide-level=2 \
    -o slides/$1.html
  rm source/temp.md
fi

# req: texlive-{core,fontsextra,latexextra}
if [[ $2 = pdf ]]; then
  echo "Generating pdf document for $1..."
  cat source/$1/*.md \
  | sed 's/incremental/.dummy/i;
s/theme: solarized/fontsize: 8pt/i;
s/\.svg/\.png/i;
s/\(.*\)\(code\/.*\)/\1https:\/\/icane.github.io\/curso_python\/slides\/\2/' \
  > source/temp.md
  docker run --rm -i -v `pwd`:/source pandoc -t beamer -f markdown \
    -s source/temp.md -o slides/$1.pdf && \
    --toc --toc-depth 2
  pdfnup slides/$1.pdf --nup 1x2 --no-landscape --paper a4 --frame true \
    --scale 0.9 --keepinfo -o slides --suffix "nup" --quiet && \
  mv slides/$1{-nup,}.pdf
  rm source/temp.md
fi
