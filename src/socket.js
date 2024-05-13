import { io } from "socket.io-client";
import { getToken } from "./utils";

let socket;

export const connectSocket = () => {
  const token = getToken();
  socket = io(process.env.REACT_APP_SERVER, {
    auth: { token },
  });
};

export { socket };
