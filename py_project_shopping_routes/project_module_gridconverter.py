# GRIDCONVERTER
# Muuntaa koordinaatit gridsize² kokoiseen ruudukkoon
# Pienin koordinaatti on 0 ja suurin gridsize - 1

def gridConverter(
    df, 
    gridsize,
    printresults,
    x_range,
    y_range,
    create_indexes):
    
    """
    gridConverter -function
    
    Converts dataframe coordinates into a gridsize²
    
    Parameters
    ----------

    df :
        - Type: Pandas DataFrame


    gridsize:
        - Type: integer
        - Size of the grid
    

    printResults :
        - Type: Boolean
        - If True prints data of original and gridded dataframe
        
    x_range & y_range :
        - Type: Integer Tuple
        - Give values from which to take lower and upper limits to grid
        - If None, takes lower and upper limit from dataframe min and max
        
    create_indexes :
        - Type: Boolean
        - If True, creates indexes from data grid coordinates
        - For example 2x2 grid has indexes from 0 to 3
 
    
    Returns
    -------
    
    Pandas dataframe with scaled coordinates
    
    """
    from timeit import default_timer as timer
    
    orig_df = df.copy()

    # Ajastin päälle
    start = timer() 
    
   
    if x_range == None:
        # Haetaan dataframesta min ja max arvot
        minX = df['x'].min()
        maxX = df['x'].max()
        minY = df['y'].min()
        maxY = df['y'].max()
        
    else:
        # Otetaan min ja max parametrista
        minX = x_range[0]
        maxX = x_range[1]
        minY = y_range[0]
        maxY = y_range[1]
        
    sizeX = maxX - minX
    sizeY = maxY - minY
    
    
    print("Converting dataframe",sizeX,"x",sizeY,"to",gridsize,"x",gridsize,"grid...")
    


    # Muunnetaan x-koordinaatti
    df['x_grid'] = ((gridsize-1)*(df['x']-minX)/(maxX-minX))
    df['x_grid'] = df['x_grid'].astype(int)

    # Muunnetaan y-koordinaatti
    df['y_grid'] = ((gridsize-1)*(df['y']-minY)/(maxY-minY))
    df['y_grid'] = df['y_grid'].astype(int)
    
    

    
    if create_indexes == True:
        df['grid_index'] = df['y_grid'] * gridsize + df['x_grid']
       
    
    # Ajastin kiinni
    end = timer()
    print("- done in",round(end-start,2),"seconds")
    
    
    
    
    if printresults == True:
        import numpy as np       
        import pandas as pd
        # creating a list of column names 
        before_column_value = ['Ennen gridiin sovitusta'] 

        before = np.array([
                    orig_df['x'].max(),
                    orig_df['x'].min(),
                    orig_df['y'].max(),
                    orig_df['y'].min()
                    ]) 
        
        # creating a list of index names 
        index_values = [ 
                    'x_max', 
                    'x_min', 
                    'y_max', 
                    'y_min'
                    ] 
        

        
        # creating the dataframe 
        df_before = pd.DataFrame(data = before,  
                        index = index_values,  
                        columns = before_column_value)
                               
        after_column_value = ['Gridiin sovituksen jälkeen'] 

        after = np.array([
                    df['x_grid'].max(),
                    df['x_grid'].min(),
                    df['y_grid'].max(),
                    df['y_grid'].min()
                    ]) 

        df_after = pd.DataFrame(data = after,  
                        index = index_values,  
                        columns = after_column_value) 

        display(df_before,df_after)
        
        

    # Palauttaa muunnetun dataframen
    return df