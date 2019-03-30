
# _Bonus_: `[pipenv]`
#### _Bonus_: `[pipenv]`

##
- Permite gestionar un entorno virtual y sus dependencias
::: incremental
- Instalación desde `pip`
- Cada carpeta de proyecto es considerada un entorno virtual
- `Pipfile` y `Pipfile.lock` definen las dependencias
  + `Pipfile.lock` para versiones específicas, evitando que se actualicen
  + Recomendable añadir ambos ficheros en control de versiones
- Ejecutar scripts con `pipenv run ...`
:::

## Instala `[pipenv]` y crea un entorno virtual nuevo

::: { .hiddenbullets }
::: incremental
~~~bash
$ mkdir proyecto
$ cd proyecto
$ pipenv --python=3.7 [--three]
~~~
:::
:::

## Instala distintos paquetes dentro del entorno virtual

::: { .hiddenbullets }
::: incremental
~~~bash
$ pipenv install bpython
$ pip install 'pandas=='  # muestra versiones disponibles [OJO! pip]
$ pipenv install 'pandas==0.23.1' 'requests==2.2.1'
$ pipenv install 'lxml==3.*'  # bloquea solamente la rama 3.x
$ pipenv install 'untangle==1.1.*'  # bloquea versiones [major, minor]
$ pipenv install -r requirements.txt  # instala desde un fichero requirements
$ pipenv lock -r > requirements.txt  # exporta a fichero requirements
~~~
:::
:::

##
Para comprobar los paquetes instalados, mostrar el contenido de `Pipfile`

~~~bash
$ cat Pipfile
$ cat Pipfile.lock
~~~

##
Otras funcionalidades útiles con `pipenv`:

~~~bash
# muestra dónde instala realmente el entorno
$ pipenv --venv

# muestra gráfico de dependencias
$ pipenv graph

# muestra vulnerabilidades con los paquetes instalados
$ pipenv check
~~~

##
Acceder al intérprete propio del entorno:

~~~bash
$ pipenv shell
$ python  # o bpython/ipython si está instalado

# o bien: pipenv run python
~~~

##
Ejecutar código cargando librerías propias del entorno:

~~~python
>>> import pandas as pd
>>> URL_crypto = 'https://api.coinmarketcap.com/v1/ticker/'
>>> cc = pd.read_json(URL) 
>>> cc.set_index('id', inplace=True)
>>> cc[cc['price_usd'] < 300.0]
~~~

##

~~~bash
# desinstala todos los paquetes no especificados en `Pipfile.lock`
$ pipenv clean

# destruye el entorno virtual
$ pipenv --rm

~~~

##
Restaura un entorno virtual desde los ficheros `Pipfile` y `Pipfile.lock`:

~~~bash
$ pipenv install
~~~