"""
Koodaa itsellesi oma tupla linkitetty lista
Siihen tallennetaan int arvo
Lista pidetään aina kasvavassa järjestyksessä

- Toteuta lisää funktio joka laittaa uuden alkion oikeaan kohtaan
- Toteuta poista funktio
- Toteuta tulosta funktio joka tulostaa kaikki alkiot ensimmäisestä viimeiseen
- Lisää linkitettyyn listaan numerot 4,8,2,1 ja kutsu tulosta funktiota. Pitäisi tulostua 1,2,4,8
"""

# Noodi, jossa viittaukset edelliseen ja seuraavaan
class Node:
    #Konstruktori
    def __init__ (self, data, next=None, prev = None):
        self.data = data # Parametrina annettu data
        self.next = next # Seuraavaan osoitus, konstruktorissa ei määritellä seuraavaa
        self.prev = prev # Edelliseen osoitus, eikä edellistä

# Linkitetty lista
class LinkedList:
    #Listan konsruktori, eli luodaan uusi LinkedList
    def __init__ (self):
        self.head = None #Tyhjällä listalla ei ole ylintä

    # noden lisäys listaan metodi. Lisätään suuruusjärjestykseen
    def insert(self, new_node):

        # Tyhjään listaan lisäys
        if self.head is None:
            new_node.next = self.head
            self.head = new_node

            # Listan loppuun
        elif self.head.data >= new_node.data:
            new_node.next = self.head
            self.head = new_node

        else:

            # Etsitään oikea paikka mihin lisätään
            current = self.head
            while (current.next is not None and
                   current.next.data < new_node.data): # Verrataan kokoja
                current = current.next

            new_node.next = current.next
            current.next = new_node

    # noden poisto listalta
    def deleteNode(self, key):
        temp = self.head    # Väliaikaismuuttuja

        if (temp is not None): # Tällä varmistetaan että lista ei ole tyhjä
            if (temp.data == key):
                self.head = temp.next
                temp = None
                return

        while (temp is not None):
            if temp.data == key:
                break
            prev = temp         # Siirrytään listalla
            temp = temp.next

        if (temp == None):
            return

        prev.next = temp.next

        temp = None

    def printlist(self):
        current = self.head
        while (current):
            print(current.data)
            current = current.next


LL = LinkedList() # Lista jota käytetään ohjelman kohdissa 1-3
AA = LinkedList() # Lista jota käytetään ohjelman kohdassa 4, tehty näin jotteivat sotke toisiaan

#print(LL.head.data)


def looppi():
    while True:
        print("\n\n1. Lisää numero listaan\n2. Poista numero listasta\n3. Tulosta kaikki listan numerot\n4. Lisää toiseen listaan 4, 8, 2 ja 1 ")
        valinta = input("\nAnna numero: ")

        if valinta == "1":
            a = input("Anna lisättävä numero: ")
            a = int(a)
            new_node = Node(a)
            LL.insert(new_node)

        elif valinta == "2":
            a = input("Anna poistettava numero: ")
            a = int(a)
            LL.deleteNode(a)

        elif valinta == "3":
            print("Tässä koko lista:")
            LL.printlist()

        elif valinta == "4":
            print("Lisätään toiseen listaan 4, 8, 2 ja 1.\nPitäisi tulostua 1,2,4,8: ")
            new_node = Node(4)
            AA.insert(new_node)
            new_node = Node(8)
            AA.insert(new_node)
            new_node = Node(2)
            AA.insert(new_node)
            new_node = Node(1)
            AA.insert(new_node)

            AA.printlist()




while True:
    looppi()