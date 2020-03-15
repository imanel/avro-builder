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
let rootElement = buildTypeField('record', { name: 'event_name' })
initialState = addField(initialState, rootElement)
initialState = addField(initialState, { parentId: rootElement.id, name: 'event_name', type: 'string', nullable: false })
initialState = addField(initialState, { parentId: rootElement.id, name: "trace_id", type: "string", nullable: false })
initialState = addField(initialState, { parentId: rootElement.id, name: "timestamp", type: "string", nullable: false })
initialState = addField(initialState, { parentId: rootElement.id, name: "organization_id", type: "string", nullable: false })
let payload = buildTypeField('record', { parentId: rootElement.id, name: "payload", default: "{}", type: "record", recordName: "payload", nullable: false })
initialState = addField(initialState, payload)
initialState = addField(initialState, { parentId: payload.id, name: "body", type: "string" })

export { initialState }
