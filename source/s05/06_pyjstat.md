# pyjstat
#### pyjstat

## qué es

paquete Python para convertir JSON-stat a pandas dataframe

[https://json-stat.org/](https://json-stat.org/)

se puede visualizar en:

- [http://jsonviewer.stack.hu/](http://jsonviewer.stack.hu/)
- [https://json-stat.org/format/browser/](https://json-stat.org/format/browser/)
- [https://json-stat.org/format/viewer/](https://json-stat.org/format/viewer/)
- [http://json-stat.com/explorer/](http://json-stat.com/explorer/)


## ejemplo: lectura de archivo

~~~~python
from pyjstat import pyjstat
DATA_URL = 'http://www.icane.es/data/api/active-population-aged-16-more-gender-age-group-activity-base-2011.json-stat'
dataset = pyjstat.Dataset.read(DATA_URL) # lee dataset de json-stat
df = dataset.write('dataframe') # genera un dataframe
print(df)

~~~~

## ejemplo: consulta

~~~~python
query = [{'sexo': 'hombres'}, {'trimestre': '2016-1'}, {'grupo-de-edad': 'total'}, {'variables': 'parados'}]
dataset.get_value(query)
~~~~

>obtener el total de activos mujeres para todos los grupos de edad en el segundo trimestre de 2017

::: notes
~~~~python
query = [{'sexo': 'mujeres'}, {'trimestre': '2017-2'}, {'grupo-de-edad': 'total'}, {'variables': 'activos'}]
dataset.get_value(query)
128.8
~~~~
:::

