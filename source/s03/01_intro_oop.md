---
title: "Python para Análisis de datos: Introducción"
subtitle: Sesión 3
author: Alejandro Villar (avillar@ticnor.es)
date: 22 Octubre 2018
revealjs-url: ..
theme: solarized
transition: fade
transitionSpeed: fast
slideNumber: true
keywords: [python, intro, s03, oop]
---

# Programación Orientada a Objetos
#### Programación Orientada a Objetos

## Diferentes paradigmas de programación

- **Orientado a objetos**
- [Procedural]{.text-muted}
- [Imperativo]{.text-muted}
- [Funcional (<100%)]{.text-muted}

## Qué es

- Concepto central: **objeto**
    - Datos (atributos o campos)
    - Comportamiento (métodos)

## Objeto: Coche de Pedro

- Datos:
    - Color: Gris
    - Año: 2012
- Comportamiento:
    - Arrancar
    - Parar
    - Acelerar
    - Frenar

## Clases y objetos

- Clase: Definición a partir de la que crear objetos (*contrato*).
    - Normalmente, mayúscula inicial
- Objeto: Instancia individual de una clase.
    - Normalmente, minúscula inicial (son variables)

## Características de OOP

::: incremental
- Herencia
- Encapsulamiento
- Abstracción
- Polimorfismo
- Composición
:::

## Herencia

::: incremental
- Jerarquía: atributos y comportamiento
- La clase *Perro* hereda de *Mamífero* y ésta de *Animal*.
- Pero también de *Cuadrúpedo* <- Herencia múltiple
- Las subclases completan o modifican a sus clases ancestro
:::

## Encapsulamiento
- Limitar acceso al estado interno del objeto
- Campos y métodos públicos y privados
    - ¡Python no limita el acceso! -> Convenio

## Abstracción
- No nos preocupamos de los detalles de funcionamiento interno
- *Confiamos* en que el objeto hará lo que le pedimos correctamente
- Ejemplo:
    - En Coche.arrancar() nos da igual el sistema de arranque interno,
    queremos que el coche pase a estar arrancado

## Polimorfismo
- Tratamos a una familia de objetos de la misma forma
- Ejemplo 1: lo que haga mensaje.enviar() dependerá de su clase
    - SMS
    - Email
    - MensajeWhatsApp
- Ejemplo 2: si la clase Mensaje tiene campos "asunto" y "contenido",
podemos implementar Bandeja.recibir(mensaje) sin importarnos la subclase
concreta de mensaje.

## Composición
- Combinación de varios objetos con diferentes características
- Ejemplo:
    - Coche contiene objetos de clase Motor, Freno, Rueda, etc.
    - coche.frenar() llama a frenos_delante.activar() y frenos_detras.activar()
