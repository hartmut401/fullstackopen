import { createContext, useReducer, useContext } from 'react'

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return action.payload
    case 'CREATE':
      return action.payload
    case 'ERROR':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [anecdote, anecdoteDispatch] = useReducer(anecdoteReducer, '')

  return (
    <AnecdoteContext.Provider value={[anecdote, anecdoteDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useAnecdoteValue = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[1]
}

export default AnecdoteContext
