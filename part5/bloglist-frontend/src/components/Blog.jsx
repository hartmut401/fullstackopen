import { useState } from 'react'

const Blog = ({ blog, user, increaseLikes, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibleClass = blog.user.name === user ? 'visible' : 'hidden'

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(showDetails ? false : true)}>{showDetails ? 'hide' : 'view'}</button>
        {showDetails &&
          <>
            <br />{blog.url}
            <br />likes {blog.likes}
            <button onClick={increaseLikes}>like</button>
            <br />{blog.user.name ? blog.user.name : user }
            <br /><button id="delete-button" onClick={deleteBlog} className={visibleClass}>remove</button>
          </>
        }
      </div>
    </div>
  )
}

export default Blog