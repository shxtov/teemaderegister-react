import * as types from 'constants/ActionTypes'
import Api from 'utils/api'
import store from 'store/configureStore'

export function checkUser(isAuthenticated) {
  return dispatch => {
    let token = getToken()

    if (!token) {
      if (isAuthenticated) dispatch(setUser())
      return dispatch({ type: types.FINISH_AUTH })
    }

    Api('GET', '/users/me')
      .then(data => {
        if (data.token) token = data.token
        let user = data.user

        dispatch(setToken(token))

        //only update if other user id
        if (store.getState().auth.user.id === user.id) {
          return dispatch({ type: types.FINISH_AUTH })
        }
        return dispatch(setUser(user))
      })
      .catch(() => {
        return dispatch(removeTokenAndUser())
      })
  }
}

export function setUser(user) {
  if (!user) {
    return { type: types.RESET_CURRENT_USER }
  }
  return {
    type: types.SET_CURRENT_USER,
    user
  }
}

export function setToken(token) {
  return dispatch => {
    // triggered only on new token
    if (sessionStorage.jwtToken !== token) {
      sessionStorage.setItem('jwtToken', token)
    }

    // triggered mostly on page load/refresh
    if (store.getState().auth.token !== token) {
      dispatch({ type: types.SET_TOKEN, token: token })
    }
  }
}

export function removeTokenAndUser() {
  return dispatch => {
    sessionStorage.removeItem('jwtToken')
    if (store.getState().auth.isAuthenticated) return dispatch(setUser())
    dispatch({ type: types.FINISH_AUTH })
  }
}

export function getToken() {
  return sessionStorage.jwtToken
}
