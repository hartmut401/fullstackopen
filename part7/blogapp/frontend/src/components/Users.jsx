import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const userList = []
  const map = new Map()
  for (const item of blogs) {
    if (!map.has(item.user.id)) {
      map.set(item.user.id, true)
      userList.push({
        id: item.user.id,
        name: item.user.name,
      })
    }
  }

  const blogsPerUser = Object.entries(
    blogs.reduce((a, b) => {
      if (a[b.user.name]) {
        a[b.user.name] += 1
      } else {
        a[b.user.name] = 1
      }
      return a
    }, {})
  )

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {blogsPerUser.map((row) => {
            const user = userList.find((user) => user.name === row[0])
            return (
              <tr key={row[0]}>
                <td>
                  <Link to={`/users/${user.id}`}>{row[0]}</Link>
                </td>
                <td>{row[1]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
