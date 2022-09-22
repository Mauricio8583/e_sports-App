import axios from 'axios';
import { FormEvent } from 'react'
import {InputField} from '../components/form/input'
import {useNavigate, Link} from 'react-router-dom'

export const Register = () => {

    const navigate = useNavigate()

    const handleCreateUser = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if(!data.username || !data.password || !data.email){
            alert("Nao deixe nenhum campo em branco!!")
        }

        try{
            await axios.post("http://localhost:3000/register", {
                username: data.username,
                password: data.password,
                email: data.email
            })
            alert("Usuario Criado com sucesso!");
            navigate("/login")

        }catch(err){
            alert("Ocorreu um erro");
            console.log(err)
        }
    }

    return (

        <div className="max-w-[400px] max-h-[400px] mx-auto flex flex-col items-center my-[220px] p-6 text-white">
            <h1 className='text-white text-2xl'>Cadastre-se</h1>
            <form onSubmit={handleCreateUser} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                <label htmlFor='username' className='text-white'>Username</label>
                <InputField type="text" name='username' id='username' placeholder='Seu nome de usuario' className='p-3 m-3' />
                </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='text-white'>Password</label>
                <InputField type="password" name='password' id='password' placeholder='Sua senha' className='p-3 m-3' />
                </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-white'>E-mail</label>
                <InputField type="text" name='email' id='email' placeholder='Seu E-mail' className='p-3 m-3' />
                </div>
                <div className='flex flex-col gap-2'>
                <button type='submit' className='p-3 m-3 min-w-full bg-violet-500 px-8 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>Cadastrar</button>
                </div>
            </form> 
            <div className='p-8 w-[300px] text-white ml-7'>
                <Link to="/login">
                 <button className='bg-gray-600 min-w-full rounded-md font-semibold h-12 hover:bg-slate-700'>Login</button>                
                </Link>
            </div>           
        </div>
    )
}