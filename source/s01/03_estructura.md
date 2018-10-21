
# Estructura del código
#### Estructura del código

##
- No hay delimitadores de línea (tipo '`;`')
- Comentar código con `#`
- Jerarquía del código según nivel de indentación
- Indentar código con espacios
- Importar librerías al inicio
- Código agrupado con líneas en blanco
- **Recomendado**: Longitud de línea < 80 caracteres

##
- No hay delimitadores de línea (tipo `;`)
- Comentar código con `#`

~~~python
import os

home = os.path.expanduser('~')  # comentario en línea
directorio_entorno = os.path.join(home,
                                  'Anaconda3',
                                  'envs',
                                  'entorno-03')
ficheros = []

# los comentarios comienzan con el caracter '#'
for f in os.listdir(directorio_entorno):
    if os.path.isfile(f):
        tamaño = os.stat(os.join(directorio_entorno), f).st_size
        ficheros.append((f, tamaño))
~~~

##
- Jerarquía del código según nivel de sangría (*indent*)
- Diferenciarlo con espacios &sup1;

~~~python
import os

home = os.path.expanduser('~')  # directorio del usuario
directorio_entorno = os.path.join(
    home, 'Anaconda3', 'envs', 'entorno-03'
)
ficheros = []

# Busca ficheros y guarda (nombre, tamaño)
for f in os.listdir(directorio_entorno):
    if os.path.isfile(f):
        tamaño = os.stat(os.join(directorio_entorno), f).st_size
        ficheros.append((f, tamaño))
    print(f)
print(tamaño)
~~~
:::: {.footnote}
&sup1; Generalmente con 4 espacios, no mezclar con `TAB`
::::

::: notes
Copiar y pegar el texto en st3 para visualizar los caracteres vacíos
:::

##
- Importar librerías al inicio
- Código agrupado con líneas en blanco

~~~python
import pathlib
from pathlib import Path


home = Path.home()  # pathlib.Path.home()
directorio_entorno = home / 'Anaconda3' / 'envs' / 'entorno-03'
ficheros = [(f.name, f.stat().st_size)
            for f in directorio_entorno.iterdir()
            if f.is_file()]
~~~

[cuaderno jupyter][binder03]
[cuaderno jupyter (offline)][03ipynb]

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
(base) python circunferencia.py
~~~

~~~python
import sys
import math


def area(radio):
    return math.pi * (radio ** 2)

def longitud(radio):
    return 2 * math.pi * radio

# entra aquí cuando se ejecuta directamente
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
En el ejemplo anterior no son necesarios los paréntesis, ya que el operador
`**` tiene prioridad sobre `*`. Lo verán en la sesión#2.
::::

##
::: {.smaller}
- Un fichero `python` puede contener (entre otros) definiciones de constantes,
  variables, funciones o clases.
- Para organizar el código guardaremos los ficheros `.py` en un árbol de
  directorios:

~~~
    principal/
        __init__.py
        practica.py
        recolector/
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
    licencia
    distribución/empaquetado [2]
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
&sup2; p.e. [setuptools][distrib]
::::

# Práctica III
#### Práctica III: Consola `ipython`

##
### Parte 1

- Abrir una consola `ipython`
- `In[n]` identifica las entradas de comandos
- comandos _mágicos_ (solamente para `ipython`)
  + comienzan por el caracter '`%`'
  + ejemplo: `%edit` (=`F2`), `%pylab`
- `Ctrl+R` activa la búsqueda en el historial
  + `%hist`, `%history` para visualizarlo
- `_` guarda la salida del último comando &sup3;

:::: {.footnote}
&sup3; `_` se usa también como variable de usar/tirar, p.e. cuando una función
devuelve varios resultados, pero solamente estamos interesados en uno.
::::

:::: {.footnote}
[consola online]
::::

##
- `[TAB]` autocompleta (p.e. `import st[TAB]`)
  + muy util para ver los métodos/atributos de un módulo/clase

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
- Convierte 67 grados a radianes
- Calcula la raíz cúbica del resultado
- Verifica si el resultado es mayor que `14/13`

## Solución
##
~~~python
import math


grados = math.radians(67)
math.pow(grados, 1/3) > 14/13

False
~~~

## Parte 2
::: incremental
- Importa el módulo `numpy`
  + `import numpy as np`
  + o bien (ipython): `%pylab`
- Crea un array `a` de 1000 puntos entre [0,1]
  + Ejecuta el método `np.linspace`
- Calcula el seno de '2·π·a'
  + Usa la constante `np.pi`
- Activa el modo gráfico integrado
  + `%matplotlib inline`
- Crea el gráfico de `(a, seno(a))`
:::

## Solución
##
~~~python
%pylab

a = np.linspace(0, 1, 1000)
b = sin(2*np.pi*a)

%matplotlib inline
plt.plot(a, b)
~~~

# Práctica IV
#### Práctica IV: Ejecutar un cuaderno `jupyter`

##
<!-- Copiar el [cuaderno de ejemplo][ipynb_offline] en el directorio del prompt de -->
<!-- Anaconda y ejecutar línea por línea. -->
Abrir el [cuaderno de ejemplo][bindersp] y ejecutar línea por línea.

[cuaderno ejemplo offline][ipynb_offline]

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
~~~


~~~zsh
# Desde otro sistema, restaurar el entorno
(base) conda env create -f entorno-01.yml
~~~

~~~zsh
# O bien el la misma máquina, con otro nombre:
(entorno-01) conda list --export > requirements.txt
(entorno-01) deactivate
(base) conda env create --name entorno-11 --file requirements.txt
(base) activate entorno-11
(entoro-11) conda list
~~~

- Restaurar solo dependencias (`requirements.txt`): independiente de `conda`

:::

# Recursos adicionales
#### Recursos adicionales

##
- Guías de estilo:
  + [PEP8]
  + [Guía de estilo de Google]


## 
Otros recursos en línea

- [Librería standard de Python][batteries]
- [Guía de referencia de Python][reference]
- [Guía para principiantes][beginners]
- [Stackoverflow][stackoverflow]
- [Stackoverflow en español][stackoverflow-es]
- [awesome][awesome]

