import numpy as np

def heatMap_routes(df,size,routes,plotResults=False,removeTop=0,):
    """
    heatMap -function
    
    Creates numpy array from dataframe coordinates, can filter by routes
    
    Parameters
    ----------
    
    df :
        - dataframe from which to create array
        - Type: Pandas DataFrame

        
    plotResults :
        - Type: Boolean
        - default: False
        - If True plots the heatmap

    routes :
        - Type: List of routes or "ALL" or None
        - Plots the selected routes


    removeTop :
        - Type: Float
        - default: 0
        - If 0 < removeTop < 100, scales input percentile from top
        - Good values are somewhere between 98 - 99.99 
        
    size :
        - Type: Integer
        - If gridconverter was run with x_range and y_range, you have to input correct gridsize here
        - For example 50, for grid of 50x50

    routes :
        - Type: List of integers, "ALL" or None
        - If "ALL", displays every route. Filters only the non-route lines, where ['area'] = -2, -1 or 0
        - If list, displays only the routes that are on the list.
        - If None, does not filter anything
        
    
    Returns
    -------
    
    Numpy array that has frequency of each coordinate.
    
    """

    import matplotlib.pyplot as plt
    from sklearn.preprocessing import MinMaxScaler
    min_max_scaler = MinMaxScaler()
    from timeit import default_timer as timer
    import numpy as np

    # Ajastin päälle
    start = timer() 
    print("Running heatMap-function on dataframe...")
    
    # Filtteröidäänkö reittien mukaan
    if routes == None:
        print("- not filtering any values")
        
    elif routes == "ALL":
        print("- Displaying all routes")
        
        # Poistetaan reittilistalta ['area] alle 1 arvot
        routes = df['area'].unique()
        routes = np.delete(routes, np.where(routes < 1))
        
        # Koko ennen
        beforesize = df.shape[0]
        
        # Poistetaan kaikki mikä ei ole reitit-listalla
        df = df[df['area'].isin(routes)]
        
        # Tuloste montako poistettu
        print("- Filtered",beforesize-df.shape[0],"lines")
        
    else:
        # Poistetaan kaikki mikä ei ole reitit-listalla
        print("- Displaying only selected",len(routes),"routes")
                
        # Koko ennen
        beforesize = df.shape[0]
        
        # Poistetaan kaikki mikä ei ole reitit-listalla
        df = df[df['area'].isin(routes)]
        
        # Tuloste montako poistettu
        print("- Filtered",beforesize-df.shape[0],"lines")


    # Jos size-parmetria ei anneta, haetaan se dataframesta
    # Tämä ohitetaan, jos size annetaan, eli gridconverter ajettu
    # .. x_range ja y_range parametreilla
    if size == None:
        # Gridin koko, esim. 1024
        size = df['x_grid'].max() + 1

    # Montako riviä pitkä dataframe on
    length = df['x_grid'].shape[0]
    
    # Tehdään grid² kokoinen tyhjä taulukko
    numpyarray = np.zeros((size,size),dtype=int)

    # Lisätään +1 taulukkoon jokaisesta pisteestä
    for i in range (0,length):
        numpyarray[df['x_grid'].iloc[i],df['y_grid'].iloc[i]] += 1

    # Käännetään oikein päin
    numpyarray = np.rot90(numpyarray, k=1, axes=(0, 1))

    # Ylimpien arvojen poisto, parantaa ehkä tulostetta
    if removeTop > 0 and removeTop < 100:
        topvalues = np.percentile(numpyarray,removeTop)
        numpyarray[numpyarray > topvalues] = topvalues

    # Plotataan taulukko
    if plotResults == True:
        print("- plotting results...")
        numpyarray_norm = min_max_scaler.fit_transform(numpyarray)
        fig, ax = plt.subplots(figsize=(8,8))      
        ax.imshow(numpyarray_norm, cmap='hot', interpolation='nearest')
        plt.show()

    # Ajastin kiinni
    end = timer()
    print("- done in",round(end-start,2),"seconds")


    # Palautetaan taulukko
    return numpyarray
