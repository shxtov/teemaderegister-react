import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  curriculums: [],
  loading: true
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOADED_CURRICULUMS:
    return {
      ...state,
      curriculums: action.curriculums,
      loading: false
    }
  default:
    return {
      ...state
    }
  }
}
