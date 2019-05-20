import requests
import json

url = 'https://nax65i26tfbgvn3xbvjhm3c3ci.appsync-api.us-west-2.amazonaws.com/graphql'
payload = {
  'query' : '''
    query ListWastes(
      $filter: ModelWasteFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listWastes(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          user {
            id
            name
          }
          predictedWasteClass
          actualWasteClass
          createdAt
          imageUrl
          geoTag
          xonecoor
          yonecoor
          xtwocoor
          ytwocoor
        }
        nextToken
      }
    }
  ''',
  'variables': {
    "limit": 3,
    "filter": {
      "actualWasteClass": {
        "ne": None
      }
    }
  }
}

headers = {
  'Content-Type': 'application/json',
  'x-api-key': 'da2-kgl545mdabdjxezl7pm7gf3c3y'
}
r = requests.post(url=url, data=json.dumps(payload), headers=headers)
print(r.content)
