
import {
  INCREMENT,
  DECREMENT
} from './action-types'

export default function count (state = 1, action) {
  console.log("reducer", state, action)
  switch (action.type) {
    case INCREMENT:
      return state + action.number
    case DECREMENT:
      return state - action.number
    default:
      return state
  }
}