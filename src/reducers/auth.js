import * as types from '../constants/ActionTypes'
import isEmpty from 'lodash/isEmpty'

const INITIAL_STATE = {
  user: {},
  token: '',
  isAuthenticated: false,
  authInProgress: true
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.AUTH_SET_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
      authInProgress: false
    }
  case types.AUTH_RESET_USER:
    return {
      user: {},
      token: '',
      isAuthenticated: false,
      authInProgress: false
    }
  case types.AUTH_SET_TOKEN:
    return {
      ...state,
      token: action.token,
      isAuthenticated: true
    }
  case types.AUTH_FINISH:
    return {
      ...state,
      authInProgress: false
    }

  default:
    return {
      ...state
    }
  }
}
