import mysql.connector
import os
from tabulate import tabulate # Taulukoiden luontiin


def kayttis():

      # Tietokantayhteys
  mydb = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    passwd="mypass",
    database="store"
  )

  mycursor = mydb.cursor(dictionary=True)

    # Ruudun tyhjennys
  os.system('clear')
  print("Tietokantayhteys Mariadb-tietokantaan Store\n")
  valinta = int(input("1. Hae kayttajien tilauksia, 2. Päivitä tuotteen hinta, 3. Poista tuote, 4. Lisää uusi tilaus\n\nValitse numero: "))
  
    # SELECT
  if valinta == 1:

      # Tulostetaan kaikki asiakkaat
    print("\nAsiakkaat:\n")
    mycursor.execute("SELECT id, last_name, first_name FROM Client")
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))
      
    kayttajasukunimi = input("Anna kayttajan sukunimi: ")


      # Haetaan kaikki yhden asiakkaan tilaukset
    print("Asiakkaan ", kayttajasukunimi, " tilaukset.")
    mycursor.execute("SELECT Client.id as id, last_name as sukunimi, Orders.id as tilausnumero, quantity as maara, name as tuotenimi FROM Orders JOIN Client ON Orders.client_id = Client.id JOIN Order_items ON Orders.id = Order_items.order_id JOIN Product ON Order_items.product_id = Product.id WHERE Client.last_name = %s", (kayttajasukunimi,))
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))
    

    input("\n\nPaina jotain jatkaaksesi...")


    # Päivitä tietoa, eli UPDATE
  if valinta == 2:
   
      # Tulosta tuotteet
    print("\n\nTuotteet:\n")
    mycursor.execute("SELECT id, name, price FROM Product")
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

    tuote = input("\nAnna tuotteen id: ")
    hinta = input("Anna uusi hinta: ")

      # Komento tietokantaan
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE Product SET price = %s WHERE id = %s", (hinta, tuote,))
    mydb.commit()

      # Tulosta päivitetty tuote
    print("\n\nPäivitetty hinta:\n")
    mycursor.execute("SELECT id, name, price FROM Product WHERE id = %s", (tuote,))
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

  
    input("\n\nPaina jotain jatkaaksesi...")

    # Poista tietoa, eli DELETE
  if valinta == 3:
    print("DELETE")

      # Tulosta tuotteet
    print("\n\nTuotteet:\n")
    mycursor.execute("SELECT id, name, price FROM Product")
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

    tuote = int(input("\nAnna tuotteen id: "))

      # Poistetun tuotteen tulostus
    print("Poistettu tuote:\n")
    mycursor.execute("SELECT id, name, price FROM Product WHERE id = %s", (tuote,))
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

      # Poista tuote, poistetaan fk tarkistukset välillä. Ei hyvä ratkaisu normaalisti.
    mycursor.execute("SET FOREIGN_KEY_CHECKS=0")
    mydb.commit()
    mycursor.execute("DELETE FROM Product WHERE Product.id = %s", (tuote,))
    mydb.commit()
    mycursor.execute("SET FOREIGN_KEY_CHECKS=1")
    mydb.commit()

    input("\n\nPaina jotain jatkaaksesi...")


    # Lisää tietoa eli INSERT
  if valinta == 4:
    print("INSERT")

        # Tulosta kaikki asiakkaat
    print("\nAsiakkaat:\n")
    mycursor.execute("SELECT id, last_name, first_name FROM Client")
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))
   
        # Kysy asiakas-id
    client = input("\nAnna asiakkaan id: ")

        # Luodaan uusi tilaus / ostoskärry
    mycursor.execute("INSERT INTO Orders (client_id) VALUES (%s)", (client,))
    mydb.commit()

        # Yhdistetään tämän avulla orders ja order_items
    mycursor.execute("SELECT id FROM Orders WHERE client_id = %s", (client,))
    myresult = mycursor.fetchall()
    
        # Viedään uusimman tilauksen id order_itemsiä varten
    order = myresult[-1].get('id')
   
        # Tulosta kaikki tuotteet
    print("\n\nTuotteet:\n")
    mycursor.execute("SELECT id, name, price FROM Product")
    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))
    
        # Kysy tuote ja määrä
    product = input("\nAnna tuotteen id: ")
    quantity = input("\nAnna määrä: ")

        # Käsky tietokantaan
    mycursor.execute("INSERT INTO Order_items (order_id, product_id, quantity) VALUES (%s,%s,%s)", (order, product, quantity,))
    mydb.commit()

    print("Lisätty tilaus")

    input("\n\nPaina jotain jatkaaksesi...")



while True:
  kayttis()