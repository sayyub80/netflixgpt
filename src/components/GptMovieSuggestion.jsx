import {} from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

function GptMovieSuggestion() {
  const {gptSearchMovieResults,tmdSearchbMovieResults}=useSelector((store)=>store.gpt)
  if(!gptSearchMovieResults) return null;

  return (
    <div className='relative z-20 bg-black mt-10'>
       {gptSearchMovieResults.map((movieName,index)=>(
         <MovieList 
         key={movieName}
         title={movieName}
         movies={tmdSearchbMovieResults[index]}
         />
       ))}
    </div>
  )
}

export default GptMovieSuggestion
