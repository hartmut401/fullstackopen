import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    if (newTitle !== '') {
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
      })

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title'
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
      </div>
      <div>
        <button id="create-button" type="submit">create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm