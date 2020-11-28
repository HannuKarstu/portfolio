"""
MERGESORT


Lomituslajittelu (limityslajittelu, lomitusjärjestäminen, Merge sort) on asymptoottiselta
suoritusajaltaan tehokas (Θ({\displaystyle n}n log {\displaystyle n}n)) ja vakaa lajittelumenetelmä,
mutta vaatii tavallisella vektorimuotoisella taulukolla lisämuistia (O(n)). Erityisen hyödyllinen se
on kuitenkin linkitettyjen listojen järjestämiseen, jolloin lisämuistia ei tarvita. Se toimii
pääpiirteissään seuraavasti:

-Jaa taulukko kahteen yhtä suureen osataulukkoon
-Järjestä osataulukot rekursiivisesti
-Lomita järjestyksessä olevat osataulukot takaisin yhdeksi järjestyksessä olevaksi taulukoksi

"""
import time
import random

lista = []  # Järjestettävä lista


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


    # Mergesort
def splittaus(lista):
    if len(lista) > 1:
        pituus = len(lista)     # Määritetään listan pituus
        jakaja = pituus // 2    # Listan keskikohta

        alku = lista[:jakaja]   # Jaetaan lista kahtia
        loppu = lista[jakaja:]

        splittaus(alku)         # Rekursiivisesti ajetaan sama metodi alulle ja lopulle
                                # Ensin siis käsitellään listan alkupuolisko, joka jaetaan aina vaan pienemmäksi,
                                # kunnes ollaan 2:n mittaisessa listassa.
        splittaus(loppu)        # Loppulista

        i = 0                   # Näillä kuljetaan listoja, alku
        j = 0                   # ja loppu
        k = 0                   # Päälistaa kuljetaan tällä

        while i < len(alku) and j < len(loppu):     # Tehdään niin kauan kun ollaan alku- ja loppulista käyty läpi
            if alku[i] < loppu[j]:                  # Jos alkulistan eka on pienempi kuin loppulistan eka
                lista[k] = alku[i]                  # Laitetaan listan alkuun alkulistan eka
                i += 1                              # Jatketaan seuraavaan kohtaan alkulistaa
            else:
                lista[k] = loppu[j]                 # Jos loppulistan eka onkin pienempi, laitetaan se listan alkuun
                j += 1                              # Ja jatketaan seuraavaan
            k += 1                                  # Siirretään listaa eteenpäin

        while i < len(alku):                        # Ajetaan kun loppulista käsitelty kokonaan
            lista[k] = alku[i]
            i += 1
            k += 1

        while j < len(loppu):                       # Ajetaan kun alkulista käsitelty kokonaan
            lista[k] = loppu[j]
            j += 1
            k += 1


def main():
    print("\nMergesort-järjestäjä\nArpoo ja järjestää valitsemasi määrän numeroita valitsemaltasi alueelta.\n")

    lista = listalle()          # Numerolistan luonti

    print("\nJärjestämätön lista: ", lista[0], ",", lista[1], ",", lista[2], "...", lista[-3], ",", lista[-2], ",",
          lista[-1])

    start_time = time.time()    # Laskuri käyntiin
    splittaus(lista)            # Ohjelman ajo, ottaa luodun listan
    end_time = time.time()      # Laskuri kiinni

    print("Järjestetty lista: ",lista[0], ",", lista[1],",",lista[2], "...", lista[-3],",",lista[-2],",", lista[-1])
    print("Aikaa kului:", round((end_time - start_time), 4), "sekuntia")

main()