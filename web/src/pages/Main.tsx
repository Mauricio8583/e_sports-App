import {useEffect, useState} from 'react'
import '../styles/main.css'
import logoImg from '../../assets/Logo.svg'
import { GameBanner } from '../components/GameBanner'
import { CreateAdBanner } from '../components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from '../components/CreateAdModal'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {loginOut} from '../redux/apiCalls'
import {useNavigate, Link} from 'react-router-dom'

interface GameProps{
    id: string,
    title: string,
    bannerURL: string,
    _count: {
      ads: number
    }
  }

export const Main = () => {

    const [games, setGames] = useState<GameProps[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
      loginOut(dispatch);
      navigate("/login");

    }

  useEffect(() => {
    axios("http://localhost:3000/games").then(res => {
      setGames(res.data)
    })
  }, [])

    return (
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
          <div className='text-white text-lg flex flex-row'>
            <button onClick={handleLogOut} className="mr-3">Log Out</button>
            <Link to="/register">
            <button>Cadastre-se</button>            
            </Link>
          </div>
      <img  src={logoImg} alt='' className='w-80 h-80' />

      <h1 className='text-6xl text-white font-black mt-10'>Seu <span className=' text-transparent bg-gradient-style bg-clip-text'>duo</span> esta aqui</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
      {games.map(game => {
          return (
            <GameBanner key={game.id} bannerURL={game.bannerURL} title={game.title} adsCount={game._count.ads} />
          )
        })}
      
      
              
      </div>

       <Dialog.Root>
         <CreateAdBanner />   

          <CreateAdModal />  
       </Dialog.Root>    

    </div>        
    )
}