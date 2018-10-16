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
    input_text = input('Introduce q para terminar: ')
    if input_text == 'q' :
        break
    print(input_text)
print('Hecho')
~~~

## salir de una iteración

`continue`

~~~python
while True :
    input_text = input('Introduce q para terminar, c para otra oportunidad: ')
    if input_text == 'q' :
        break
    elif input_text == 'c':
        continue
    print(input_text)
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

## conteos

~~~~python
numbers = [9, 41, 12, 3, 74, 15]
total = 0
for number in numbers :
    total = total + 1
print('Hecho! el total es:', total)
~~~~

## media aritmética

~~~~python
numbers = [9, 41, 12, 3, 74, 15]
total = 0
sum = 0
for number in numbers :
    total = total + 1
    total_sum = total_sum + number
print('Hecho! la media es:', total_sum / total)
~~~~

## filtrado

~~~~python
numbers = [9, 41, 12, 3, 74, 15]
for number in numbers :
    if number > 20 :
        print('Mayor que 20')
print('Hecho! )
~~~~

## is / is not
- utilizados en expresiones lógicas
- significa "es lo mismo que"
- similar a `==`, pero más fuerte

~~~~python
x = None
if x is None :
    print('No hay valor para x')
~~~~



