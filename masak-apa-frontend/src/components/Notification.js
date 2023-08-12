import { useSelector } from "react-redux"

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  const notification = notificationState.content
  const style = notificationState.style

  return (
    <div className='notification-bar' style={style}>
      {notification}
    </div>
  )
}

export default Notification