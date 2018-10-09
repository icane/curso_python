
# Instalación y entorno
#### Instalación y entorno de programación

##
Diferentes distribuciones para Windows:

::: incremental
- [python]
- [conda]
- [winpython]
   + enfocado a sitemas Windows
   + no necesita ser instalado
   + incluye compilador C/C++
- [activepython] (comercial)
:::

##
> Regla general: evitar usar el intérprete global del sistema

::: incremental
- Puede afectar a otros componentes
- Dependencias entre distintos proyectos 
- Puede no ser la misma versión que la requerida en un proyecto
:::

##
![<https://xkcd.com/1987>][https://xkcd.com/1987]


## ¿Solución?

# Entornos virtuales
#### Entornos virtuales

## 
- Funcionan como entornos seguros
- Independientes entre sí
- Permiten especificar versiones de Python
- Facilmente reproducibles y exportables (**Portabilidad**)

## 
![entornos] \

::: notes
    > where python
:::

# Conda
#### Python en Windows

##
### Conda (anaconda/miniconda)

- Gestor de paquetes multi-lenguaje (python/R/...)
- Transparente: no instala ficheros fuera de su directorio
- Multipropósito, gestiona paquetes adicionales (p.e. `git`, librerías, ...)
- Coexistencia de entornos con diferentes librerías y versiones de python

>- Por defecto nos encontraremos en el entorno `base`

## 

Anaconda                                Miniconda
--------                                ----------
~3GB disco                              <400MB
> 200 librerías                         base + dependencias
+ herramientas                          ciclo distribución +rápido
IDE (Spyder + **890-VSCode**)
Anaconda Navigator                      sin interfaz gráfico
&uarr; tiempo instalación
                        

## 
Alternativa: [python] + [pipenv]

(más bajo nivel)


# Instalación
#### Instalación

##
Determinar la plataforma sobre la que se va a instalar

![conda_platform] \

::: notes
instalar con chocolatey?
:::

##
<https://www.anaconda.com/download/>
![setup] \
La instalación puede tardar unos 5-10 minutos

::: notes
tiempos en VM windows 7-32bit 2GB RAM
miniconda: 5 min
anaconda: 18 min
:::

# Práctica I
#### Práctica I

##
### Entorno virtual con Navigator

- Ejecutar Navigator y crear un nuevo entorno (distinto a `base`) con 
  diferentes librerías instaladas, p.e.:

 ----------------- ---------------
 `pandas`          `bs4`
 `matplotlib`      `jupyter`
 `scrapy`          `seaborn`
 `sqlalchemy`      `flask`
 `jsonschema`      `bokeh`
 ----------------- ---------------

## {data-background-image="images/venv_navigator.gif" data-background-size=80%}

# Práctica II
#### Práctica II

##
### Entorno virtual en modo texto

::: notes
Se puede sugerir que cierto grupo instale diferentes versiones
:::

- Ejecutar `Anaconda prompt`
- Verificar que conda está instalado:
~~~zsh
(base) conda info
~~~

##
### Entorno virtual en modo texto

Crear un entorno virtual con `pandas`, `matplotlib`, `jupyter` y `pyjstat`.


- Crear un entorno virtual:

~~~zsh
(base) conda create --name entorno-01
(base) conda create --name entorno-02 python=2.7 --yes
# crea entorno con paquetes preinstalados
(base) conda create -n entorno-03 python=3.7 pandas matplotlib -y

(base) conda activate entorno-03
(entorno-03) conda list  # muestra paquetes instalados

# instala paquetes de PyPI no gestionados por conda
(entorno-03) pip install pyjstat 

# exportar definición del entorno
(entorno-03) conda env export  > entorno-03.yml
~~~

##
- Acceder al entorno virtual y mostrar librerías instaladas
~~~zsh
(base) conda activate entorno-03
(entorno-03) conda list  # muestra paquetes instalados

# instala paquetes adicionales
(entorno-03) conda install jupyter -y

# instal librerías desde PyPI, no gestionados por conda
(entorno-03) pip install pyjstat 
(entorno-03) conda list
~~~

[Guía de usuario `pip`][pip_userguide]

