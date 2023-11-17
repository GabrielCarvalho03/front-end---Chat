import { io } from "socket.io-client";





const socket =   io('https://back-end-chat-socket-production.up.railway.app')


export {socket}