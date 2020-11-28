"""
Toteuta bubble sort lajittelu algoritmi
älä käytä valmista bubble sort funktiota.
Voit käyttää säiliötyyppejä kuten listaa.

Lisää suuri määrä numeroita listaan
ja tulosta lajitteluun käytetty aika.
"""

import time
import random

lista = []


def listalle():
    while True:
        ala = int(input("Syötä listan numeroiden alaraja: "))
        yla = int(input("Syötä listan numeroiden yläraja: "))
        maara = int(input("Syötä lista numeroiden määrä: "))

        if (ala < yla) and maara <= (yla-ala):
            lista = random.sample(range(ala, yla), maara)
            return lista
        else:
            print("virheelliset syötteet")


def bubblesort(lista):
    print("\nAlkuperäinen lista:")
    print(lista)

    start_time = time.time()

    for k in range(len(lista) - 1):
        for i in range(len(lista) - 1):
            if lista[i] > lista[i + 1]:
                temp = lista[i]
                lista[i] = lista[i + 1]
                lista[i + 1] = temp

    end_time = time.time()
    print("\nJärjestetty lista: ")
    print(lista)

    print("\nAikaa kului:", end_time - start_time,"sekuntia")
    print("\nListan pituus oli:",len(lista))

def main():
    print("\nBubblesort-järjestäjä\nArpoo ja järjestää valitsemasi määrän numeroita valitsemaltasi alueelta.\n")
    bubblesort(listalle())

main()




