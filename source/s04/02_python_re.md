
# Expresiones regulares en Python
#### Expresiones regulares en Python

##
Python soporta nativamente expresiones regulares mediante
el módulo ``re``

~~~python
>>> r = re.compile('a[bc]')
>>> r.match('ab')
<_sre.SRE_Match object; span=(0, 2), match='ab'>
~~~

## Módulo ``re`` (I)

- ``re.compile(patron, flags=0)``
- ``re.search(patron, string, flags=0)``
- ``re.match(patron, string, flags=0)``
- ``re.split(patron, string, max=0, flags=0)``
- ``re.findall(patron, string, flags=0)``
- ``re.sub(patron, reempl, string, flags=0)``

::: notes
Procedimiento compilación -> matching.
Caching interno de expresiones.
:::

## Módulo ``re`` (II)

- Flags
    - ``re.I`` / ``re.IGNORECASE``
    - ``re.M`` / ``re.MULTILINE``
    - ``re.S`` / ``re.DOTALL``
- Ejemplo de uso: 

``re.compile(r'[a-z]+', re.I | re.S)``

::: notes
Comentar prefijo r'string'.
:::

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
