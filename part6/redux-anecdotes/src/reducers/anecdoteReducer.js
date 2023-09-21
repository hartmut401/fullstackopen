import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    increaseVotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes, increaseVotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteOf = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find((n) => n.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    }
    const newState = anecdotes.map((anecdote) =>
      anecdote.id !== id ? anecdote : changedAnecdote
    )
    newState.sort((a, b) => b.votes - a.votes)
    await anecdoteService.vote(id, changedAnecdote)
    dispatch(increaseVotes(newState))
  }
}

export default anecdoteSlice.reducer
