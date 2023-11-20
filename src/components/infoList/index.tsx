import { useState, useEffect } from "react"
import { useChatUser } from "../../states/chatUserState"
import { socket } from "../../services/socket"

import addFriends from '../../assets/addFriends.svg'
import { ModalOfAddUser } from "../Modals/ModalOfAddUser"



export type DataType = {
    name: string,
    email: string,
    photo: string,
    socketId: string,
    _id: string

}

type ChatItem = {
    idChatRom: string,
    idUsers: string,
    _id: string,
}

type MessageItem = {

    text: string,
    photo: string

}

export type ChatRomType = {
    getChatRomExist: ChatItem,
    newChat : ChatItem,
    idChatRom: string,
    messageAll: MessageItem[]
}
// type useList = DataType[]


export default function InfoList() {
    const loggedUser = JSON.parse(localStorage.getItem('logged') ?? '')
    const setUserSelected = useChatUser(state => state.setUserInfo)
    const setIdChatRom = useChatUser(state => state.setIdChatRom)
    const setAllMessages = useChatUser(state => state.setAllMessages)
    const setUserProfile = useChatUser(state => state.setUserProfile)
    const [users, setUsers] = useState<DataType[]>([])
    const[modalUser , setModalUser] = useState(false)


    useEffect(() => {
        socket.emit('getUser', { email: loggedUser.email })
    }, [])

 

    socket.on('allChats', data => {
 console.log('dados', data)

        const arrayOfChats = [].concat.apply([], data)

        let aux: DataType[] = []
        arrayOfChats.map((item: DataType) => {
            if (item.email !== loggedUser.email &&  !aux.some(alexist => alexist.name == item.name)) {
                aux.unshift(item)
            }
            setUsers( aux)
        })

    })



    const sendUserForChat = (item: DataType) => {
        setAllMessages([])
        socket.emit("start_chat", {
            socketId: socket.id,
            userId: item._id
        }, (data: ChatRomType) => {
            if(data.getChatRomExist){
                setIdChatRom(data.getChatRomExist.idChatRom)
            }else{
                setIdChatRom(data.idChatRom)
            }
            console.log('data', data)
            setAllMessages(data.messageAll)

        })
        setUserSelected({ name: item.name, photo: item.photo })
    }

 
    return (

        <>
            {modalUser && <ModalOfAddUser setModalUser={setModalUser} />}

            <div className="w-full h-screen  ">

                <div className=" w-full flex gap-3 mt-5 items-center justify-center border-b-0.5 pb-5 border-b-gray-400 " >
                    <input
                        className="w-10/12  h-10 p-5  rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Pesquisar"
                    />
                    <img
                        onClick={() => setModalUser(true)}
                        className="w-8 cursor-pointer  "
                        src={addFriends} />
                </div>

                {users?.map(item => {
                    return (
                        <div>
                            <div
                                onClick={() => sendUserForChat(item)}
                                className="w-full ml-1 mr-1 h-20 flex items-center bg-white border-b-0.5 bobder-b-gray-400 cursor-pointer px-4">
                                <img
                                    src={item.photo}
                                    className="w-10 h-10 rounded-full"
                                />
                                <h1 className="ml-5">{item.name}</h1>
                                {/* 
                     <div className="w-full h-16 flex justify-end items-center bg-white ">
                       
                        <div className=" w-10 h-10 bg-primary rounded-full flex justify-center items-center">
                            <h1 className="text-white font-bold">15</h1>
                        </div>
                 </div> */}


                            </div>
                        </div>
                    )
                })}

                <div>
                    <div
                     onClick={() => setUserProfile(true)}
                        className=" absolute bottom-0 flex items-center gap-5  bg-white border-b-0.5 bobder-b-gray-400 cursor-pointer px-4">
                        <img
                            src={loggedUser.photo}
                            className="w-10 h-10 rounded-full"
                        />
                        <h1 className="ml-5">{loggedUser.name}</h1>


                    </div>
                </div>
            </div>

        </>

    )
}