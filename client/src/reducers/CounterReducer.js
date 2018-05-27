import * as sampleActions from "../actions/CounterActions"

const initialState = {
  clicks: 0,
}

export default function counterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case sampleActions.INCREMENT_COUNTER:
      return { ...state, clicks: state.clicks + 1 }
    case sampleActions.DECREMENT_COUNTER:
      return { ...state, clicks: state.clicks - 1 }
    default:
      return state
  }
}