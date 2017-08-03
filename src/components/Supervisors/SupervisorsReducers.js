import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  data: [],
  count: {
    supervised: 0,
    all: 0
  },
  query: {},
  loading: true
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.SUPERVISORS_LOADED_COUNT: {
    const { count } = action
    return {
      ...state,
      count
    }
  }
  case types.SUPERVISORS_STARTED_LOADING:
    return {
      ...state,
      loading: true
    }
  case types.SUPERVISORS_LOADED: {
    const { data, count, query } = action
    const o = {
      ...state,
      data,
      query,
      loading: false
    }
    o.count[query.sub] = count
    return o
  }
  case types.SUPERVISORS_INIT:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
