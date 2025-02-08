import {useRef} from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import lang from '../utils/languageConstant'
import model from '../utils/geminiAI';
import { API_OPTIONS } from '../utils/constants';
import { addGptSearchMovieResult } from '../utils/gptSlice';

function GptSearchBar() {
    const langKey=useSelector((store)=>store.config?.lang)
    const searchText=useRef(null);
    const dispatch=useDispatch()

    //search in tmdb
    const searchMovieTMDB = async (movie) => {
      const response = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=true&language=en-US&page=1",API_OPTIONS)
      const data = await response.json()
      return data.results
    }
    //gpt serach
        const handleGptSearchButton= async()=>{
          //Make an api call to Gemini api and get movies rsults
          const prompt="Act as a Movie Recommendation system and suggest some movies for the query"+searchText.current.value+". Only give me names of 5 best suitable movies,comma seperated like the example result given aheak.Example Results:Gadar,Sholay,Don,Golmal,Koi Mil gaya"
        
          const result = await model.generateContent([prompt]);
          const gptMovieResults=result.response.text().split(',');
           //search in tmdb
          const promisArray= gptMovieResults.map((movie) => searchMovieTMDB(movie))  // we got arr of promise
          const tmdbResults=await Promise.all(promisArray)  // it will wait till all proises resolve
          console.log(tmdbResults);
          dispatch(addGptSearchMovieResult({gptSearchMovieResults:gptMovieResults,tmdSearchbMovieResults:tmdbResults}))
        };
    
  return (<>
  <div className='relative z-10 pt-[10%] flex justify-center'>
        <form onSubmit={(e)=>e.preventDefault()} className='p-4 bg-black grid grid-cols-12 w-[45%]'>
            <input ref={searchText} type="text" className='px-6   col-span-9 bg-white' placeholder={lang[langKey].searchPlaceholder}/>
            <button onClick={handleGptSearchButton} className='py-2  cursor-pointer ml-4 bg-red-600 col-span-3 text-white rounded-lg' type="submit">{lang[langKey].search}</button>
        </form>
        
    </div>
    <div className='fixed h-screen w-full top-0 -z-30'>
    <img alt='bg'src='https://assets.nflxext.com/ffe/siteui/vlv3/7a8c0067-a424-4e04-85f8-9e25a49a86ed/web/IN-en-20250120-TRIFECTA-perspective_860a95da-c386-446e-af83-fef8ddd80803_large.jpg'>
    </img>
</div>

  </>
    
  )
}

export default GptSearchBar
