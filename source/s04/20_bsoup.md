
# BeautifulSoup
#### Web scraping

##
BeautifulSoup es un módulo para extraer información (de cualquier
tipo) de páginas HTML.

## Ejemplo
~~~python
from bs4 import BeautifulSoup
import requests

r  = requests.get("https://www.ticnor.es")
data = r.text
soup = BeautifulSoup(data)
for link in soup.find_all('a'):
    print(link.get('href'))
~~~

## ``find``y ``find_all``
- ``find`` -> primer resultado; ``fild_all`` -> todos
- Aceptan diversos argumentos para encontrar **elementos**:
string, expresión regular (``re.compile(...)``), listas...

##
~~~python
# Por nombre
soup.find_all(['th', 'td'])

# Por atributo
soup.find_all(href=re.compile('^http'))

# Combinando
soup.find_all('a', href=True)

# Usando dict de atributos
atributos = {'src': True}
soup.find_all(attrs=atributos)

# Por clase (cualquier clase)
soup.find_all(class_='menu__link')
~~~

## Moviéndonos por el documento
- Cuando tenemos un elemento localizado con ``find``o ``find_all``:
    - ``find_parents()`` / ``find_parent()`` (ancestros o ancestro)
    - ``find_next_siblings()`` / ``find_next_sibling()`` (hermanos a continuación)
    - ``find_previous_siblings()`` / ``find_previous_sibling()`` (hermanos antes)

## Selectores CSS
``select()`` y ``select_one()``

~~~python
soup.select("title")
soup.select("a[href]")
soup.select("h2")
soup.select(".servicios a")
~~~
