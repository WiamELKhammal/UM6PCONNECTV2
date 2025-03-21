import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Change to your backend URL
const socket = io(SOCKET_URL, { transports: ["websocket"] });

export default socket;
