from algoliasearch.search_client import SearchClient
import json
import logging
import requests
import os

with open('./data/products.json') as f:
    records = json.load(f)

client = SearchClient.create('UUJ4M67MVC', os.getenv('ALGOLIA_ADMIN_API_KEY'))

index = client.init_index('products_index')

try:
  index.save_objects(records, {
    'autoGenerateObjectIDIfNotExist': True
  })
except Exception as e:
  logging.error(str(e))
