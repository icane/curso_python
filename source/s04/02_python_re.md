
# Expresiones regulares en Python
#### Expresiones regulares en Python

##
Python soporta nativamente expresiones regulares mediante
el módulo ``re``.

~~~python
>>> import re
>>> r = re.compile('a[bc]')
>>> r.match('ab')
<_sre.SRE_Match object; span=(0, 2), match='ab'>
~~~

## Módulo ``re`` (I)

- ``re.compile(patron, flags=0)`` -> Compila expresiones
- ``re.search(patron, string, flags=0)`` -> Busca ``patron`` en cualquier sitio del ``string``
- ``re.match(patron, string, flags=0)`` -> Busca ``patron`` **al principio** del ``string``
- ``re.fullmatch(patron, string, flags=0)`` -> Comprueba que ``string`` concuerda completamente con ``patron``

::: notes
Procedimiento compilación -> matching.
Caching interno de expresiones.
:::


## Módulo ``re`` (II)
- ``re.split(patron, string, max=0, flags=0)`` -> Divide ``string`` cuando se encuentra ``patron``
- ``re.findall(patron, string, flags=0)`` -> Devuelve una lista con todas las coincidencias de ``patron`` en ``string``
- ``re.sub(patron, reempl, string, flags=0)`` -> Reemplaza las apariciones de ``patron`` en ``string``

## Módulo ``re`` (III)

- Flags
    - ``re.I`` / ``re.IGNORECASE``
    - ``re.M`` / ``re.MULTILINE``
    - ``re.S`` / ``re.DOTALL``
- Ejemplo de uso: 

``re.compile(r'[a-z]+', re.I | re.S)``

::: notes
Comentar prefijo r'string'.
:::

## Módulo ``re`` (IV)
- ``re.search``, ``re.match`` y ``re.fullmatch`` devuelven ``None`` 
o un objeto ``Match``
    - ``Match.group(num)`` -> grupo capturado (0 = todo el *match*, resto numerados)
    - ``Match.groups()`` -> todos los grupos
    - ``Match.start()`` y ``Match.end()`` -> Inicio y final de 
    coincidencia (pueden aceptar el núm. del grupo).

## Ejemplos
~~~python
re.sub(r'\. {2,}', '. ' texto)
re.sub(r'(F(ernando|rancisco))', r'Julián (antes \1)', texto, re.I)
re.findall(r'((\d)+,)*(\d+)(\.(\d+))?', texto)
re.split(r'\.\s*', texto)
~~~

## Otras características avanzadas

- *Backreferences*
- Grupos con nombre
- *Lookahead* y *Lookbehind*
- Condicionales
- ...

[https://www.regular-expressions.info/](https://www.regular-expressions.info/){target="_blank"}

## Ejercicios

1. Escribir una función que compruebe que una cadena de caracteres
sólo tiene caracteres de la ``a`` a la ``f``, con un mínimo de 8.

2. Escribir una función que compruebe que todas las iniciales
de una frase son mayúscula.

3. Escribir una función que compruebe que una cadena empieza por
``a``, termina por ``b``, y por el medio tiene al menos una ``o``.

## Ejercicios
4. Escribir una función que reemplace los espacios múltiples en
una cadena de caracteres por un espacio sencillo.

5. Escribir una función que divida una cadena en varias, haciendo corte
cuando aparezcan ``@``, ``|`` o ``;`` al menos 2 veces seguidas.

6. Escribir una función que encuentre minúsculas seguidas de punto y uno 
o varios espacios.

## Ejercicios
7. Escribir una función que encuentre todas las palabras que empiezan por ``a``
y terminan por ``o`` en un texto, sin importar mayúsculas/minúsculas.

8. Escribir una función que reemplace números con el formato ``1,234,567.89`` por 
``1.234.567,89`` en un texto.
