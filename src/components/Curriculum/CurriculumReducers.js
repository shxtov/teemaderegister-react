import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  data: {},
  loading: true
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CURRICULUM_LOADED: {
      const { meta } = action
      return {
        ...state,
        data: meta,
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
