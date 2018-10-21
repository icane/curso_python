#!/bin/env python3
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

