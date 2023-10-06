import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import { TextField, Button } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    const content = {
      title: title,
      author: author,
      url: url,
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog(content))
  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="title" name="title" placeholder="title" />
        </div>
        <div>
          <TextField label="author" name="author" placeholder="author" />
        </div>
        <div>
          <TextField label="url" name="url" placeholder="url" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
