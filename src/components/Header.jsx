import { auth } from '../utils/firebase'; // Ensure the correct path to firebase utils
import { signOut } from "firebase/auth"; // Import signOut from firebase/auth
import { useSelector } from 'react-redux'; // Import useSelector to access user state
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth"
import { useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"
import { logoURL, SUPPORTED_LANG } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { FiAlignRight } from "react-icons/fi";

function Header() {
  const [menu,setMenu]=useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Access user state from Redux
  const showGptSearch=useSelector((store)=>store.gpt?.showGptSearch)

  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser(
          { uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL}
          ))
          navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    });
    return ()=>unsubscribe();
  },[])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
      navigate('/');
    }).catch((error) => {
      console.error("Sign out error", error);
    });
  };

  const handleGptSearchClick = () => {
     dispatch(toggleGptSearchView())
     setMenu(false)

  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleToggle =()=>{
    setMenu(!menu)
    console.log(menu);
  }

  return (
     <div className="absolute flex flex-col md:flex-row justify-between top-0 w-full px-8 pt-0 md:pt-2 bg-gradient-to-b from-black z-30">
         <div className='flex items-center relative left-2 md:left-0 '>
         <img
        
        className="w-30 md:w-44 m-auto md:m-0"
        src={logoURL}
        alt="logo"
        />
        {user &&<FiAlignRight onClick={handleToggle} className='text-white text-xl md:hidden'/>}
         </div>
         {user && (
           <div className='hidden md:flex  bg-transparent   items-center justify-center '>
             {showGptSearch && (
               <select onChange={handleLanguageChange} className='p-2 bg-gray-900 text-white mx-3'>
                 {SUPPORTED_LANG.map((lang) => (
                   <option className='md-2' value={lang.identifier} key={lang.identifier}>{lang.name}</option>
                 ))}
               </select>
             )}
             <button 
              onClick={handleGptSearchClick} 
              className=' py-2 px-4 cursor-pointer mr-5 rounded-sm bg-white'>
               {showGptSearch ? "Home" : "Gpt Search"} 
             </button>
             <img className='w-9 mr-2' alt='img' src={user?.photoURL}></img>
             <button onClick={handleSignOut} className='font-bold text-sm cursor-pointer text-white'>SignOut</button>
           </div>
         )}

{user && (
           menu && <div className='flex  md:hidden fixed w-screen left-0 top-11  bg-black   z-40 flex-col items-center pt-4 h-[40vh] gap-7 '>
           {showGptSearch && (
             <select onChange={handleLanguageChange} className='p-2 cursor-pointer bg-gray-900 text-white mx-3'>
               {SUPPORTED_LANG.map((lang) => (
                 <option className='md-2' value={lang.identifier} key={lang.identifier}>{lang.name}</option>
               ))}
             </select>
           )}
           <button 
            onClick={handleGptSearchClick} 
            className='py-2 cursor-pointer px-3 text-sm rounded-[2px] bg-white'>
             {showGptSearch ? "Home" : "Gpt Search"} 
           </button>
           <img className='w-9 mr-2' alt='img' src={user?.photoURL}></img>
           <button onClick={handleSignOut} className='font-bold text-sm cursor-pointer text-white'>SignOut</button>
         </div>
         )}
     </div>
  );
}

export default Header;
