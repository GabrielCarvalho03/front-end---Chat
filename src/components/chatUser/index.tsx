
import { socket } from "../../services/socket";
import Footer from "./footer";
import Header from "./hearder";
import { allMessagesProps, useChatUser } from "../../states/chatUserState";






export default function ChatUser() {
   const allMessages: allMessagesProps[] = useChatUser(state => state.allMessages)
   const setAllMessages = useChatUser(state => state.setAllMessages)
   const socketLocalLoged = JSON.parse(localStorage.getItem("logged") ?? '')

   socket.on('message', (data) => {
    
      setAllMessages(data.messageAll)
   })






   return (
      < >
         <Header />
         <div style={{ height: "80%" }} className="w-full   bg-gray-800  overflow-y-auto ">
            {allMessages?.map(item => {
               return (
                  <div className={`${item.to?.email == socketLocalLoged.email ? 'flex my-10 gap-5 items-center justify-end  mr-2 ' : ' bg- flex my-10 gap-5 items-center '}`}>
                     <div className={ `w-24 h-auto ${item.to?.socketId == socketLocalLoged.socketId ?'bg-blue-500' : 'bg-slate-900'} rounded-sm px-2` }>
                     <p className={` text-white text-base`}>{item.text}</p>
                     </div>
                  </div>
               )
            })}

            <div className="  bg-gray-800 right-20 w-8/12  absolute bottom-0  flex items-center gap-5 " >
               <Footer />
            </div>
         </div>
      </>
   )
}