
//@ts-ignore
import { useChatUser } from '../../states/chatUserState'
import {z} from 'zod' 
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { socket } from '../../services/socket'



import sendIcon from '../../assets/sendIcon.png'


export default function Footer(){
    const idChatRom = useChatUser(state => state.idChatRom)

    const Schema = z.object({
        message : z.string().or(z.number())
    })
    type MessageData = z.infer<typeof Schema>

    const {register , handleSubmit, reset } = useForm<MessageData>({
        mode: 'onBlur',
        resolver : zodResolver(Schema)
    })

    const handleMessage = async (data:MessageData) =>{
        socket.emit('message', {
            message:data.message , 
            idChatRom,
        })
        reset()
    }

   

    return(
            <form onSubmit={handleSubmit(handleMessage)} className="w-full h-16 pl-2 flex justify-center items-center">
                  <input 
                  {...register('message',)}
                           className="w-full h-10 px-4 bg-transparent rounded-md outline-none border-0.5 border-gray-400 text-white" type="text" 
                           placeholder="Digite sua mensagem"
                           />
                           <button
                           type='submit'
                           className="ml-10 w-20 h-10 bg-primary rounded-md flex justify-center items-center">
                            <img src={sendIcon}/>
                           </button>
            </form>
    )
}