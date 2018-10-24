
# Visualización de datos
#### Visualización de datos

##

Diferentes librerías para visualización de datos

::: incremental
::: {.smaller}
- [Matplotlib]
  + standard de-facto
  + hacer fácil tareas sencillas y posible tareas complejas
  + versátil, madura y extensa
  + integrado con pandas (<100% )
  + acepta paquetes de terceros como **extensiones**
- Algunas extensiones de Matplotlib:
  + [Seaborn]
    * funciona sobre `matplotlib`
    * enfocado a análisis estadístico
  + [Cartopy], [folium]
    * visualización de datos en mapas
- [Bokeh]
  + enfocado a gráficos interactivos
:::
:::

## Matplotlib
#### `pyplot`: módulo con interfaz parecida a [MATLAB]

~~~python
import matplotlib.pyplot as plt
# from matplotlib import pyplot as plt
~~~

Importar las librerías necesarias

##
Partes de una figura

![simple_anatomy] \

##
Partes de una figura (II)

![fig_anatomy] \


##
Los componentes más importantes son:

::: incremental
- Figura
- Ejes (axes)
  + región de la figura donde se visualizarán gráficos
- Eje (axis)
  + eje de coordenadas
- Artist
  + cualquier elemento (líneas, leyenda, etc., incluidos ejes)
:::

##
::: {.smaller}
Como regla general seguiremos los siguientes pasos:

1. Crear figura
2. Obtener ejes
3. Dibujar sobre los ejes

**Nota**: 1 y 2 se pueden combinar en un mismo comando
:::

~~~python
N = 1000
np.random.seed(2983)  # reproducibilidad

fig = plt.figure()  # crea figura
ax = plt.subplot(1, 1, 1)  # crea ejes
t = pd.date_range('1/1/2018', periods=365)
y = np.random.randn(N).cumsum()
ax.plot(t, y)  # dibuja sobre los ejes
~~~

##
De forma simplificada, los ejes y la figura se crean simultáneamente:

~~~python
# fig = plt.figure()  # crea figura
# ax = plt.subplot(1, 1, 1)  # crea ejes
(fix, ax) = plt.subplots(1, 1)  # (n_rows, n_cols)
t = pd.date_range('1/1/2018', periods=365)
y = np.random.randn(N).cumsum()
ax.plot(t, y)  # dibuja sobre los ejes
~~~

## Importante
En un cuaderno los gráficos aparecerán automáticamente si la primera línea es:

~~~python
%matplotlib inline
~~~

De lo contrario necesitaremos ejecutar:

~~~python
# [...]
ax.plot(t, y, 'g.-')
plt.show()  # muestra el gráfico
~~~
... para mostrar cada gráfico

##
### matplotlib acepta los siguientes tipos de datos:

- Listas
- Diccionarios
- `np.array`
- `pandas.DataFrame`

El tipo de datos nativo es `np.array`.

El resto puede -o no- funcionar.

##
#### `plt.subplots()`
::: { .smaller }
Para crear una tupla (figura, ejes) usaremos:

:::

::::::::::::: {.columns}
::: {.column width="50%" .smaller}
- `plt.subplots()`
  + sin argumentos: crea una figura con 1 area de dibujo
  + (`nrows`, `ncols`): crea una figura con `nrows*ncols` areas
  + devuelve la figura y todos los ejes
:::
::: {.column width="50%"}
~~~python
fig, (eje1, eje2) = plt.subplots(1, 2)

eje1.plot(t, y, 'g')
eje2.plot(t, -y[::-1])
~~~
![subplots12] \
:::
::::::::::::::

##
#### `plt.subplots()`
::: { .smaller }
Para crear una tupla (figura, ejes) usaremos:

:::

::::::::::::: {.columns}
::: {.column width="50%" .smaller}
- `plt.subplots()`
  + sin argumentos: crea una figura con 1 area de dibujo
  + (`nrows`, `ncols`): crea una figura con `nrows*ncols` areas
  + devuelve la figura y todos los ejes

~~~python
fig, ejes = plt.subplots(
    2, 1, sharex=True,
    figsize=(8, 10),
    facecolor='#fabada'
)
ejes[0].plot(t, y, 'g.')
ejes[1].plot(t, 1/y, '.-')
~~~
:::
::: {.column width="50%"}
![subplots21] \
:::
::::::::::::::

##
#### `plt.subplot()`

::: { .smaller }
> **¡Ojo!:** `plt.subplot()` != `plt.subplots()`

  + (`nrows`, `ncols`, `index`): crea un eje
  + devuelve 1 solo eje (al que se haga referencia)

::::::::::::: {.columns}
::: {.column width="50%" .smaller}
~~~python
fig = plt.figure(figsize=(10, 10))

ax1 = plt.subplot(2, 1, 1)
ax1.plot(t, y, 'gs')

