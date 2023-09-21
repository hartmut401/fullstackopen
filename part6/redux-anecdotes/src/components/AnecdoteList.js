import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  })

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteOf(anecdote.id))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
          }}
        />
      ))}
    </>
  )
}

export default AnecdoteList
