# tuples & files
#### tuples & files

## tuples

un tipo de secuencia similar a una lista... pero inmutable

::::::::::::: {.columns}
::: {.column width="50%"}
~~~python
x = [9, 8, 7]
x[2] = 6
print(x)
~~~
:::
::: {.column width="50%"}
~~~python
z = (5, 4, 3)
z[2] = 0
~~~
:::
::::::::::::::

## ¿qué no se puede hacer?

- sort
- append
- reverse

## lists vs tuples

- las tuplas son más eficientes (memoria y rendimiento)
- se pueden usar como un diccionario sin claves
- se suelen usar dentro de listas
- son comparables elemento a elemento

**no se pueden añadir ni eliminar elementos**

## asignación

~~~~python
(x,y) = (4, 'Pepe')
print(y)
~~~~

## ficheros

- un fichero de texto puede verse como una secuencia de líneas
- para abrirse, se crea un apuntador para manipularlo

~~~~python
my_file = open('prueba.txt')
for line in my_file:
    print(line.rstrip())
~~~~

