# ejercicios
#### ejercicios

## ejercicio: dataset ICANE

importar y explorar el archivo JSON-stat desde la siguiente URL:

~~~~python
DATA_URL = 'https://gist.githubusercontent.com/predicador37/cfb854dbbb36d3f0c1ac2d13f837ce67/raw/08354aefe84b4cf875d9b968bf4be2c376ccc249/rev_padron_icane.json'
~~~~

- crear un índice temporal
- filtrar los últimos 5 años de tu municipio de residencia en una variable `df_muni`
- obtener una serie con la población para ese filtro

::: notes
~~~~python
from pyjstat import pyjstat
import pandas as pd
import numpy as np

DATA_URL = 'https://gist.githubusercontent.com/predicador37/cfb854dbbb36d3f0c1ac2d13f837ce67/raw/08354aefe84b4cf875d9b968bf4be2c376ccc249/rev_padron_icane.json'
dataset = pyjstat.Dataset.read(DATA_URL)
df = dataset.write('dataframe')
df.describe()
df.dtypes
df.info()
df.head()

df['Año'] = pd.to_datetime(df['Año'])
df.dtypes
df = df.set_index(['Año'])
df

df_muni = df[(df['Municipios'] == '39075 - Santander')]
df_muni = df_muni.loc[df_muni.index > '2012']
series = df_muni[df_muni['Variables'] == 'Población']['value']
type(series)
series
~~~~
:::

## ejercicio: dataset ICANE

consultar en el dataset original la variación interanual de la población total de Cantabria en 2017.

¡ojo! inspeccionar dataset en [http://jsonviewer.stack.hu/](http://jsonviewer.stack.hu/) para identificar nombres de dimensiones y variables

::: notes
~~~~python
query = [{'municipios': 'total-cantabria'}, {'ano': '2017'}, {'variables': 'variacion-interanual'}]
dataset.get_value(query)
~~~~
:::

## ejercicio: nombres de niños en US

crear un dataframe desde la siguiente URL y asignárselo a la variable `baby_names`

~~~~python
DATA_URL = 'https://raw.githubusercontent.com/guipsamora/pandas_exercises/master/06_Stats/US_Baby_Names/US_Baby_Names_right.csv'
~~~~

## ejercicio: nombres de niños en US {.slide: style="font-size: 30px;"}

- visualizar los primeros diez registros
- deshacerse de las columnas `Unnamed: 0` e `Id` (se puede usar `.drop()`)
- ¿hay más nombres de niñas o de niños?
- agrupar por nombre agregando con suma y asignarlo a la variable `names`
- ¿cuántos nombres diferentes hay en el dataset?
- ¿cuál es el nombre más frecuente?
- obtener un resumen con la media, mínimo, máximo, std y y cuartiles

