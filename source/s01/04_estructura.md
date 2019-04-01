
# Estructura del código
#### Estructura del código

##
- No hay delimitadores de línea (tipo '`;`')
- Jerarquía del código según nivel de indentación
- Indentar código con espacios
- Comentar código con « `#` »
- Importar librerías al inicio
- Código agrupado con líneas en blanco
- **Recomendado**: Longitud de línea < 80 caracteres

[cuaderno jupyter][binder03]

[cuaderno jupyter (offline)][03ipynb]

##
::: {.smaller}
- No hay delimitadores de línea (tipo `;`)
- Jerarquía del código según nivel de sangría (*indent*)
- Diferenciarlo con espacios &sup1;

~~~python
import os


home = os.path.expanduser('~')  # directorio del usuario
directorio = os.path.join(
    home, 'Documentos', 'python'
)
ficheros = []

# Busca ficheros y guarda (nombre, tamaño)
for f in os.listdir(directorio):
    ruta = os.path.join(directorio, f)
    if os.path.isfile(ruta):
        tamaño = os.stat(ruta).st_size
        ficheros.append((f, tamaño))
        print(f)
        print(tamaño)
print("Total", len(ficheros), "ficheros")
~~~

:::: {.footnote}
&sup1; Generalmente con 4 espacios, no mezclar con tabuladores!!!
::::
:::

::: notes
Copiar y pegar el texto en st3 para visualizar los caracteres vacíos
:::

##
:::{.smaller}
- Comentar código con « `#` »

