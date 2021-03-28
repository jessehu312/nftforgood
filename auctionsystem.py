import os
# import pymongo
import json
import random
import psycopg2




def connector():
    # cockroachstring = "dbname='wet-dingo-838.defaultdb' user='muntaser' password='redacted' host='free-tier.gcp-us-central1.cockroachlabs.cloud' port='26257'"
    cockroachstring = os.environ.get('COCKROACHSTR')
    conn=psycopg2.connect(cockroachstring)
    return conn



def initialize(conn):
    with conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, username STRING, email STRING, userpassword STRING, useraddress STRING, lat STRING, lon STRING, usertype STRING)"
        )
        cur.execute(
            "CREATE TABLE IF NOT EXISTS bids (id INT PRIMARY KEY, userid INT, auctionid INT, value INT)"
        )
        cur.execute(
            "CREATE TABLE IF NOT EXISTS auctions (id INT PRIMARY KEY, name STRING, userid STRING, cost STRING, price STRING, ending STRING, items STRING, status STRING)"
        )
        # cur.execute("UPSERT INTO users (id, email, userpassword, usertype, name) VALUES (1, 'jon@fisherman.com', 'password1', 'fisherman', 'jon stewart'), (2, 'joe@gmail.com', 'password1', 'customer', 'joe someone')")
        # logging.debug("create_accounts(): status message: %s", cur.statusmessage)
    conn.commit()



def add_auction(conn, userid, cost, price, placeid, items, tname):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM auctions")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        i = 1
        for row in rows:
            i = i + 1
        i = str(i)
        helperid = "-1"
        status = "created"
        cur.execute("UPSERT INTO auctions (id, name, userid, cost, price, placeid, items, helperid, status) VALUES (" + i +", '" + tname +"', '" + userid + "', '" + cost + "', '" + price +"', '" + placeid + "', '" + items +"', '" + helperid +"', '" + status +"')")
        # logging.debug("create_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    return i
    # print ("user added")




def completedauction(conn, auctionid):
    newstatus = "completed"
    with conn.cursor() as cur:
        cur.execute( "UPDATE auctions SET status = %s WHERE id = %s", (newstatus, auctionid));
        #  "UPDATE accounts SET balance = balance - %s WHERE id = %s", (amount, frm)
        conn.commit()

    return 0





def add_bid(conn, uid, pid, val):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM bids")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        i = 1
        for row in rows:
            i = i + 1
        i = str(i)
        
        cur.execute("UPSERT INTO bids (id, userid, auctionid, value) VALUES (" + i +", '" + uid + "', '" + aid + "', '"  + val +"')")
        # logging.debug("create_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    return i
    # print ("user added")



def add_users(conn, uname, pw, utype, uemail, lat, lon, uaddress):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM users")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        i = 1
        for row in rows:
            i = i + 1
        i = str(i)
        
        cur.execute("UPSERT INTO users (id, email, userpassword, usertype, username, lat, lon, useraddress) VALUES (" + i +", '" + uemail + "', '" + pw + "', '" + utype +"', '" + uname + "', '" + lat +"', '" + lon +"', '" + uaddress +"')")
        # logging.debug("create_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    return i
    # print ("user added")


def login(conn, uemail, pw):
    with conn.cursor() as cur:
        cur.execute("SELECT id, email, userpassword, usertype, username, lat, lon, useraddress FROM users")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        for row in rows:
            # print(row)
            # print (type(row))
            if row[1] == uemail and row[2] == pw:
                # print ("found")
                return True, row[0], row[3], row[4], row[5], row[6], row[7]
        return False, 'none', 'none', '-1', '-1', '-1', '-1', '-1', '-1' 


def getuserbyid(conn, uid):
    with conn.cursor() as cur:
        cur.execute("SELECT id, email, userpassword, usertype, username, lat, lon, useraddress FROM users")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        for row in rows:
            # print(row)
            # print (type(row))
            if row[0] == int(uid):
                # print ("found")
                return True, row[0], row[1], row[3], row[4], row[5], row[6], row[7]
        return False, 'none', 'none', '-1', '-1', '-1', '-1', '-1', '-1' , '-1'

def delete_users(conn):
    with conn.cursor() as cur:
        cur.execute("DELETE FROM defaultdb.users")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    with conn.cursor() as cur:
        cur.execute("DROP TABLE users")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()

    print ("users table deleted")


def purgedb(conn):
    with conn.cursor() as cur:
        cur.execute("DELETE FROM defaultdb.users")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    with conn.cursor() as cur:
        cur.execute("DROP TABLE users")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()

    print ("users table deleted")



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()
    conn = connector()
    initialize(conn)

    retjson = {}

    action = request_json['action']
    if action == "createuser" :
        uname = request_json['name']
        pw = request_json['password']
        utype = request_json['type']
        uaddress = request_json['address']
        lat = request_json['lat']
        lon = request_json['lon']
        uemail = request_json['email']

        pid = add_users(conn, uname, pw, utype, uemail, lat, lon, uaddress)

        retjson['status'] = "successfully added"
        retjson['id'] = pid

        return json.dumps(retjson)


    if action == 'login':
        uemail = request_json['email']
        pw = request_json['password']

        res = login(conn, uemail, pw)

        retjson['status'] = str(res[0])
        retjson['id'] = str(res[1])
        retjson['type'] = str(res[2])
        retjson['name'] = str(res[3])
        retjson['lat'] = str(res[4])
        retjson['lon'] = str(res[5])
        retjson['address'] = str(res[6])
        

        return json.dumps(retjson)



    if action == 'getuserbyid':
        uid = request_json['uid']

        res = getuserbyid(conn, uid)

        retjson['status'] = str(res[0])
        retjson['id'] = str(res[1])
        retjson['email'] = str(res[2])
        retjson['type'] = str(res[3])
        retjson['name'] = str(res[4])
        retjson['lat'] = str(res[5])
        retjson['lon'] = str(res[6])
        retjson['address'] = str(res[7])
        

        return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
