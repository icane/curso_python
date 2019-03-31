# vscode
#### Visual Studio Code

##
::: {.smaller}
- Paleta de comandos (`Ctrl+Shift+P`)
  + _"Instalar extensiones"_
  + _"Python: ..."_
:::
![vscode]\

##
### Integración con el entorno virtual de cada proyecto

- Seleccionar intérprete + nombre del entorno
- terminal > `ipython` / `python` o bien _"Python: ejecutar REPL"_

## Linter
- Analizador del código, detecta errores de sintaxis, estilo, ...
- Necesario instalar en cada entorno (preinstalado en `base`)
  + Paleta de comandos > _Python: seleccionar Linter_ > `flake8`

## [flake8]
- Comprueba conformidad con [PEP8], complejidad de McCabe, errores de
  sintaxis...
- Permite ignorar/silenciar diferentes avisos, excluir ficheros del análisis,
  ...

## Depuración de errores
- Errores de sintaxis
- Avisos del _linter_
~~~python
#!/bin/env python3
import requests

URL='https://elpais.com'
r = requests.get(url)  # crear un breakpoint aquí

print(f'Código de respuesta: {r.status_code}')
print(f'Recibidos {len(r.text)} Bytes de contenido')
~~~