~~~python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Descripción breve del programa.
Varias líneas delimitadas por 3 caracteres "
"""
import os


home = os.path.expanduser('~')  # comentario en línea
directorio = os.path.join(
    home, 'Documentos', 'python'
)

# Comentario
ficheros = [f for f in os.listdir(directorio) 
            if os.path.isfile(os.path.join(directorio, f))]
for f in ficheros:
    print(f)
    print(os.stat(os.join(directorio), f).st_size)

~~~
:::

##
::: {.smaller}
- Importar librerías al inicio
- Código agrupado con líneas en blanco
  + 2 líneas después de los `import`
  + funciones y clases: 2 líneas antes/después
  + métodos dentro de clases: 1 línea
  + líneas adicionales para agrupar funciones relacionadas

~~~python
from pathlib import Path


home = Path.home()  # pathlib.Path.home()
directorio = home / 'Documentos' / 'python'


def busca_ficheros(directorio):
    return (
      (f.name, f.stat().st_size) for f in directorio.iterdir() if f.is_file()
    )


for (nombre, tamaño) in busca_ficheros(directorio):
    print(f'Encontrado fichero {nombre} de {tamaño} Bytes')

~~~
:::

##
Palabras reservadas

::: {.smaller}
~~~python
import builtins
import keyword


print(', '.join(keyword.kwlist))
False, None, True, and, as, assert, async, await, break, class,
continue, def, del, elif, else, except, finally, for, from,
global, if, import, in, is, lambda, nonlocal, not, or, pass,
raise, return, try, while, with, yield

print(dir(builtins))
['ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException',
'BlockingIOError', 'BrokenPipeError', 'BufferError', 'BytesWarning',
'ChildProcessError', 'ConnectionAbortedError', 'ConnectionError',
'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning',
'EOFError', 'Ellipsis', 'EnvironmentError', 'Exception', 'False',
'FileExistsError', 'FileNotFoundError', 'FloatingPointError', 'FutureWarning',
'GeneratorExit', 'IOError', 'ImportError', 'ImportWarning', 'IndentationError',
'IndexError', 'InterruptedError', 'IsADirectoryError', 'KeyError',
'KeyboardInterrupt', 'LookupError', 'MemoryError', 'ModuleNotFoundError',
'NameError', 'None', 'NotADirectoryError', 'NotImplemented',
'NotImplementedError', 'OSError', 'OverflowError', 'PendingDeprecationWarning',
'PermissionError', 'ProcessLookupError', 'RecursionError', 'ReferenceError',
'ResourceWarning', 'RuntimeError', 'RuntimeWarning', 'StopAsyncIteration',
'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError', 'SystemExit',
'TabError', 'TimeoutError', 'True', 'TypeError', 'UnboundLocalError',
'UnicodeDecodeError', 'UnicodeEncodeError', 'UnicodeError',
'UnicodeTranslateError', 'UnicodeWarning', 'UserWarning', 'ValueError',
'Warning', 'ZeroDivisionError', '__IPYTHON__', '__build_class__', '__debug__',
'__doc__', '__import__', '__loader__', '__name__', '__package__', '__spec__',
'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray',
'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex', 'copyright',
'credits', 'delattr', 'dict', 'dir', 'display', 'divmod', 'enumerate', 'eval',
'exec', 'filter', 'float', 'format', 'frozenset', 'get_ipython', 'getattr',
'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int',
'isinstance', 'issubclass', 'iter', 'len', 'license', 'list', 'locals', 'map',
'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow',
'print', 'property', 'range', 'repr', 'reversed', 'round', 'set', 'setattr',
'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type',
'vars', 'zip']

~~~
:::

##
#### `if __name__ == "__main__":`

::: {.smaller}
Se llama a `__main__()` cuando se ejecuta [directamente][circunferencia.py]:

~~~zsh
(base) python circunferencia.py 35
~~~

~~~python
import sys
import math

def area(radio):
    return math.pi * (radio ** 2)

def longitud(radio):
    return 2 * math.pi * radio

print('Hola mundo')

# entra aquí cuando se ejecuta desde un intérprete
if __name__ == "__main__":
    radio = float(sys.argv[1])  # sys.argv[] son los argumentos de entrada
    print(
        "La longitud de una circunferencia de radio {}cm es {:.2f}cm^2."
        .format(radio, longitud(radio))
    )
    print("El area de una circunferencia de radio {1}cm es {0:.2f}cm^2."
          .format(area(radio), radio))
~~~
:::

::: notes
- En el ejemplo anterior no son necesarios los paréntesis, ya que el operador
`**` tiene prioridad sobre `*`. Lo verán en la sesión#2.
- Probar a hacer un `import circunferencia`, aparecerá 'Hola mundo'
::::

##
::: {.smaller}
- Un fichero `python` puede contener (entre otros) definiciones de constantes,
  variables, funciones o clases.
- Para organizar el código guardaremos los ficheros `.py` en un árbol de
  directorios:

~~~
    principal/
        __init__.py         import principal
        practica.py
        recolector/         from principal import recolector
            __init__.py
            collector.py
            database.py
        conversor/
            __init__.py
            limpia.py
            procesa.py
        graficos/
            __init__.py
            graficos.py
            exportar.py
        string/
            __init__.py
            string.py
~~~
:::

::: notes
Identificaremos un directorio como paquete python mediante el fichero
`__init__.py` (que puede estar vacío o no).

:::

## Proyecto ejemplo

:::::::::::::: {.columns}
::: {.column width="40%"}
~~~
proyecto/
    README.rst
    LICENSE
    setup.py
    requirements.txt
    entorno_conda.yml
    ejemplo/__init__.py
    ejemplo/core.py
    ejemplo/helpers.py
    docs/conf.py
    docs/index.rst
    tests/unitarios.py
    tests/funcionales.py
~~~
:::
::: {.column width="60%"}
    nombre del paquete
    descripción del proyecto
    licencia [2]
    distribución/empaquetado [3]
    descripción de las dependencias
    descripción del entorno
    el código en sí
    " "
    " "
    documentación del proyecto
    " "
    funciones de test del proyecto
    " "
:::
::::::::::::::

:::: {.footnote}
&sup2; [choosalicense]
::::

:::: {.footnote}
&sup3; p.e. [setuptools][distrib]
::::

##
Cómo importar módulos

:::{.smaller}
Mal:

~~~python
from pandas import *
from numpy import *

f = array([1, 2, 3, 4])  # ndarray es de pandas o numpy?
~~~

Algo mejor:

~~~python
from numpy import array
from pandas import *

f = array([1, 2, 3, 4])  # seguro que ndarray es de numpy?
~~~

Bien:

~~~python
import pandas as pd  # renombrar para abreviar o por convención
import numpy

f = numpy.array([1, 2, 3, 4])
~~~
:::

##
::: {.smaller}
Código estructurado por módulos/submódulos

~~~
    principal/
        __init__.py  <-------- entrada al módulo principal
        recolector/       <-----.
            __init__.py         |
            collector.py --.    |
            database.py    |    |
        conversor/   <-----'    |
            __init__.py         |
            limpia.py ----------'
            procesa.py
~~~
- Dependencias cíclicas: método de `collector.py` necesita importar
  `conversor`, mientras que `limpia.py` importa `recolector`
- Acoplamiento: cambios en `conversor` afectan a `recolector`
- Uso excesivo de variables globales
- Anidamiento excesivo (búcles `for`, `if`)
- Defecto/exceso de clases (_[stop writing classes]_)
:::

::: notes

~~~python
class Greeting(object):
    def __init__(self, greeting='hello'):
        self.greeting = greeting

    def greet(self, name):
        return '%s! %s' % (self.greeting, name)

greeting = Greeting('hola')
print(greeting.greet('bob'))
~~~

:::

# Práctica III
#### Práctica III: Consola `ipython`

##
### Parte 1

- Abrir una consola `ipython`
- `In[n]` identifica las entradas de comandos
- comandos _mágicos_ (solamente para `ipython`)
  + comienzan por el caracter '`%`'
  + ejemplo: `%run`, `%matplotlib`, `%load`, `%who`
- `Ctrl+R` activa la búsqueda en el historial
  + `%hist`, `%history` para visualizarlo
- `_` guarda la salida del último comando &sup4;

:::: {.footnote}
&sup4; `_` se usa también como variable de usar/tirar, p.e. cuando una función
devuelve varios resultados, pero solamente estamos interesados en uno.
::::

<!-- :::: {.footnote}
[consola online]
::::
 -->

##
- `[TAB]` autocompleta (p.e. `import st[TAB]`)
  + muy útil para ver los métodos/atributos de un módulo/clase

~~~python
In[]: import st[TAB]
In[]: import string


In[]: string.[TAB]
   string.Formatter       string.ascii_uppercase string.octdigits
   string.Template        string.capwords        string.printable
   string.ascii_letters   string.digits          string.punctuation
   string.ascii_lowercase string.hexdigits       string.whitespace
~~~

##
### Ejemplos

~~~python
In[1]: ?  # muestra ayuda del intérprete ipython
In[2]: ? dict  # muestra ayuda breve de un método/clase/...
In[3]: help(dict)  # muestra ayuda completa
In[4]: import math
In[5]: math.sq[TAB]
In[5]: math.sqrt(94)
In[6]: a = _  # recupera última salida
In[7]: dir(math)  # muestra todos los métodos
~~~


##
- Importa la librería `math`
- Convierte 67 grados a radianes (`math.radians`)
- Calcula el cuadrado (n²) del resultado (operador `**` o `math.pow`)
- Verifica si el resultado es mayor que `16/13`

## Solución
##
~~~python
import math


grados = math.radians(67)
grados ** 2 > 16/13
# math.pow(grados, 2) > 16/13

True
~~~

## Parte 2
::: incremental
- Importa la librería `numpy`
  + `import numpy as np`
- Importa el módulo `pyplot` de la librería `matplotlib`
  + `from matplotlib import pyplot as plt`
- Crea un array `a` de 1000 puntos entre [0, 1]
  + Ejecuta el método `np.linspace()`
- Calcula el seno de $2\cdot\pi\cdot a$
  + usa el método `np.sin()`
  + usa la constante `np.pi`
- Activa el modo gráfico integrado
  + `%matplotlib inline`
- Crea un gráfico con `a` en el eje _x_ y $2\cdot\pi\cdot a$ en el eje _y_
  + emplea la función `plt.plot()`
:::
:::

::: notes
ipython/jupyter: `%pylab` (no recomendado)
Esto último quivalente a:

~~~Python
import numpy
import matplotlib
from matplotlib import pylab, mlab, pyplot
np = numpy
plt = pyplot

from IPython.display import display
from IPython.core.pylabtools import figsize, getfigs

from pylab import *
from numpy import *
~~~
:::

## Solución
##
~~~python
%matplotlib inline
import numpy as np
from matplotlib import pyplot as plt


a = np.linspace(0, 1, 1000)
b = sin(2*np.pi*a)

plt.plot(a, b)
~~~

# Práctica IV
#### Práctica IV: Ejecutar un cuaderno `jupyter`

##
Descargar el [cuaderno de ejemplo][sample_notebook] en el directorio `python` y
ejecutar línea por línea.

(o bien ejecutarlo en forma remota con Binder)

# Práctica V
#### Práctica V: Exportar e importar un entorno virtual

##
::: {.smaller}
Exportar entorno virtual

~~~zsh
# exportar definición del entorno
  
# solo dependencias
(entorno-01) conda list --export > requirements.txt

# entorno + dependencias
(entorno-01) conda env export > entorno-01.yml
# o bien desde base
(base) conda env export --name entorno-01 > entorno-01.yml
~~~


~~~zsh
# Restaurar el entorno con otro nombre (clonar)
(entorno-01) deactivate
(base) conda env create --name entorno-11 --file requirements.txt
(base) activate entorno-11
(entoro-11) conda list
~~~

~~~zsh
# Destruir el entorno y restaurarlo desde la copia
(base) conda env remove --name entorno-01 -y
(base) conda env create -f entorno-01.yml
~~~
:::

##

##### Exportar entorno virtual (II)

- Copia y restauración de dependencias con `pip` (`requirements.txt`)
  + independiente de `conda`

~~~zsh
(entorno-01) pip freeze > requirements.txt
(entorno-01) conda activate entorno-03
(entorno-03) pip install -r requirements.txt
~~~


# Recursos adicionales
#### Recursos adicionales

##
![python_documentation] [Documentación oficial](https://docs.python.org/3.7/)

##
- [Tutorial de python][python tutorial]
- Guías de estilo:
  + [PEP8]
  + [Guía de estilo de Google]
- [Cuadernos Jupyter para Data Science]


## 
Otros recursos en línea

- [Librería standard de Python][batteries]
- [Guía de referencia de Python][reference]
- [Guía para principiantes][beginners]
- **[The Hitchhiker’s Guide to Python!]**
- [Stackoverflow][stackoverflow]
- [Stackoverflow en español][stackoverflow-es]
- [awesome python][awesome]

