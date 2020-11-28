"""
Toteuta oma pino struktuuri joka pohjautuu linkitettyyn listaan.
Pinoon voi tallentaa int muuttujan, muuttujia ei tarvitse järjestää

Toteuta
-lisää
-poista
-kurkista. (palauttaa päällimäisen arvon)
-Lisää pinoon numerot  1,2,3,4 tässä järjestyksessä
-Käy pino läpi ja tulosta sen arvot. Pitäisi tulostua 4,3,2,1

"""

# Noodi
class Node:
    #Konstruktori
    def __init__ (self, data, next=None):
        self.data = data # Parametrina annettu data
        self.next = None # Seuraavaa ei määritellä konstruktorissa1

# Pino
class Stack:
    def __init__ (self):
        self.head = None # Head määritetään tyhjäksi aina alussa, Head = ylin node

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
            print("Pino on tyhjä")
            return None         # Jos pinossa ei ole mitään, tehdään tämä.
        else:
            temp = self.head.data # Otetaan ylimmän data talteen tulostusta varten
            self.head = self.head.next # Muuttaa ylimmäksi seuraavan
            print("Poistettu pinon ylin numero '",temp,"'")

    def peek (self): # Kurkista-metodi
        if self.head == None:
            print("Pino on tyhjä")
            return None  # Jos pinossa ei ole mitään, tehdään tämä.
        else:
            print("Pinon ylin")
            print(self.head.data)


    def stackprint(self): # Koko pinon tulostus
        print("Tässä koko lista:")
        current = self.head
        while (current):
            print(current.data)
            current = current.next




pinoa = Stack() #kaiken muun pino
Pino = Stack() #1,2,3,4 pino

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







