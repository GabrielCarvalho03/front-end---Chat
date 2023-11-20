import { useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {Link} from 'react-router-dom'
import Chat from '../../page/chat'
import { socket } from '../../services/socket'
import Swal from 'sweetalert2'

export default function Register() {
    const[logged , setLogged] = useState(false)
    

    const Schema = z.object({
        name: z.string().min(3, 'Mínino 3 caracteres'),
        userName: z.string().min(3, 'Mínino 3 caracteres'),
        email: z.string().email( 'insira um email válido'),
        photo: z.string().url('Por favor , informe uma url válida'),
        password: z.string().min(6,'Mínino 6 caracteres')
    })
    type DateSchema = z.infer<typeof Schema>

    const { register, handleSubmit, formState: { errors } } = useForm<DateSchema>({
        mode: 'all',
        resolver: zodResolver(Schema)
    })

    const saveInfoUser = async (data: DateSchema) => {
        socket?.emit('userRegister',{
          name: data.name, 
          userName: data.userName,
          email: data.email ,
          photo: data.photo,
          socketId: socket.id,
          password: data.password
        }, (data: any) =>{
           if(data.EmailExistErro)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data.EmailExistErro,
              timer: 1500
            });
            console.log(data)
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
                        {...register('userName')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Nome de usuário"
                    />
                    <p className='text-red-400'>{errors.userName?.message}</p>

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

                    <input
                        {...register('password')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="password"
                        placeholder="Senha"
                    />
                    <p className='text-red-400'>{errors.password?.message}</p>

                    <Link
                      to={'/'}
                     className=' mt-10 text-primary cursor-pointer '>Login
                     </Link> 

                    <div className="w-11/12 flex justify-center mt-10 ">
                        <button type='submit' className="w-6/12 bg-primary h-10 rounded-sm">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
        }
        </>
    )
}