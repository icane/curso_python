
# Elementos y parámetros
#### Elementos de visualización

## Color/estilo de línea

El color de línea para un gráfico individual se puede controlar mediante una
cadena de texto (p.e. `'r--'`):

::: {.smaller}
~~~python
colors = {'b': 'blue', 'g': 'green', 'r': 'red', 'c': 'cyan', 'm': 'magenta',
          'y': 'yellow', 'k': 'black', 'w': 'white'}

lineStyles = {'-': '_draw_solid', '--': '_draw_dashed', '-.': '_draw_dash_dot',
              ':': '_draw_dotted', 'None': '_draw_nothing',
              ' ': '_draw_nothing', '': '_draw_nothing'}

markers = {
    '.': 'point', ',': 'pixel', 'o': 'circle', 'v': 'triangle_down',
    '^': 'triangle_up', '<': 'triangle_left', '>': 'triangle_right',
    '1': 'tri_down', '2': 'tri_up', '3': 'tri_left', '4': 'tri_right',
    '8': 'octagon', 's': 'square', 'p': 'pentagon', '*': 'star',
    'h': 'hexagon1', 'H': 'hexagon2', '+': 'plus', 'x': 'x', 'D': 'diamond',
    'd': 'thin_diamond', '|': 'vline', '_': 'hline', 'P': 'plus_filled',
    'X': 'x_filled', 0: 'tickleft', 1: 'tickright', 2: 'tickup', 3: 'tickdown',
    4: 'caretleft', 5: 'caretright', 6: 'caretup', 7: 'caretdown',
    8: 'caretleftbase', 9: 'caretrightbase', 10: 'caretupbase',
    11: 'caretdownbase', 'None': 'nothing', None: 'nothing', ' ': 'nothing',
    '': 'nothing'
}
~~~
:::

##

::::::::::::: {.columns}
::: {.column width="60%" .smaller}
~~~python
N = 50
np.random.seed(4873)

x = np.linspace(0, 10, N)
k = 0.8
y = k + np.sin(x) * np.random.randn(N)

(fig, ax) = plt.subplots(1)
ax.errorbar(x, y, yerr=k, fmt='.r');
ax.plot(x, 1 + np.cos(np.pi*x), '--g')
ax.plot(x, x/5, 'b')
~~~
:::
::: {.column width="40%"}
![color_linea]\
:::
::::::::::::::


## xticks/yticks

~~~python
plt.yticks(rotation='vertical')
plt.xticks(rotation=20)  # 20 grados en sentido antihorario
~~~

![tick_rotation]\


##
#### Títulos, etiquetas y anotaciones

![titulos]\

::: {.smaller}
::::::::::::: {.columns}
::: {.column width="40%" .smaller}
- Título de la figura
- Título de cada `subplot` (`Axes`)
- Título de cada eje (`Axis`)
- Anotaciones
:::
::: {.column width="60%"}
~~~python
fig.suptitle('Niveles de alcohol y flavonoides',
             '(muestra de 178 vinos)')
ax.set_title('Vinos de 3 clases')
ax.set_xlabel('Alcohol (°)')
ax.set_ylabel('Flavonoides (ppm)')
ax.annotate(
    'Viña Arcada', xy=(11.8, 1),
     xytext=(11, .5),
    arrowprops=dict(facecolor='black', shrink=0.05)
)
~~~
:::
::::::::::::::
:::

##
### Leyenda
::: { .smaller }

- Se genera automáticamente según datos inferidos de las etiquetas

::::::::::::: {.columns}
::: {.column width="40%" .smaller}
~~~python
(line1, ) = ax.plot([1.5, 2, 3],
                    label='IPC')
(line2, ) = ax.plot([1, 1.2, 1.3],
                    label='Salarios')
ax.legend(loc='upper left')
~~~

`loc`: define dónde emplazar la leyenda

> **best**, upper right, upper left, lower left, lower right, right, center
> left, center right, lower center, upper center, center

:::
::: {.column width="60%"}
![legend] \
:::
::::::::::::::
:::

:::

# Estilos
#### Estilos

##
::: {.smaller}
::: incremental
- Aplican a todos los gráficos generados
- Estilo por defecto en `matplotlib.rcParams`
  + pueden modificarse dinámicamente
- Podemos cambiar a estilos preconfigurados:

    ~~~python
    print(plt.style.available)
    plt.style.use('ggplot')
~~~

- y/o modificar parámetros individualmente

    ~~~python
    plt.rcParams["figure.figsize"] = (20.0, 15.0)
    plt.rcParams['font.family'] = ['monospace']
    ~~~

- Los cambios aplican a todos los gráficos
  + salvo cambio temporal de estilos:

    ~~~python
    with plt.style.context(('dark_background')):
        plt.plot(np.sin(np.linspace(0, 2 * np.pi)), 'r-o')
    ~~~
:::
:::

## Otros estilos

~~~python
with plt.xkcd():
    ...
~~~

![xkcd]\

## Otros estilos

seaborn

::::::::::::: {.columns}
::: {.column width="40%" .smaller}
~~~python
import seaborn as sns

sns.set()
sns.set_context("talk")
~~~
:::
::: {.column width="60%"}
![overlay] \
:::
::::::::::::::
:::

