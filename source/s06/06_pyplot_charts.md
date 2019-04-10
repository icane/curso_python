
# Tipos de gráficos más importantes en `pyplot`
#### Tipos de gráficos en `matplotlib`/`pyplot`

##
### Lineplot (`.plot()`)
:::{.smaller}
Tipo de gráfico por defecto

~~~python
(fix, ax) = plt.subplots(1, 1)  # (n_filas, n_columnas)

x = np.linspace(0, 10, 1000)
y = np.exp(-x/2) * np.cos(2*np.pi*x)

#####
ax.plot(x, y, 'bo')
#####
~~~

![plot]\
:::

##
:::{.smaller}
Dos gráficos al mismo tiempo:

~~~python
(fig, ax) = plt.subplots(1, 1)  # (n_filas, n_columnas)

x = np.linspace(0, 10, 1000)
y1 = np.exp(-x / 2) * np.cos(2 * np.pi * x)
y2 = np.exp(-x) / 2 * np.sin(2 * np.pi * x)

#####
ax.plot(x, y1, 'bo',
        x, y2, 'r--')
#####
~~~

![plot2]\
:::

##
:::{.smaller}
Dos gráficos al mismo tiempo:

~~~python
(fig, ax) = plt.subplots(1, 1)  # (n_filas, n_columnas)

x = np.linspace(0, 10, 1000)
y1 = np.exp(-x / 2) * np.cos(2 * np.pi * x)
y2 = np.exp(-x) / 2 * np.sin(2 * np.pi * x)

#####
ax.plot(x, y1, 'bo')
ax.plot(x, y2, 'r--')  # <-- dibujar sobre el mismo eje
#####
~~~

![plot2]\
:::

##
#### Gráfico de dispersión (Scatterplot)

::::::::::::: {.columns}
::: {.column width="60%" .smaller}
~~~python
N = 75
np.random.seed(45987230)


fig, (ax1, ax2) = plt.subplots(2, 1,
                               figsize=(7, 10))
a = np.random.randint(low=1, high=11, size=50)
b = a + np.random.randint(1, 5, size=a.size)
x = np.linspace(0, 1, N)
y = np.random.gamma(5, size=N)
colors = np.random.rand(N)

#####
ax1.scatter(x=a, y=b, marker='o', c='r',
            edgecolor='b')
ax2.scatter(
    x, y,  # x=x, y=y
    s=np.random.randint(10,800, N),  # tamaño
    marker='v',  # tipo de marcador
    c=colors,  # colores
    alpha=0.4  # nivel de transparencia
)
#####

ax1.set_title('$a$ vs $b$')
ax2.set_title('$x$ vs $y$')
fig.suptitle("Scatterplot")
~~~
:::
::: {.column width="40%"}
![scatter] \
:::
::::::::::::::


##
Gráfico de barras (barplot)

::::::::::::: {.columns}
::: {.column width="55%" .smaller}
~~~python
ax1.bar(
    ind,             # eje de abcisas
    men_std,         # eje de ordenadas
    width,           # grosor de barra
    color='#0055ff'  # color de barra (RGB)
)
ax1.bar(
    ind,
    women_std,
    width,
    color='#fabada',
    bottom=men_std  # apilado
)

# Barras horizontales

ax2.barh(  # cambia orden (y, x)
    ind,            # eje 'y' !
    men_means,      # eje 'x' !
    width,          # grosor de barra
    color='#0055ff' # color (RGB)
)
ax2.barh( # cambia orden (y, x)
    ind,            # eje 'y' !
    women_means,    # eje 'x' !
    width,          # grosor de barra
    color='#fabada' # color (RGB)
)
~~~
:::
::: {.column width="45%"}
![barplot] \
:::
::::::::::::::

##
Histograma

::: {.smaller}
~~~python
fig, ax = plt.subplots(2, figsize=(10,5))
bins = 20
x1 = np.random.gamma(10, size=1000)
x2 = np.random.randn(1000)
ax1, ax2 = ax.flatten()

#####
(ax1_values, _, _) = ax1.hist(x1, bins=bins, facecolor='brown', alpha=.7);
(_, ax2_bins, _) = ax2.hist(x2, alpha=.7, cumulative=True,
                            log=True, orientation='horizontal')
#####
~~~
:::

![hist]\

##
Diagrama circular (pie)

::: { .smaller }
~~~python
ax.pie(
    [80, 20], explode=(0, .5), labels=labels,
    colors=colors, shadow=True, startangle=90
)
# ejes iguales = asegurarnos de que se muestre
# como un círculo
ax.axis('equal');
~~~
:::

![piechart] \

##
Guardar figura a fichero (de forma programática)

::: { .smaller }
~~~python
from sklearn.datasets import load_iris

iris = load_iris()
plt.style.use('ggplot')
fig, ax = plt.subplots(figsize=(7, 6))
formatter = plt.FuncFormatter(lambda i, *args: iris.target_names[int(i)])

plt.scatter(iris.data[:, 0], iris.data[:, 1], c=iris.target)
plt.colorbar(ticks=[0, 1, 2], format=formatter)

#####
fig.savefig('iris.pdf')
#####
~~~

Tipos de fichero soportados, según backend:

~~~python
print(fig.canvas.get_supported_filetypes())
~~~
:::
