# funciones
#### funciones

## definición
trozos de código reutilizable que toman argumentos de entrada, realizan algún tipo de cálculo y devuelven resultados

- se definen con `def` e indentando su contenido o cuerpo
- se invocan usando su nombre, paréntesis y argumentos

## ejemplo

~~~python
def my_function():
    print('Hola')
    print('Adios')

my_function()
print('Pepe')
my_function()
~~~

## tipos

- built-in: parte de Python (`print(), input(), int()`)
- definidas por el usuario 

¡no usar nombre de función como nombre de variable!

## argumentos

- son valores que se pasan como entrada a la función en su llamada
- permiten dirigir a la función para que lleve a cabo distintos tipos de trabajo

~~~~python
print('Pepe')
~~~~

## parámetros

- son variables utilizadas en la definición de la función
- permiten a la función acceder a sus argumentos para una llamada particular

~~~~python
def say_hello(lang):
    if lang == 'es' :
        print('Hola')
    elif lang == 'fr' :
        print('Salut')
    else:
        print('Hello')
say_hello('fr')
~~~~

## retorno

una función retorna un resultado con `return`

~~~~python
def say_hello(person):
    return "Hello " + str(person)

print(say_hello('Ana'))
~~~~

## múltiples parámetros

- simplemente, se añaden
- ¡ojo con el número y orden de parámetros!

~~~~python
def add_three(a, b, c):
    sum = a + b + c
    return sum
x = add_three(3, 5, 7)
print(x)
~~~~

## algunos consejos

- organizar el código
- DRY!
- divide y vencerás
- hacer bibliotecas con lo que más se usa