ax2 = plt.subplot(2, 2, 3)
ax2.hist(y, alpha=.7)

ax3 = plt.subplot(2, 2, 4)
ax3.pcolormesh(
  np.tril(np.random.uniform(size=(10, 10)),
          -1)
)
~~~
:::
::: {.column width="50%"}
![subplot] \
:::
::::::::::::::
:::

## Guardar una figura a fichero

::: { .smaller }
~~~python
from sklearn.datasets import load_iris

iris = load_iris()
plt.style.use('ggplot')
fig, ax = plt.subplots(figsize=(7, 6))
formatter = plt.FuncFormatter(lambda i, *args: iris.target_names[int(i)])

plt.scatter(iris.data[:, 0], iris.data[:, 1], c=iris.target)
plt.colorbar(ticks=[0, 1, 2], format=formatter)

figure.savefig('iris.pdf')
~~~

Tipos de fichero soportados, según backend:

~~~python
print(fig.canvas.get_supported_filetypes())
~~~
:::

# Tipos de gráficos más importantes
#### Tipos de gráficos - Lineplot

## Lineplot (`.plot()`)

##
~~~python
(fix, ax) = plt.subplots(1, 1)  # (n_rows, n_cols)

x = np.linspace(0, 10, 1000)
y = np.exp(-x/2) * np.cos(2*np.pi*x)
ax.plot(x, y, 'bo')
~~~

![plot]\

## 
Dos gráficos al mismo tiempo:

~~~python
(fig, ax) = plt.subplots(1, 1)  # (n_rows, n_cols)

x = np.linspace(0, 10, 1000)
y1 = np.exp(-x / 2) * np.cos(2 * np.pi * x)
y2 = 0.5 * np.exp(-x) * np.sin(2 * np.pi * x)
ax.plot(x, y1, 'bo',
        x, y2, 'r--')
~~~

![plot2]\

##
Dos gráficos al mismo tiempo:

~~~python
(fig, ax) = plt.subplots(1, 1)  # (n_rows, n_cols)

x = np.linspace(0, 10, 1000)
y1 = np.exp(-x / 2) * np.cos(2 * np.pi * x)
y2 = 0.5 * np.exp(-x) * np.sin(2 * np.pi * x)
ax.plot(x, y1, 'bo')
ax.plot(x, y2, 'r--')

~~~

![plot2]\

# Scatterplot
#### Tipos de gráficos - Scatterplot

##
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
t = np.random.gamma(5, size=N)
colors = np.random.rand(N)

ax1.scatter(x=a, y=b, marker='o', c='r',
            edgecolor='b')
ax1.set_title('$a$ vs $b$')
ax2.scatter(
    x, t,
    s=np.random.randint(10,800, N),  # tamaño
    marker='v',  # tipo de marcador
    c=colors,  # colores
    alpha=0.4  # nivel de transparencia
)
ax2.set_title('$x$ vs $t$')

fig.suptitle("Scatterplot")
~~~
:::
::: {.column width="40%"}
![scatter] \
:::
::::::::::::::


# Barplot
#### Tipos de gráficos - Barplot

##
::::::::::::: {.columns}
::: {.column width="55%" .smaller}
~~~python
ax1.bar(ind,      # eje de abcisas
        men_std,  # eje de ordenadas
        width,    # anchura
        color='#0055ff')
ax1.bar(ind,
        women_std,
        width,
        color='#fabada',
        bottom=men_std)

ax1.set_ylabel('Scores')
ax1.set_xlabel('Groups')
ax1.set_title('Height std by group+gender')
ax1.legend(['men', 'women'], loc='best')

# Barras horizontales

ax2.barh(ind,        # eje de ordenadas
         men_means,  # eje de abcisas
         width,      # anchura
         color='#0055ff')
ax2.barh(ind,
         women_means,
         width,
         color='#fabada')

ax2.legend(['men', 'women'], loc='upper left')
ax2.set_title('Height mean by group+gender')
ax2.set_ylabel('Groups')
~~~
:::
::: {.column width="45%"}
![barplot] \
:::
::::::::::::::

# Histograma
#### Tipos de gráficos - Histograma

##
::: {.smaller}
~~~python
fig, ax = plt.subplots(2, figsize=(10,5))
bins = 20
x1 = np.random.gamma(10, size=1000)
x2 = np.random.randn(1000)


ax1, ax2 = ax.flatten()

(ax1_values, _, _) = ax1.hist(x1, bins=bins, facecolor='brown', alpha=.7);
(_, ax2_bins, _) = ax2.hist(x2, alpha=.7, cumulative=True,
                            log=True, orientation='horizontal')
~~~
:::

![hist]\

# Piechart
#### Tipos de gráficos - Piechart

##
::: { .smaller }
~~~python
colors = ['white', 'black']
labels = [f'Fraction of this image which is {color}'
          for color in colors]

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
