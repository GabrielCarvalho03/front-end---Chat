







import { useEffect, useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {Link} from 'react-router-dom'
import Chat from '../chat'
import ReactLoading from 'react-loading';
import { socket } from '../../services/socket'

export default function Home() {
    const [Loading, setLoading] = useState(false)
    const[logged , setLogged] = useState(false)
    const[erroMessageUser, setErroMessageUser] = useState('')
    

    const Schema = z.object({
        email: z.string().min(3, 'Mínino 3 caracteres'),
        password: z.string().min(3, 'Mínino 3 caracteres')
    })
    type DateSchema = z.infer<typeof Schema>

    const { register, handleSubmit, formState: { errors } } = useForm<DateSchema>({
        mode: 'onBlur',
        resolver: zodResolver(Schema)
    })

  useEffect(() =>{
      
      if(localStorage.getItem('logged')){
        const logged = JSON.parse(localStorage.getItem('logged')?? '')
        setLoading(true)
    
        socket.emit('UserLoged', {
            email:logged?.email
        })
    }
  },[])


    const saveInfoUser = async (data: DateSchema) => {
        socket.emit('userLogin',{
          email: data.email ,
          password: data.password,
          socketId: socket.id
        }, (data: any) => {
            if(data.erro){
                setErroMessageUser(data.erro)
            }
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

           {Loading ?
           <>
             <ReactLoading type='bars'  color='#fff' height={'5%'} width={'5%'}/>
           </>
           : <div className="w-5/12 h-auto pb-10 bg-white ">
                <form onSubmit={handleSubmit(saveInfoUser)} className="w-full mt-10 flex flex-col  items-center">
                    <h1 className="font-bold text-lg">Login</h1>

                    <input
                        {...register('email')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Email"
                    />
                  <p className='text-red-400'>{errors.email?.message}</p>
                  <input
                        {...register('password')}
                        className="w-11/12  h-10 p-5  mt-10 rounded-md outline-none border-0.5 border-gray-400" type="text"
                        placeholder="Senha"
                    />
                    <p className='text-red-400'>{errors.password?.message}</p>
                    <p className='text-red-400'>{erroMessageUser}</p>
                    <span className='mt-10' >Não tem uma conta ?  
                      <Link 
                      to={'/register'}
                     className='text-primary cursor-pointer '>Registre-se 
                     </Link> 
                    </span>
                    <div className="w-11/12 flex justify-center mt-10 ">
                        <button type='submit' className="w-6/12 bg-primary h-10 rounded-sm">Enviar</button>
                    </div>
                </form>
            </div>}
        </div>
        }
        </>
    )
}