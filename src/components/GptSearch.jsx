import GptMovieSuggestion from "./GptMovieSuggestion"
import GptSearchBar from "./GptSearchBar"

function GptSearch() {
  return ( 
    <div className=''>
       <GptSearchBar/>
       <GptMovieSuggestion/>
    </div>
  )
}

export default GptSearch
