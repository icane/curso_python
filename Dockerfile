FROM haskell:latest

# install latex packages
RUN apt-get update -y \
 && apt-get install -y -o Acquire::Retries=10 --no-install-recommends \
    texlive-latex-base \
    texlive-xetex latex-xcolor \
    texlive-math-extra \
    texlive-latex-extra \
    texlive-fonts-extra \
    texlive-bibtex-extra \
    fontconfig \
    lmodern

ARG PANDOC_VERSION="2.5"
ENV BUILD_VERSION=$PANDOC_VERSION

# install pandoc
RUN cabal update && cabal install pandoc-${BUILD_VERSION}

WORKDIR /source

ENTRYPOINT ["/root/.cabal/bin/pandoc"]
CMD ["--help"]
