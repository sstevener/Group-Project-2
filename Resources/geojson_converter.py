# from sys import argv
from os.path import exists
import simplejson as json 

in_file = 'skiResort.json'
out_file = 'skiResorts_geojson.json'

data = json.load(open(in_file))

geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [d["Longitude"], d["Latitude"]],
            },
        "properties" : d,
     } for d in data]
}


output = open(out_file, 'w')
json.dump(geojson, output)

print(geojson)