# dataframes
#### dataframes

## qué son

>objetos que representan una tabla rectangular conteniendo una colección ordenada de columnas, cada una de las cuales puede ser de un tipo de datos distinto

~~~~python
data = {'ca': ['Cantabria', 'Cantabria', 'Cantabria', 'Canarias', 'Canarias'],
'year': [2000, 2001, 2002, 2001, 2002],
'pop': [1.5, 1.7, 3.6, 2.4, 2.9]}
frame = pd.DataFrame(data) # inicialización con list of dicts
frame.head() # visualizar las 5 primeras filas
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

## creación y manejo básico

- se puede especificar el orden de las columnas
- si una columna no existe, se creará con valores nulos
- una columna se puede recuperar como un objeto de tipo series
- también pueden recuperarse filas

~~~~python
pd.DataFrame(data, columns=['year', 'state', 'pop'])
frame2 = pd.DataFrame(data, columns=['year', 'ca', 'pop', 'debt'],
                      index=['uno', 'dos', 'tres', 'cuatro', 'cinco'])
frame2
frame2['ca'] # columna
frame2.loc['tres'] # fila
~~~~

## lectura desde archivo

`.read_csv()`

acepta:

- URLs
- `sep`: separador (,)
- `delimiter`: delimitador (`None`)
- `header`: cabecera (se infiere)

## escritura desde archivo

`.write_csv()`

## manejo básico

- se puede obtener una lista de columnas
- el atributo `dtypes` indica el tipo de dato de cada columna
- las dimensiones del dataframe se obtienen con `.shape`

~~~~python
frame2.columns
frame2.dtypes
frame2.shape
~~~~

## manejo básico

la serie devuelta al recuperar una columna es una vista

~~~~python
vals = frame['pop']
vals[0] = 0
vals
data
~~~~

usar `copy()` para eliminar el warning

## manejo básico

un dataframe se puede transponer

~~~~python
frame2.T
~~~~

## manejo básico

cálculo de frecuencias

~~~~python
frame2.ca.value_counts()
~~~~

## manejo básico

cálculo de valores únicos

~~~~python
frame2.ca.nunique()
~~~~

## manejo básico

funciones estadísticas

~~~~python
frame2['pop'].mean()
frame2['pop'].sum()
frame2['pop'].max()
frame2['pop'].min()
frame2['pop'].median()
~~~~

## manejo básico

valores nulos: `isnull()`: `NaN, None/NaN, NaT`

~~~~python
array = np.array([[1, np.nan, 3], [4, 5, np.nan]])
pd.isnull(array)
~~~~

## inspección

~~~~python
frame2.describe() # información estadística
frame2.info() # información sobre la estructura de datos
frame2.tail()
~~~~

## selección de columnas

un dataframe puede verse como un conjunto de series que comparten un índice (las cabeceras de las columnas)

~~~~python
frame2[['year', 'pop']] # selección columnas
frame2[frame2['pop'] > 2] # filtrado con condición
frame2[(frame2['pop'] > 2) & (frame2['year'] != 2002)] # filtrado con condición compuesta
frame2.iloc[:, 0:2] # todas las filas, columnas 0 a 2 no incluida
frame2.iloc[:, :-1] # todas las filas, todas las columnas excepto la última
~~~~ 

## indexado

~~~~python
frame4 = frame2.set_index('year')
frame4
~~~~

## selección de filas

~~~~python
frame2.iloc[3] # posición
frame2.iloc[[3,4]] # posición
frame4.loc[2001] # etiqueta
~~~~

## reseteo de índice

~~~~python
frame4.reset_index(inplace=True)
~~~~

## resumen de selección

- `loc` para indexado basado en etiquetas
- `iloc` para indexado posicional

aunque hay [otras formas...]


para modificar el propio dataframe, usar el atributo `inplace=True`

## ejercicio inspección

importar datos desde:

~~~~python
DATA_URL = 'https://raw.githubusercontent.com/justmarkham/DAT8/master/data/u.user'
usuarios = pd.read_csv(DATA_URL, sep='|')
~~~~

asignar a una variable llamada `users` y utilizar `user_id` como índice

## ejercicio inspección

- ver las 25 primeras filas
- ver las 10 últimas filas
- obtener el número de observaciones en el dataset
- obtener el número de columnas en el dataset
- mostrar los nombres de las columnas
- mostrar el índice del dataset

## ejercicio inspección

- mostrar los tipos de datos de cada columna
- mostrar sólo la columna de ocupación
- mostrar cuántas ocupaciones diferentes hay en el dataset
- mostrar la ocupación más frecuente
- resumir el dataframe
- calcular la edad media de los usuarios

## joins: merge

inner join

~~~~python
left_frame = pd.DataFrame({'key': range(5), 
                           'left_value': ['a', 'b', 'c', 'd', 'e']})
right_frame = pd.DataFrame({'key': range(2, 7), 
                           'right_value': ['f', 'g', 'h', 'i', 'j']})
left_frame
right_frame

pd.merge(left_frame, right_frame, on='key', how='inner')
~~~~

## joins: merge

