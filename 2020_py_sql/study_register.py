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
    database="students"
  )

  mycursor = mydb.cursor(dictionary=True)

    # Ruudun tyhjennys
  os.system('clear')
  print("Tietokantayhteys Mariadb-tietokantaan Students\n")
  valinta = int(input("1. Hae tietoa, 2. Päivitä tietoa, 3. Poista tietoa, 4. Lisää tietoa\n\nValitse numero: "))
  



    # Hae tietoa eli SELECT
    # Haetaan kaikki suoritusmerkinnät
  if valinta == 1:
      
    print("Kaikki kurssisuoritukset:\n")
      # Komento tietokantaan
    mycursor.execute("SELECT first_name, last_name, name as course_name, grade FROM Study_register JOIN Student ON Study_register.id = Student.id JOIN Course ON Study_register.course_id = Course.id")
    myresult = mycursor.fetchall()

      # Tuloksen tulostus
    print(tabulate(myresult, headers="keys", tablefmt='psql'))


    input("\n\nPaina jotain jatkaaksesi...")





    # Päivitä tietoa, eli UPDATE
  if valinta == 2:
    print("UPDATE")

      # Komento tietokantaan
    mycursor = mydb.cursor()
    
    name = input("Anna opiskelijan sukunimi: ")
    phone = input("Anna uusi puhelinnumero: ")

    mycursor.execute("UPDATE Student SET phone = %s WHERE last_name = %s", (phone, name))
    mydb.commit()

    print("Uusi puhelinnumero",phone,"vaihdettu.")

    input("\n\nPaina jotain jatkaaksesi...")






    # Poista tietoa, eli DELETE
  if valinta == 3:
    print("DELETE")

      # Komento tietokantaan
    name = (input("Anna poistettavan opiskelijan sukunimi: "),)

    katso = "SELECT * FROM Student WHERE last_name = %s"
    mycursor.execute(katso,name)

    myresult = mycursor.fetchall()
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

    poisto = "DELETE FROM Student WHERE last_name = %s"
    mycursor.execute("SET FOREIGN_KEY_CHECKS=0")
    mydb.commit()
    mycursor.execute(poisto,name)
    mydb.commit()
    mycursor.execute("SET FOREIGN_KEY_CHECKS=1")
    mydb.commit()

    print(mycursor.rowcount, "merkintä(ä) poistettu.")

    input("\n\nPaina jotain jatkaaksesi...")









    # Lisää tietoa eli INSERT
  if valinta == 4:
    print("INSERT")

    print("\nOppilaat:\n")
    mycursor.execute("SELECT id, last_name, first_name FROM Student")
    myresult = mycursor.fetchall()

      # Tuloksen tulostus
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

    student_id = input("\nAnna oppilaan id: ")

    print("\n\nKurssit:\n")
    mycursor.execute("SELECT id, name FROM Course")
    myresult = mycursor.fetchall()

      # Tuloksen tulostus
    print(tabulate(myresult, headers="keys", tablefmt='psql'))

    
    course_id = input("\nAnna kurssin id: ")
    grade = input("Anna arvosana: ")

    #mycursor.execute("UPDATE Student SET phone = %s WHERE last_name = %s", (phone, name))
    mycursor.execute("INSERT INTO Study_register (student_id, course_id, grade) VALUES (%s,%s,%s)", (student_id, course_id, grade,))
    mydb.commit()

    print("Lisätty kurssisuoritus")

    input("\n\nPaina jotain jatkaaksesi...")



while True:
  kayttis()