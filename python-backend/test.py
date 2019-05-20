import requests
import json

url = 'https://nax65i26tfbgvn3xbvjhm3c3ci.appsync-api.us-west-2.amazonaws.com/graphql'
payload = {
  'query' : '''
    mutation CreateWaste($input: CreateWasteInput!) {
    createWaste(input: $input) {
      user {
        id
        name
      }
      predictedWasteClass
      imageUrl
      geoTag
      xonecoor
      yonecoor
      xtwocoor
      ytwocoor
    }
  }
  ''',
  'variables': {
    'input': {
      'predictedWasteClass': 'plastic',
      'imageUrl': 'https://assets.babycenter.com/ims/2013/09Sepb/144871875_4x3_soundoff2.jpg',
      'xonecoor': 700,
      'yonecoor': 70,
      'xtwocoor': 150,
      'ytwocoor': 880,
      'geoTag': 'blah'
    }
  }
}

headers = {
  'Content-Type': 'application/json',
  'x-api-key': 'da2-kgl545mdabdjxezl7pm7gf3c3y'
}
r = requests.post(url=url, json=(payload), headers=headers)
print(r.content)
