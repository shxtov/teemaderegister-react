import Api from '../../utils/api'
import store from '../../store'
import * as types from '../../constants/ActionTypes'

import {
  getToken,
  setToken,
  setUser,
  removeTokenAndUser
} from '../../actions/TokenActions'

export const checkUser = isAuthenticated => {
  return dispatch => {
    if (!getToken()) {
      if (isAuthenticated) dispatch(setUser())
      return dispatch({ type: types.AUTH_FINISH })
    }

    Api('GET', '/users/me')
      .then(data => {
        const { user, token } = data
        if (token) dispatch(setToken(token))

        // only update if other user id
        if (store.getState().auth.user._id === user._id) {
          return dispatch({ type: types.AUTH_FINISH })
        }
        return dispatch(setUser(user))
      })
      .catch(() => {
        return dispatch(removeTokenAndUser())
      })
  }
}
