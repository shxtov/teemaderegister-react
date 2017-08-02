import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  meta: {},
  loading: true // TODO not relevant if on top level, separate per object
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOADED_CURRICULUM_META: {
    const { curriculumMeta } = action
    return {
      ...state,
      meta: curriculumMeta,
      loading: false
    }
  }
  case types.INIT_CURRICULUM_META:
    return INITIAL_STATE
  default:
    return {
      ...state
    }
  }
}
