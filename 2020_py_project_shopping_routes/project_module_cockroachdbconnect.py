def crdbFetchAll(limit):
    from timeit import default_timer as timer
    import pandas as pd 
    import psycopg2

    print("Initializing connection to CockroachDB")

    conn = psycopg2.connect(
    host = '---',
    user = '---',
    port = ---,
    database = '---'
)

    conn.set_session(autocommit=True)

    # Ajastin päälle
    start = timer() 
    print("Searching for",limit,"lines in database...")


    # SQL-hakukomento
    cur = conn.cursor()
    sqlcommand = "SELECT * FROM SensorData LIMIT " + str(limit)
    cur.execute(sqlcommand)
    myresult = cur.fetchall()
    

    # Ajastin kiinni
    end = timer()
    print("- done in",round(end-start,2),"seconds")
   

    # Viedään data Pandas dataframeen
    df = pd.DataFrame(myresult, columns=[desc[0] for desc in cur.description])
    return df




# FETCHDATES
# Ottaa parametreina:
# limit = rivien määrä tietokantahakuun
# start = pvm muodossa "25-02-2020"
# end = pvm samassa muodossa, voi olla samat
def crdbFetchDates(limit,start,end):
    """
    crdbFetchDates -function
    
    Removes outliers using Isolation Forest ML function
    
    Parameters
    ----------
    
    limit:
        - Type: integer or string
        - If "ALL", fetchs all data between the dates
        - If integer, fetchs only that amount of lines
    

    start, end:
        - Type: string
        - Date in format "YYYY-MM-DD"
 
    
    Returns
    -------
    
    Pandas dataframe from the database
    
    """

    from timeit import default_timer as timer
    import pandas as pd
    import mysql.connector
    import psycopg2
    
    # Ajastin päälle
    start_time = timer() 

    start_date = start + " 00:00:00%"
    end_date = end + " 23:59:59%"
    
    
    
    # Yhteys tietokantaan
    print("Initializing connection to CockroachDB")

    conn = psycopg2.connect(
    host = '---',
    user = '---',
    port = ---,
    database = '---'
    )

    conn.set_session(autocommit=True)


    # SQL-hakukomento
    if limit == "ALL":
        print("Searching for everything between dates",start,"-",end,"in database...")
        cur = conn.cursor()
        cur.execute("SELECT * FROM SensorData WHERE timestamp>%s AND timestamp<%s", (start_date,end_date))
        myresult = cur.fetchall()
        
        
    else:
        print("Searching for",limit,"lines between dates",start,"-",end,"in database...")
        cur = conn.cursor()
        cur.execute("SELECT * FROM SensorData WHERE timestamp>%s AND timestamp<%s LIMIT %s", (start_date,end_date,limit))
        myresult = cur.fetchall()
        
   
    # Ajastin kiinni
    end_time = timer()
    print("- done in",round(end_time-start_time,2),"seconds")

   
    # Viedään data Pandas dataframeen
    df = pd.DataFrame(myresult, columns=[desc[0] for desc in cur.description])
    print("- shape of the result:",df.shape)
    
    return df
