import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: {}
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_INIT:
      return INITIAL_STATE
    case types.LOGIN_IN_PROGRESS:
      return {
        ...state,
        loading: true
      }

    case types.LOGIN_FINISHED:
      return {
        ...state,
        loading: false,
        hasError: !!action.error,
        error: action.error || {}
      }

    default:
      return {
        ...state
      }
  }
}
