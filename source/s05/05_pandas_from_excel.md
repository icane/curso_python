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

## otro fichero de ejemplo

~~~~python
import pandas as pd
import numpy as np
DATA_URL = 'https://gist.githubusercontent.com/predicador37/29a4c89cc652d3b201ec718377cbfd11/raw/d6a5adcc0534138fc8e2275cc7780b054136c3e3/excel-data-2.csv'
df = pd.read_csv(DATA_URL)
df.head()
df.dtypes
~~~~

## conversión de objeto a fecha

~~~~python
df['date'] = pd.to_datetime(df['date'])
df.head()
df.dtypes
~~~~

