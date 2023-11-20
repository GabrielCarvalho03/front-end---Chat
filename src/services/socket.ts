import { io } from "socket.io-client";





const socket =   io('https://back-end-chat-socket-production.up.railway.app')

// const socket = io('http://localhost:3000')
export {socket}