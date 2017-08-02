import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  data: {},
  loading: true
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.CURRICULUM_LOADED: {
    const { data } = action
    return {
      ...state,
      data,
      loading: false
    }
  }
  case types.CURRICULUM_INIT:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
