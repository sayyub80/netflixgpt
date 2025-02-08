
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

const useTopRatedMovies =()=>{
    const dispatch=useDispatch()
    const topRatedMovies  =useSelector((store)=>store.movies.topRatedMovies);


const getTopRatedMovies = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
         API_OPTIONS);
        const data = await response.json();
        dispatch(addTopRatedMovies(data.results))
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
    }
  } 
  useEffect(()=>{
   !topRatedMovies&& getTopRatedMovies()
  },[])
}

export default useTopRatedMovies