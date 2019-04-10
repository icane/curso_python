
# Visualización de datos
#### Visualización de datos - Introducción

##
Representamos datos de forma gráfica porque:

- Más fácil y rápido de interpretar
- Cada dominio representa los datos de una manera
- Alto volumen de datos: mejor visualmente

##
Realizar gráficas desde un lenguaje de programación:

- Gráficas ~~estáticas~~ dinámicas
- Automatizar proceso complejo
  + Combinar procesamiento de datos con su representación
- Personalizable
  + Diferentes soportes (web, publicaciones, presentaciones)

##
En general, seguiremos un procedimiento:

- Obtención de datos (BB.DD., web, logs, ...)
- Sanear y procesar los datos
- Selección de parámetros
- Visualización
- Personalización (estilos)

##
[Librerías más usadas][10libraries]:

::: incremental
::: {.smaller}
- [Matplotlib] para gráficos estáticos
  + standard de-facto, basado en [MATLAB]
  + hacer fácil tareas sencillas y posible tareas complejas
  + versátil, madura y extensa
  + integrado con pandas (<100%)
  + acepta paquetes de terceros como **extensiones** (plugins)
- [Seaborn] para estadística
  * enfocado a análisis de datos
  * mejora el diseño de `matplotlib` (plugin)
- [Bokeh] para gráficas **dinámicas**
- [Cartopy], [folium] para mapas
:::
:::

##
- Descargar cuaderno jupyter: [matplotlib/pyplot][nb_mpl]
- Iniciar jupyter (2 opciones):
   + Desde Anaconda Navigator (jupyter notebook > _Launch_)
   + Desde un terminal (`Anaconda Prompt` o terminal de VSCODE):

        `> jupyter notebook`
- Abrir cuaderno descargado en jupyter
- Ejecutar paso a paso de la siguiente sección

> ☝ **Fragmentos de código encerrados entre '`#####`'**
