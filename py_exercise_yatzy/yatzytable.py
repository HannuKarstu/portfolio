from tabulate import tabulate

#Taulukkon luonti
table = [ #tablea (rivi) (selite) (pelaaja1) (pelaaja2)
    [" ", " ", "P1", "P2"],
    [1, "Ykköset", 0, 0],
    [2, "Kakkoset", 0, 0],
    [3, "Kolmoset", 0, 0],
    [4, "Neloset", 0, 0],
    [5, "Vitoset", 0, 0],
    [6, "Kutoset", 0, 0],
    [7, "Välisumma", 0, 0], # Mikäli yläpuoli yht 63 tai yli, tähän 50 pistettä lisää.
    [8, "Yksi pari", 0, 0], # Yksi pari: kaksi kertaa sama silmäluku. 1-3-4-4-6 = 4+4 = 8 pistettä.
    [9, "Kaksi paria", 0, 0], # Kaksi paria: kaksi eri paria. 1-1-4-4-6 = 1+1 + 4+4 = 10 pistettä.
    [10, "Kolmoisluku", 0, 0], # Kolmoisluku: kolme samaa silmälukua. 1-3-3-3-6 = 3+3+3 = 9 pistettä.
    [11, "Neloisluku", 0, 0], # Neloisluku: neljä samaa silmälukua. 1-3-3-3-3 = 3+3+3+3 = 12 pistettä.
    [12, "Pieni suora", 0, 0], # Pieni suora: numerot 1-2-3-4-5. 15 pistettä.
    [13, "Suuri suora", 0, 0], # Suuri suora: numerot 2-3-4-5-6. 20 pistettä.
    [14, "Täyskäsi", 0, 0], # Täyskäsi: kolmoisluku ja pari. 3-3-3-5-5 = 3+3+3+5+5 = 19 pistettä.
    [15, "Sattuma", 0, 0], # Sattuma: mitä tahansa. Tähän kelpaa mitä tahansa, pisteiksi lasketaan silmälukujen summa.
    [16, "Yatzy", 0, 0], # Yatzy: viisi samaa silmälukua. 50 pistettä.
    [17, "Yhteensä", 0, 0] # Kaikki pisteet yhteensä
    ]

for r in range(18):
    if r > 0:
        table[r][2] = "x"
        table[r][3] = "x"
        
# tablea = table

# def printtaus():
#     for r in range(18):
#         tablea[r][0] = '{:<2}'.format(tablea[r][0])
#         tablea[r][1] = '{:<15}'.format(tablea[r][1])
#         tablea[r][2] = '{:<3}'.format(tablea[r][2])
#         tablea[r][3] = '{:<3}'.format(tablea[r][3])
#     for r in tablea:
#         for c in r:
#             print(c, end = " ")
#         print()

def printtaus():
    print(tabulate(table))
 
#printtaus()
# testi()