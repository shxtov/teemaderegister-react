import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  loading: false,
  errors: []
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOGIN_IN_PROGRESS:
    return {
      ...state,
      loading: true
    }

  case types.LOGIN_SUCCESS:
    return {
      ...state,
      loading: false
    }

  case types.LOGIN_FAIL:
    return {
      ...state,
      loading: false,
      errors: action.errors
    }

  default:
    return {
      ...state
    }
  }
}
