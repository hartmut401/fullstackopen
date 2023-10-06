import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: 'info',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return initialState
    },
  },
})

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch(set(notification))
    setTimeout(() => {
      dispatch(clear())
    }, 3000)
  }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer
