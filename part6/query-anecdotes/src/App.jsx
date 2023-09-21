import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests' 
import AnecdoteForm from './components/AnecdoteForm'
import Button from './components/Button'
import Notification from './components/Notification'
import { useAnecdoteDispatch } from './AnecdoteContext'

const App = () => {
  const dispatch = useAnecdoteDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <Button
              type='VOTE'
              label='vote'
              anecdote={anecdote}
              notification={`anecdote '${anecdote.content}' voted`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
