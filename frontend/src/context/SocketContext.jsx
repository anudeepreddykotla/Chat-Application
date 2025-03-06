import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {  // Ensure user and user._id exist
            const newSocket = io.connect("http://localhost:8000", {
                query: { userId: user.id }
            });

            setSocket((prev) => {
                if (prev) prev.disconnect(); // Disconnect previous socket
                return newSocket;
            });

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                if (newSocket) {
                    newSocket.disconnect(); // Properly disconnect
                    setSocket(null);
                }
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
export default SocketContextProvider;
