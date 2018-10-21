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
fruit = 'plátano'
print fruit[3]
print(len(fruit)) # longitud de la cadena
print fruit[0:5]  # slicing
print fruit[1:]  # slicing hasta el final
~~~

::: notes
- el segundo número: hasta pero no incluido
- si está más allá del final, se para al final
:::

## iteración

~~~~python
fruit = 'plátano'
for letra in fruit:
    print(letra)
~~~~

## in como operador lógico

~~~~python
fruit = 'plátano'
'n' in fruit
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
fruit = plátano
pos = fruit.find('ta')
print(pos)
~~~
:::
::: {.column width="40%"}
mayúsculas y minúsculas

~~~python
greeting = 'Hola Miguel'
mins = greeting.lower()
print(mins)
mays = greeting.upper()
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
greeting = 'Hola Miguel'
another_greeting = greeting.replace('Miguel', 'Pepito')
print(another_greeting)
~~~
:::
::: {.column width="40%"}
quitar espacios en blanco (stripping)

~~~python
greeting = '  Hola Miguel   '
greeting.lstrip()
greeting.rstrip()
greeting.strip()
~~~
:::
::::::::::::::

::: notes
replace() reemplaza todas las ocurrencias
:::

## ejemplos

prefijos

~~~python
greeting = 'Que tenga un buen día'
greeting.startswith('Que')
~~~

## ejercicio

`From miguel.exposito@apps.cantabria.es Sat Jan  5 09:14:16 2008`

::: notes
~~~~python
data = 'From miguel.exposito@apps.cantabria.es Sat Jan  5 09:14:16 2008'
atpos = data.find('@')
sppos = data.find(' ',atpos)
host = data[atpos+1 : sppos]
print(host)
~~~~
:::

