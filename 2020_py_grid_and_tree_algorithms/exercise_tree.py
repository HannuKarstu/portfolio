# Tee ”Node”-niminen luokka:
# Luokan attribuutit:
#  x -Value: solmun arvo (merkkijono)
# Luokan metodit:
#  x  -Insert(node) –lisää lapsen solmuun
#  x  -Remove(node) –poistaa lapsen solmusta
#  x -getHeight –laskee puun korkeuden
#  x  -getLevel –laskee solmun tason
#  x -getDegree –laskee solmun asteen / lasten määrä array size
#  x -getTreeDegree –laskee puun asteen / suurin lasten määrä
#  x -getParent –palauttaa isäsolmun
#  x -getChild(index) –palauttaa indeksin osoittaman lapsisolmun
#  x -printPreorder
#  x -printPostOrder
#  x -printLevelOrder / queue tietorakenne ??

# Testiohjelma:
#  x  -Tee testiohjelma, joka rakentaa oheisen kuvan mukaisen puun
#  x -Testiohjelma testaa metodien oikeellisen toiminnan (getLevel, getHeight)
# Testiohjelma tulostaa puun:
#  x -Esijärjestyksessä
#  x -Jälkijärjestyksessä
#  x -Tasojärjestyksessä
# Kysymyksiä:
#  x -Paljonko on puun korkeus? - 4
#  x -Paljonko on solmun 2 aste? - 2
#  x -Paljonko on solmun 5 aste? - 1
#  x -Paljonko on puun aste? - isoin lasten määrä 4
#  x -Missä läpikäyntijärjestyksessä pitiää expression tree käydä läpi, jotta tulos saadaan evaluoitua?
#        - vastaus: Jälkijärjestyksessä

height = []
children = []
removed = []

class Node:
    def __init__(self):
        self.value = ""  # Itse
        self.childs = []    # taulukko lapsia
        self.step = ""
        self.parent = ""

    def setValue(self, value):
        self.value = value

    def getValue(self):
        if self.value:
            return self.value
        else:
            return False


    def insert(self, child):    # syötetään puuhun
        self.childs.append(child)
        child.parent = self

    def Treestep(self, step):                 # Määrittää tason jolla jokainen node on
        if self.value:                        # Jos arvo on, lisätään steppiin 1
            step += 1                         # ..ja määritetään omaksi stepikseen steppi
            self.step = step
            if self.childs:                     # Siirretään metodi vasemmalle ja oikealle jos niissä on jotain
                for child in self.childs:
                    child.Treestep(step)

    def getTreeDegree(self, children):
        children.append(len(self.childs))       # Lisätään lasten määrät taulukkoon
        if self.childs:
            for child in self.childs:
                child.getTreeDegree(children)

        if self.step == 0:
            children.sort()                     # Juuressa järjestetään ja palautetaan isoin numero
            return children[-1]

    def Treeprint(self):
        if self.value:
            print("Solmu: ", self.value)
            if self.childs:                     # Jos lapsia
                print("Solmun lapset: ")
                for i in range(len(self.childs)):
                    print("- ", self.childs[i])

    def Treestepprint(self, taso):
        if self.value:
            if self.childs:                     # Jos vasemmalle on jotain...
               for child in self.childs:
                   child.Treestepprint(taso)
        if self.step == taso:               # Tulostetaan arvo jos taso täsmää
            print("-",self.value)

    def getHeight(self,height):
        height.append(self.step)
        if self.childs:
            for child in self.childs:
                child.getHeight(height)
        if self.step == 0:
            return height[-1] + 1           # Palautetaan juuresta tasotaulukon vika + 1
            

    ## Ei toimi oikein
    def TreestepprintB(self, taso):
        taso = taso - 1
        if self.step == taso:               # Tulostetaan arvo jos taso täsmää
            lista = []
            for child in self.childs:
                lista.append(child.value)
            return lista
        if self.value:
            if self.childs:                     # Jos vasemmalle on jotain...
               for child in self.childs:
                   child.Treestepprint(taso)
   
    # Ei palauta poistetun arvoa, pitää tutkia vielä.
    def removeByValue(self, value, removed):
        if self.childs:
            for child in self.childs:
                child.removeByValue(value,removed) 
        if self.value == value:
            removed.append(self.value)
            self.value = ""
            self.childs = []    
            self.step = ""
            self.parent = ""
        return removed  


    def getLevel(self):
        if self.value:
            return self.step
            # print("getlevel, eli noden", self.value, "taso: ", self.step)

    def getParent(self):
        if self.parent:
            return self.parent.value
        else:
            return None

    def getChild(self, index):
        if len(self.childs) > index:
            return self.childs[index].value
        else:
            return None

    def getDegree(self):
        if self.childs:
            return len(self.childs)
        else:
            return None

    def printPreOrder(self):
        if self.value:
            print("-",self.value)
        for child in self.childs:
            child.printPreOrder()

    def printPostOrder(self):
        for child in self.childs:
            child.printPostOrder()
        if self.value:
            print("-",self.value)

    def printLevelOrder(self):
        if self.parent == "":
            print("- juuri", self.value)

        for child in self.childs:
            print("- lapsi ",child.value, "taso ",child.step, "parent ", child.parent.value)

        for child in self.childs:
            child.printLevelOrder()


