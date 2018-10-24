
# Integración con pandas
#### Visualización de datos con pandas

##
::: {.smaller}
pyplot está (parcialmente) integrado en pandas

::: incremental
- Podemos dibujar directamente desde un dataframe de pandas
- se devuelve un objeto "_`Axes`_" sobre el que poder trabajar
  + no es necesario crear con antelación la figura y los ejes
  + ... aunque suele ser lo recomendable
:::

:::
::::::::::::: {.columns}
::: {.column width="60%" .smaller}
~~~python
fig, ax = plt.subplots()
ax2 = df.plot.scatter(
    'a', 'b', c='c', s=df['d'],
    colormap='viridis', alpha=.5,
    title='Scatter con pandas', rot='vertical',
    ax = ax;
)

ax.annotate(
    'Defecto', xy=(1.9, -17),
     xytext=(2, -20),
    arrowprops=dict(facecolor='black', shrink=0.05)

ax2 == ax
True
~~~
:::
::: {.column width="40%"}
![pd_scatter]\
:::
::::::::::::::

##
Visualizar datos usando la interfaz de `pandas` es conveniente y mucho más
sencillo:

::: { .smaller }
~~~python
provincias = ['Cantabria', 'Madrid', 'Murcia', 'León', 'Albacete']
index = np.arange(len(provincias)) + 0.3

y_offset = np.zeros(len(marriages.Total.columns))
cell_text = []

for row in marriages.Total.columns:
    _data = marriages.Total.loc[provincias, row]
    plt.bar(index, _data, bottom=y_offset, width=0.5)
    y_offset = y_offset + _data
    cell_text.append(["%1.1f" % (x / 1000.0) for x in y_offset])
cell_text.reverse()
the_table = plt.table(cellText=cell_text,
                      rowLabels=marriages.Total.columns,
                      colLabels=provincias,
                      loc='bottom')
plt.legend(marriages.Total.columns)
plt.title('Total Matrimonios en 2017')
~~~

Equivale a:

~~~python
provincias = ['Cantabria', 'Madrid', 'Murcia', 'León', 'Albacete']
ax = marriages.Total.loc[provincias].plot.bar(stacked=True,
    table=True, title='Total Matrimonios en 2017')
~~~
:::

##
::: { .smaller }
~~~python
provincias = ['Cantabria', 'Madrid', 'Murcia', 'León', 'Albacete']
ax = marriages.Total.loc[provincias].plot.bar(
    stacked=True, table=True,
    title='Total Matrimonios en 2017'
)
~~~
:::

![barplot_stacked]\


##
Generalmente las opciones más usadas en cada tipo de gráfico (título, ejes y
posición, color, tamaño de línea, ...) son directamente accesibles desde
`pandas.DataFrame.plot()`.

Para el resto, usar `matplotlib` refiriéndonos al objeto a modificar:

~~~python
ax = df.plot(kind='scatter', ...)  # df.plot.scatter(...)
ax.set_yticks(rotation='vertical')
~~~

# Tipos de gráficos disponibles
#### Tipos de gráficos con `pandas`

##
::: { .smaller }

- Scatter
~~~python
df.plot.scatter(
    'a', 'b', c='c', s=df['d'],
    colormap='viridis', alpha=.5,
    title='Scatter con pandas', rot='vertical',
    ax = ax;
)
~~~

![pd_scatter]\
:::

##
- Histograma

~~~python
df.hist(sharey=True, log=True)
~~~

![pd_hist] \

##
Series temporales

![ts]\

##
Boxplots

::: { .smaller }

:::
::::::::::::: {.columns}
::: {.column width="40%" .smaller}
~~~python
df.boxplot(by='origin', ax=ax)
~~~
:::
::: {.column width="60%"}
![pd_boxplot]\
:::
::::::::::::::

:::

##
Area

::: { .smaller }

::::::::::::: {.columns}
::: {.column width="60%" .smaller}
~~~python
np.random.seed(0)
N = 5
data = pd.DataFrame(
    {'Grupo A': np.random.randint(1, 20, N),
     'Grupo B': np.random.randint(1, 20, N),
     'Grupo C': np.random.randint(1, 20, N)},
    index=range(1, N+1)
)

ax = plt.subplot(1, 2, 1)
data.plot.area(
    stacked=False,
    alpha=.6,
    title='Gráfico de área',
    ax=ax)

ax = plt.subplot(1, 2, 2)
data.plot.area(
    title='Gráfico de área (apilado)',
    ax=ax)
~~~
:::
::: {.column width="40%"}
![pd_area]\
:::
::::::::::::::

:::

##
Circular

::: { .smaller }
:::
::::::::::::: {.columns}
::: {.column width="50%" .smaller}
~~~python
ax = df1.plot.pie(cmap=cmap,
                  title='Cilindros',
                  autopct='%.2f', ax=ax)
~~~
:::
::: {.column width="50%"}
![pd_pie]\
:::
::::::::::::::


# Parámetros opcionales
#### Parámetros opcionales en `pandas`

##
### `pd.DataFrame.plot()`

::: { .smaller }
Es posible pasar argumentos para realizar personalizaciones rápidas.

- Existen opciones específicas para cada tipo de visualización
- También hay opciones **comunes** a todos ellos
- Además, podremos usar las primitivas de `matplotlib`, bien como
  argumentos adicionales o sobre los ejes
:::

## NaN

- Por defecto ignora los datos ausentes (`NaN`)
- Podemos "rellenar los huecos": `df.fillna()`
  + propagando el último valor
  + o con valores preestablecidos
- O interpolar `df.interpolate()`
