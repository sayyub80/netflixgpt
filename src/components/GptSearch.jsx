import GptMovieSuggestion from "./GptMovieSuggestion"
import GptSearchBar from "./GptSearchBar"

function GptSearch() {
  return ( 
    <div className=''>
       <GptSearchBar/>
       <GptMovieSuggestion/>
       <div className='bg-black fixed top-0 z-1 h-screen w-full opacity-30'>

</div>
    </div>
  )
}

export default GptSearch




