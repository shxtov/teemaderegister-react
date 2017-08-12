import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  topics: {
    data: [],
    count: {
      registered: 0,
      available: 0,
      defended: 0,
      all: 0
    },
    query: {}
  },
  supervisors: {
    data: [],
    count: {
      supervised: 0,
      all: 0
    },
    query: {}
  },
  loading: true
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.TABLE_CONTENT_LOADED_COUNT: {
    const { topics, supervisors } = action
    const o = {
      ...state
    }
    if (topics) o.topics.count = topics
    if (supervisors) o.supervisors.count = supervisors
    return o
  }
  case types.TABLE_CONTENT_STARTED_LOADING:
    return {
      ...state,
      loading: true
    }
  case types.TABLE_CONTENT_LOADED: {
    const { data, count, query } = action
    const o = {
      ...state,
      loading: false
    }
    o[query.tab] = Object.assign(o[query.tab], { data, query })
    o[query.tab].count[query.sub] = count
    return o
  }
  case types.TABLE_CONTENT_INIT:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
