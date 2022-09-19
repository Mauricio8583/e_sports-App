import {InputField} from '../components/form/input'


export const Login = () => {
    return (
        <div className="max-w-[400px] max-h-[400px] mx-auto flex flex-col items-center my-[220px] p-6 text-white rounded-md">
            <h1 className='text-white text-2xl'>Login</h1>
            <form className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                <label htmlFor='username' className='text-white'>Username</label>
                <InputField type="text" name='username' id='username' placeholder='Seu nome de usuario' className='p-3 m-3' />
                </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='text-white'>Password</label>
                <InputField type="password" name='password' id='password' placeholder='Sua senha' className='p-3 m-3' />
                </div>
                <div className='flex flex-col gap-2'>
                <button type='submit' className='p-3 m-3 min-w-full bg-violet-500 px-8 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>Logar</button>
                </div>
            </form>
        </div>
    )
}