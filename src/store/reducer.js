import {
  CHANGE_DEFAULT_VALUE,
  CHANGE_NAME,
  CHANGE_TYPE,
} from './types'

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const buildTypeField = (type, props) => {
  const baseField = {
    id: props.id || uuidv4,
    parentId: props.parentId || null,
    type: type,
    name: props.name || 'name'
  }

  switch (type) {
    case 'record': return { ...baseField, recordName: baseField.name, default: '{}' }
    default: return baseField
  }
}

const removeFieldChildren = (state, fieldId) => {
  let tempState = { ...state }
  const children = Object.values(state).filter(field => field.parentId === fieldId)
  children.forEach(field => {
    delete tempState[field.id]
    if (field.type === 'record') {
      tempState = removeFieldChildren(tempState, field.id)
    }
  })
  delete tempState[fieldId]
  return tempState
}

const changeField = (state, fieldId, fieldName, value) => {
  const previousValue = state[fieldId]
  const newValue = { ...previousValue, [fieldName]: value }
  return {
    ...state,
    [fieldId]: newValue
  }
}

const changeDefaultValue = (state, { fieldId, defaultValue }) => {
  return changeField(state, fieldId, 'default', defaultValue)
}

const changeName = (state, { fieldId, name }) => {
  return changeField(state, fieldId, 'name', name)
}

const changeType = (state, { fieldId, type }) => {
  const previousValue = state[fieldId]
  const newValue = buildTypeField(type, previousValue)
  let tempState = state
  if (previousValue.type === 'record' && newValue.type !== 'record') {
    tempState = removeFieldChildren(state, fieldId)
  }
  return {
    ...tempState,
    [fieldId]: newValue
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_DEFAULT_VALUE: return changeDefaultValue(state, action.payload)
    case CHANGE_NAME: return changeName(state, action.payload)
    case CHANGE_TYPE: return changeType(state, action.payload)
    default: return state
  }
}

export const initialState = {
  1: { "id": 1, "parentId": null, "type": "record", "name": "userInfo", "namespace": "my.example" },
  2: { "id": 2, "parentId": 1, "name": "username", "type": "string", "default": "NONE" },
  3: { "id": 3, "parentId": 1, "name": "age", "type": "int", "default": -1 },
  4: { "id": 4, "parentId": 1, "name": "phone", "type": "string", "default": "NONE" },
  5: { "id": 5, "parentId": 1, "name": "housenum", "type": "string", "default": "NONE" },
  6: { "id": 6, "parentId": 1, "name": "address", "default": "{}", "type": "record", "recordName": "address" },
  7: { "id": 7, "parentId": 6, "name": "street", "type": "string", "default": "NONE" },
  8: { "id": 8, "parentId": 6, "name": "city", "type": "string", "default": "NONE" },
  9: { "id": 9, "parentId": 6, "name": "state_prov", "type": "string", "default": "NONE" },
  10: { "id": 10, "parentId": 6, "name": "country", "type": "string", "default": "NONE" },
  11: { "id": 11, "parentId": 6, "name": "zip", "type": "string", "default": "NONE" }
}
