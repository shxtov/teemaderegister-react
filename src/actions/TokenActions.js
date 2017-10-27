/* globals localStorage */
import store from '../store'
import * as types from '../constants/ActionTypes'

export const setUser = user => {
  if (!user) return { type: types.AUTH_RESET_USER }
  return {
    type: types.AUTH_SET_USER,
    user
  }
}

export const setToken = token => dispatch => {
  // triggered only on new token
  if (localStorage.jwtToken !== token) {
    localStorage.setItem('jwtToken', token)
  }

  // triggered on page load/refresh
  if (store.getState().auth.token !== token) {
    dispatch({ type: types.AUTH_SET_TOKEN, token: token })
  }
}

export const removeTokenAndUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  if (store.getState().auth.isAuthenticated) return dispatch(setUser())
  dispatch({ type: types.AUTH_FINISH })
}

export const getToken = () => localStorage.jwtToken
