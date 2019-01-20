import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'

const INPUT_CHANGE = 'post/INPUT_CHANGE'

export const inputChange = createAction(INPUT_CHANGE)

const initialState = {
  value: ''
}

export default handleActions(
  {
    [INPUT_CHANGE]: (state, action) =>
      produce(state, draft => {
        const { name, value } = action.payload
        draft[name] = value
      })
  },
  initialState
)
