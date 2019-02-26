import pandas as pd
import requests

# Grab list of Ski Resorts names from skiResorts.csv
skiresorts_df = pd.read_csv("Resources/skiResort.csv")

# Create new DF with only North American ski resorts and clean "Greenland" from the dataframe
skiresorts_NA_df = skiresorts_df[(skiresorts_df['Continent'] == "North America") & (skiresorts_df['Country'] != "Greenland")]

print(skiresorts_NA_df.head())

latitude = []
longitude = []

counter = 0

for index, row in skiresorts_NA_df.iterrows():
    #print(row['ResortName'], row['StateProvince'], row['Country'])
    resortName = row['ResortName']
    stateProvince = row['StateProvince']
    country = row['Country']

    # Grab Ski Resorts Latitude and Longitude from Googles geocode api
    # address = "49-degrees-north-mountain-resort, Washington"
    if country == "Mexico":
        address = address = resortName + ", " + country
    else:
        address = address = resortName + ", " + stateProvince + ", " + country
    
    api_key = ""
    api_response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(address, api_key))
    api_response_dict = api_response.json()

    if api_response_dict['status'] == 'OK':
        apiLatitude = api_response_dict['results'][0]['geometry']['location']['lat']
        apiLongitude = api_response_dict['results'][0]['geometry']['location']['lng']
        print ('Latitude: ',apiLatitude)
        print ('Longitude: ',apiLongitude)
        print ('Address: ', address)
        print (index)
        latitude.append(apiLatitude)
        longitude.append(apiLongitude)

    counter += 1
    print("Count: ", counter)

# find the length of list:
latLength = len(latitude)
longLength = len(longitude)

print("Lat Length: ",latLength)
print("Long Length: ", longLength)

# Create a column from the list
skiresorts_NA_df['Latitude'] = latitude
skiresorts_NA_df['Longitude'] = longitude

# Write out new CSV with two new columns plus data
skiresorts_NA_df.to_csv("Resources/clean_skiResortNortAmerica.csv")