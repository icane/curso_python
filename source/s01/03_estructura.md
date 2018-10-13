
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

home = os.path.expanduser('~')  # directorio del usuario
directorio_entorno = os.path.join(home,
                                  'Anaconda3',
                                  'envs',
                                  'entorno-03')
ficheros = []

# Busca ficheros y guarda (nombre, tamaño)
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

##
Palabras reservadas

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


##
#### `if __name__ == "__main__":`

::: {.smaller}
Se llama a `__main__()` cuando se ejecuta directamente:
`python circunferencia.py`
:::

::: {.smaller}
~~~python
import sys
import math


def area(radio):
    return math.pi * (radio ** 2)

def longitud(radio):
    return 2 * math.pi * radio

# los comentarios comienzan con el caracter '#'
if __name__ == "__main__":  # comentario en línea
    radio = float(sys.argv[1])
    print("La longitud de una circunferencia de radio {}cm es {:.2f}cm^2.".format(
        radio, longitud(radio)
    ))
    print("El area de una circunferencia de radio {1}cm es {0:.2f}cm^2.".format(
        area(radio), radio
    ))
~~~
:::

::: notes
En el ejemplo anterior no son necesarios los paréntesis, ya que el operador
`**` tiene prioridad sobre `*`. Lo verán en la sesión#2.
::::

##
Un fichero `python` puede contener (entre otros) definiciones de constantes,
variables, funciones o clases.
Para organizar el código guardaremos los ficheros `.py` en un árbol de
directorios.

    principal/
        __init__.py
        practica.py
        colector/
            __init__.py
            collector.py
            database.py
        procesador/
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
::: notes
Identificaremos un directorio como módulo python mediante el fichero
`__init__.py` (que puede estar vacío o no).
:::

## Proyecto ejemplo

:::::::::::::: {.columns}
::: {.column width="40%"}
~~~
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
tests/test_unit.py
tests/test_functional.py
~~~
:::
::: {.column width="60%"}
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
&sup2; p.e. [setuptools][distrib]`
::::


##

- Guías de estilo:
  + [PEP8]
  + [Guía de estilo de Google]


## 
Recursos en línea

- [Librería standard de Python][batteries]
- [Guía de referencia de Python][reference]
- [Stackoverflow][stackoverflow]
- [Stackoverflow en español][stackoverflow-es]
