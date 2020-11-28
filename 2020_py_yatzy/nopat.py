from random import randint as r

dice = [0,0,0,0,0]


def nopanheitto():
# Alustetaan nopat nolliksi
# Ja arvotaan satunnaiset luvut
    dice = [0,0,0,0,0]
    for i in range(len(dice)):
        dice[i] = r(1,6)    
    print("Heittämäsi nopat ovat:\n",dice)
    return dice


def reroll():
# Jos ollaan tyytyväisiä numeroihin niin ei mennä reroll looppiin
    reroll = input("Haluatko heittää uudelleen?\nKyllä = 1\nEi = 0\n")
    reroll = int(reroll)
    while reroll == 1:
        save = input("Mitkä nopat haluat heittää uudelleen, erottele välilyönnillä\nEsim 1 3 5\n")
        # Splitataan save listaksi, esim "1","4"
        save = save.split(" ") # Nyt nää tulee string mallisena merkkijonona
        # Muutetaan lista merkkijonosta intiksi
        save = [int (i) for i in save] #jokainen i muuttuu int i:ksi listassa save
        # Listan save pituinen for looppi
        for i in range (0,len(save)):
            x = save[i] # x = save[0] joka on siis aiemmin annettu nopan numero
            dice[x-1] = r(1,6) #nopan numerosta vähennetään 1 koska indeksointi, ja sille arvotaan uusi luku
        print("Uudet silmäluvut ovat:\n",dice)
        break    
        #print(save)   
        #print(dice)
            
dice = nopanheitto()
reroll()
reroll()
# nopanheitto ja reroll toimii

