import {MagnifyingGlassPlus} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'


export const CreateAdBanner = () => {
    return (
        <div className='pt-1 bg-gradient-style self-stretch mt-8 rounded-lg overflow-hidden'>
         <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Nao encontrou seu duo?</strong>
            <span className='text-zinc-400'>Publique um anuncio para encontrar novos players</span>
            
          </div>
          

          <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anuncio
           </Dialog.Trigger>
         </div>
      </div>
    )
}