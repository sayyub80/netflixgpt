
import {useSelector} from 'react-redux'
import useMovieTrailor from '../hooks/useMovieTrailor';

const VideoBackground = ( {movieId}) => {
  
  const trailorVideo=useSelector(store=>store.movies?.trailorVideo)
  useMovieTrailor(movieId)

  return (
    <div className="w-scre  md:-mt-5 overflow-hidden">
      <iframe
        className="w-[100vw] aspect-video"
        src={"https://www.youtube.com/embed/"+trailorVideo?.key+"?autoplay=1&loop=1&mute=1&autohide=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

