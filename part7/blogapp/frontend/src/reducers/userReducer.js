import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    currentUser(state, action) {
      console.log(action.payload)
      return action.payload
    },
  },
})

export const { currentUser } = userSlice.actions

export const getUser = (id) => {
  return async (dispatch) => {
    const user = await userService.getUser()
    dispatch(currentUser(user))
  }
}

export default userSlice.reducer
