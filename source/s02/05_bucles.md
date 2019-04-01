# bucles
#### bucles

## qué son

- los bucles permiten repetir la ejecución de un determinado paso
- contienen variables de iteración que cambian cada vez
- las variables de iteración suelen recorrer una secuencia de números

## ejemplo while (bucles indefinidos)

~~~python
n = 5
while n > 0 :
    print(n)
    n = n - 1
print('Despegue!')
print(n)
~~~

## ¿qué hace esto?

~~~python
n = 5
while n > 0 :
    print(n)
print('Despegue!')
print(n)
~~~

## ¿y esto?

~~~python
n = 0
while n > 0 :
    print(n)
print('Despegue!')
print(n)
~~~

## salir de un bucle

`break`

~~~python
while True :
    text= input('Introduce q para terminar: ')
    if text == 'q' :
        break
    print(text)
print('Hecho')
~~~

## salir de una iteración

`continue`

~~~python
while True :
    text = input('Introduce q para terminar, c para otra oportunidad: ')
    if text == 'q' :
        break
    elif text == 'c':
        continue
    print(text)
print('Hecho')
~~~

## bucles definidos

- necesidad de recorrer una lista de items
- se ejecutan un número exacto de veces
- iteran sobre los miembros de un conjunto

~~~~python
for i in [5, 4, 3, 2, 1] :
    print(i)
print('Despegue!')
~~~~

## también se pueden iterar strings

~~~~python
it_crowd = ['Izu', 'Saro', 'Seco']
for it_guy in it_crowd :
    print('Pregúntaselo a: ', it_guy)
print('Hecho!')
~~~~

## de forma general

1. inicializar las variables
2. encontrar algo que hacer para cada item de forma separada, actualizando la variable
3. ver el resultado

## ejercicio

> cuál es el máximo de la siguiente lista: 9, 41, 12, 3, 74, 15

::: notes
~~~~python
numbers = [9, 41, 12, 3, 74, 15]
max = 0
for number in numbers:
    if number > max:
        max = number
print(max)

~~~~
:::

## conteos

~~~~python
numeros = [9, 41, 12, 3, 74, 15]
total = 0
for numero in numeros :
    total = total + 1
print('Hecho! el total es:', total)
~~~~

## media aritmética

~~~~python
numeros = [9, 41, 12, 3, 74, 15]
total = 0
suma = 0
for numero in numeros :
    total = total + 1
    suma = suma + numero
print('Hecho! la media es:', suma / total)
~~~~

## filtrado

~~~~python
numeros = [9, 41, 12, 3, 74, 15]
for numero in numeros :
    if numero > 20 :
        print('Mayor que 20')
print('Hecho! )
~~~~

## is / is not
- utilizados en expresiones lógicas
- significa "es lo mismo que"
- similar a `==`, pero más fuerte
- is devuelve True si dos variables apuntan al mismo objeto
- `==` devuelve True si los objetos a los que apuntan dos variables son iguales

~~~~python
x = None
if x is None :
    print('No hay valor para x')
~~~~

