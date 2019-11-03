import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { clearNotification } from "../state/action";
const Notification = () => {
  const [messages, setMessages] = useState([]);
  const notification = useSelector(state => state.notification, shallowEqual);
  const dispatch = useDispatch();
  useEffect(
    _ => {
      if (notification.message) {
        setMessages([...messages, notification]);
        dispatch(clearNotification());
      }
    },
    [notification]
  );
  const dismissAction = id => {
    const mess = messages.filter(m => m.id !== id);
    setMessages([...mess]);
  };
  return (
    <div className="App-notification-container">
      {messages.map(m => (
        <Message key={m.id} {...m} onDismiss={dismissAction} />
      ))}
    </div>
  );
};

const Message = props => {
  if (props.timeout) {
    setTimeout(() => {
      props.onDismiss(props.id);
    }, props.timeout);
  }
  return (
    <div className="App-notification">
      {props.message && (
        <>
          <h4 style={{ flex: 5, marginLeft: "10px" }}>{props.message}</h4>
          <a
            style={{ margin: "auto", marginRight: "10px" }}
            onClick={e => props.onDismiss(props.id)}
          >
            {props.actionText || "dismiss"}
          </a>
        </>
      )}
    </div>
  );
};
export default Notification;
