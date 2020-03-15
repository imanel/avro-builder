export const reducer = (state, action) => {
  switch (action.type) {
    default: return state
  }
}

export const initialState = [
  { "id": 1, "parentId": null, "type": "record", "name": "userInfo", "namespace": "my.example" },
  { "id": 2, "parentId": 1, "name": "username", "type": "string", "default": "NONE" },
  { "id": 3, "parentId": 1, "name": "age", "type": "int", "default": -1 },
  { "id": 4, "parentId": 1, "name": "phone", "type": "string", "default": "NONE" },
  { "id": 5, "parentId": 1, "name": "housenum", "type": "string", "default": "NONE" },
  { "id": 6, "parentId": 1, "name": "address", "default": {}, "type": "record", "recordName": "mailing_address" },
  { "id": 7, "parentId": 6, "name": "street", "type": "string", "default": "NONE" },
  { "id": 8, "parentId": 6, "name": "city", "type": "string", "default": "NONE" },
  { "id": 9, "parentId": 6, "name": "state_prov", "type": "string", "default": "NONE" },
  { "id": 10, "parentId": 6, "name": "country", "type": "string", "default": "NONE" },
  { "id": 11, "parentId": 6, "name": "zip", "type": "string", "default": "NONE" }
]
