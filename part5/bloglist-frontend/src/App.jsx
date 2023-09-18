import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [changedMessage, setChangedMessage] = useState(null)
  const [changeClass, setChangeClass] = useState('change')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
    setChangedMessage(`a new blog ${blogObject.title} added`)
    setBlogFormVisible(false)
    setTimeout(() => {
      setChangedMessage(null)
    }, 5000)
  }

  const increaseLikesOf = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('Blog:', JSON.stringify(blog))
    console.log('ChangedBlog:', JSON.stringify(changedBlog))

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      })
      .catch((error) => {
        setChangedMessage(
          `Blog '${blog.title}' was already removed from server`
        )
        setChangeClass('error')
        setTimeout(() => {
          setChangedMessage(null)
          setChangeClass('change')
        }, 5000)
        setBlogs(blogs.filter((b) => b.id !== id))
      })
  }

  const deleteBlogId = (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Delete '${blog.title}'`)) {
      blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setChangedMessage('Wrong username or password')
      setChangeClass('error')
      setTimeout(() => {
        setChangedMessage(null)
        setChangeClass('change')
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={changedMessage} changeClass={changeClass} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <h3>create new</h3>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={changedMessage} changeClass={changeClass} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
      </p>

      {blogForm()}

      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user.name}
            increaseLikes={() => increaseLikesOf(blog.id)}
            deleteBlog={() => deleteBlogId(blog.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
