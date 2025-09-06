import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && (
        <div
          className={`alert alert-${notification.type} alert-dismissible fade show`}
          role="alert"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            left: 20,
            zIndex: 9999,
            minWidth: 250,
            maxWidth: "calc(100vw - 40px)",
            width: "auto",
            boxSizing: "border-box",
            padding: "0.75rem 1.25rem",
            fontSize: "1rem",
            borderRadius: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span style={{ wordBreak: "break-word", flex: 1 }}>{notification.message}</span>
          <button type="button" className="btn-close ms-2" onClick={() => setNotification(null)} style={{ fontSize: "1.5rem" }}></button>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
