import * as types from 'constants/ActionTypes'
import { setToken, removeTokenAndUser } from 'actions/AuthActions'
import Api from 'utils/api'

export function logout() {
  return dispatch => {
    return Api('POST', '/auth/logout')
      .then(() => {
        dispatch(completeLogout())
      })
      .catch(() => {
        console.log('already logged out')
        dispatch(completeLogout())
      })
  }
}

export function login(creds) {
  return dispatch => {
    dispatch({ type: types.LOGIN_IN_PROGRESS })
    let query = {
      data: creds
    }
    return Api('POST', '/auth/local/login', query)
      .then(data => {
        let token = data.token

        dispatch(setToken(token))
        dispatch({ type: types.LOGIN_FINISHED })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: types.LOGIN_FINISHED })
      })
  }
}

function completeLogout() {
  return dispatch => {
    dispatch(removeTokenAndUser())
  }
}
