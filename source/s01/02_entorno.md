
# Instalación y entorno
#### Instalación y entorno de programación

##
Diferentes distribuciones para Windows:

::: incremental
- [python] (cpython)
- **[conda]** (anaconda/miniconda)
- [canopy]
- [winpython]
   + enfocado a sitemas Windows
   + no necesita ser instalado
   + incluye compilador C/C++
- [activepython] (comercial)
:::

##
### Podemos ejecutar código **python**:

::: incremental
- Directamente (si el S.O. lo permite, `#!`)
- Desde un intérprete interactivo `python` (p.e. `ipython`, `bpython`)
- Desde un [cuaderno `jupyter`]
:::

::: notes
cuaderno jupyter en html: https://bit.ly/2ygkNqU
:::

##
::::::::::::: {.columns}
::: {.column width="60%" .smaller}
- Para ejecutar código python necesitaremos un **intérprete** (`python.exe`).

::: incremental
- Preinstalado en ciertos S.O. (p.e. Linux, Mac OS X)
- Diferentes tipos de intérprete (**`CPython`**, `PyPy`, `Jython`,
  `IronPython`...)
- Podemos tener "`n`" intérpretes distintos instalados en el sistema, cada uno
  con diferentes librerías
- `conda`: instala por defecto un entorno (intérprete) `base` y un conjunto de
  librerías
:::

:::
::: {.column width="40%"}
![hierarchy] \
:::
::::::::::::::



##
Cada entorno tiene un único intérprete python + librerías

![entornos]\

##
![entornos_brokendeps]\

::: {.hiddenbullet}
::: incremental
- ... necesitamos un entorno independiente
:::
:::

##
![<https://xkcd.com/1987>][https://xkcd.com/1987]



## ¿Solución?

# Entornos virtuales
#### Entornos virtuales

##
- Funcionan como un marco aislado y seguro
- Independientes entre sí
- Permiten especificar versiones de Python (2.7.10, 3.6.6, 3.6.7, ...)
- Facilmente reproducibles y exportables (**Portabilidad**)
  + p.e. replicar un entorno preexistente
- De _"usar y tirar"_ (p.e. probar nuevas versiones de código o librerías)

##
Por defecto partiremos de un entorno global/base 
![entornos]\

##
> **Regla general**: evitar usar el intérprete global del sistema
  y el entorno `base`

::: incremental
- Puede afectar a otros componentes
- Dependencias entre distintos proyectos 
- Puede no ser la misma versión que la requerida en un proyecto
:::

##
![entornos_venv]\

##
![entornos_conda]\

::: notes
    > where python
:::

# Conda
#### Python en Windows

##
### Conda (anaconda/miniconda)

- Gestor de paquetes multi-lenguaje (python/R/...)
- Transparente: no instala ficheros fuera de su directorio
- Distribución multipropósito, gestiona paquetes adicionales (p.e. `git`,
  librerías, ...)
- Coexistencia de entornos con diferentes librerías y versiones de python

>- Por defecto nos encontraremos en un entorno llamado `base`

## 

Anaconda                                Miniconda
--------                                ----------
~3GB disco                              <400MB
> 200 librerías                         base + dependencias
+ herramientas                          ciclo distribución +rápido
IDE (Spyder + **VSCode**)
Anaconda Navigator                      sin interfaz gráfico
&uarr; tiempo instalación
                        

## 
Alternativas (más bajo nivel):

- [python] + [pipenv]
- [python] + [virtualenvwrapper (lazy)][virtualenvwrapper]

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
con `chocolatey`:

~~~zsh
> choco install anaconda3 vscode -y
~~~

🕐 7-15 minutos

::: notes
tiempos en VM windows 7-32bit 2GB RAM
miniconda: 5 min
anaconda: 18 min
:::

# Práctica I
#### Práctica I

##
### Entorno virtual con Navigator

- Ejecutar "Anaconda Navigator" y crear un nuevo entorno (distinto a `base`)
  con diferentes librerías instaladas, p.e.:

 ----------------- ---------------
 `pandas`          `beautifulsoup4`
 `requests`        `jupyter`
 `scrapy`          `matplotlib`
 `sqlalchemy`      `numpy`
 `jsonschema`      `seaborn`
 ----------------- ---------------

## {data-background-image="images/s01/venv_navigator.gif" data-background-size=80%}

# Práctica II
#### Práctica II: Entorno virtual en modo texto

##
### Entorno virtual en modo texto

::: notes
Se puede sugerir que cierto grupo instale diferentes versiones
:::

- Ejecutar `Anaconda prompt` o acceder a la terminal desde [vscode]
- Verificar que conda está instalado:
~~~zsh
(base) > conda info
(base) > conda --help
~~~

##
Crear un entorno virtual con `pandas`, `scrapy`, `jupyter`, `bs4` y `pyjstat`.

- Inicializar el entorno virtual. Ejemplos:

~~~zsh
(base) > conda create --name entorno-01
(base) > conda create --name entorno-02 python=2.7 --yes
# crea entorno con paquetes preinstalados
(base) > conda create -n entorno-03 python=3.7 pandas scipy -y
~~~

- Acceder (activar) el entorno virtual:

~~~zsh
(base) > conda activate entorno-03
(entorno-03) > conda list  # muestra paquetes instalados
~~~

##
Crear un entorno virtual con `pandas`, `scrapy`, `jupyter`, `bs4` y `pyjstat`.

- Instalar librerías adicionales dentro del entorno

~~~zsh
# instala librerías gestionadas por conda
(entorno 03) > conda install pandas scrapy jupyter bs4 --yes
~~~

##

- `pyjstat` no está dentro de los repositorios de conda
  + instalaremos desde [PyPI] o desde el repositorio `git`
  + ejecutar solamente uno de los siguientes comandos

~~~zsh
# instala paquetes no gestionados por conda desde PyPI (Python Package Index)
(entorno-03) > pip install pyjstat
# o bien desde el repositorio git
(entorno-03) > pip install -e ^
"git+https://github.com/predicador37/pyjstat.git#egg=pyjstat-git"

~~~

##
- Exportar entorno virtual (distribuible y replicable)

~~~zsh
# exportar definición del entorno
(entorno-03) > conda list --export > requirements.txt  # solo dependencias
(entorno-03) > conda env export > entorno-03.yml  # entorno + dependencias
# salir del entorno (vuelve al entorno base)
(entorno-03) > conda deactivate
(base) >
~~~

- Acceder al entorno virtual y mostrar librerías instaladas
~~~zsh
(base) > conda activate entorno-03
(entorno-03) > conda list  # muestra paquetes instalados

# instala paquetes adicionales
(entorno-03) > conda install seaborn -y

~~~

##

- [Resumen comandos `conda`][conda_cheatsheet]
- [Guía de usuario `pip`][pip_userguide]


::: notes
En python, los términos "paquete", "librería" y "módulo" son comunmente
intercambiables, salvo para referirnos a "librerías standard".
::::

