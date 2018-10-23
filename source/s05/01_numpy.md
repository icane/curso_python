# Python Data Analysis Library

# numpy
#### pandas

## hoja de ruta

- numpy
- pandas

## numpy

es la biblioteca principal para computación científica en Python.

- su principal estructura de datos es el array multidimensional
- recuerda a Matlab
- existe desde el año 2000
- es rápido, eficiente y tiene baja huella en memoria

## numpy

- almacena datos en bloques contiguos de memoria
- contiene funciones matemáticas sobre arrays sin necesidad de bucles
- implementa funcionalidades de álgebra lineal
- ofrece una API en C para conectar `numpy` con C o Fortran

## prueba de rendimiento

~~~python
import numpy as np
my_array = np.arange(1000000)
my_list = list(range(1000000))

%time for _ in range(10): my_array_2 = my_arr * 2
%time for _ in range(10): my_list_2 = [x * 2 for x in my_list]
~~~

## tipos de datos precisos {.slide: style="font-size: 30px;"}
|tipo|descripción|
|:---|:----------|
|int_|Default integer type (same as C long; normally either int64 or int32)|
|intc|Identical to C int (normally int32 or int64)|
|intp|Integer used for indexing (same as C ssize_t; normally either int32 or int64)|
|int8|Byte (-128 to 127)|
|int16|Integer (-32768 to 32767)|
|int32|Integer (-2147483648 to 2147483647)|
|int64|Integer (-9223372036854775808 to 9223372036854775807)|

## tipos de datos precisos {.slide: style="font-size: 30px;"}
|tipo|descripción|
|:---|:----------|
|float_|Shorthand for float64.|
|float16|Half precision float: sign bit, 5 bits exponent, 10 bits mantissa|
|float32|Single precision float: sign bit, 8 bits exponent, 23 bits mantissa|
|float64|Double precision float: sign bit, 11 bits exponent, 52 bits mantissa|

## valores especiales

`nan`, `inf`

**¡ojo! no usar comparadores de igualdad**

usar `np.isnan()` o `np.isinf()`

## ndarrays

- contenedor flexible y rápido de datasets numéricos
- permite realizar operaciones matemáticas sobre bloques
- `rank`: número de dimensiones
- `shape`: tupla de enteros con el tamaño de cada dimensión
- datos numéricos y homogéneos (**mismo tipo**)

## ndarrays

![arrays] \

## ndarrays

~~~python
data = np.random.randn(2, 3)
data
data * 10
data + data
~~~

## crear ndarrays
- forma más fácil: función `array()`
- acepta cualquier objeto de tipo secuencia 

~~~python
data1 = [6, 7.5, 8, 0, 1]
arr1 = np.array(data1)
arr1
~~~

## crear ndarrays

una lista de listas de la misma longitud se convierte a array multidimensional:

~~~python
data2 = [[1, 2, 3, 4], [5, 6, 7, 8]]
arr2 = np.array(data2)
arr2
arr2.ndim # dimension
arr2.shape # forma
arr2.dtype # tipo de datos
~~~

## crear ndarrays

- otras funciones: `zeros`, `ones`, `empty`, `full`, `arange`
- para varias dimensiones, pasar una tupla como argumento

~~~python
np.zeros(10)
np.zeros((3, 6))
np.ones(7)
np.empty((2,3,2))
np.full((2,2), np.inf)
np.arange(15)
~~~

## crear ndarrays

valores aleatorios: `np.random.randn()`

~~~python
arr = np.random.randn(4)
arr

matrix = np.random.randn(4,4)
matrix
~~~

## ejercicios

- crear un array 1D de números del 0 al 9
- crear un array booleano de 3x3 con todos los valores a True

## tipos en ndarrays

`dtype` es un objeto especial que contiene metadatos
**importante**: `astype` para convertir tipos

~~~python
arr1 = np.array([1, 2, 3], dtype=np.float64)
arr2 = np.array([1, 2, 3], dtype=np.int32)

arr1.dtype
arr2.dtype

float_arr = arr2.astype(np.float64)
float_arr.dtype
~~~

¿qué pasa al convertir de `float` a `int`?

::: notes
astype siempre crea un array nuevo
float64 y float32 tienen errores en punto flotante
:::

## operaciones vectoriales

- sin bucles for
- entre arrays de la misma longitud, elemento a elemento

~~~python
arr = np.array([[1., 2., 3.], [4., 5., 6.]])
arr * arr
1 / arr
~~~

## operaciones matriciales

~~~python
A = np.array( [[1,1], [0,1]] )
B = np.array( [[2,0], [3,4]] )

A @ B 
A.dot(B)
~~~

## más álgebra lineal

~~~python
from numpy.linalg import inv, qr

X = np.random.randn(5, 5)
mat = X.T.dot(X)
inv(mat)
mat.dot(inv(mat))

q, r = qr(mat)
~~~

[linear algebra] \

## indexado y rebanado básicos

~~~python
arr = np.arange(10)
arr[5]
arr[5:8]
arr[5:8] = 12
1 / arr
~~~

las rebanadas son vistas del array original; si se modifica una vista, se refleja en el original

**¡¡no se copian!!**

## indexado y rebanado básicos

con dos dimensiones

~~~python
arr2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
arr2d[2]
arr2d[0][2]

arr2d[:2]
arr2d[:2, 1:]
~~~

## funciones universales

~~~python
arr = np.arange(10)

np.sqrt(arr) # raíz cuadrada
np.exp(arr) # e elevado a

x = np.random.randn(8)
y = np.random.randn(8)

np.maximum(x, y) # máximo elemento a elemento
~~~

[ufuncs] \

## funciones estadísticas

~~~~python
arr = np.random.randn(5, 4)

arr.mean()
arr.mean(axis=1)
arr.sum()
~~~~

## lógica condicional

filtrar por condición

~~~~python
arr = np.arange(9)
arr[arr > 2] # elementos mayores que dos
arr[arr % 2 == 0] # elementos pares
~~~~

## lógica condicional

ej: obtener `x` si `cond` es `True`; si no, obtener `y`

~~~python
x = np.array([1.1, 1.2, 1.3, 1.4, 1.5])
y = np.array([2.1, 2.2, 2.3, 2.4, 2.5])
cond = np.array([True, False, True, True, False])

result = np.where(cond, xarr, yarr)
result
~~~

## lógica condicional

ejemplo:

>Generar una matriz de 4x4 con valores aleatorios. Reemplazar todos los valores positivos con 2 y los valores negativos con -2.

::: notes
~~~~python
arr = np.random.randn(4, 4)
np.where(arr > 0, 2, -2)
~~~~
:::

## arrays booleanos

`any()`, `all()`

~~~~python
bools = np.array([False, False, True, False])
bools.any()
bools.all()
~~~~

¿cómo contar True en un array booleano?

~~~~python
arr = np.random.randn(100)
(arr > 0).sum()
~~~~

## ejercicio

- extraer todos los números pares de un array
- reemplazar números impares en array por -1

