
# Extraer datos con Pandas
#### Web scraping

## Pandas
- Pandas es un módulo para trabajar con *tablas* (``DataFrame``) de datos.
- Ofrece métodos para crear ``DataFrame``s desde diversas fuentes (CSV, Excel, Web...).

## Ejemplo
~~~python
>>> import pandas as pd
>>> dfs = pd.read_html('https://www.sepe.es/contenidos/personas/prestaciones/duracion_prestacion_contributiva.html')
>>> type(dfs)
<class 'list'>
>>> type(dfs[0])
<class 'pandas.core.frame.DataFrame'>
~~~

##
~~~python
>>> df = dfs[0]
>>> df
   Días de cotización  Días de prestación
0        de 360 a 539                 120
1        de 540 a 719                 180
2        de 720 a 899                 240
3       de 900 a 1079                 300
4      de 1080 a 1259                 360
5      de 1260 a 1439                 420
6      de 1440 a 1619                 480
7      de 1620 a 1799                 540
8      de 1800 a 1979                 600
9      de 1980 a 2159                 660
10         desde 2160                 720
~~~
##
~~~python
>>> df.loc[3]
Días de cotización    de 900 a 1079
Días de prestación              300
Name: 3, dtype: object
>>> df[df['Días de cotización'] == 'de 900 a 1079']
  Días de cotización  Días de prestación
3      de 900 a 1079                 300
>>> df[df['Días de prestación'] > 300]
   Días de cotización  Días de prestación
4      de 1080 a 1259                 360
5      de 1260 a 1439                 420
6      de 1440 a 1619                 480
7      de 1620 a 1799                 540
8      de 1800 a 1979                 600
9      de 1980 a 2159                 660
10         desde 2160                 720
~~~

