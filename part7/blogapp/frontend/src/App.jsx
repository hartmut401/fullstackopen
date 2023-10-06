import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import storageService from './services/storage'
import { setNotification } from './reducers/notificationReducer'

import LoginForm from './components/Login'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { Container, AppBar, Toolbar, Button } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const notifyWith = (message, type = 'info') => {
    dispatch(
      setNotification({
        message,
        type,
      })
    )
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }
  if (!user) {
    return (
      <Container>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </Container>
    )
  }

  const Home = () => (
    <>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList user={user} />
    </>
  )

  const padding = {
    padding: 5,
  }

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <span style={padding}>{user.name} logged in</span>
            <span style={padding}>
              <button onClick={logout}>logout</button>
            </span>
          </Toolbar>
        </AppBar>
        <div>
          <h2>blog app</h2>
          <Notification />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
