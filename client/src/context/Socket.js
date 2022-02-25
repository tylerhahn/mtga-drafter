import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://137.184.226.12:8000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
