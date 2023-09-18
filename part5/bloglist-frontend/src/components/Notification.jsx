const Notification = ({ message, changeClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={changeClass}>
      {message}
    </div>
  )
}

export default Notification