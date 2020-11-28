"""HANOIN TORNI"""

"""
Peli on ratkaistavissa helpolla algoritmilla:

kutsutaan tankoja nimillä A, B ja C
olkoon n pelissä olevien levyjen lukumäärä
numeroidaan levyt alkaen luvusta 1 (pienin, ylinnä) n:ään asti (suurin, alinna)
Jotta levyt saadaan siirrettyä tangosta A tankoon B:

siirretään n − 1 levyä tangosta A tankoon C. Nyt levy n on yksin tangossa A.
siirretään levy n A:sta B:hen
siirretään n − 1 levyä tangosta C tankoon B levyn n päälle.
"""

import time

# Yksittäinen kiekko
class Node:
    #Konstruktori
    def __init__ (self, data):
        self.data = data # Parametrina annettu data
        self.next = None # Seuraavaa ei määritellä konstruktorissa

# Pino
class Stack:
    def __init__ (self,name):
        self.head = None    # Head määritetään tyhjäksi aina alussa, Head = ylin node
        self.stick = name   # Tikun nimi: A B C

    def push (self, data): # Push-metodi, lisätään pinoon asioita

        # Tätä käytetään kun lista on tyhjä
        if self.head == None:
            self.head = Node(data)

        # Tätä muissa tapauksissa
        else:
            new_node = Node(data) #Määritetään listalle uusi node
            new_node.next = self.head # Määritetään seuraavan node paikka
            self.head = new_node # Määritetään uusi head, eli ylin

    def pop (self): # Pop-metodi, poistaa ylimmän
        if self.head == None:
            return None         # Jos pinossa ei ole mitään, tehdään tämä.
        else:
            temp = self.head.data # Otetaan ylimmän data talteen tulostusta varten
            self.head = self.head.next # Muuttaa ylimmäksi seuraavan
            return temp

    def peek (self): # Kurkista-metodi
        if self.head == None:
            return None  # Jos pinossa ei ole mitään, tehdään tämä.
        else:
            #print(self.head.data)
            return self.head.data


    def stackprint(self): # Koko pinon tulostus
        print(self.stick, ":", end=" ")     # Käytetään pinon tikkunimeä tulostamiseen
        lista = []
        current = self.head
        while (current):
            #print(current.data, end=", ")
            lista.append(current.data)      # Lisätään pinossa olevat kiekot listaan
            current = current.next
        lista.reverse()     # Käännetään lista toisinpäin jotta nätimpi tulostaessa
        return lista



    # Määritetään kolme keppiä
A = Stack("A")
B = Stack("B")
C = Stack("C")


    # Tornien tulostus, tulostetaan joka stack allekkain
def printtaus():
    print(A.stackprint())
    print(B.stackprint())
    print(C.stackprint())
    input("\npress any key")

    # Kiekon siirto


    # siirto:
    ## alku: mistä pinosta siirretään
    ## vali: välipino
    ## loppu: pino johon pitää kaikkien päätyä
    ## n: kiekkojen lukumäärä
    ## p: tulostetaanko välivaiheet vai ei
def siirto(alku, vali, loppu, n, p):
    p = p                           # Tulostusvalinta
    rounds = 0                      # Kierroslaskuri
    if n == 0:
        return rounds               # Lopussa palautetaan kierrokset
    elif n == 1:
        rounds += 1                 # Lisätään kierros aina push ja pop -vaiheessa
        loppu.push(alku.pop())      # Työnnetään loppuun ja poistetaan alusta
        if p == True: printtaus()   # Tulostetaan jos tulostus aktivoitu
    elif n == 2:
        rounds += 1
        vali.push(alku.pop())
        if p == True: printtaus()

        rounds += 1
        loppu.push(alku.pop())
        if p == True: printtaus()

        rounds += 1
        loppu.push(vali.pop())
        if p == True: printtaus()

    else:                           # Tehdään tätä kunnes kiekkoja enää kaksi siirtämättä
        rounds += siirto(alku, loppu, vali, n - 1, p)   # Rekursiivisesti kutsutaan siirto-metodia
        rounds += 1
        loppu.push(alku.pop())
        if p == True: printtaus()
        rounds += siirto(vali, alku, loppu, n - 1, p)   # Sama täällä

    return rounds


    # Montako kiekkoa tulee peliin
def pushtogame():
    amount = 0
    while amount < 3:
        amount = int(input("Syötä kiekkojen määrä (3 tai enemmän): "))
    n = amount              # Napataan kokonaismäärä talteen n:ään, koska amount pienenee koko ajan.

    while True:
        A.push(amount)      # Työnnetään isoin luku ensin
        amount -= 1         # Sitten vähennetään
        if amount == 0:     # Lopetetaan kun nollassa
            break
    return n                # Palautetaan määrä, koska sitä tarvitaan siirto-metodissa


    # Kysely tulostetaanko askeleet
def printsteps():
    printtaus = False
    p = "a"
    while p != "k" or p != "e":
        p = input("Tulostetaanko siirrot? (k/e) (jos ei, ohjelma laskee suoritusajan): ")
        if p == "k":
            printtaus = True
            return printtaus
        if p == "e":
            printtaus = False
            return printtaus



def looppi():
    print("Hanoin tornin ratkaisija\n\n")
    disk_amount = pushtogame()      # Kiekkojen määrä
    printing = printsteps()         # Tulostetaanko väliaskeleet vai ei

    print("\nALKU")                 # Alkutilanteen tulostus
    printtaus()

    if printing == False: start_time = time.time()          # Aikalaskuri käyntiin jos ei väliaskeleiden tulostusta
    lopputulos = siirto(A, B, C, disk_amount, printing)     # Ajetaan siirrot ja napataan siirtojen määrä lopputulokseen
    if printing == False: end_time = time.time()            # Aikalaskuri kiinni

    print("\nLOPPUTULOS")           # Lopputilanteen tulostus
    printtaus()

            # Tulostetaan laskurin lopputulos ja vertailun vuoksi laskukaavan lopputulos
    print("\nSIIRTOJA: \n  -laskurin mukaan:", lopputulos, "\n  -(laskukaava (2 ^", disk_amount, ") -1 = ", ((2**disk_amount)-1), ")")

            # Tulostetaan aika jos väliaskeleiden tulostus ei käytössä
    if printing == False: print("\nAikaa kului:", round((end_time - start_time), 2), "sekuntia")


looppi()










"""
def TowerOfHanoi(n , source, destination, auxilliary): 
    if n==1: 
        print "Move disk 1 from source",source,"to destination",destination 
        return
    TowerOfHanoi(n-1, source, auxilliary, destination) 
    print "Move disk",n,"from source",source,"to destination",destination 
    TowerOfHanoi(n-1, auxilliary, destination, source) """


"""
def looppi():
    while True:
        print("\n\n1. Lisää numero pinoon\n2. Poista ylin numero pinosta\n3. Tulosta kaikki pinon numerot\n4. Kurkista ylin\n5. Lisää toiseen listaan 1,2,3,4 ")
        valinta = input("\nSyötä numero: ")
        if valinta == "1":
            a = input("Anna lisättävä numero: ")
            a = int(a)
            pinoa.push(a)

        elif valinta == "2":
            pinoa.pop()

        elif valinta == "3":
            pinoa.stackprint()

        elif valinta == "4":
            pinoa.peek()

        elif valinta == "5":
            print("Lisätään toiseen listaan 1,2,3,4.\nPitäisi tulostua 4,3,2,1: ")
            Pino.push(1)
            Pino.push(2)
            Pino.push(3)
            Pino.push(4)
            Pino.stackprint()

while True:
    looppi()







"""