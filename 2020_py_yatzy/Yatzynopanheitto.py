# Nopaneheitto ei toimi oikein jos antaa saveksi 0

from random import randint as r
import yatzytable as yt
import os
clear = lambda: os.system('cls') #clear=LINUX #cls=Windows
# import voitot as v



dice = [0,0,0,0,0]
x = 0

def nopanheitto():
# Alustetaan nopat nolliksi
# Ja arvotaan satunnaiset luvut
    dice = [0,0,0,0,0]
    for i in range(len(dice)):
        dice[i] = r(1,6)    
    dice.sort()
    print("Heittämäsi nopat ovat:\n",dice,"\n")
    return dice

def reroll():
    while True:
        save = input("Mitkä nopat haluat heittää uudelleen, erottele välilyönnillä\nEsim 1 3 5\n")
        if save == "":
            break
        if save == "0":
            break
        # Splitataan save listaksi, esim "1","4"
        save = save.split(" ") # Nyt nää tulee string mallisena merkkijonona
        # Muutetaan lista merkkijonosta intiksi
        save = [int (i) for i in save] #jokainen i muuttuu int i:ksi listassa save
        # Listan save pituinen for looppi
        for i in range (0,len(save)):
            x = save[i] # x = save[0] joka on siis aiemmin annettu nopan numero
            dice[x-1] = r(1,6) #nopan numerosta vähennetään 1 koska indeksointi, ja sille arvotaan uusi luku
            dice.sort()
        print("Uudet silmäluvut ovat:\n",dice)
        break    
        #print(save)   
        #print(dice)

def dicenumbers():
    return dice

class player:
    def __init__(self):
        self.yatzy = 0
    
player1 = player()
player2 = player()

# Parametrinä kyselyn antama arvo
def pisteet(y):
    global x
    x = 0
    # Jos operoidaan yläkerrassa
    if y <= 6:
        for i in range (0,len(dice)):
            if dice[i] == y:
                x = x + dice[i]
    if turn == 1:
            yt.table[y][2] = x
    else:
            yt.table[y][3] = x		
    return x

def kysely():
    global a
    while True:
        #yt.printtaus()
        print(dice)
        a = int(input('Mihin listaan haluat tallentaa?\n'))
        if (type(yt.table[a][turn+1]) == str and a <= 15 and a >= 1 and a != 7):
            break
        print('Kelvoton valinta. Valitse 1-15 ja tarkista ettei ruutu ole jo varattu')
    # Jos valitaan 1,2,3,4,5,6
    if a < 7:
        pisteet(a)
    elif a == 8:
        yt.table[8][turn+1] = onepair()
    elif a == 9:
        yt.table[9][turn+1] = twopair()
    elif a == 10:
        yt.table[10][turn+1] = threes()
    elif a == 11:
        yt.table[11][turn+1] = fours()
    elif a == 12:
        yt.table[12][turn+1] = smallstraight()
    elif a == 13:
        yt.table[13][turn+1] = highstraight()
    elif a == 14:
        yt.table[14][turn+1] = fullhouse()
    elif a == 15:
        yt.table[15][turn+1] = random()
    else:
        print('Lol!')

# Yatzyn tarkastus
def yatzy():
    dice.sort()
    if turn == 1:
        if dice[0] ==  dice[4]:
            print('YATZY!!!!')
            player1.yatzy = 1
            yt.table[16][turn+1] = 50
        return player1.yatzy
    else:
        if dice[0] == dice[4]:
            print('YATZY!!!!')
            player2.yatzy = 1
            yt.table[16][turn+1] = 50
        return player2.yatzy







# Välisumma ottaa parametriksi pelaajanumeron
def välisumma(a):
    tulos = 0
    turn = a+1
    for i in range(1,7):
        tulos = tulos + yt.table[i][turn]
    if tulos > 62:
        yt.table[7][turn] = 50
    else:	
        yt.table[7][turn] = 0
        
