import { removeTokenAndUser } from '../../actions/TokenActions'
import Api from '../../utils/api'

export const logout = () => dispatch => {
  return Api('POST', '/auth/logout')
    .then(() => {
      dispatch(completeLogout())
    })
    .catch(() => {
      console.log('already logged out')
      dispatch(completeLogout())
    })
}

const completeLogout = () => dispatch => dispatch(removeTokenAndUser())
