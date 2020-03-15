import { CHANGE_NAME, CHANGE_TYPE } from './types'

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
