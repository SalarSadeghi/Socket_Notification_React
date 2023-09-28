import { useEffect, useState } from "react";
import "./navbar.scss";

function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  const displayNotification = ({ senderName, type }) => {
    let action;
    switch (type) {
      case 1:
        action = "liked";
        break;
      case 2:
        action = "commented";
        break;
      case 3:
        action = "shared";
        break;
      default:
        break;
    }
    return (
      <>
        <span className="notification">{`${senderName} ${action} your post`}</span>
        <hr className="notificationHr"/>
      </>
    );
  };
  const handleMarkAsRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Salar App</span>
      <div className="icons">
        <div className="icon">
          <img
            src="/assets/images/notification.svg"
            alt=""
            className="iconImg"
            onClick={() => setOpen((old) => !old)}
          />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          <img
            src="/assets/images/message.svg"
            alt=""
            className="iconImg"
            onClick={() => setOpen((old) => !old)}
          />
          {/* <div className="counter">2</div> */}
        </div>
        <div className="icon">
          <img
            src="/assets/images/settings.svg"
            alt=""
            className="iconImg"
            onClick={() => setOpen((old) => !old)}
          />
          {/* <div className="counter">2</div> */}
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          {notifications.length > 0 && (
            <button className="nBtn" onClick={handleMarkAsRead}>
              Mark as read
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
