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
  case types.SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
      authInProgress: false
    }
  case types.RESET_CURRENT_USER:
    return {
      user: {},
      token: '',
      isAuthenticated: false,
      authInProgress: false
    }
  case types.SET_TOKEN:
    return {
      ...state,
      token: action.token,
      isAuthenticated: true
    }
  case types.FINISH_AUTH:
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
