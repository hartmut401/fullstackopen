import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useAnecdoteDispatch } from '../AnecdoteContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(
        { queryKey: ['anecdotes'] },
        anecdotes.concat(newAnecdote)
      )
    },
  })
  const dispatch = useAnecdoteDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      dispatch({type: 'ERROR', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatch({ type: 'CLEAR', payload: '' })
      }, 5000)
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: 'CREATE', payload: `anecdote '${content}' created` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR', payload: '' })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
