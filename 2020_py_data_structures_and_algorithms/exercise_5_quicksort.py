"""
Toteuta quick sort lajittelu algoritmi
älä käytä valmista bubble sort funktiota.
Voit käyttää säiliötyyppejä kuten listaa.

Lisää suuri määrä numeroita listaan
ja tulosta lajitteluun käytetty aika.
"""

import time
import random

lista = []


    # Määritetään mistä mihin numeroita ja miten paljon
def listalle():
    while True:
        ala = int(input("Syötä listan numeroiden alaraja: "))
        yla = int(input("Syötä listan numeroiden yläraja: "))
        maara = int(input("Syötä listan numeroiden määrä: "))

        if (ala < yla) and maara <= (yla-ala):
            lista = random.sample(range(ala, yla), maara)
            return lista
        else:
            print("virheelliset syötteet")


def quicksort(lista):
    pienet = []
    samat = []
    suuret = []

    if len(lista) > 1:
        sarana = lista[0] # Määritetään sarana alkuun

        for i in lista:
            if i < sarana:
                pienet.append(i)    # Jos pienempi, siirretään pienempiin
            if i == sarana:
                samat.append(i)     # Jos sama, samoihin
            if i > sarana:
                suuret.append(i)    # Jos isompi, isompiin

        return quicksort(pienet)+samat+quicksort(suuret)    # Lajitellaan ja järjestetään rekursiivisesti
                                                            # Palautetaan järjestetty lista
    else:
        return lista






def main():
    print("\nQuicksort-järjestäjä\nArpoo ja järjestää valitsemasi määrän numeroita valitsemaltasi alueelta.\n")

    lista = listalle()          # Numerolistan luonti


    print("\nJärjestämätön lista: ", lista[0], ",", lista[1], ",", lista[2], "...", lista[-3], ",", lista[-2], ",",
          lista[-1])

    start_time = time.time()    # Laskuri käyntiin
    lista = quicksort(lista)     # Ohjelman ajo, ottaa luodun listan
    end_time = time.time()      # Laskuri kiinni

    print("Järjestetty lista: ",lista[0], ",", lista[1],",",lista[2], "...", lista[-3],",",lista[-2],",", lista[-1])
    print("Aikaa kului:", round((end_time - start_time), 4), "sekuntia")

main()




