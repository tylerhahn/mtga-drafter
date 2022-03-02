import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const localUrl = "http://localhost:8080";

  useEffect(() => {
    // const newSocket = io(`https://mtga-drafter-utdal.ondigitalocean.app/`);
    const newSocket = io(localUrl);

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
