
# POO en Python
#### POO en Python

##
La clase más simple:

~~~python
class MiClase:
    pass
~~~

##
Una clase más completa:

~~~python
class Persona:
    """Una clase para almacenar datos de personas"""
    
    nombre = None
    apellidos = None
    email = None
    
    
    def saludar(self):
        print("Hola, {0} {1}".format(self.nombre, self.apellidos))
    
    
    def linea_email(self):
        return "{1}, {0} <{2}>".format(self.nombre, self.apellidos, self.email)
~~~

##
~~~python
>>> p = Persona()
>>> p.nombre = 'Alejandro'
>>> p.apellidos = 'Villar'
>>> p.email = 'avillar@ticnor.es'
>>> p.saludar()
Hola, Alejandro Villar
>>> print(p.linea_email())
Villar, Alejandro <avillar@ticnor.es>
~~~

## ``self`` (I)

- Los métodos dentro de una clase tienen un argumento inicial: ``self``
- Ese argumento representa a la **instancia** que lo llama
- Python automáticamente lo añade a los argumentos de llamada
- Necesario para modificar atributos de la instancia.

## ``self`` (II)

~~~python
    def saludar(self):
        print("Hola, {0} {1}".format(self.nombre, self.apellidos))
~~~
~~~python
>>> p.saludar()  # No hay self
~~~

## Constructor
Realizar tareas de inicialización, según se crea la clase.

- Sin constructor (por defecto)
- Constructor sin argumentos.
- Constructor con argumentos.

##
Constructor sin argumentos

~~~python
class Persona:
    def __init__(self):
        self.nombre = 'Pendiente'
        print("Persona inicializada")
~~~

~~~python
>>> p = Persona()
Persona inicializada
>>> p.nombre
'Pendiente'
~~~

::: notes
Mencionar dict implícito de atributos en objeto.
:::

##
Constructor con argumentos

~~~python
class Persona:
    def __init__(self, nombre, apellidos="Sin apellidos"):
        self.nombre = nombre
        self.apellidos = apellidos
        print("Persona inicializada")
    
    def saludar(self):
        print("Hola, {0} {1}".format(self.nombre, self.apellidos))
~~~

~~~python
>>> p1 = Persona('Pedro')
Persona inicializada
>>> p2 = Persona('Juan', 'Pérez')
Persona inicializada
>>> p1.saludar()
Hola, Pedro Sin apellidos
>>> p2.saludar()
Hola, Juan Pérez
~~~

## Variables de clase y de instancia
- De clase: compartida por todas las instancias
- De instancia: única para cada instancia

~~~python
class Empleado:
    estado = 'Ocupado'  # Variable de clase
    
    def __init__(self, empresa):
        self.empresa = empresa # Variable de instancia
~~~

## Variables y métodos "privados"

~~~python
class Empleado:
    estado = 'Ocupado'  # Pública
    __empresa = None    # Privada
    __historial = []    # Privada
    
    def set_empresa(self, empresa):   # Público
        self.__empresa = empresa
        self.__actualizar_historial()
        
    def __actualizar_historial(self): # Privado
        self.__historial.append(self.__empresa)
~~~

::: notes
Name mangling
:::

## Herencia (I)

~~~python
class Persona: # Igual que class Persona(object)
    pass

class Empleado(Persona):
    pass

class Multifuncion(Impresora, Escaner):
    pass
~~~

## Herencia (II)

- Todas las clases heredan, en última instancia, de ``object``
- Las subclases heredan atributos y métodos de clases ancestro (superclases)
- Herencia múltiple: se puede heredar de varias clases
    - MRO (Method resolution order)

## Herencia (III)

~~~python
>>> e = Empleado()
>>> isinstance(e, Empleado)
True
>>> isinstance(e, Persona)
True
>>> issubclass(Empleado, Persona)
True
>>> mf = Multifuncion()
>>> isinstance(mf, Multifuncion)
True
>>> isinstance(mf, Impresora)
True
>>> isinstance(mf, Persona)
False
~~~

## Herencia (IV)
### Overriding de métodos
~~~python
class Transformador:
    def transformar(self, texto):
        return texto

        
class Mayusculas(Transformador):
    def transformar(self, texto):
        return texto.upper()
~~~

## Herencia (V)
- ``super()`` permite llamar a métodos definidos en las clases
ancestro
- Ejemplo: constructor

~~~python
class Mamifero:
    def __init__(self):
        print("Soy un mamífero")

class Raton(Mamifero):
    def __init__(self):
        super().__init__()
        print("Soy un ratón")
~~~

::: notes
¡Aclarar que se puede usar en cualquier método, no 
sólo en el contructor!
:::

## Herencia (VI)

~~~python
class A:
    def ping(self):
        print("Ping - A")

        
class B:
    def ping(self):
        print("Ping - B")


class BA(B, A):
    def ping(self):
        super().ping() # Llama a B.ping
        A.ping(self)   # Llama a A.ping
~~~

## Herencia (VII)

~~~python
class A:
    def ping(self):
        print("Ping - A")

class B(A):
    def ping(self):
        print("Ping - B")
        super().ping()

class C(A):
    def ping(self):
        print("Ping - C")
        super().ping()

class D(B, C):
    def ping(self):
        print("Ping - D")
        super().ping()
~~~

::: notes
linearization (para nota)
::: 
