import { useState } from 'react'

import { TextField, Button } from '@mui/material'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(username, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label="password"
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        id="login-button"
        type="submit"
      >
        login
      </Button>
    </form>
  )
}

export default LoginForm
