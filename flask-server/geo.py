from geopy import GoogleV3
import googlemaps as gmaps
from geopy.distance import geodesic
import requests
geo = GoogleV3(api_key='AIzaSyBHxOkbiil469psSVWb03Gx6LnOJPdv1Rc', domain='maps.google.ru')
from db import address_list

import sqlite3
conn = sqlite3.connect('mydatabase.db')
cursor = conn.cursor()
table_name = "places"

def location_point():
    try:
        response = requests.get('https://ipinfo.io')
        data = response.json()
        loc = data['loc']
        locс = geo.geocode(loc)
        print(locс)
        return locс
    except:
        print("Internet is not available")
        exit()
        return False

def find_distance():
    start = location_point()
    points = []
    distance_points = []
    addresses = address_list()
    for place in addresses:
        address_to_geocode = f"{place}, Астана, Казахстан"
        point = geo.geocode(address_to_geocode)
        points.append(point)
        distance = geodesic(start.point, point.point)
        distance_points.append(distance)

    distance_place_pairs = zip(distance_points, points)
    sorted_pairs = sorted(distance_place_pairs)
    sorted_distance_points, sorted_points = zip(*sorted_pairs)
    five_addresses = [place.address for place in sorted_points[:5]]
    for address in five_addresses:
        print(address)
    return five_addresses


def place_info():
    five_places = []
    for i in range(5):
        array = find_distance()
        sql_query = f"SELECT * FROM {table_name} WHERE place_name = '{array[i]}'"
        info = cursor.execute(sql_query)

        for row in info:
            name = row[0]
            category = row[1]
            address = row[2]
            work_time = row[3]
            price = row[8]
            info_array = [name, category, address, price, work_time]
            five_places.append(info_array)
            print("2")
            print(info_array)
    print(five_places)
    return five_places

place_info()