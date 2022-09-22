import {FormEvent, useEffect, useState} from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { InputField } from './form/input'
import { ArrowDown, Check, GameController } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { RootStateOrAny } from 'react-redux'


interface GameProps{
  id: string,
  title: string  
}

export const CreateAdModal = () => {

  const [games, setGames] = useState<GameProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const currentUser = useSelector<RootStateOrAny, object>((state) => state.user.currentUser)

  const handleCreateAd = async (e: FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name || !data.yearsPlaying || !data.discord || !data.hourStart || !data.hourEnd){
      alert("Nao deixe nenhum campo em branco")
    }

    try{
      await axios.post(`http://localhost:3000/games/${data.game}/ads/${currentUser.id}`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoiceChannel

    })    
     alert("Anuncio Criado com sucesso!!")
          
    }catch(err){
      console.log(err)
    }

  }

  useEffect(() => {
    axios("http://localhost:3000/games").then(res => {
      setGames(res.data)
    })
  }, [])
  
    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-10 left-1/2 -translate-x-1/2 -translate-x-1/2 rounded-lg w-[480px]'>
            <Dialog.Title className='text-3xl font-black'>Publique um Anuncio</Dialog.Title>

            
              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <Select.Root name='game'>
                    <Select.Trigger className='bg-zinc-900 px-3 py-4 rounded text-sm placeholder:text-zinc-500 flex justify-between'>
                        <Select.Value placeholder="Qual Jogo voce joga" />
                        <Select.Icon ><ArrowDown /></Select.Icon>
                     </Select.Trigger> 

                     <Select.Portal>
                        <Select.Content className='bg-zinc-900 px-3 py-4 rounded text-sm placeholder:text-zinc-500'>
                            <Select.ScrollUpButton />
                            <Select.Viewport>
                            
                              {games.map(game => {
                                return (
                                  <Select.Group key={game.id}> 
                                   <Select.Label />
                                <Select.Item value={game.id} className='text-white hover:bg-violet-700'>
                                    <Select.ItemText >{game.title}</Select.ItemText>
                                    <Select.ItemIndicator />
                                </Select.Item>
                                </Select.Group>                                 
                                )
                              })}
                              
                                
                                
                            
                            </Select.Viewport>
                        </Select.Content>
                        </Select.Portal>                   
                   </Select.Root>                
                </div> 

                <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>Seu nome (ou nickname)</label>
                  <InputField name='name' id='name' type='text' placeholder='Como te chamam no game'/>                  
                </div>   
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='yearPlaying'>Joga ha quanto tempo</label>
                    <InputField name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser Zero' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='discord'>Discord</label>
                    <InputField name='discord' id='discord' type='text' placeholder='Usuario#0000' />                  
                  </div>                  
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col gap-2' >
                    <label htmlFor='weekDays'>Quantos dias voce joga</label>
                    <ToggleGroup.Root type='multiple' className='flex gap-1' value={weekDays} onValueChange={setWeekDays}>
                      <ToggleGroup.Item value='0' title='Domingo' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : ''}`}>D</ToggleGroup.Item>
                      <ToggleGroup.Item value='1' title='Segunda' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' : ''}`}>S</ToggleGroup.Item>
                      <ToggleGroup.Item value='2' title='Terça' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' : ''}`}>T</ToggleGroup.Item>
                      <ToggleGroup.Item value='3' title='Quarta' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' : ''}`}>Q</ToggleGroup.Item>
                      <ToggleGroup.Item value='4' title='Quinta' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' : ''}`}>Q</ToggleGroup.Item>
                      <ToggleGroup.Item value='5' title='Sexta' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' : ''}`}>S</ToggleGroup.Item>
                      <ToggleGroup.Item value='6' title='Sabado' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' : ''}`}>S</ToggleGroup.Item>
                      </ToggleGroup.Root>
                    
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor='hourStart'>Que horas voce começa a jogar</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <InputField name='hourStart' id='hourStart' type='time' placeholder='De' />
                      <InputField name='hourEnd' id='hourEnd' type='time' placeholder='Ate' />                      
                    </div>                    
                  </div>                  
                </div>

                <label className='mt-2 flex gap-2 text-sm'>
                  <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900' checked={useVoiceChannel} onCheckedChange={(checked) => {
                    if(checked === true){
                      setUseVoiceChannel(true)
                    } else{
                      setUseVoiceChannel(false)
                    }
                  }}>
                    <Checkbox.Indicator >
                        <Check className='w-4 h-4 text-emerald-400' />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de box                  
                </label>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                  <button type='submit' className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'><GameController size={24}/>Encontrar duo</button>                  
                </footer>                            
              </form>
            
          </Dialog.Content> 

          </Dialog.Portal>    
    )
}