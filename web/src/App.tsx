import {useEffect, useState} from 'react'
import './styles/main.css'
import logoImg from '../assets/Logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import { InputField } from './components/form/input'

interface GameProps{
  id: string,
  title: string,
  bannerURL: string,
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/games").then(res => res.json()).then(data => {
      setGames(data)
    })
  }, [])

   return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
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

         <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-x-1/2 rounded-lg w-[480px]'>
            <Dialog.Title className='text-3xl font-black'>Publique um Anuncio</Dialog.Title>

            
              <form className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='game' className='font-semibold'>Qual o Game</label>
                  <InputField id='game' placeholder='Selecione o game que deseja jogar'/>                
                </div> 

                <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>Seu nome (ou nickname)</label>
                  <InputField id='name' type='text' placeholder='Como te chamam no game'/>                  
                </div>   
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='yearPlaying'>Joga ha quanto tempo</label>
                    <InputField id='yearsPlaying' type='number' placeholder='Tudo bem ser Zero' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='discord'>Discord</label>
                    <InputField id='discord' type='text' placeholder='Usuario#0000' />                  
                  </div>                  
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col gap-2' >
                    <label htmlFor='weekDays'>Quantos dias voce joga</label>
                    <div className='flex gap-1'>
                      <button title='Domingo' className='w-8 h-8 rounded bg-zinc-900'>D</button>
                      <button title='Segunda' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                      <button title='Terça' className='w-8 h-8 rounded bg-zinc-900'>T</button>
                      <button title='Quarta' className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                      <button title='Quinta' className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                      <button title='Sexta' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                      <button title='Sabado' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor='hourStart'>Que horas voce começa a jogar</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <InputField id='hourStart' type='time' placeholder='De' />
                      <InputField id='hourEnd' type='time' placeholder='Ate' />                      
                    </div>                    
                  </div>                  
                </div>

                <div className='mt-2 flex gap-2 text-sm'>
                  <input type='checkbox' />
                  Costumo me conectar ao chat de box                  
                </div>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                  <button type='submit' className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'><GameController size={24}/>Encontrar duo</button>                  
                </footer>                            
              </form>
            
          </Dialog.Content> 

          </Dialog.Portal>       
       </Dialog.Root>    

    </div>
    
   )  
}

export default App
