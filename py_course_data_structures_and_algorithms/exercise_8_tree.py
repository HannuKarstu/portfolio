"""Puulle
        Läpikäynti
        Alkion lisäys ja poisto
        Puun koko
Solmuille
        Vasen ja oikea alipuu / lapsi
        Onko lehti tai juuri
        Vaihda kahden solmun paikkaa (swap)
"""


# Puu

size = 0

class Node:
    def __init__(self, value):
        self.value = value  # Itse
        self.left = None    # Pienempi
        self.right = None   # Suurempi
        self.step = None    # Taso puussa (en vielä tiedä onko tästä hyötyä, tein kuitenkin)

    def insert(self, value):
        if self.value:                      # Tarkistetaan onko kohdassa dataa
            if value < self.value:         # Laitetaan pienemmät ja yhtä suuret vasemmalle
                if self.left is None:       # Jos vasemmalla ei ole mitään,
                    self.left = Node(value) # ..Syötetään data vasemmalle
                else:
                    self.left.insert(value)  # Jos dataa on, siirretään insert eteenpäin


            elif value > self.value:         # Samat jutut oikealle puolelle
                if self.right is None:       # --
                    self.right = Node(value) # --
                else:                        # --
                    self.right.insert(value) # --

        else:
            self.value = value                # Lopulta määritetään data kohdalle.

    def Treestepprint(self, taso):
        taso = taso
        if self.value:
            if self.left:                     # Jos vasemmalle on jotain...
                self.left.Treestepprint(taso)         # ..ajetaan tulostusfunktio vasemmalle
            if self.right:                    # Jos oikealle on jotain...
                self.right.Treestepprint(taso)        # ..ajetaan tulostusfunktio oikealle

        if self.step == taso:               # Tulostetaan arvo jos taso täsmää
            print(self.value, end=", ")

    def Treeprint(self):
        if self.value:
            print("Arvo: ",self.value, " Taso: ", self.step)
            if self.left:                     # Jos vasemmalle on jotain...
                self.left.Treeprint()         # ..ajetaan tulostusfunktio vasemmalle
            if self.right:                    # Jos oikealle on jotain...
                self.right.Treeprint()        # ..ajetaan tulostusfunktio oikealle

    def FineTreeprint(self):
        if self.value:
            print(self.value)
            if self.left:                     # Jos vasemmalle on jotain...
                print((self.step * " "), ((self.step-1)*"|"),"|_", end="")
                self.left.FineTreeprint()         # ..ajetaan tulostusfunktio vasemmalle
            if self.right:                    # Jos oikealle on jotain...
                print((self.step * " "), ((self.step-1)*"|"),"|_", end="")
                self.right.FineTreeprint()        # ..ajetaan tulostusfunktio oikealle

    def Treestep(self, step):                 # Määrittää tason jolla jokainen node on
        if self.value:                        # Jos arvo on, lisätään steppiin 1
            step += 1                         # ..ja määritetään omaksi stepikseen steppi
            self.step = step
            if self.left:                     # Siirretään metodi vasemmalle ja oikealle jos niissä on jotain
                self.left.Treestep(step)
            if self.right:
                self.right.Treestep(step)

    def Find(self, number):                    # Etsitään numero
        a = []
        if self.value:
            if number < self.value:
                if self.left:
                    return self.left.Find(number)     # Jos etsittävä numero on pienempi, mennään vasemmalle

            elif number > self.value:            # Sama oikealle
                if self.right:
                    return self.right.Find(number)

            elif number == self.value:           # Numero löytyi
                print("Löytyi numero ", self.value, " tasolta ", self.step)
                b = None
                c = None
                if self.left:
                    b = self.left.value
                if self.right:
                    c = self.right.value
                numbers = [self.value, b, c]
                return numbers                      # Palauttaa taulukossa itsensä, vasemman ja oikean... En tiedä tarvitaanko.


    def DeleteAll(self, number):                # Poistetaan numero ja kaikki sen alla (en tiedä tarvitseeko näin tehdä, mutta tein)
        if self.value:
            if number < self.value:
                if self.left:
                    self.left.DeleteAll(number)

            if number > self.value:
                if self.right:
                    self.right.DeleteAll(number)

            if self.value == number:
                self.ToNone(number)

    def ToNone(self, number):                   # Numero löydetty, tämän avulla poistetaan kaikki sen alla
        if self.value == number:
            print("Tuhotaan numero ", self.value, "tasolla ", self.step)
            self.value = None
            if self.left:
                self.left.ToNone(self.left.value)
            if self.right:
                self.right.ToNone(self.right.value)

    def TreeSize(self):         # Puun koko eli solmujen määrä
        size = 0
        if self.value:
            size += 1
            if self.left:
                size += self.left.TreeSize()
            if self.right:
                size += self.right.TreeSize()
        return size










tree = Node(5) # JUURI


    # NUMEROIDEN SYÖTTÄMINEN
lista = [4,8,2,5,1,9,3,7,6] # Lista syötetyistä numeroista
for i in range (len(lista)):    # Syötetään numerot
    tree.insert(lista[i])

    # TASOJEN MÄÄRITTELY
tree.Treestep(-1)    # Tämä määrittää "tason" joka numerolle
                     # -1 määrittää että eka taso on nolla, 0:lla eka taso on 1

    # PUUN KOKO
print("\n\nPuun koko: ", end="")
print(tree.TreeSize())

    # TULOSTUS TASON PERUSTEELLA
taso = 2
print("Tason ", taso, " numerot:")
tree.Treestepprint(taso)    # Tulostetaan numerot puusta

    # TULOSTUS KAIKKI NUMEROT
print("\n\nKaikki puun numerot")
tree.Treeprint()

    # ETSI NUMERO JA TULOSTA TASO
number = 9
print("\n\nEtsitään numero ", number)
#tree.Find(number)
print(tree.Find(number))

    # HIENOMPI TREE PRINT
print("\n\nHienompi printtaus")
tree.FineTreeprint()

    # ETSI JA TUHOA NUMERO JA KAIKKI SEN ALLA OLEVA
number = 4
print("\n\nEtsitään ja tuhotaan numero ", number, " ja kaikki sen alla oleva")
tree.DeleteAll(number)







