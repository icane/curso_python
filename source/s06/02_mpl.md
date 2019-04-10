
# [Matplotlib]/[pyplot]
#### `pyplot`: módulo con interfaz parecida a [MATLAB]

##
Para importar [pyplot]:

~~~python
import matplotlib.pyplot as plt
# o bien: from matplotlib import pyplot as plt
# Además, sólo en jupyter: %matplotlib inline
~~~

##
Partes de una figura

![simple_anatomy] \ ![fig_anatomy]

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
4. Añadir elementos extra (anotaciones, título)
5. Renderizar gráfica

**Nota**: 1 y 2 se pueden combinar en un mismo comando
:::

~~~python
N = 365
np.random.seed(2983)  # reproducibilidad
t = pd.date_range('1/1/2018', periods=N)
y = 200 * (np.random.randn(N).cumsum() + 40)

#####
fig = plt.figure()  # crea figura
ax = plt.subplot(1, 1, 1)  # crea ejes

ax.plot(t, y)  # dibuja sobre los ejes
#####
~~~

##
De forma simplificada, los ejes y la figura se crean simultáneamente:

~~~python
(fix, ax) = plt.subplots(1, 1)  # (n_filas, n_columnas)

ax.plot(t, y)  # dibuja sobre los ejes
~~~

## ⚠ Importante ⚠
En jupyter/ipython, los gráficos aparecerán automáticamente si la primera
línea es:

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
#### [Matplotlib] puede dibujar datos organizados en:

- Listas
- Diccionarios
- Arrays (`np.array`)
- `pandas.DataFrame`

::: {.smaller}
El tipo de datos nativo es `np.array`.

⚠ El resto puede requerir sanear/homogeneizar los datos ⚠
:::

##
::: { .smaller }
Para crear una tupla (figura, ejes) usaremos:

:::

::::::::::::: {.columns}
::: {.column width="50%" .smaller}
- `plt.subplots()`
  + sin argumentos: crea una figura con 1 area de dibujo
  + plt.subplots(`n`, `m`): crea una figura con varias zonas de dibujo
    distribuidas en `n` filas y `m` columnas
  + devuelve la figura y todos los ejes
:::
::: {.column width="50%"}
~~~python
fig, (eje1, eje2) = plt.subplots(1, 2)

eje1.plot(t, y, 'g')
eje2.plot(t, z)
~~~
![subplots12] \
:::
::::::::::::::

##
::::::::::::: {.columns}
::: {.column width="50%"}
~~~python
#####
fig, (eje1, eje2) = plt.subplots(1, 2)
#####

eje1.plot(t, y, 'g')
eje2.plot(t, z)
~~~
![subplots12] \
:::
::: {.column width="50%"}
~~~python
#####
fig, ejes = plt.subplots(2, 1,
#####
    sharex=True, figsize=(8, 10),
    facecolor='silver')
ejes[0].plot(t, y, 'g.')
ejes[1].plot(t, z, '.-')
~~~
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

:::notes
# SALTAR
:::

