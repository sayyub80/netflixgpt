export const logoURL="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const avatarLogo="https://avatars.githubusercontent.com/u/6759280?v=4"



export const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+import.meta.env.VITE_TMDB_KEY
    }
  };

export const IMG_CDN_URL='https://image.tmdb.org/t/p/w500/'




export const SUPPORTED_LANG=[
  {identifier:'en',name:'English'},
  {identifier:'hindi',name:'Hindi'},
  {identifier:'spanish',name:'Spanish'},
  {identifier:'french',name:'French'},
]



export const GEMINI_API_KEY=import.meta.env.VITE_GEMINI_API_KEY 