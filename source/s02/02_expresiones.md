# expresiones
#### expresiones

## expresiones numéricas
|operador|operación| <!-- .slide: style="font-size: 30px;"-->
|--------|---------|
|+|suma|
|-|resta|
|*|multiplicación|
|/|división|
|**|potenciación|
|%|resto|

## ejemplos

~~~python
x = 2
x = x + 2
print(x)
y = 430 * 11
print(y)
z = y / 1000
print(z)
j = 26
k = j % 5
print(k)
~~~

## precedencia de operadores

1. paréntesis
2. potenciación
3. multiplicación, división y resto
4. suma y resta
5. de izquierda a derecha

~~~python
x = 1 + 2 ** 3 / 4 * ( 5 + 4 )
~~~

## tipos

toda variable en Python tiene un tipo

Python sabe la diferencia entre `number` y `string`

~~~python
x = 5 + 8
print(x)
type(x)
greeting = 'hola' + ' ' + 'Miguel'
print(greeting)
type(greeting)
~~~

con cadenas de texto, `+` concatena

## tipos

algunas operaciones están prohibidas...

~~~python
greeting = 'hola' + ' ' + 'Miguel'
greeting = greeting + 1
~~~

¡no se puede sumar 1 a una cadena de texto!

## tipos numéricos

- enteros
- coma flotante

~~~python
x = 1 
type(x)
y = 48.9
type(y)
z = 1.0
type(z)
~~~

## conversiones de tipo
en una expresión, `int` se convierte implícitamente a `float`

conversiones explícitas: `int()` y `float()`

~~~python
print(float(24) + 50)
i = 35
type(i)
f = float(i)
print(f)
type(f)
~~~

## conversiones de tipo

muy utilizada en logging:

~~~python
msg = 'Número total de ocurrencias: '
count = 2
print(msg + str(count))
~~~

también se puede hacer lo contrario:

~~~python
value= '555'
print(int(value) + 5)
~~~

## división entera

la división entera produce un resultado en punto flotante

~~~python
print(10 / 2)
~~~

## entrada por teclado

`input()` devuelve un `string`

~~~python
name = input('¿Cómo te llamas?')
print('Bienvenido', name)
~~~

~~~python
age = input('Edad: ')
age_to_retirement = 65 - int(edad)
print('Te quedan', age_to_retirement, 'años para jubilarte')
~~~

## comentarios

Python ignora cualquier cosa después de una almohadilla (#)

Los comentarios sirven para:

- describir lo que va a pasar en el código
- documentar quién escribió esa parte del código
- deshabilitar temporalmente una línea de código (*)

