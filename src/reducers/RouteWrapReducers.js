import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
  authInProgress: true
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        authInProgress: true
      }
    case types.AUTH_FINISH:
      return {
        ...state,
        authInProgress: false
      }
    case types.AUTH_SET:
      const { user } = action
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        authInProgress: false
      }
    case types.AUTH_RESET:
      return {
        user: {},
        isAuthenticated: false,
        authInProgress: false
      }

    default:
      return {
        ...state
      }
  }
}
