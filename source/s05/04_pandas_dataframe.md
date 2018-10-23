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
- separador (,)
- delimitador (`None`)
- cabecera (se infiere)

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

## joins

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

## joins

left, right, full outer join

~~~~python
pd.merge(left_frame, right_frame, on='key', how='left')
pd.merge(left_frame, right_frame, on='key', how='right')
pd.merge(left_frame, right_frame, on='key', how='outer')
~~~~

## combinación

~~~~python
pd.concat([left_frame, right_frame]) # vertical
pd.concat([left_frame, right_frame], axis=1) # horizontal
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

## ejemplo

análisis de dataset de netflix

~~~~python
NETFLIX_URL='https://gist.githubusercontent.com/predicador37/d081821c1538cc6c261a3ac3eef9cb7d/raw/934117f2768b8fa42350441e84b07395929803a5/gistfile1.txt'
df = pd.read_csv(NETFLIX_URL)
~~~~

## ejemplo: limpieza

- dropna(): elmina filas con valores nulos
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