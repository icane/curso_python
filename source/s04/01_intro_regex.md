---
title: Python 101
subtitle: Sesión 4
author: Alejandro Villar (avillar@ticnor.es)
date: 23 Octubre 2018
revealjs-url: ..
theme: solarized
transition: fade
transitionSpeed: fast
slideNumber: true
keywords: [python, intro, s04, regex, scraping]
---

# Expresiones regulares
#### Expresiones regulares

## Qué es una Expresión regular

- Expresión regular (regex, regexp): Patrón de búsqueda de texto
- Ejemplo:
    - ``b{2,5}`` -> "Entre 2 y 5 veces 'b'"
    - ``\. +`` -> "Un punto seguido de uno o más espacios"

## Conceptos básicos (I)

- Alternación (una cosa u otra)
    - Ejemplo: ``gris|verde``
- Agrupación (juntas cosas)
    - Ejemplo: ``s(o|ó)lo``
- Comodín (el punto):
    - Ejemplo: ``s.lo``
- Caractere especiales: ¡escapar con ``\``!

## Conceptos básicos (II)

- Cuantificación (una cosa n veces)
    - ``?`` = "cero o una veces"
    - ``*`` = "cero o más veces"
    - ``+`` = "una o más veces"
    - ``{n}`` = "n veces"
    - ``{n,}`` = "n o más veces"
    - ``{n,m}`` = "entre n y m veces"

## Conceptos básicos (III)

- Clases de caracteres:
    - ``[abc]`` = "'a' o 'b' o 'c'"
    - ``[a-z]`` = "carácter de la 'a' a la 'z'"
    - ``[a-z0-9]`` = "'a' a la 'z' o '0' a '9'"
    - ``[^a-z]`` = "carácter que no es de la 'a' a la 'z'"

## Conceptos básicos (IV)

- Clases de caracteres:
    - ``\s`` = ``[ \t\n\r\f]`` = espacio
    - ``\d`` = ``[0-9]`` = dígito
    - ``\w`` = ``[A-Za-z0-9_]`` = carácter de palabra
    - En mayúsculas -> negados
- Otros caracteres especiales:
    - ``^`` = "principio de línea"
    - ``$`` = "final de línea"

## Ejemplos

~~~awk
H[aäe]nsel
¡Go+l!
(No m|M)e gusta Python
Mi [mp]adre tiene \d+ años
[a-z0-9]{4,8}
^(python|java)$
~~~

## Grupos y capturas

- Los paréntesis crean grupos que el motor "captura"
- Ejemplo:
    - ``Nueva (York|Inglaterra|Montaña)``
    - ``((Facultad|Escuela( Técnica Superior)?)) de (Medicina|Enfermería|Ingeniería)``
- Grupos capturados -> Extracción, reemplazo, etc.

::: notes
Comentar ?: para no capturar
:::

## Problemas (I)

- Difíciles de entender para humanos (write-only)
    - [https://regex101.com/](https://regex101.com/){target="_blank"}
- No valen para todo
    - Sólo lenguajes regulares
    - Pueden llegar a ser muy complejas

## Problemas (II)

Validación de email:

~~~
\A(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])\z
~~~

::: notes
Sintaxis "preferida", RFC 1035
:::
