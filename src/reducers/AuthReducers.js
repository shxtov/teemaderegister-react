import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
  authInProgress: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        authInProgress: true
      }

    case types.AUTH_LOADED:
      const { user } = action
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        authInProgress: false
      }

    case types.AUTH_INIT:
      return INITIAL_STATE

    default:
      return {
        ...state
      }
  }
}
