import  {useSelector} from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

function MainContainer() {
  const movies= useSelector((store) => store.movies?.nowPlayingMovies)
  if(!movies) return (<div className='flex justify-center items-center w-screen h-screen'> <p>To see the content of this site :Go to Settings- Privacy and Security- security-Select dns to Cloadflare(1.1.1.1)</p></div>
   
  )

  const mainMovie=movies[0]
  const {title,overview,id}=mainMovie;
  
  
  return (
    <div className='bg-black'> 
       <VideoTitle title={title} overview={overview} />
       <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer
