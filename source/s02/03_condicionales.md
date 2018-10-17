# ejecución condicional
#### ejecución condicional

##
::::::::::::: {.columns}
::: {.column width="40%"}
![condicional_1] \
:::
::: {.column width="60%"}
~~~python
x = 7
if x < 10:
    print('Menor que diez')
if x > 20:
    print('Mayor que veinte')
print('Fin')
~~~
:::
::::::::::::::

## operadores de comparación {.slide: style="font-size: 30px;"}
|operador|operación| 
|--------|---------|
|<|menor que|
|<=|menor o igual que|
|==|igual a|
|>=|mayor o igual que|
|>|mayor que|
|!=|distinto de|

las expresiones que utilizan estas operaciones se evalúan a los valores `True/False`

estos operadores no cambian el valor de las variables

::: notes
el operador asignación es =
:::

## sangría

- después de un `if` o un `for`, incrementar (después de `:`)
- mantener para indicar el ámbito del bloque (líneas afectadas por `if/for`)
- reducir al nivel del padre para indicar fin del bloque
- las líneas en blanco no afectan a la sangría
- los comentarios no afectan a la sangría

::: notes
cuidado con los tabuladores... ¡han de ser espacios en blanco!
:::

## decisiones anidadas
::::::::::::: {.columns}
::: {.column width="40%"}
![condicional_2] \
:::
::: {.column width="60%"}
~~~python
x = 30
if x > 10 :
    print('Mayor que diez')
    if x < 100 :
        print('Menor que cien')
print('Terminado')
~~~
:::
::::::::::::::

## decisiones con dos caminos
::::::::::::: {.columns}
::: {.column width="40%"}
![condicional_3] \
:::
::: {.column width="60%"}
~~~python
x = 45
if x > 3 :
    print('Grande')
else:
    print('Pequeño')
print('Terminado')
~~~
:::
::::::::::::::

## decisiones multicamino
::::::::::::: {.columns}
::: {.column width="40%"}
![condicional_4] \
:::
::: {.column width="60%"}
~~~python
x = 5
if x < 3 :
    print('Pequeño')
elif x < 10 :
    print('Mediano')
else:
    print('Grande')
print('Terminado')
~~~
:::
::::::::::::::

## ojo con liarse

~~~python
if x < 2 :
    print('Menor que 2')
elif x >= 2 :
    print('Mayor que 2')
else :
    print('Otra cosa')
~~~

## estructuras try / except

- se rodea una sección de código "peligrosa" con un `try / except`
- si el código en el `try` funciona, el `except` se ignora
- si el código en el `try` falla, se salta a la sección `except`

## ejemplo

~~~python
astr = 'Hola Miguel'
try:
    istr = int(astr)
except:
    istr = -1
print('Primero', istr)
~~~

~~~python
astr = '123'
try:
    istr = int(astr)
except:
    istr = -1
print('Segundo', istr)
~~~

## ejercicio

>Reescribir el programa del cálculo de paga para pagarle todas las horas de más a partir de 40 a 1.5 veces el coste de la hora normal

Ej: 45 horas y 10 €/hora: 475 €

