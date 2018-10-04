
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

>- Puede afectar a otros componentes
>- Dependencias entre distintos proyectos 
>- Puede no ser la misma versión que la requerida en un proyecto

##
![https://xkcd.com/1987]


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
### Conda: (anaconda/miniconda)

- Gestor de paquetes multi-lenguaje (python/R/...)
- Transparente: no instala ficheros fuera de su directorio
- Multipropósito, gestiona paquetes adicionales (p.e. `git`, librerías, ...)

## 

Anaconda                                Miniconda
--------                                ----------
~3GB disco                              <400MB
> 200 librerías                         base + dependencias
+ herramientas                          ciclo distribución +rápido
IDE
Anaconda Navigator                      sin interfaz gráfico
&uarr; tiempo instalación
                        

## 
Alternativa: [python] + [pipenv]



# Instalación


##
Determinar la plataforma sobre la que se va a instalar

![conda_platform] \

::: notes
instalar con chocolatey?
:::

##
<https://conda.io/miniconda.html>
![setup] \
La instalación puede tardar unos minutos (5-10)

::: notes
tiempos en VM windows 7-32bit 2GB RAM
miniconda: 5 min
anaconda: 18 min
:::