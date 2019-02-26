# This will convert the CSV data for Ski Resorts into a SQLite DB
# Make sure 'filename' has the correct CSV filename we are opening
# Execute 'python3 ski_csv_to_sqlite.py'
# Once completed you should now have a SQLite DB file

import csv
import sqlite3

# Specify the CSV File we want to convert to a SQLiteDB
filename = 'clean_skiResortNortAmerica.csv'

# Specify the SQLiteDB File we want to create
con = sqlite3.connect('skiResortNorthAmerica.sqlite') 
# Create our SQL Cursor element                              
cur = con.cursor()
# Create the Table and Schema
cur.execute('''CREATE TABLE skiResorts (id INTEGER PRIMARY KEY AUTOINCREMENT,
                ResortName TEXT, 
                Continent TEXT, 
                Country TEXT, 
                StateProvince TEXT, 
                URL TEXT, 
                Altitude INTEGER, 
                Easy REAL, 
                Intermediate REAL, 
                Difficult REAL, 
                Funicular REAL, 
                CirculatingRopewayGondola REAL, 
                Chairlift REAL, 
                'T-barPlatterButton' REAL, 
                SunkidMovingCarpet REAL, 
                Adult REAL, 
                Youth REAL, 
                Child REAL, 
                Currency TEXT, 
                ResortSize REAL, 
                SlopeOfferingVariety REAL, 
                LiftsAndCableCars REAL, 
                SnowReliability INTEGER, 
                SlopePreparation INTEGER,
                AccessParking INTEGER, 
                Orientation INTEGER, 
                Cleanliness INTEGER, 
                EnvironmentallyFriendly INTEGER, 
                StaffFriendliness INTEGER, 
                Restaurants INTEGER, 
                ApresSki INTEGER, 
                AccomodationsToLifts INTEGER, 
                FamiliesChildren INTEGER, 
                Beginners INTEGER, 
                Advanced INTEGER, 
                SnowParks INTEGER, 
                'Cross-countryTrails' INTEGER, 
                AerialTramwayReverseRopeway INTEGER, 
                RopeTowBeginnerLift INTEGER, 
                PeopleMover INTEGER, 
                CombinedGondolaChair INTEGER, 
                CogRailway INTEGER, 
                Helicopter INTEGER, 
                SnowCaterpillars INTEGER, 
                Latitude REAL, 
                Longitude REAL);''')

# Load the CSV data into a variable
dataset = csv.DictReader(open(filename))

#Loop through the dataset, and each time we loop, we add a new row
for i in dataset:
    to_db = [
        (i['ResortName'],\
        i['Continent'],\
        i['Country'],\
        i['StateProvince'],\
        i['URL'],\
        i['Altitude'],\
        i['Easy'],\
        i['Intermediate'],\
        i['Difficult'],\
        i['Funicular'],\
        i['CirculatingRopewayGondola'],\
        i['Chairlift'],\
        i['T-barPlatterButton'],\
        i['SunkidMovingCarpet'],\
        i['Adult'],\
        i['Youth'],\
        i['Child'],\
        i['Currency'],\
        i['ResortSize'],\
        i['SlopeOfferingVariety'],\
        i['LiftsAndCableCars'],\
        i['SnowReliability'],\
        i['SlopePreparation'],\
        i['AccessParking'],\
        i['Orientation'],\
        i['Cleanliness'],\
        i['EnvironmentallyFriendly'],\
        i['StaffFriendliness'],\
        i['Restaurants'],\
        i['ApresSki'],\
        i['AccomodationsToLifts'],\
        i['FamiliesChildren'],\
        i['Beginners'],\
        i['Advanced'],\
        i['SnowParks'],\
        i['Cross-countryTrails'],\
        i['AerialTramwayReverseRopeway'],\
        i['RopeTowBeginnerLift'],\
        i['PeopleMover'],\
        i['CombinedGondolaChair'],\
        i['CogRailway'],\
        i['Helicopter'],\
        i['SnowCaterpillars'],\
        i['Latitude'],\
        i['Longitude'])]
    # Add to_db into the SQLite DB
    cur.executemany('''INSERT INTO skiResorts(ResortName, 
                                                Continent, 
                                                Country, 
                                                StateProvince, 
                                                URL, 
                                                Altitude, 
                                                Easy, 
                                                Intermediate, 
                                                Difficult, 
                                                Funicular, 
                                                CirculatingRopewayGondola, 
                                                Chairlift, 
                                                'T-barPlatterButton', 
                                                SunkidMovingCarpet, 
                                                Adult, 
                                                Youth, 
                                                Child, 
                                                Currency, 
                                                ResortSize, 
                                                SlopeOfferingVariety, 
                                                LiftsAndCableCars, 
                                                SnowReliability, 
                                                SlopePreparation, 
                                                AccessParking, 
                                                Orientation, 
                                                Cleanliness, 
                                                EnvironmentallyFriendly, 
                                                StaffFriendliness, 
                                                Restaurants, 
                                                ApresSki, 
                                                AccomodationsToLifts, 
                                                FamiliesChildren, 
                                                Beginners, 
                                                Advanced, 
                                                SnowParks, 
                                                'Cross-countryTrails', 
                                                AerialTramwayReverseRopeway, 
                                                RopeTowBeginnerLift, 
                                                PeopleMover, 
                                                CombinedGondolaChair, 
                                                CogRailway, 
                                                Helicopter, 
                                                SnowCaterpillars,
                                                Latitude, 
                                                Longitude) 
                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);''', to_db)
# Close the DB
con.commit()