# Toimiva
def onepair():
    x = 0
    dice.sort(reverse=True)
    for i in range(0,3):
        if dice[i] == dice[i+1]:
            x = dice[i]*2
            break
    return x

# Toimiva
def twopair():
    dice.sort()
    x = 0

    # 3 Vaihtoehtoa
    ##1: XX YY 0
    ##2: XX 0 YY
    ##3: 0 XX YY

    #Vaihtoehto 1
    if dice[0] == dice[1] and dice[2] == dice[3] and dice[1] != dice[2]:
        x = (dice[0]*2)+(dice[2]*2)

    #Vaihtoehto 2
    if dice[0] == dice[1] and dice[3] == dice[4] and dice[1] != dice[3]:
        x = (dice[0]*2)+(dice[3]*2)

    #Vaihtoehto 3
    if dice[1] == dice[2] and dice[3] == dice[4] and dice[2] != dice[3]:
        x = (dice[1]*2)+(dice[3]*2)

    if x!= 0:
        return x
    else:
        return 0

# Toimiva
def threes():
    x = 0
    dice.sort(reverse=True)
    for i in range (0,3):
        if dice[i] == dice[i+2]:
            x = dice[i]*3
    if x != 0:
        return x
    else:
        return 0

# Toimiva
def fours():
    x = 0
    dice.sort(reverse=True)
    for i in range (0,2):
        if dice[i] == dice[i+3]:
            x = dice[i]*4
    if x != 0:
        return x
    else:
        return 0

# Pitäs toimii
def smallstraight():
    dice.sort()
    if dice[0] == 1 and dice[4] == 5:
        return 15
    else:
        return 0

# Pitäs toimii
def highstraight():
    dice.sort()
    # Jos eka noppa = 2 ja viimenen = 6
    if dice[0] == 2 and dice[4] == 6:
        return 20
    else:
        return 0
    
# Pitäs toimii
def fullhouse():
    x = 0
    dice.sort()
    # Eka ja kolmas noppa samoja (1 1 1) ja 2 viimestä samoja (2 2)
    if dice[0] == dice[2] and dice[3] == dice [4]:
        x = 3*dice[0] + 2*dice[3]
        return x
    # Eka ja toinen samoja (1 1) ja 3 & 5 samoja (2 2 2)
    if dice[0] == dice[1] and dice[2] == dice[4]:
        x = 2*dice[0] + 3*dice[2]
        return x
    else:
        return 0

# Pitäs toimii        
def random():
    x = 0
    for i in range (0,5):
        x = x + dice[i]
    return x

#Loppupisteet
#Parametriksi kierros koska laiskuus
def score(a):
    x = 0
    #16 kertaa läpi
    for i in range (1,17):
        x = x+yt.table[i][a+1]
    yt.table[17][a+1] = x

def winner():
    if yt.table[17][2] > yt.table[17][3]:
        print('Player 1 won!')
    if yt.table[17][3] > yt.table[17][2]:
        print('Player 2 won!')
    else: 
        print('Checkmate you are all losers')













round = 0
turn = 0

while True:
    clear()
    yt.printtaus()
# Kierrosten määrittely
    if round % 2 == 0:
        turn = 1
        x = player1	
        print('Player 1 turn\n')
    	
    else:
        turn = 2	
        x = player2
        print('Player 2 turn\n')
	
    dice = nopanheitto()
    reroll()		
    reroll()

    # Yatzyn tarkistus pelaajille
    if x.yatzy == 0:
        yatzy()
        # Jos tarkistuksen jälkeen ei yatzya niin kysely
        if x.yatzy == 0:
            kysely()
    # Jos yatzy ylemmässä 1, niin suoritetaan kysely suoraan
    else:
        kysely()

    round = round + 1
    if round == 29:
        break
    
    clear()

välisumma(1)
välisumma(2)
score(1)
score(2)
yt.printtaus()
