import { io } from "socket.io-client";





const socket =   io('https://back-end-chat-socket.vercel.app')


export {socket}