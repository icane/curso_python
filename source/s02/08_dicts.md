# dicts
#### dicts

## definición

- también son colecciones de elementos
- permiten realizar operaciones similares a las de las bases de datos
- también llamados arrays asociativos, son la colección más potente en Python
- **no son ordenados**
- sus elementos no se indexan con un número, sino con una etiqueta de búsqueda

## ejemplo
~~~python
ages = dict()
ages['miguel'] = 37
ages['pepito'] = 88
ages['carmen'] = 25
print(ages)

ages['pepito'] = ages['pepito'] + 2
print(ages)
~~~

## lists vs dicts

::::::::::::: {.columns}
::: {.column width="50%"}
~~~python
my_list = list()
my_list.append(21)
my_list.append(183)
print(my_list)
my_list[0] = 23
print(my_list)
~~~
:::
::: {.column width="50%"}
~~~python
my_dict = dict()
my_dict['edad'] = 21
my_dict['curso'] = 183
print(my_dict)
my_dict['edad'] = 23
print(my_dict)
~~~
:::
::::::::::::::

## diccionarios con literales

~~~~python
shopping_list = {'patatas': 3, 'york': 100, 'yogur': 6}
~~~~

se puede crear un diccionario vacío así: 

~~~~python
empty_dict = {}
~~~~

## uso común: múltiples contadores

~~~~python
names = {}
names['Paco'] = 1
names['Pepe'] = 1
print(names)
names['Paco'] = names['Paco'] + 1
print(names)
~~~~

## cuidado cuando la clave no existe

si se utiliza una clave que no existe, aparecerá un error

Solución: `get()`

~~~~python
counts = {}
counts['mesa'] = counts.get('mesa', 0) + 1
counts['silla'] = counts.get('silla', 0) + 1
print(counts)
counts['mesa'] = counts.get('mesa', 0) + 1
print(counts)
~~~~

## iteración en diccionarios

~~~~python
counts = {'mesa': 2, 'silla': 4, 'reposapies': 3}
for key in counts:
    print(key, counts[key])
~~~~

~~~~python
counts = {'mesa': 2, 'silla': 4, 'reposapies': 3}
for key, value in counts.items():
    print(key, value)
~~~~

## obtener claves y valores

~~~~python
counts = {'mesa': 2, 'silla': 4, 'reposapies': 3}
print(counts.keys())
print(counts.values())
print(counts.items())
~~~~

## contar palabras

- hacer split del texto en palabras
- iterar a lo largo de las palabras
- usar un diccionario para contar cada palabra de forma independiente

## ejercicio
Contar el número de ocurrencias de cada palabra en la siguiente frase:

>Tanto monta, monta tanto, Isabel como Fernando.

OJO! Comas y mayúsculas...

::: notes
~~~~python
counts = dict()
text = 'Tanto monta, monta tanto, Isabel como Fernando.'
text = text.replace(',', '')
text = text.lower()
words = text.split()
for word in words:
    counts[word] = counts.get(word, 0) + 1
print('Cuenta:', counts )
~~~~
:::

## ejercicio avanzado

Obtener una lista con los nombres de proveedor ordenados por prioridad.

**Sugerencia**: usar funciones anónimas ([lambda](https://www.w3schools.com/python/python_lambda.asp))

~~~~python
providers = {
 'places': {
    'priority': 1,
    'eligible': False
 },
 'google': {
    'priority': 2,
    'eligible': True
 }, 
 'bing': {
    'priority': 4,
    'eligible': False

 }, 
 'mapbox': {
     'priority': 3,
    'eligible': True
 }
}
~~~~

