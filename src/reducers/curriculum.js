import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  topics: {
    data: [],
    count: {
      registered: 0,
      available: 0,
      defended: 0,
      all: 0
    }
  },
  supervisors: {
    data: [],
    count: {
      supervised: 0,
      all: 0
    }
  },
  loading: true // TODO not relevant if on top level, separate per object
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOADED_CURRICULUM_META_COUNTS: {
    const { topics, supervisors } = action
    return {
      ...state,
      topics: {
        data: [],
        count: topics.count
      },
      supervisors: {
        data: [],
        count: supervisors.count
      }
    }
  }
  case types.LOADING_CURRICULUM_DATA:
    return {
      ...state,
      loading: true
    }
  case types.LOADED_CURRICULUM_DATA: {
    //console.log(action.results)
    let o = {
      ...state,
      loading: false
    }
    console.log(o)

    o[action.tab].data = action.results.data
    o[action.tab].count[action.sub] = action.results.count

    return o
  }
  case types.INIT_CURRICULUM:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
