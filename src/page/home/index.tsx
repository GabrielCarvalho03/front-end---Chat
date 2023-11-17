import { useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Chat from '../chat'
import { socket } from '../../services/socket'

export default function Home() {
    const[logged , setLogged] = useState(false)
    

    const Schema = z.object({
        name: z.string().min(3, 'Mínino 3 caracteres'),
        email: z.string().min(3, 'Mínino 3 caracteres'),
        photo: z.string().url('Por favor , informe uma url válida')
    })
    type DateSchema = z.infer<typeof Schema>

    const { register, handleSubmit, formState: { errors } } = useForm<DateSchema>({
        mode: 'onBlur',
        resolver: zodResolver(Schema)
    })

     console.log(socket)
    const saveInfoUser = async (data: DateSchema) => {
        socket?.emit('user',{
          name: data.name, 
          email: data.email ,
          photo: data.photo,
          socketId: socket.id
        })

    }
    socket.on('logged', (data) => {
       if(data.logged){
        localStorage.setItem('logged', JSON.stringify(data))
        setLogged(true)
       }
       
      });

   
    return (
        <>
        {logged ?<Chat /> :
        
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 ">

            <div className="w-5/12 h-auto pb-10 bg-white ">
                <form onSubmit={handleSubmit(saveInfoUser)} className="w-full mt-10 flex flex-col  items-center">
                    <h1 className="font-bold text-lg">Registrar</h1>

                    <input
                        {...register('name')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Nome"
                    />
                    <p className='text-red-400'>{errors.name?.message}</p>


                    <input
                        {...register('email')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Email"
                    />
                    <p className='text-red-400'>{errors.email?.message}</p>
                    <input
                        {...register('photo')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Link photo"
                    />
                    <p className='text-red-400'>{errors.photo?.message}</p>
                    <div className="w-11/12 flex justify-center mt-10 ">
                        <button type='submit' className="w-6/12 bg-primary h-10 rounded-sm">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        }
        </>
    )
}