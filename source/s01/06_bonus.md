
# _Bonus (II)_: GIL y GC
#### _Bonus (II)_: GIL y GC

##
#### _Reference counting_

- Usado por python para la gestión de memoria
- Cuenta las referencias a cada objeto creado
- Cuando la cuenta es 0, la memoria reservada se libera

~~~python
import sys

a = []
b = a
sys.getrefcount(a)
3
~~~

##
GC: _Garbage Collector_

Utiliza 2 algoritmos para la gestión de memoria:

- Reference counting: libera objetos sin referencias en un programa
  + ejecutado en "tiempo real"
- Referencias cíclicas: se ejecuta periódicamente

## Ejemplo
~~~python
foo = []

# 2 referencias, 1 de la variable foo y una de la llamada a getrefcount
print(sys.getrefcount(foo))

def bar(a):
    # 4 referencias
    # variable foo, argumento a función, getrefcount + pila interna de python
    print(sys.getrefcount(a))

bar(foo)
# 2 referencias, se limpiaron las propias de la función
print(sys.getrefcount(foo))
~~~

##
#### GIL: Global Interpreter Lock

:::{.smaller}
- Afecta a CPython
- Evita que la variable de conteo de referencias entre en condición de carrera
- Restringe la ejecución de código concurrente
  + ejecución secuencial dentro del intérprete
  + _multithreading_: aplicaciones no limitadas por CPU (p.e. I/O)
  + _multiprocessing_: varios intérpretes concurrentemente
:::
![GIL]\

##
#### Ejemplo práctico: programa limitado por CPU, ejecución secuencial

::: {.smaller}
~~~python
# single_threaded.py
import time

COUNT = 50000000

def countdown(n):
    while n>0:
        n -= 1

start = time.time()
countdown(COUNT)
end = time.time()

print('Tiempo de ejecución {:.2f} segundos'.format(end - start))
~~~

~~~zsh
$ python single_threaded.py
Tiempo de ejecución 2.30 segundos
~~~
:::

##
#### Programa limitado por CPU, ejecución concurrente (`multithread`)

::: {.smaller}
~~~python
# multi_threaded.py
import time
from threading import Thread

COUNT = 50000000

def countdown(n):
    while n>0:
        n -= 1

thread_1 = Thread(target=countdown, args=(COUNT//2,))
thread_2 = Thread(target=countdown, args=(COUNT//2,))
start = time.time()
thread_1.start()
thread_2.start()
thread_1.join()
thread_2.join()
end = time.time()

print('Tiempo de ejecución {:.2f} segundos'.format(end - start))
~~~

~~~zsh
$ python multi_threaded.py
Tiempo de ejecución 2.85 segundos
~~~
:::

##
#### Programa limitado por CPU, ejecución concurrente (`multiprocess`)

::: {.smaller}
~~~python
# multi_process.py
import time
from multiprocessing import Pool

COUNT = 50000000

def countdown(n):
    while n>0:
        n -= 1

start = time.time()
with Pool(2) as p:  # bypass del GIL
    p.map(countdown, 2* [COUNT//2])
end = time.time()

print('Tiempo de ejecución {:.2f} segundos'.format(end - start))
~~~

~~~zsh
$ python multi_threaded.py
Tiempo de ejecución 1.32 segundos
~~~
:::

##
[cuaderno jupyter (offline)][05ipynb]

[cuaderno jupyter][binder05]



