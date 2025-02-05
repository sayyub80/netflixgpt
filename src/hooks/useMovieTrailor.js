import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { addTrailorVideo } from "../utils/moviesSlice";


const useMovieTrailor=(movieId)=>{
  const dispatch=useDispatch()
  //fetch the trailor ,we need movie id
  const getMovieVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();
    console.log(data);
    const filterData = data.results.filter((video) => video.type == "Trailer");
    const trailor = filterData.length ? filterData[0] : data.results[0];
    dispatch(addTrailorVideo(trailor))
  };
  useEffect(() => {
    getMovieVideo();
  }, []);
}

export default useMovieTrailor