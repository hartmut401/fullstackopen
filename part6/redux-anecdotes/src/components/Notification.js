import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  return <div style={notification.style}>{notification.content}</div>
}

export default Notification
