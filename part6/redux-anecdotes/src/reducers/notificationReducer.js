import { createSlice } from '@reduxjs/toolkit'

const initialStyle = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
}
const initialState = {
  content: 'This is the initial message',
  style: initialStyle,
}

const notificationSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        content: action.payload,
        style: initialStyle,
      }
    },
    clearNotification(state, action) {
      return {
        content: '',
        style: {
          display: 'hidden',
        },
      }
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, timeToShow) => {
  return async (dispatch) => {
    timeToShow = timeToShow * 1000
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeToShow)
  }
}

export default notificationSlice.reducer
