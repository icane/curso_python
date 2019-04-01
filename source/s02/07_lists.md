# lists
#### lists

## definición

`[5, 89, 'Miguel']`

- colecciones de elementos
- un elemento puede ser cualquier tipo de objeto
- una lista puede estar vacía
- son mutables: se puede cambiar un elemento usando el operador índice
- son **ordenadas**

## indexado, rebanado y longitud
~~~python
my_list = [5, 12, 21, 40, 68]
print(my_list[1]) # indexado
my_list[1] = 7 # mutabilidad
print(my_list)
print(my_list[2:3]) # rebanado
print(len(my_list)) # longitud
~~~

## rangos

devuelven una my_list de números en el intervalo [0,N-1]

~~~python
print(range(4))
~~~

## concatenación

~~~~python
a = [1, 2, 3]
b = [4, 5, 6]
c = a + c
print(c)
~~~~

## ordenación

~~~~python
a = [7, 4, 9, 1, 8]
print(a.sort())
~~~~

::: notes
qué pasa si se hace:

print(a.sort()
:::

## añadir y quitar elementos

~~~~python
my_list = list()
my_list.append('Miguel')
my_list.append('Paco')
my_list.append('Alberto')
~~~~
pop quita el último elemento y lo devuelve

~~~~python
print(my_list.pop())
print(my_list)
~~~~

también se puede especificar qué elemento (índice)

## otras funciones

`len, max, min, sum`

split rompe un string en una lista de strings

~~~~python
my_list = 'lista de cuatro palabras'
palabras = my_list.split()
print(palabras)
~~~~

se puede especificar un delimitador

## ejercicio

`From miguel.exposito@apps.cantabria.es Sat Jan  5 09:14:16 2008`

::: notes
words = line.split()
email = words[1]
pieces = email.split('@')
print(pieces[1])
:::

