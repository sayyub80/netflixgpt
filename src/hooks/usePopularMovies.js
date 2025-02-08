import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const usePopularMovies =()=>{
    const dispatch=useDispatch()
    const popularMovies=useSelector((store)=>store.movies.popularMovies);


const getPopularMovies = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
         API_OPTIONS);
        const data = await response.json();
        dispatch(addPopularMovies(data.results))
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
    }
  } 
  useEffect(()=>{
    !popularMovies && getPopularMovies()
  },[])
}

export default usePopularMovies