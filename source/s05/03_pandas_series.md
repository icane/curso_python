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

## operaciones desde numpy

se pueden aplicar operaciones sin modificar la estructura

~~~~python
np.square(obj3)
~~~~

## alineación automática

~~~~python
obj3 + obj4
~~~~

