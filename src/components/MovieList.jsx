/* eslint-disable react/prop-types */

import MovieCard from './MovieCard'

function MovieList({title,movies}) {

  return (
    <div className='md:py-6 pt-1 md:pt-0 md:px-20  px-3'> 
     <h1 className='text-xl md:text-3xl font-semibold my-4 md:mb-5 text-white'>{title}</h1>
     <div className='flex overflow-x-auto  no-scrollbar '>
     <div className="flex  ">
     {movies?.map((movie)=>(<MovieCard key={movie.id} posterPath={movie.poster_path}/>))}
    </div>
    </div>
    </div>
  
    
   
  )
}

export default MovieList
