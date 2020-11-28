from Yatzynopanheitto import dicenumbers

dice = []
dice = dicenumbers()

# välisumma ottaa parametriksi pelaajanumeron
def välisumma(a):
    tulos = 0
    turn = a+1
    for i in range(1,7):
        tulos = tulos + yt.table[i][turn]
    if tulos > 62:
        yt.table[7][turn] = 50
    else:	
        yt.table[7][turn] = 0
        

def onepair():
    if y == 8:
        dice.sort()
        for i in range(0,3):
            if dice[i] == dice[i+1]:
                x = dice[i]*2
        return x

def twopair():
    if y == 9:
        m = 0
        n = 0
        dice.sort()

        for i in range(0,1):
            if dice[i] == dice[i+1]:
                n = dice[i]*2
                return i

        for k in range ((i+2),3):
            if dice[k] == dice[k + 1]:
                m = dice[k] * 2
                break

        if n != 0 or m != 0:
            x = n+m

        return x

def threes():
    if y == 10:
        dice.sort()
        for i in range (0,2):
            if dice[i] == dice[i+2]:
                x = dice[i]*3
        return x

def fours():
    if y == 11:
        dice.sort()
        for i in range (0,1):
            if dice[i] == dice[i+3]:
                x = dice[i]*4
        return x

def smallstraight():
    if y == 12:
        dice.sort()
        if dice[0] == 1 and dice[4] == 5:
            return 15

def highstraight():
    if y == 13 :
        dice.sort()
        # Jos eka noppa = 2 ja viimenen = 6
        if dice[0] == 2 and dice[4] == 6:
            return 20
    
def fullhouse():
    if y == 14:
        dice.sort()
        # Eka ja kolmas noppa samoja (1 1 1) ja 2 viimestä samoja (2 2)
        if dice[0] == dice[2] and dice[3] == dice [4]:
            x = 3*dice[0] + 2*dice[3]
            return x
        # Eka ja toinen samoja (1 1) ja 3 & 5 samoja (2 2 2)
        if dice[0] == dice[1] and dice[2] == dice[4]:
            x = 2*dice[0] + 3*dice[2]
            return x
        
def random():
    if y == 15:
        x = 0
        for i in len(dice):
            x = x + dice[i]
    return x


