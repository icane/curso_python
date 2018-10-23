# pandas desde excel
#### pandas desde excel

## cargar fichero de ejemplo

[https://gist.githubusercontent.com/predicador37/24e8e4ee465956aa923bc0add5309118/raw/0f076cc91b06dd8190d10ede1810fc3c22029eda/gistfile1.txt](https://gist.githubusercontent.com/predicador37/24e8e4ee465956aa923bc0add5309118/raw/0f076cc91b06dd8190d10ede1810fc3c22029eda/gistfile1.txt)

~~~~python
import pandas as pd
import numpy as np
DATA_URL = 'https://gist.githubusercontent.com/predicador37/24e8e4ee465956aa923bc0add5309118/raw/0f076cc91b06dd8190d10ede1810fc3c22029eda/gistfile1.txt'
df = pd.read_csv(DATA_URL)
df.head()
~~~~


## ejemplo {.slide: style="font-size: 30px;"}

~~~~csv
    Trimestre         Sexo  ...                           Variables  value
0         2005  Ambos sexos  ...                           Población    NaN
1         2005  Ambos sexos  ...                             Activos    NaN
2         2005  Ambos sexos  ...                            Ocupados    NaN
3         2005  Ambos sexos  ...                             Parados    NaN
4         2005  Ambos sexos  ...    Parados que buscan primer empleo    NaN
5         2005  Ambos sexos  ...                           Inactivos    NaN
6090  2018 - 2      Mujeres  ...                           Población  253.7
6091  2018 - 2      Mujeres  ...                             Activos  126.7
6092  2018 - 2      Mujeres  ...                            Ocupados  109.5
6093  2018 - 2      Mujeres  ...                             Parados   17.2
6094  2018 - 2      Mujeres  ...    Parados que buscan primer empleo    2.2
6095  2018 - 2      Mujeres  ...                           Inactivos  127.1
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