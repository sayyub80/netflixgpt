import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from "./Header"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

function Browse() {
   useNowPlayingMovies()
  return (
    <div>
      <Header/>
       <div className="flex justify-center items-center h-screen">
         <MainContainer/>
         <SecondaryContainer/>
       </div>
    </div>
  )
}

export default Browse
