import classes from "./Notification.module.css";

const Notification = (properties) => {
    return (
        <div className={classes.NotificationContainer}>
            {properties.children}
        </div>
    )
}

export default Notification;