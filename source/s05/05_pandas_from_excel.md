# pandas desde excel
#### pandas desde excel

## cargar fichero de ejemplo

~~~~python
import pandas as pd
import numpy as np
DATA_URL = 'https://gist.githubusercontent.com/predicador37/24e8e4ee465956aa923bc0add5309118/raw/0f076cc91b06dd8190d10ede1810fc3c22029eda/gistfile1.txt'
df = pd.read_csv(DATA_URL)
df.head()
~~~~


## añadir columna de totales
 
:::incremental

~~~~python
df["total"] = df["Jan"] + df["Feb"] + df["Mar"]
df.head()
~~~~

## análisis básico a nivel de columna

- ¿total, media, mínimo, máximo del mes de enero?

:::incremental

~~~~python
df["Jan"].sum()
df["Jan"].mean()
df["Jan"].min()
df["Jan"].max()
~~~~

## añadir subtotales por mes y total general

:::incremental

~~~~python
sum_row = df[["Jan","Feb","Mar","total"]].sum() # suma para cada columna
df_sum = pd.DataFrame(data=sum_row).T # crear un nuevo dataframe transpuesto
df_sum
df_sum = df_sum.reindex(columns=df.columns) # añadir las columnas que faltan
df_sum
df_final = df.append(df_sum, ignore_index=True)
df_final.tail()
~~~~

## añadir subtotales por estado

~~~~python
from money import Money

df_sub = df_final[["state","Jan","Feb","Mar","total"]].groupby('state').sum()
formatted_df = df_sub.applymap(lambda x: Money(x, currency='EUR'))
formatted_df

sum_row=df_sub[["Jan","Feb","Mar","total"]].sum() # calcular subtotales como en el caso anterior
sum_row
df_sub_sum=pd.DataFrame(data=sum_row).T
def money(x):
    return Money(x, currency='EUR')
df_sub_sum = df_sub_sum.applymap(money)
df_sub_sum
~~~~

## añadir subtotales por estado

~~~~python
final_table = formatted_df.append(df_sub_sum)
final_table

final_table = final_table.rename(index={0:"Total"})
final_table
~~~~

## otro ejemplo

lectura del fichero

~~~~python
import pandas as pd
import numpy as np
DATA_URL = 'https://gist.githubusercontent.com/predicador37/29a4c89cc652d3b201ec718377cbfd11/raw/d6a5adcc0534138fc8e2275cc7780b054136c3e3/excel-data-2.csv'
df = pd.read_csv(DATA_URL)
df.head()
df.dtypes
~~~~

## otro ejemplo

conversión de objeto a fecha

~~~~python
df['date'] = pd.to_datetime(df['date'])
df.head()
df.dtypes
~~~~

## otro ejemplo

filtrar por número de cuenta 307599

~~~~python
df[df['account number'] == 307599].head()
~~~~

## otro ejemplo

filtrar por cantidad mayor a 22

~~~~python
df[df['quantity'] > 22].head()
~~~~

## otro ejemplo

filtrar por referencia (sku) que empiece por B1

~~~~python
df[df['sku'].map(lambda x: x.startswith('B1'))].head()
~~~~

## otro ejemplo

combinar los dos filtros anteriores

~~~~python
df[(df['quantity'] > 22) & (df['sku'].map(lambda x: x.startswith('B1')))].head()
~~~~

## otro ejemplo

encontrar todos los registros que incluyen dos números de cuenta específicos

~~~~python
df[df['account number'].isin([714466, 218895])].head()
~~~~

## otro ejemplo

[query]: requiere instalación previa de `numexpr`
recuperar lista de clientes por nombre

~~~~python
df.query('name == ["Kulas Inc","Barton LLC"]').head()
~~~~

## otro ejemplo

trabajar con fechas

~~~~python
df = df.sort('date')
df.head()
df[df['date'] >='20140905'].head() # por fecha exacta
df[df['date'] >='2014-03'].head() # por mes
df[df['date'] >= 'Oct-2014'].head() # por mes en otro formato
df[df['date'] >= '10-10-2014'].head() # por fecha en otro formato
~~~~

## otro ejemplo

series temporales: utilizar la fecha como índice con `set_index()`

~~~~python
df2 = df.set_index(['date'])
df2.head()
df2["20140101":"20140201"].head() # filtrado por rango de fechas
df2["2014"].head() # filtrado por año
~~~~

## otro ejemplo

identificar referencias que contienen un determinado valor

~~~~python
df[df['sku'].str.contains('B1')].head()
df[(df['sku'].str.contains('B1-531')) & (df['quantity']>40)].sort_values(by=['quantity','name'],ascending=[0,1])
~~~~

## otro ejemplo
obtener una lista de valores únicos

~~~~python
df['name'].unique()
~~~~

