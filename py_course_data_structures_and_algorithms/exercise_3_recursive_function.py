"""
Toteuta rekursiivinen funktio joka tulostaa fibonaccin lukujonon annettuun arvoon asti

Fibonaccin lukujonossa luku on kahden aikaisemman luvun summa( 1,1,2,3,5,8,13...)

"""

def fibo(a):
    if a <= 1:
        return a
    else:
        return(fibo(a-1) + fibo(a-2))


def looppi():
    while True:
        print("Fibonaccin lukujono -tulostin")
        valinta = input("1. Maksiminumeroon asti, 2. Kierrosmäärä: ")
        valinta = int(valinta)
        if valinta == 1:
            max = input("Syötä maksiminumero (huom. yli 1M on hidas): ")
            max = int(max)

            for i in range (20):
                if (fibo(i)) <= max:
                    print (fibo(i))
            return

        if valinta == 2:
            rounds = input("Syötä kierrosmäärä (huom. yli 30 kierrosta on hidasta): ")
            rounds = int(rounds)

            for i in range (rounds):
                print(fibo(i))

            return

        else:
            return

while True:
    looppi()





