# 
def isolationForest(
    df,
    printResults=False,
    max_samples=100, 
    contamination=0.015, 
    random_state=None, 
    plotResults=False):
    """
    isolationForest -function
    
    Removes outliers using Isolation Forest ML function
    
    Parameters
    ----------
    
    df :
        - dataframe from which to create visualization
        - Type: Pandas DataFrame


    printResults :
        - Type: Boolean
        - default: False
        - If True prints data of original and classified dataframe


    plotResults :
        - Type: Boolean
        - default: False
        - If True plots the original dataframe and removed outliers


    contamination:
        - Type: float
        - default: 0.015
        - The amount of contamination of the data set, 
            i.e. the proportion of outliers in the data set. 
            Used when fitting to define the threshold on the 
            scores of the samples.
        - If ‘auto’, the threshold is determined as in the 
            original paper.
        - If float, the contamination should be in the 
            range [0, 0.5].

    
    max_samples:
        - Type: “auto”, int or float 
        - default=100
        - The number of samples to draw from X to train each 
            base estimator.
        - If int, then draw max_samples samples.
        - If float, then draw max_samples * X.shape[0] samples.
        - If “auto”, then max_samples=min(256, n_samples).
        - If max_samples is larger than the number of samples 
            provided, all samples will be used for all 
            trees (no sampling).


    random_state:
        - Type: int
        - default=None
        - Controls the pseudo-randomness of the selection of the 
            feature and split values for each branching step and 
            each tree in the forest.
        - Pass an int for reproducible results across multiple 
            function calls. See Glossary.
    
    
    Returns
    -------
    
    Pandas dataframe that has outliers removed
    
    """
    
    
    from sklearn.ensemble import IsolationForest
    import pandas as pd
    import numpy as np
    from timeit import default_timer as timer

    # Ajastin päälle
    start = timer() 
    print("Running IsolationForest classifier on dataframe...")

    # Otetaan x ja y -koordinaatit muuttujaan
    X = df.copy().loc[:, df.columns.intersection(['x','y'])]
    #X_sample = X.sample(int(0.1*X.shape[0]))
 
 
    # Määritetään IsolationForest   
    clf = IsolationForest(max_samples= max_samples,
                        contamination=contamination, 
                        random_state=random_state)


    # Sovitetaan data malliin
    clf.fit(X)

    # Otetaan outlierit muuttujaan
    y_outliers = clf.predict(X)
 

    # Tämä laskee ja kertoo pudotettujen pisteiden määrän
    unique, counts = np.unique(y_outliers, return_counts=True)
    dict(zip(unique, counts))

    # Pudotetaan kaikki outlierit pois
    isolationdata = pd.DataFrame({'dropIndex':y_outliers})
    result = pd.merge(df, isolationdata, left_index=True, right_index=True)
    result = result[result.dropIndex == 1]
    
   
    outliers_df = pd.merge(df, isolationdata, left_index=True, right_index=True)
    outliers_df = outliers_df[outliers_df.dropIndex == -1]

    result = result.drop(columns=['dropIndex'])

    # Ajastin kiinni
    end = timer()
    print("- done in",round(end-start,2),"seconds")




    if printResults == True:

        # creating a list of column names 
        before_column_value = ['Ennen luokittelua'] 

        before = np.array([
                    df.shape[0],
                    df['x'].max(),
                    df['x'].min(),
                    df['y'].max(),
                    df['y'].min()
                    ]) 
        
        # creating a list of index names 
        index_values = [
                    'shape', 
                    'x_max', 
                    'x_min', 
                    'y_max', 
                    'y_min'
                    ] 
        

        
        # creating the dataframe 
        df_before = pd.DataFrame(data = before,  
                        index = index_values,  
                        columns = before_column_value)
        
        after_column_value = ['Luokittelun jälkeen'] 

        after = np.array([
                    result.shape[0],
                    result['x'].max(),
                    result['x'].min(),
                    result['y'].max(),
                    result['y'].min()
                    ]) 

        df_after = pd.DataFrame(data = after,  
                        index = index_values,  
                        columns = after_column_value) 

        display(df_before,df_after)



    if plotResults == True:
        #outliers_df = pd.concat([df.copy(), result.copy()]).drop_duplicates(keep=False)

        import matplotlib.pyplot as plt
        print("\n- Plotting dataframe...")
        print("SHAPE",outliers_df.shape)
        plt.figure(figsize=[10, 10])
        plt.scatter(result['x'],result['y'],1, marker="s",alpha=1)
        plt.show()
        plt.scatter(outliers_df['x'],outliers_df['y'],1, marker="s",color="red")
        #plt.scatter(df['x'],df['y'],1, marker="s",color="purple")
        plt.show()
    




    # Palautetaan Pandas dataframe
    return result

