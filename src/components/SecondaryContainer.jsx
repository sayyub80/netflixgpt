import MovieList from "./MovieList"
import  {useSelector} from "react-redux"


function SecondaryContainer() {
  const nowmovies= useSelector((store) => store.movies?.nowPlayingMovies)
  const popularMovies=useSelector((store)=>store.movies?.popularMovies)
  const topRatedMovies=useSelector((store)=>store.movies?.topRatedMovies)
  const upcomingMovies=useSelector((store)=>store.movies?.upcomingMovies)
  if(!nowmovies || !popularMovies ||!topRatedMovies ||!upcomingMovies) return null;
 
    
  return (
    <div className='bg-black w-[100vw] pb-20'>
       {/* MovieList-Popular */}
       <div className='-mt-40 relative'>
        <MovieList movies={nowmovies} title="Now Playing"/>
       <MovieList movies={topRatedMovies} title="Top Rated"/>
       <MovieList movies={popularMovies} title="Popular"/>
       <MovieList movies={upcomingMovies} title="Upcoming"/>
       </div>
       

       {/* MovieList-Now Playing */}
       {/* MovieList-Trending */}

       {/* MovieList-Horror */}


    </div>
  )
}

export default SecondaryContainer
