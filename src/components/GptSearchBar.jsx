import {} from 'react' 
import {useSelector} from 'react-redux'
import lang from '../utils/languageConstant'

function GptSearchBar() {
    const langKey=useSelector((store)=>store.config?.lang)

    
  return (<>
  <div className='relative z-10 pt-[10%] flex justify-center'>
        <form className='p-4 bg-black grid grid-cols-12 w-[45%]'>
            <input type="text" className='px-6   col-span-9 bg-white' placeholder={lang[langKey].searchPlaceholder}/>
            <button className='py-2  cursor-pointer ml-4 bg-red-600 col-span-3 text-white rounded-lg' type="submit">{lang[langKey].search}</button>
        </form>
        
    </div>
    <div className='fixed h-screen w-full top-0 -z-30'>
    <img alt='bg'src='https://assets.nflxext.com/ffe/siteui/vlv3/7a8c0067-a424-4e04-85f8-9e25a49a86ed/web/IN-en-20250120-TRIFECTA-perspective_860a95da-c386-446e-af83-fef8ddd80803_large.jpg'>
    </img>
</div>
<div className='bg-black absolute top-0 z-1 h-screen w-full opacity-30'>

</div>
  </>
    
  )
}

export default GptSearchBar
