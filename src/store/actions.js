import {
  ADD_FIELD,
  CHANGE_DEFAULT_VALUE,
  CHANGE_NAME,
  CHANGE_NULLABLE,
  CHANGE_TYPE,
  REMOVE_FIELD,
} from './types'

export const addField = (dispatch, parentId, type = 'string') => dispatch({
  type: ADD_FIELD,
  payload: {
    parentId,
    type
  }
})

export const changeDefaultValue = (dispatch, fieldId, defaultValue) => dispatch({
  type: CHANGE_DEFAULT_VALUE,
  payload: {
    fieldId,
    defaultValue
  }
})

export const changeName = (dispatch, fieldId, name) => dispatch({
  type: CHANGE_NAME,
  payload: {
    fieldId,
    name
  }
})

export const changeNullable = (dispatch, fieldId) => dispatch({
  type: CHANGE_NULLABLE,
  payload: {
    fieldId
  }
})

export const changeType = (dispatch, fieldId, type) => dispatch({
  type: CHANGE_TYPE,
  payload: {
    fieldId,
    type
  }
})

export const removeField = (dispatch, fieldId) => dispatch({
  type: REMOVE_FIELD,
  payload: {
    fieldId
  }
})
