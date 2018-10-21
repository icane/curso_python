
# Scrapy
#### Web scraping

## Qué es Scrapy
Scrapy es una librería de Python para hacer *web crawlers* (recolectores
de información en HTML).

## Ejemplo
~~~python
import scrapy

class BlogSpider(scrapy.Spider):
    name = 'blogspider'
    start_urls = ['https://blog.scrapinghub.com']

    def parse(self, response):
        for title in response.css('.post-header>h2'):
            yield {'title': title.css('a ::text').extract_first()}

        for next_page in response.css('div.prev-post > a'):
            yield response.follow(next_page, self.parse)
~~~

~~~
$ scrapy runspider blogspider.py
~~~

##
- Es necesario tener algo de conocimiento sobre la estructura
del sitio que se quiere rastrear:
    - ¿Qué elementos / atributos / textos queremos extraer?
    - ¿Qué enlaces (``<a>``) debemos seguir (paginación, categorías...)?

##

![ff_inspector] Mejor método: Inspeccionar Elemento

## Procedimiento
1. Definir las URL iniciales
    - Ej: [https://scholar.google.es/scholar?q=einstein](https://scholar.google.es/scholar?q=einstein)
2. Localizar los elementos que queremos extraer
    - Ej: ``.gs_ri h3 a :::text``
3. Localizar los enlaces a las siguientes páginas a navegar
    - Ej: ``#gs_n a``

##
~~~python
import scrapy

class EinsterSpider(scrapy.Spider):
    name = 'einsten_spider'
    start_urls = ['https://scholar.google.es/scholar?q=einstein']

    def parse(self, response):
        for texto in response.css('.gs_ri h3 a ::text'):
            yield {'publicacion': texto.extract()}

        for next_page in response.css('#gs_n a'):
            yield response.follow(next_page, self.parse)
~~~

~~~
scrapy runspider einstein.py -o resultados.json
~~~

## ¿Qué más ofrece scrapy?
- Extraer con métodos independientes distintas páginas (p.e., navegar listados, pero
extraer datos de vistas individuales).
- Pasar argumentos desde la línea de comandos.
- Su consola (``scrapy shell https://www.ticnor.es``).

## Y más, y más...
- Exportar a distintos formatos (JSON, JSONL, CSV, XML).
- Seleccionar con XPath.
- Integrarlo en módulos (no sólo desde línea de comandos).
- ...

## Ejercicio
Extraer un listado de todas las calderas con su precio de
[https://euroclimaonline.es/](https://euroclimaonline.es/)

~~~json
[
    { "modelo": "XYZ", "precio": "335,30 €"}, 
    { "modelo": "TRS", "precio": "299,99 €"},
    ...
]
~~~
