#adfdasf

def Stats(
    df,
    columns="All",
    printResults="Pandas",
    plotResults=True):
    """
    stats -function
    
    Prints statistics about dataframe.
    
    Parameters
    ----------
    
    df :
        - Type: Pandas DataFrame

    printResults :
        - Type: "Pandas" or "Markdown"
        - Choose the format in which you want to print the results
        - "Pandas" is better for viewing results in Jupyter-lab
        - "Markdown" is better if you want to copy the results
        - Default: "Pandas"
        
    plotResults :
        - Type: Boolean
        - If True, print the distribution plots
       
    
    Returns
    -------
    
    Nothing
    
    """
    from timeit import default_timer as timer
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    import seaborn as sns
    
    # Ajastin päälle
    start = timer() 
    print("Calculating statistics...")
    print("")
    
    # Otsikko ja päivämäärät
    #df['date'] = pd.to_datetime({'year':df['year'],'month':df['month'],'day':df['day']})
    #begin_date = str(df['date'].min()).rstrip(" 00:00:00")
    #end_date = str(df['date'].max()).rstrip(" 00:00:00")
    #print("STATISTICS",begin_date,"-",end_date,"\n")
    #df = df.drop('date', 1)
    
    # Jos All, otetaan kaikki kolumnit, muutoin vain parametreina annetut
    if columns == "ALL":
        columns = df.columns.tolist()
      
    
    # STATISTICS
    # variance
    df_variance = df[columns].var()
    df_var = pd.DataFrame(data=df_variance, columns=["variance"])

    #unique
    df_unique = df[columns].nunique()
    df_unique = pd.DataFrame(data=df_unique, columns=["unique"])
  
    # Yhdistetään kaikki yhteen
    df_stats = df_var.T.append(df[columns].describe(), ignore_index=False)
    df_stats = df_unique.T.append(df_stats, ignore_index=False)    
    
    # Pyöristys
    df_stats = df_stats.round(1)
    
    # Tulostetaan Pandas-muodossa, parempi tulosten katseluun
    if printResults == "Pandas":
        display(df_stats)
        
    # Tulostetaan markdown-muodossa, parempi kopioida tulokset wikiin
    if printResults == "Markdown":
        print(df_stats.to_markdown())
    
    
    # Plot results
    if plotResults == True:
        print("")
        print("DISTRIBUTION PLOTS")
        
        # Tulostetaan plottaukset tai virheilmoitus jos ei toimi
        # Joka kolumnissa ei välttämättä toimi plottaus, koska arvot eivät numeerisia
        for i in range (0, len(columns)):
            try:
                print("-",columns[i])
                sns.distplot(df[columns[i]])
                plt.show()
            except:
                print("Error occurred plotting column:",columns[i])
                print("")
        

    # Ajastin kiinni
    end = timer()
    print("- done in",round(end-start,2),"seconds")