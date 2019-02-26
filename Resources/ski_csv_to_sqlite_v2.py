# This will convert the CSV data for Ski Resorts into a SQLite DB
# Make sure 'filename' has the correct CSV filename we are opening
# Execute 'python3 ski_csv_to_sqlite.py'
# Once completed you should now have a SQLite DB file

import csv
import sqlite3

# Specify the CSV File we want to convert to a SQLiteDB
filename = 'clean_skiResortsNA.csv'

# Specify the SQLiteDB File we want to create
con = sqlite3.connect('clean_skiResortsNA.sqlite') 
# Create our SQL Cursor element                              
cur = con.cursor()
# Create the Table and Schema
cur.execute('''CREATE TABLE clean_skiResorts (id INTEGER PRIMARY KEY AUTOINCREMENT,
                ResortName TEXT, 
                Continent TEXT, 
                Country TEXT, 
                StateProvince TEXT, 
                URL TEXT, 
                Altitude INTEGER, 
                Easy REAL, 
                Intermediate REAL, 
                Difficult REAL, 
                Adult REAL, 
                Youth REAL, 
                Child REAL, 
                Currency TEXT, 
                ResortSize REAL, 
                SlopeOfferingVariety REAL, 
                LiftsAndCableCars REAL, 
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
        i['Adult'],\
        i['Youth'],\
        i['Child'],\
        i['Currency'],\
        i['ResortSize'],\
        i['SlopeOfferingVariety'],\
        i['LiftsAndCableCars'],\
        i['Latitude'],\
        i['Longitude'])]
    # Add to_db into the SQLite DB
    cur.executemany('''INSERT INTO clean_skiResorts(ResortName, 
                                                Continent, 
                                                Country, 
                                                StateProvince, 
                                                URL, 
                                                Altitude, 
                                                Easy, 
                                                Intermediate, 
                                                Difficult, 
                                                Adult, 
                                                Youth, 
                                                Child, 
                                                Currency, 
                                                ResortSize, 
                                                SlopeOfferingVariety, 
                                                LiftsAndCableCars, 
                                                Latitude, 
                                                Longitude) 
                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);''', to_db)
# Close the DB
con.commit()