left, right, full outer join

~~~~python
pd.merge(left_frame, right_frame, on='key', how='left')
pd.merge(left_frame, right_frame, on='key', how='right')
pd.merge(left_frame, right_frame, on='key', how='outer')
~~~~

## combinación: concat

~~~~python
pd.concat([left_frame, right_frame]) # vertical
pd.concat([left_frame, right_frame], axis=1) # horizontal
~~~~

## añadir filas al final: append

los dos dataframes deben tener las mismas columnas

~~~~python
left_frame.append(left_frame)
~~~~

## groupby

~~~~python
ANIMALS_URL='https://gist.githubusercontent.com/predicador37/bccac851999eaf10b6a4b8cec1aef742/raw/beaf295909b9e7d495b49f793fcb9896a8b0fe37/animals.csv'
animals = pd.read_csv(ANIMALS_URL)
~~~~

## groupby

 ¿cuál es el peso medio por animal?

~~~~python
# Agrupar por cada categoría de animal
animal_groups = animals.groupby("animal")
# Aplicar la media aritmética a la columna de peso
animal_groups['weight'].mean()
~~~~

## agg

permite agregar por varias funciones según un eje

~~~~python
animal_groups['weight'].agg(['mean', 'median'])
~~~~

## ejemplo

análisis de dataset de netflix

~~~~python
NETFLIX_URL='https://gist.githubusercontent.com/predicador37/d081821c1538cc6c261a3ac3eef9cb7d/raw/934117f2768b8fa42350441e84b07395929803a5/gistfile1.txt'
df = pd.read_csv(NETFLIX_URL)
~~~~

## ejemplo: limpieza

- dropna(): elimina filas con valores nulos
- drop_duplicates(): elimina filas duplicadas

~~~~python
df.dropna(inplace=True)
df.drop_duplicates(inplace=True)
~~~~

## ejemplo: inspección

~~~~python
df.describe()
~~~~

## ejemplo: split

se dividen los datos en grupos, donde cada grupo es el conjunto de películas estrenadas en un año determinado

~~~~python
df_by_year = df.groupby('release year')
type(df_by_year)
~~~~

## ejemplo: apply

aplicar `.describe()` a cada grupo

~~~~python
df_by_year.describe().head()
~~~~

## ejemplo: combine

obtener la media o la mediana de la puntuación de usuario por año

~~~~python
df_med_by_year = df_by_year.median()
df_med_by_year.head()
df_med_by_year['user rating score']
~~~~

## ejercicio: agrupaciones

importar datos desde:

~~~~python
DATA_URL = 'https://raw.githubusercontent.com/justmarkham/DAT8/master/data/u.user'
~~~~

¡inspeccionar separadores!

## ejercicio: agrupaciones

- inspeccionar dataset
- mostrar edad media por ocupación
- para cada ocupación, calcular las edades mímina y máxima
- para cada combinación de ocupación y sexo, calcular la edad media


## aplicar funciones a filas, columnas y elementos

- `.apply()`: función a arrays 1D a cada fila o columna
- `.applymap()`: elemento a elemento en dataframe
- `.map()`: elemento a elemento en series

## funciones anónimas

::: incremental

son funciones definidas sin nombre

`lambda arguments: expression`

~~~~python
def square_root(x):
    return math.sqrt(x)

square_root = lambda x: math.sqrt(x)
~~~~

se usan mucho para aplicar funciones a dataframes

:::

## ejemplo: aplicar operaciones en dataframes
~~~~python
import pandas as pd
import numpy as np

data = {'name': ['Pedro', 'Paco', 'Lorena', 'Juan', 'Patxi'], 
        'year': [2012, 2012, 2013, 2014, 2014], 
        'reports': [4, 24, 31, 2, 3],
        'coverage': [25, 94, 57, 62, 70]}
df = pd.DataFrame(data, index = ['Santander', 'Torrelavega', 'Laredo', 'Camargo', 'Astillero'])
df
~~~~

::: notes
PREGUNTAR CÓMO SE HARÍA LA SIGUIENTE
:::

## ejemplo

crear función que pase a mayúsculas usando lambda

~~~~python
capitalizer = lambda x: x.upper()
~~~~

::: notes
PREGUNTAR CÓMO SE HARÍA LA SIGUIENTE
:::

## ejemplo

aplicar la función a la columna `name`

~~~~python
df['name'].apply(capitalizer)
~~~~

## ejemplo

equivalente al anterior

~~~~python
df['name'].apply(lambda x: x.upper())
~~~~

## ejemplo

mapear la función sobre cada elemento de la series `name`

~~~~python
df['name'].map(capitalizer)
~~~~

## ejemplo

aplicar una raiz cuadrada a todas las celdas del dataframe

~~~~python
df = df.drop('name', axis=1) # eliminar la columna de texto
df.applymap(np.sqrt)
~~~~

## ejemplo

aplicar una función que multiplica por 100 los números

~~~~python
def times100(x):
    if type(x) is str:
        return x
    elif x:
        return 100 * x
    else:
        return
df.applymap(times100)
~~~~


