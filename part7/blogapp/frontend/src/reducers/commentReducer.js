import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    appendComment(state, action) {
      console.log('State: ', state)
      state.push(action.payload)
      console.log('Payload: ', action.payload)
    },
  },
})

export const { appendComment } = commentSlice.actions

export const createComment = (comment) => {
  return async (dispatch) => {
    const newComment = await commentService.create(comment)
    dispatch(appendComment(newComment))
  }
}

export default commentSlice.reducer
