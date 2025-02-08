import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

function MovieCard({posterPath}) {
  if(!posterPath) return null;
  return (
    <div className='w-54 pr-4 cursor-pointer'>
      
       <img alt='img' src={IMG_CDN_URL+posterPath}></img>

    </div>
  )
}

export default MovieCard
