
# Interactivo/Práctico
#### Caso práctico

##
- Descargar [cuaderno jupyter][nb_practice]
- Abrirlo con `jupyter notebook`
- Utiliza las celdas vacías para las respuestas, pruebas, etc.

##
1. `ax`: ejes sobre los que dibujar

![practica_01]\

##

1.2. Barras apiladas (`stacked`)

![practica_01b]\

##
::: { .smaller }
2. `subplots [True|False]`: subplot para cada columna dibujada
   + `layout`: (`n_filas`, `n_columnas`), opcional con `subplot=True`

![practica_02]\
:::

##
2.2. `layout` como parámetro de `plt.subplots()`

![practica_02b]\

##
3. `sharex/sharey`: compartir ejes (subplots)

![practica_03]\

##
4. `title`:
   - `str`: título de la figura
   - `list(str)`: título de cada subplot

![practica_04]\

##
5. `figsize`: tamaño de la figura

![practica_05]\

##
6. `stacked [True|False]`: apilar datos

![practica_06]\

##
7. `grid [True|False]`: dibujar cuadrícula

![practica_07]\

##
8. `rot`: `'horizontal'`, `'vertical'`, o número (en grados)

![practica_08]\

##  
9. `xlim, ylim`: tuplas `(lo, hi)` para delimitar visualización

![practica_09]\

##
10. `colormap`: mapa de colores (`plt.colormaps()`)

![practica_10]\

##
11. `secondary_y`: segundo eje de ordenadas

![practica_11]\

##
12. `table [True|False]`: mostrar tabla bajo el gráfico

![practica_12]\

<!-- ##
**BONUS**
Generar un gráfico circular con estilo `xkcd`

![practica_99]\

 -->
