import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  const notification = notificationState.content
  const style = notificationState.style

  return (
    <div className='notification-bar' style={style}>
      {/* {notification} */}
	  <Alert variant="primary">
		{notification}
	  </Alert>
    </div>
  )
}

export default Notification