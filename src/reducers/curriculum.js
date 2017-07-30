import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  curriculumMeta: {},
  loading: true
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOADED_CURRICULUM_META:
    return {
      ...state,
      curriculumMeta: action.curriculumMeta,
      loading: false
    }
  case types.INIT_CURRICULUM:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
