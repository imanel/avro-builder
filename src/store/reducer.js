import {
  ADD_FIELD,
  CHANGE_DEFAULT_VALUE,
  CHANGE_NAME,
  CHANGE_NULLABLE,
  CHANGE_TYPE,
  REMOVE_FIELD,
} from './types'

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const buildTypeField = (type, props) => {
  const baseField = {
    id: props.id || uuidv4(),
    parentId: props.parentId || null,
    type: type,
    name: props.name || 'name',
    nullable: props.nullable === undefined ? true : props.nullable
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

const addField = (state, props) => {
  const newField = buildTypeField(props.type, props)
  return {
    ...state,
    [newField.id]: newField
  }
}

const changeDefaultValue = (state, { fieldId, defaultValue }) => {
  return changeField(state, fieldId, 'default', defaultValue)
}

const changeName = (state, { fieldId, name }) => {
  return changeField(state, fieldId, 'name', name)
}

const changeNullable = (state, { fieldId }) => {
  return changeField(state, fieldId, 'nullable', !state[fieldId].nullable)
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

const removeField = (state, { fieldId }) => {
  const newState = { ...state }
  delete newState[fieldId]
  return newState
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_FIELD: return addField(state, action.payload)
    case CHANGE_DEFAULT_VALUE: return changeDefaultValue(state, action.payload)
    case CHANGE_NAME: return changeName(state, action.payload)
    case CHANGE_NULLABLE: return changeNullable(state, action.payload)
    case CHANGE_TYPE: return changeType(state, action.payload)
    case REMOVE_FIELD: return removeField(state, action.payload)
    default: return state
  }
}

// Starting value
let initialState = {}
let rootElement = buildTypeField('record', { name: 'userInfo' })
initialState = addField(initialState, rootElement)
initialState = addField(initialState, { parentId: rootElement.id, name: 'username', type: 'string', default: 'NONE' })
initialState = addField(initialState, { parentId: rootElement.id, name: "age", type: "int", default: -1 })
initialState = addField(initialState, { parentId: rootElement.id, name: "phone", type: "string", default: "NONE" })
initialState = addField(initialState, { parentId: rootElement.id, name: "housenum", type: "string", default: "NONE" })
let childElement = buildTypeField('record', { parentId: rootElement.id, name: "address", default: "{}", type: "record", recordName: "address" })
initialState = addField(initialState, childElement)
initialState = addField(initialState, { parentId: childElement.id, name: "street", type: "string", default: "NONE" })
initialState = addField(initialState, { parentId: childElement.id, name: "city", type: "string", default: "NONE" })
initialState = addField(initialState, { parentId: childElement.id, name: "state_prov", type: "string", default: "NONE" })
initialState = addField(initialState, { parentId: childElement.id, name: "country", type: "string", default: "NONE" })
initialState = addField(initialState, { parentId: childElement.id, name: "zip", type: "string", default: "NONE" })

export { initialState }
