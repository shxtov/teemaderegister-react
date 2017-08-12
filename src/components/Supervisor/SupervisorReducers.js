import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  data: {},
  count: {},
  loading: true
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.SUPERVISOR_LOADED: {
    const { data, count } = action
    return {
      ...state,
      data,
      count,
      loading: false
    }
  }
  case types.SUPERVISOR_INIT:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
