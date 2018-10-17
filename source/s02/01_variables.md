# variables, estructuras de datos y de control, expresiones, sentencias y funciones

# variables
#### variables

##
¿qué es una constante?

un valor fijo, que nunca cambia

~~~python
print(123)
print(15.2)
print('curso python')
pi = 3.14
print(pi)
~~~

##
recordad: ¡¡ojo con las palabras reservadas!!

~~~python
False class return is finally None if for lambda continue
True def from while nonlocal and del global not with
as elif try or yield assert else import pass break except in raise
~~~

## ¿qué es una variable?

una variable es una posición de memoria a la que se asocia un nombre o etiqueta

se les asigna valores con el operador =

~~~python
x = 12.2
print(x)
y = 'variable'
x = 100
print(x)
~~~

## nomenclatura

- deben comenzar por una letra o guion bajo _
- pueden contener letras, números y guiones bajos
- son sensibles a mayúsculas/minúsculas

::: notes
ok:    spam    eggs   spam23    _speed

mal:     23spam     #sign  var.12

mejor no: nombreVariable

solo constantes: PI

diferentes: spam   Spam   SPAM
:::

## declaraciones

~~~python
x = 1 # declaración de asignación
x = x + 1 # asignación de expresión
print(x) # declaración print
~~~

¿cuáles son las variables, operadores, constantes, funciones?

## declaraciones de asignación

una declaración de asignación consiste en una expresión a la derecha del igual y una variable a la izquierda donde almacenar el resultado

~~~python
x = 3.9 * x * ( 1 - x )
~~~

