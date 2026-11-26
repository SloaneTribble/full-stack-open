const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const notificationClass = "notification";
  const successClass = "success";
  const errorClass = "error";

  const statusClass =
    notification.type === "success" ? successClass : errorClass;

  return (
    <div className={`${notificationClass} ${statusClass}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
