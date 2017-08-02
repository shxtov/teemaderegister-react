const BASE_URL = '/api'
import axios from 'axios'
import { getToken } from '../actions/TokenActions'
import nprogress from 'nprogress'
// nprogress.configure({ showSpinner: false }) // disable spinner

function makeConfig(method, url, query) {
  let config = {
    method: method,
    baseURL: BASE_URL, // `baseURL` will be prepended to `url` unless `url` is absolute.
    url: url
  }

  if (query && query.data && ['PUT', 'POST', 'PATCH'].indexOf(method) !== -1) {
    config.data = query.data
  }

  if (query && query.params) {
    config.params = query.params
  }

  //IF TOKEN ADD TO REQUEST
  let token = getToken()
  if (token) {
    config.headers = {
      Authorization: 'Bearer ' + token
    }
  }

  return config
}

export default function(method, url, query) {
  let config = makeConfig(method, url, query)
  // TODO if already started continue progressbar (from auth)
  nprogress.start()

  return axios
    .request(config)
    .then(response => {
      nprogress.done()

      return Promise.resolve(response.data)
    })
    .catch(err => {
      if (err.status === 403) {
        //TODO redirect for user auth error
        //dispatch same as logout
        console.log('not authorized')
      }
      nprogress.done()
      return Promise.reject(err.response)
    })
}
