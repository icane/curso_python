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
lista = [5, 12, 21, 40, 68]
print(lista[1]) # indexado
lista[1] = 7 # mutabilidad
print(lista)
print(lista[2:3]) # rebanado
print(len(lista)) # longitud
~~~

## rangos

devuelven una lista de números en el intervalo [0,N-1]

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

## añadir y quitar elementos

~~~~python
lista = list()
lista.append('Miguel')
lista.append('Paco')
lista.append('Alberto')
~~~~
pop quita el último elemento y lo devuelve

~~~~python
print(lista.pop())
print(lista)
~~~~

también se puede especificar qué elemento

## otras funciones

`len, max, min, sum`

split rompe un string en una lista de strings

~~~~python
lista = 'Lista de cuatro palabras'
palabras = lista.split()
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


