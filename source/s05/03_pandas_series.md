# series
#### series

## qué son

objetos de una dimensión similares a un array que contienen una secuencia de valores y un array asociado de etiquetas (índice)

~~~~python
import pandas as pd
obj = pd.Series([4, 7, -5, 3])
obj
obj.values
obj.index
~~~~

si no se especifica índice, se crea uno con enteros de 0 a N-1

## índices

a veces es deseable crear una serie con un índice etiquetado

~~~~python
import pandas as pd
obj2 = pd.Series([4, 7, -5, 3], index=['Enero', 'Febrero', 'Marzo', 'Abril'])
obj2
~~~~

## índices

en contraposición a los arrays, pueden usarse las etiquetas para la selección de valores

~~~~python
import pandas as pd
obj2['Marzo']
obj2['Abril'] = 10
obj2[['Enero', 'Marzo', 'Abril']]
~~~~

## filtrado simple

la relación valor-índice se preserva

~~~~python
obj2[obj2 > 0]
~~~~

a veces interesa resetar un índice... usar el método `reset_index()`



## desde diccionario

la relación diccionario - series es directa

~~~~python
my_dict = {'visitantes': 2000, 'visitas': 50000, 'hits': 200000}
obj3 = pd.Series(my_dict)
obj3
~~~~

## desde diccionario

se puede cambiar el orden de las claves

~~~~python
metrics = ['visitas',  'hits', 'visitantes', 'tpv']
obj4 = pd.Series(my_dict, index=metrics)
~~~~

## ejercicio

crear una serie desde lista, array y dict

~~~~python
import numpy as np
mylist = list('abcedfghijklmnopqrstuvwxyz')
myarr = np.arange(26)
mydict = dict(zip(mylist, myarr))
~~~~

usar el método `.head()` para explorar el contenido de la serie

::: notes
~~~~python
ser1 = pd.Series(mylist)
ser2 = pd.Series(myarr)
ser3 = pd.Series(mydict)
print(ser3.head())
~~~~
:::

## operaciones desde numpy

se pueden aplicar operaciones sin modificar la estructura

~~~~python
np.square(obj3)
~~~~

## alineación automática

~~~~python
obj3 + obj4
~~~~

## ejercicio

obtener los elementos de A que no están en B

- filtrar ser1, y dentro del filtro:
- usar `isin`: A.isin(B)
- usar el operador negación: `~`

~~~~python
ser1 = pd.Series([1, 2, 3, 4, 5])
ser2 = pd.Series([4, 5, 6, 7, 8])
~~~~

::: notes
~~~~python
ser1[~ser1.isin(ser2)]
~~~~
:::

## ejercicio

obtener la media y la desviación estándar de una serie

~~~~python
s = pd.Series([1,2,3,4,5,6,7,8,9,5,3])
~~~~

::: notes
~~~~python
s.mean()
s.std()
~~~~
:::

