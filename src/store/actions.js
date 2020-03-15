import {
  ADD_FIELD,
  CHANGE_DEFAULT_VALUE,
  CHANGE_NAME,
  CHANGE_TYPE,
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

export const changeType = (dispatch, fieldId, type) => dispatch({
  type: CHANGE_TYPE,
  payload: {
    fieldId,
    type
  }
})
