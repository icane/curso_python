---
title: Python 101
subtitle: Sesión 1
author: Jesús Fernández (fernandez.cuesta@gmail.com)
date: 16 Octubre 2018
revealjs-url: ..
theme: solarized
transition: fade
transitionSpeed: fast
slideNumber: true
keywords: [python, intro, s01]
---

# Introducción a Python
#### Introducción a Python

##
![Python_logo_1990s]\

Creado en 1990 por [Guido van Rossum]

##
![Guido van Rossum, 1999]

##
- Énfasis en la productividad y legibilidad del código ([PEP20])

::: incremental

- *Beautiful is better than ugly*
- *Explicit is better than implicit*
- *Simple is better than complex*
- *Complex is better than complicated*
- *Readability counts*

:::

## Ejemplo:
~~~python
from math import factorial

try:
    num = input("Introduce un número [0, 1, 2, ...]: ")
    num = int(num)
    assert num >= 0
except ValueError:
    print('Debes introducir un número')
except AssertionError:
    print('Error, el número no puede ser negativo')
else:
    print('El factorial de {} es {}'.format(num, factorial(num)))
~~~


##
- Actualmente dos versiones principales activas:
   + Python2.7 (soporte hasta 1/1/2020)
   + **Python3.x (3.6, 3.7)** &larr;

~~~
python x.y.z
x: versión principal, incompatibles entre sí [2, 3]
y: versión secundaria, normalmente compatibles
z: versión menor (errores y seguridad)
~~~

~~~bash
$ python -V
Python 3.7.0
~~~


##

![timeline]\
Línea temporal de versiones, en rojo: versión obsoleta

::: notes
El soporte de versiones es un poco más complejo.
P.e. Python3.4.9 y 3.5.6 están soportadas solamente en modo
"security fixes only".
:::


##
- Lenguaje de alto nivel, interpretado, orientado a objetos

::: notes 
ciclo escribir-test-corregir muy corto
:::

::: incremental
- Alta productividad, no compilado
- Gran cantidad de librerías incorporadas (*batteries included*)
- \+ librerías externas (>1M): Python Package Index ([PyPI])
:::

## Alto nivel

::: incremental
- Sencillo y comprensible
- Fácil de aprender
- Abstracción de datos
- Menos líneas de código
- Interfaces simples (*pythonic*)
:::

## Código ejemplo en C++
~~~C++
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <err.h>
 
char response[] = "HTTP/1.1 200 OK\r\n"
"Content-Type: text/html; charset=UTF-8\r\n\r\n"
"Hello, world!\r\n";
 
int main()
{
  int one = 1, client_fd;
  struct sockaddr_in svr_addr, cli_addr;
  socklen_t sin_len = sizeof(cli_addr);
 
  int sock = socket(AF_INET, SOCK_STREAM, 0);
  if (sock < 0)
    err(1, "can't open socket");
 
  setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &one, sizeof(int));
 
  int port = 8080;
  svr_addr.sin_family = AF_INET;
  svr_addr.sin_addr.s_addr = INADDR_ANY;
  svr_addr.sin_port = htons(port);
 
  if (bind(sock, (struct sockaddr *) &svr_addr, sizeof(svr_addr)) == -1) {
    close(sock);
    err(1, "Can't bind");
  }
 
  listen(sock, 5);
  while (1) {
    client_fd = accept(sock, (struct sockaddr *) &cli_addr, &sin_len);
 
    if (client_fd == -1) {
      perror("Can't accept");
      continue;
    }
 
    write(client_fd, response, sizeof(response) - 1); /*-1:'\0'*/
    close(client_fd);
  }
}
~~~


## Equivalente python

~~~python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

Flask.run(app, port=8080)
~~~

## Interpretado

::: incremental
- No es necesario compilar
- Compatible (en general) en distintos sistemas operativos y arquitecturas  
   + Linux
   + MacOS
   + Windows
   + otros (AIX, AS/400, z/OS, OpenVMS, arquitecturas ARM, ...)
- Depuración de errores desde intérprete
- Gestión automática de memoria
:::

::: notes
GC, GIL
:::


## Diferentes paradigmas de programación

::: incremental
- Orientado a objetos
- Procedural
- Imperativo
- Funcional (<100%)
:::

## Data Science

![logo_scikit]\ ![logo_scipy]\ ![logo_pandas]\

## Machine Learning

![logo_keras]\ ![logo_tensorflow]\ ![logo_pytorch]\

## Web
(p.e. [pinterest], [instagram], ...)

![logo_django]\ ![logo_flask]\ ![logo_pyramid]\

## scripts, prototipos
como "pegamento" entre componentes escritos en otros lenguajes

![logo_fabric]
![logo_celery]

## automatización de procesos

![logo_ansible]\ ![logo_jinja2]\ ![logo_requests]\

[Información adicional][awesome]

##
[The 2018 Top Programming Languages, IEEE][ieee_rank]

> ![ieee_graph]\


gran soporte en [foros][stackoverflow], comunidades, conferencias, ...

##
python vs R
![R vs Python] \

##
![stackoverflow_graph]\
fuente: [stackoverflow][stackoverflow_trends]

## {.small}
- `R`: muy enfocado en análisis estadístico
- `Python`: generalista, con librerías especializadas ([pandas], 
[scikit-learn], [scipy], ... )


:::::::::::::: {.columns}
::: {.column width="40%"}
- [Encuesta 2017][kdnuggets0708]
- [Encuesta 2018][kdnuggets0805]
- [Python Data Science][kdnuggets0806]
:::
::: {.column width="60%"}
![poll_results]\
:::
::::::::::::::


# ¿? {data-background-image="images/python_words.gif"} 
## 
![Guido van Rossum, 1995]
