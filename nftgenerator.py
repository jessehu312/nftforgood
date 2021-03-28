import os
import pymongo
import json
import random
import psycopg2
import hashlib
import time

from hashlib import sha256



class Block:
    def __init__(self, index, transactions, timestamp, previous_hash, data):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.nonce = 0
        self.data = data

    def compute_hash(self):
        """
        A function that return the hash of the block contents.
        """
        block_string = json.dumps(self.__dict__, sort_keys=True)
        return sha256(block_string.encode()).hexdigest()


class Blockchain:
    # difficulty of our PoW algorithm
    difficulty = 2

    def __init__(self):
        self.unconfirmed_transactions = []
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        """
        A function to generate genesis block and appends it to
        the chain. The block has index 0, previous_hash as 0, and
        a valid hash.
        """
        genesis_block = Block(0, [], time.time(), "0", "NFTs4GOOD")
        genesis_block.hash = genesis_block.compute_hash()
        self.chain.append(genesis_block)
    
    def load_chain(self, oldchain):
        self.chain =[]
        self.chain = oldchain
    
    def purge_chain(self):
        self.chain = []
    

    @property
    def last_block(self):
        return self.chain[-1]

    def add_block(self, block, proof):
        """
        A function that adds the block to the chain after verification.
        Verification includes:
        * Checking if the proof is valid.
        * The previous_hash referred in the block and the hash of latest block
          in the chain match.
        """
        previous_hash = self.last_block.hash

        if previous_hash != block.previous_hash:
            return False

        if not self.is_valid_proof(block, proof):
            return False

        block.hash = proof
        self.chain.append(block)
        return True

    def is_valid_proof(self, block, block_hash):
        """
        Check if block_hash is valid hash of block and satisfies
        the difficulty criteria.
        """
        return (block_hash.startswith('0' * Blockchain.difficulty) and
                block_hash == block.compute_hash())

    def proof_of_work(self, block):
        """
        Function that tries different values of nonce to get a hash
        that satisfies our difficulty criteria.
        """
        block.nonce = 0

        computed_hash = block.compute_hash()
        while not computed_hash.startswith('0' * Blockchain.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()

        return computed_hash

    def add_new_transaction(self, transaction):
        self.unconfirmed_transactions.append(transaction)

    def mine(self, data):
        """
        This function serves as an interface to add the pending
        transactions to the blockchain by adding them to the block
        and figuring out Proof Of Work.
        """
        if not self.unconfirmed_transactions:
            return False

        last_block = self.last_block

        new_block = Block(index=last_block.index + 1,
                          transactions=self.unconfirmed_transactions,
                          timestamp=time.time(),
                          previous_hash=last_block.hash,
                          data = data)

        proof = self.proof_of_work(new_block)
        self.add_block(new_block, proof)

        self.unconfirmed_transactions = []
        return new_block.index





def hashthis(st):


    hash_object = hashlib.md5(st.encode())
    h = str(hash_object.hexdigest())
    return h



def initsystem():
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["nftforgood"]

    blockchain = Blockchain()

    return db, blockchain


def loadchain(db, blockchain, eid):


    chain_data = []

    for block in blockchain.chain:
        chain_data.append(block.__dict__)

    chain = str(json.dumps(chain_data))

    # print(chain)

    col = db.nfts

    for x in col.find():
        if x['id'] == eid:
            found = 1
            chainstr =  x['chain']

            chain = []
            chain_data = json.loads(chainstr)
            for c in chain_data:
                b = Block(c["index"], c["transactions"], c["timestamp"], c["previous_hash"], c["data"])
                b.hash = c['hash'] 
                chain.append(b)
            
            # print(chain)
            blockchain.load_chain(chain)
    
    return blockchain



def squashchain(db, blockchain, nid):


    chain_data = []

    for block in blockchain.chain:
        chain_data.append(block.__dict__)

    chain = str(json.dumps(chain_data))

    print(chain)

    col = db.nfts

    for x in col.find():
        if x['id'] == nid:
            found = 1
            col.update_one({"id": nid}, {"$set":{"chain":chain}})
            # print("updated")
            # del blockchain
            # blockchain = Blockchain()
            return json.dumps({"nftid": str(nid)})
    




    return json.dumps({"nftid": "-100"})





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

    db, blockchain = initsystem()


    retjson = {}

    action = request_json['action']

    if action == "getchain":
        blockchain = loadchain(db, blockchain, request_json['eid'])
        chain_data = []
        for block in blockchain.chain:
            chain_data.append(block.__dict__)
        return json.dumps({"length": len(chain_data),
                        "chain": chain_data})


    if action == "adduser" :
        maxid = 1
        col = db.users
        for x in col.find():
            id = x["userid"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["userid"] = id
        payload["uid"] = request_json['uid']
        payload["name"] = request_json['name']
        payload["email"] = request_json['email']
        payload["photourl"] = request_json['photourl']
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)


    if action == "startcollection" :
        maxid = 1
        col = db.nfts
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        payload["id"] = id
        payload["title"] = request_json['title']
        payload["description"] = request_json['description']
        payload["type"] = request_json['type']
        payload["charity"] = request_json['charity']
        
        payload["chain"] = []

        

        
        result=col.insert_one(payload)


        blockchain = squashchain(db, blockchain, id)


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)






    if action == "addrawimg" :
        maxid = 1
        col = db.imgs
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        payload["id"] = id
  
        payload["name"] = request_json['name']
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)




    if action == "getecollectionchain" :
        maxid = 1
        col = db.nfts
        chain =[]
        for x in col.find():
            if x['id'] == request_json['id']:
                chain = x['chain']
            
        
        
        
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successful"
        retjson['chain'] = chain

        return json.dumps(retjson)




    if action == "addnft" :
        maxid = 1
        col = db.nfts
        chain =[]
        bid = -1
        for x in col.find():
            if x['id'] == request_json['collectionid']:
                nid = x['id']
                imgurl = request_json['imgurl']
                urlhash = request_json['secrethash']

                blockchain = loadchain(db, blockchain, nid)
                blockchain.add_new_transaction(imgurl)
                bid = blockchain.mine(urlhash)
                nid = squashchain(db, blockchain, nid)

        
        
        
        retjson = {}

        retjson['blockid'] = bid
        retjson['status'] = "successful"
        
        return json.dumps(retjson)






    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