# Juuri
root = Node()
root.setValue(1)


# Taso 1
node2 = Node()
node2.setValue(2)
node5 = Node()
node5.setValue(5)
root.insert(node2)
root.insert(node5)

# Taso 2
## Node 2 childit 3 ja 4
node3 = Node()
node3.setValue(3)
node4 = Node()
node4.setValue(4)
node2.insert(node3)
node2.insert(node4)

## Node 5 child 6
node6 = Node()
node6.setValue(6)
node5.insert(node6)

# Taso 3
## Node 6 childit 7, 8, 9 ja 10
node7 = Node()
node7.setValue(7)
node8 = Node()
node8.setValue(8)
node9 = Node()
node9.setValue(9)
node10 = Node()
node10.setValue(10)
node6.insert(node7)
node6.insert(node8)
node6.insert(node9)
node6.insert(node10)

# Tasojen asetus kaikille
root.Treestep(-1)



# Otsikko
print("","")
print("Verkko- ja puurakenteet -kurssi - tehtävä 1")
print("Hannu Karstu TTV19SAI")
print("","")

# printPreOrder
print("printPreOrder:")
root.printPreOrder()
print("","")

# printPostOrder
print("printPostOrder:")
root.printPostOrder()
print("","")

# Tason mukaan tulostus
taso = 1
print("treeStepPrint")
print(" taso",taso)
root.Treestepprint(taso)
print("","")


# Levelorder / tasoittain tulostus
print("")
print("printLevelOrder")
root.printLevelOrder()
print("","")

# Getlevel
print("getLevel")
print("- noden",node6.getValue(),"taso on",node6.getLevel())
print("","")


# Getparent
print("getParent")
print("- noden",node6.getValue(),"parent on",node6.getParent())
print("- noden",root.getValue(),"parent on",root.getParent())
print("","")

# getChild
print("getChild")
index = 2
print("- noden",node6.getValue(),"lapsi indeksillä",index,"on",node6.getChild(index))
print("- noden",node9.getValue(),"lapsi indeksillä",index,"on",node9.getChild(index))
print("","")


# getDegree
print("getDegree")
print("- noden",node6.getValue(),"lapsien määrä",node6.getDegree())
print("- noden",node9.getValue(),"lapsien määrä",node9.getDegree())
print("")


# getTreeDegree
print("getTreeDegree")
print("- suurin lasten määrä:",root.getTreeDegree(children))
print("")

# getHeight
print("getHeight")
print("- puun korkeus",root.getHeight(height))
print("")


# Poisto numeron etsinnän perusteella
print("removeByValue")
print("- etsitty ja poistettu solmu jonka arvo:",root.removeByValue(2,removed)[0])
print("")

# Tulostus uudelleen
print("Printpreorder poiston jälkeen:")
root.printPreOrder()
print("","")

# Vastaukset kysymyksiin
print("Vastaukset kysymyksiin")
print("-Paljonko on puun korkeus? = 4")
print("-Paljonko on solmun 2 aste? = 2") 
print("-Paljonko on solmun 5 aste? = 1") 
print("-Paljonko on puun aste? = 4 (isoin lasten määrä)") 
print("-Missä läpikäyntijärjestyksessä pitiää expression tree käydä läpi, jotta tulos saadaan evaluoitua? = Jälkijärjestyksessä") 
print("")       