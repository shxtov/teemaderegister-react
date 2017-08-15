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
    return {
      ...state,
      topics: topics ? { ...state.topics, count: topics } : state.topics,
      supervisors: supervisors
        ? { ...state.supervisors, count: supervisors }
        : state.supervisors
    }
  }
  case types.TABLE_CONTENT_STARTED_LOADING:
    return {
      ...state,
      loading: true
    }
  case types.TABLE_CONTENT_FINISH_LOADING: {
    const { params } = action
    return {
      ...state,
      topics:
          params.tab === 'topics'
            ? { ...state.topics, data: [], query: params }
            : state.topics,
      supervisors:
          params.tab === 'supervisors'
            ? { ...state.supervisors, data: [], query: params }
            : state.supervisors,
      loading: false
    }
  }
  case types.TABLE_CONTENT_LOADED: {
    const { data, count, query } = action
    const countObj = {}
    countObj[query.sub] = count
    return {
      ...state,
      loading: false,
      topics:
          query.tab === 'topics'
            ? {
              data,
              query,
              count: Object.assign({ ...state.topics.count }, countObj)
            }
            : state.topics,
      supervisors:
          query.tab === 'supervisors'
            ? {
              data,
              query,
              count: Object.assign({ ...state.supervisors.count }, countObj)
            }
            : state.supervisors
    }
  }
  case types.TABLE_CONTENT_INIT:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
