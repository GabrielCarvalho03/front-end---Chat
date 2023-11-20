
import { useState } from 'react'
import Modal from 'react-modal'
import sendIcon from '../../assets/sendIcon.png'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { socket } from '../../services/socket'
import { ChatRomType, DataType } from '../infoList'


import messaIcon from '../../assets/messageIcon.svg'
import { useChatUser } from '../../states/chatUserState'

type ModalProps = {
    setModalUser: (item: boolean) => void,
}

export const ModalOfAddUser = ({ setModalUser, }: ModalProps) => {

    // const loggedUser = JSON.parse(localStorage.getItem('logged') ?? '')
    const setUserSelected = useChatUser(state => state.setUserInfo)
    const setIdChatRom = useChatUser(state => state.setIdChatRom)
    const setAllMessages = useChatUser(state => state.setAllMessages)

    const [allUser, setAllUser] = useState<DataType[]>([])
    const Schema = z.object({
        search: z.string()
    })

    type DataSchema = z.infer<typeof Schema>

    const { register, handleSubmit,  } = useForm<DataSchema>({
        mode: 'all',
        resolver: zodResolver(Schema)
    })


    const customStyles = {
        content: {
            width: '45%',
            height: 'auto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };
    const sendUserForChat = (item: DataType) => {
        setAllMessages([])
        socket.emit("start_chat", {
            socketId: socket.id,
            userId: item._id
        }, (data :ChatRomType) => {
            if(data.getChatRomExist){
                setIdChatRom(data.getChatRomExist.idChatRom)
            }else{
                setIdChatRom(data.idChatRom)
            }
            setAllMessages(data.messageAll)

        })
        setUserSelected({ name: item.name, photo: item.photo })
        setModalUser(false)
    }


    const searchUser = (data: DataSchema) => {
        socket.emit('searchUsers', {
            name: data.search
        }, (data: DataType[]) => {
            setAllUser(data)
        })
    }
    return (
        <Modal
            style={customStyles}
            isOpen={true}
            onRequestClose={() => setModalUser(false)}
        >

            <div className='w-full flex flex-col  items-center'>
                <h1 className='text-2xl font-semibold'>Adicionar Usuarios</h1>

                <form
                    onSubmit={handleSubmit(searchUser)}
                    className='w-8/12 mt-5 flex items-center'>
                    <input
                        {...register('search')}
                        className="w-full  h-10 p-5  rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Pesquisar por nome"
                    />
                        
                     
                    <button
                        type='submit'
                        className="ml-10 w-20 h-10 bg-primary rounded-md flex justify-center items-center">
                        <img src={sendIcon} />
                    </button>
                </form>

                {allUser?.map(item => {
                    return (
                        <div
                        onClick={() => sendUserForChat(item)}
                            className="w-full ml-1 mr-1 h-20 flex items-center bg-white border-b-0.5 bobder-b-gray-400  px-4">
                            <div className='w-full flex items-center'>
                                <img
                                    src={item.photo}
                                    className="w-10 h-10 rounded-full"
                                />
                                <h1 className="ml-5">{item.name}</h1>

                            </div>

                            <div>
                            <button
                        type='submit'
                        className="ml-10 w-20 h-10 bg-primary rounded-md flex justify-center items-center">
                        <img src={sendIcon} />
                    </button>
                            </div>


                        </div>
                    )
                })}
            </div>
            {!allUser.length && 
            <div className='w-full flex flex-col  items-center mt-5'>
                <h3 className=' text-gray-600'>procure um usuário que deseja adicionar</h3>
            </div>
                        }
        </Modal>
    )
}