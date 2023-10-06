import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { createComment } from '../reducers/commentReducer'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    const blogId = id

    const comment = {
      content: content,
      blogId: blogId,
    }

    event.target.comment.value = ''

    dispatch(createComment(comment))
  }

  return (
    <div>
      <h2>Blog-Title</h2>
      <div>
        <a href={blog.url}> {blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input name="comment" />
          <button type="submit">add comment</button>
        </form>
      </div>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>
        })}
      </ul>
    </div>
  )
}

export default Blog
