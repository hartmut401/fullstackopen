import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useAnecdoteDispatch } from '../AnecdoteContext'

const Button = ({ type, label, anecdote, notification }) => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const dispatch = useAnecdoteDispatch()
  const handleClick = () => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: parseInt(anecdote.votes) + 1,
    })
    dispatch({ type: type, payload: notification })
    setTimeout(() => {
      dispatch({ type: 'CLEAR', payload: '' })
    }, 5000)
  }
  return <button onClick={handleClick}>{label}</button>
}

export default Button
