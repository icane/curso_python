
# Brevísima intro a HTML
#### Web scraping

##

- HTML: lenguaje de marcado (*markup language*)
- Especificación del W3C
- Base de la web
- Árbol de ``<elementos>`` anidados 
- Los elementos pueden tener atributos, contenido textual
y comentarios
- El espaciado extra se ignora

##
~~~html
<html>
    <head>
        <title>Mi HTML</title>
    </head>
    <body>
        <h1 id="titulo-pagina">Esto es un título</h1>
        <p class="texto-normal">Esto es un párrafo</p>
    </body>
</html>
~~~

## Elementos importantes
- ``html``
    - ``head``
        - ``title``
    - ``body``
        - ``div``
        - ``span``
        - ``p``
        - ``a``
        - ``img``
        - ``h1``, ``h2``, ``h3``...,  ``h6``

::: notes
- Elementos se abren y cierran (o autocierran).
- Explicar que algunos elementos tienen contenido y otros no.
:::

## Tablas
- ``table`` (tabla)
    - ``thead`` (grupo de cabecera, opcional)
    - ``tbody`` (grupo de cuerpo, opcional)
    - ``tr`` (fila)
    - ``th`` (celda de cabecera)
    - ``td`` (celda de contenido)

## Atributos importantes
- ``id`` (único en el documento)
- ``class``
- ``href``
- ``src``

## Selectores CSS (I)
- Sintaxis:
    - ``elemento``
    - ``#id``
    - ``.clase``
    - ``[atributo]``
    - ``[atributo="valor"]``

## Selectores CSS (II)
- Se pueden anidar y combinar:
    - ``body h1``
    - ``p.texto-normal``
    - ``body > p``
    - ``p a[href]``

##
~~~html
<html>
    <head>
        <title>Mi HTML</title>
    </head>
    <body>
        <h1 id="titulo-pagina">Esto es un título</h1>
        <h2>Subtítulo</h2>
        <p class="texto-normal">
            Esto es un párrafo 
            <img src="hola.png" alt="Hola"/>
            <a href="/" class="back-link"><span class="enfasis">Volver</span></a>
        </p>
        <div class="pie">
            Copyright Ticnor 2018.
        </div>
    </body>
</html>
~~~
