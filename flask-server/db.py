import sqlite3
conn = sqlite3.connect('mydatabase.db')
cursor = conn.cursor()
table_name = "places"

def place_list():
    sql_query = f"SELECT place_name FROM {table_name}"
    cursor.execute(sql_query)
    place_names = cursor.fetchall()
    place_names_list = [place_name[0] for place_name in place_names]
    for place in place_names_list:
        print(place)
    return place_names_list

def address_list():
    sql_query = f"SELECT address FROM {table_name}"
    cursor.execute(sql_query)
    addresses = cursor.fetchall()
    address_list = [address[0] for address in addresses]
    return address_list

def list_clean():
    sql_query = f"DELETE FROM {table_name} where city != 'Астана'"
    cursor.execute(sql_query)
    conn.commit()

def place_info(place_name):

    i = 0
    sql_query = f"SELECT * FROM {table_name} WHERE place_name = '{place_name}'"
    info = cursor.execute(sql_query)
    for row in info:
        name = row[0]
        category = row[1]
        address = row[2]
        work_time = row[3]
        price = row[8]
        info_array = [name, category, address, price, work_time]
        print(info_array)
    return info_array

list_clean()