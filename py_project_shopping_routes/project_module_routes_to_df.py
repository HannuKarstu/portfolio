def routes_to_DF(
    df,
length_of_index_list):
    """
    routes_to_DF -function
    
    Creates characteristics matrix from dataframe. Dataframe must be ran thru route_creator -function first.
    
    Parameters
    ----------
    
    df :
        - Type: Pandas DataFrame
        - NOTE: Run route_creator -function first to create area-column


    
    Returns
    -------
    
    Pandas dataframe of route characteristics
    
    """

    import numpy as np
    import pandas as pd
    from timeit import default_timer as timer
    
    # Ajastin päälle
    start = timer() 
    print("Running routes_to_DF on dataframe...")

    # Reitit listalle, josta ei-reitit pois
    routes = df['area'].unique()
    routes = np.delete(routes, np.where(routes < 1))

    # Reittimatriisi
    shopping_routes = []

    
    for i in range (0,len(routes)):
        # Käydään joka reitti läpi
        df_oneroute = df[df['area'].isin([routes[i]])]
        
        # Varmistetaan että reitti on tarpeeksi pitkä indeksien
        # .. tallentamista varten
        if df_oneroute.shape[0] > length_of_index_list:
        
            # Node_id
            route_node = int(df_oneroute['node_id'].iloc[0])

            # Reitin aika
            route_time = int((df_oneroute['timestamp'].max()-df_oneroute['timestamp'].min()).seconds)

            # Reitin pituus
            df_oneroute['distance'] = np.sqrt((df_oneroute['x'].diff()**2 + df_oneroute['y'].diff()**2))
            route_lenght = int(df_oneroute['distance'].sum()/100)

            # Viikonpäivä
            df_oneroute['weekday'] = df_oneroute.timestamp.dt.weekday
            route_weekday = int(df_oneroute['weekday'].iloc[0])

            # Kellonaika
            df_oneroute['hour'] = df_oneroute.timestamp.dt.hour
            route_hour = int(df_oneroute['hour'].iloc[0])

            # Viikon numero
            df_oneroute['week'] = df_oneroute.timestamp.dt.week
            route_week = int(df_oneroute['week'].iloc[0])

            # Indeksilista
            indexes = df_oneroute['grid_index'].tolist()
            # Alla oleva ei toimi oikein. Tarkoitus olisi lyhentää indeksilistaus määrätyn pituiseksi.
            """
            indexes = []
            indexer = round(df_oneroute.shape[0] / length_of_index_list,1)
            print("INDEXER",indexer)
            for i in range (0,df_oneroute.shape[0]):
                if i % indexer == 0.0:
                    indexes.append(df_oneroute['grid_index'].iloc[i])
                    """
              
            # Lisätään listalle
            shopping_routes.append([route_node,route_time,route_lenght,route_weekday,route_hour,route_week,indexes])
     


    # Reittimatriisi dataframeksi
    df_routes = pd.DataFrame(data=shopping_routes, columns=["node","time_s", "lenght_m", "weekday", "hour", "week","indexes"])

    
    # Ajastin kiinni
    end = timer()
    print("- done in",round(end-start,2),"seconds")
    
    return df_routes
    