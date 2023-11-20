
import {createBrowserRouter} from 'react-router-dom'
import Register from '../components/register'
import Home from '../page/home'



const router = createBrowserRouter([
    {
        path:'/', 
        element: <Home/>
    },
    {
        path:'register', 
        element: <Register/>
    }, 
  
])


export default router