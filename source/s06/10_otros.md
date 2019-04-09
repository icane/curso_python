
# [Seaborn]
#### seaborn

##
- Descargar [cuaderno jupyter][nb_snsbokeh]
- Abrirlo con `jupyter notebook`
- Ejecutar paso a paso de la siguiente sección

##
Capa de abstracción que simplifica ciertas tareas enfocadas a análisis
estadístico

::::::::::::: {.columns}
::: {.column width="50%" .smaller}
~~~python
sns.set()  # tema por defecto
crashes = sns.load_dataset("car_crashes")

with sns.color_palette("husl", 8):
    sns.jointplot(
        "speeding",
        "alcohol",
        crashes,
        kind='reg'
    )
~~~
:::
::: {.column width="50%"}
![seaborn_scatter]\
:::
::::::::::::::

##

Con `matplotlib`: ...

:::{ .smaller }
~~~python
from scipy.stats import gaussian_kde

ax1 = plt.subplot2grid((4, 4), (1, 0), colspan=3, rowspan=3)
ax2 = plt.subplot2grid((4, 4), (0, 0), colspan=3)
ax3 = plt.subplot2grid((4, 4), (1, 3), rowspan=3)

crashes.plot.kde(y='speeding', ax=ax2, sharex=ax1, legend=None)
crashes.plot.hist(y='speeding', bins=6, ax=ax2, sharex=ax1, normed=True,
    legend=None, alpha=.5, color='red')
crashes.plot.scatter(x='speeding', y='alcohol', ax=ax1, color='red', s=50)

ax2.set_ylabel('')
ax2.set_yticks=[]
ax2.set_yticklabels=[]

# No está soportado directamente el rotado en kde
kde_speeding = gaussian_kde(crashes.alcohol)
y = np.linspace(np.amin(crashes.alcohol), np.amax(crashes.alcohol), 100)
ax3.plot(kde_speeding(y), y)
crashes.plot.hist(y='alcohol', ax=ax3, sharey=ax1, normed=True, legend=None,
    orientation='horizontal', alpha=.5, color='red')
~~~
:::

##
Multitud de gráficas pre-establecidas

::::::::::::: {.columns}
::: {.column width="50%"}
![seaborn_kde1]\
:::
::: {.column width="50%"}
![seaborn_kde2]\
:::
::::::::::::::

##
::: {.smaller}
Permite [cambiar temporalmente la estética](sns_context) mediante
`context managers`:

~~~python
with sns.axes_style("ticks") and sns.color_palette("muted"):  # estilo temporal
    sns.pairplot(data=tips,
                 hue='smoker',
                 kind='reg')
~~~

![seaborn_pairplot]\
:::

##

[+ ejemplos][seaborn_ex]

[tutorial seaborn][sns_tutorial]

~~~python
x, y = np.random.multivariate_normal(mean, cov, 1000).T
with sns.axes_style("white"):
    sns.jointplot(x=x, y=y, kind="hex", color="k");
~~~

# [Bokeh]
#### [bokeh]

##
- Permite generar gráficos "interactivos"
- Salida a HTML o integrado en cuaderno `jupyter`

<video data-autoplay src="images/s06/bokeh.webm"></video>
