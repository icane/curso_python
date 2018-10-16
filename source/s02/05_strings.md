# strings
#### strings

## más sobre strings {.slide: style="font-size: 30px;"}

- un string es una secuencia de caracteres
- se pueden usar comillas simples o dobles
- aunque contenga números, un string es un string
- el operador `+` significa concatenación
- se comparan con `==`
- se pueden convertir strings a números con `int()` o `float()`
- en Python 3, todos los strings son `unicode`
- son **inmutables** (no se pueden modificar)

::: notes
inmutable: para hacer cualquier cambio hay que crear otra string
:::

## indexado y rebanado

indexado: como un vector que empieza en 0

~~~python
fruta = 'plátano'
print fruta[3]
print(len(fruta)) # longitud de la cadena
print fruta[0:5]  # slicing
print fruta[1:]  # slicing hasta el final
~~~

::: notes
- el segundo número: hasta pero no incluido
- si está más allá del final, se para al final
:::

## iteración

~~~~python
fruta = 'plátano'
for letra in fruta:
    print(letra)
~~~~

## in como operador lógico

~~~~python
fruta = 'plátano'
'n' in fruta
~~~~

## string library

- funciones por defecto
- se invocan añadiendolas a la variable

**importante: no modifican el string original, sino que devuelven uno modificado**

## ejemplos

::::::::::::: {.columns}
::: {.column width="60%"}
`find()` busca la primera ocurrencia de un substring

~~~python
fruta = plátano
posicion = fruta.find('ta')
print(pos)
~~~
:::
::: {.column width="40%"}
mayúsculas y minúsculas

~~~python
saludo = 'Hola Miguel'
mins = saludo.lower()
print(mins)
mays = saludo.upper()
print(mays)
~~~
:::
::::::::::::::

::: notes
al comparar strings, primero se transforman a minúsculas
:::

## ejemplos

::::::::::::: {.columns}
::: {.column width="60%"}
buscar reemplazar

~~~python
saludo = 'Hola Miguel'
otro_saludo = saludo.replace('Miguel', 'Pepito')
print(otro_saludo)
~~~
:::
::: {.column width="40%"}
quitar espacios en blanco (stripping)

~~~python
saludo = '  Hola Miguel   '
saludo.lstrip()
saludo.rstrip()
saludo.strip()
~~~
:::
::::::::::::::

::: notes
replace() reemplaza todas las ocurrencias
:::

## ejemplos

prefijos

~~~python
saludo = 'Que tenga un buen día'
saludo.startswith('Que')
~~~

## ejercicio

`From miguel.exposito@apps.cantabria.es Sat Jan  5 09:14:16 2008`

::: notes
~~~~python
atpos = data.find('@')
sppos = data.find(' ',atpos)
host = data[atpos+1 : sppos]
print(host)
~~~~
:::






