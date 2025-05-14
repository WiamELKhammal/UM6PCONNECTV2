import { io } from "socket.io-client";

const SOCKET_URL = "https://um6pconnectv2-production.up.railway.app"; // Change to your backend URL
const socket = io(SOCKET_URL, { transports: ["websocket"] });

export default socket;
