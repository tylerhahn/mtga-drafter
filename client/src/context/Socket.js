import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // https://mtga-drafter-utdal.ondigitalocean.app/
  useEffect(() => {
    const newSocket = io(`http://localhost:8080`);
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
