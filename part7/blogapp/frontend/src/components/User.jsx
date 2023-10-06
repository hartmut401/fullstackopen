import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  const id = useParams().id
  const blogsOfUser = blogs.filter((n) => n.user.id === id)
  if (blogsOfUser.length === 0) {
    return null
  }
  const user = blogsOfUser[0].user.name

  return (
    <div>
      <h2>{user}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogsOfUser.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
