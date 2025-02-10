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
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleToggle =()=>{
    setMenu(!menu)
    console.log(menu);
  }

  return (
     <div className="absolute flex flex-col md:flex-row justify-between top-0 w-full px-8 pt-2 bg-gradient-to-b from-black z-30">
         <div className='flex items-center'>
         <a href='/browse'><img
        className="w-30 md:w-44 m-auto md:m-0"
        src={logoURL}
        alt="logo"
        /></a>
        <FiAlignRight onClick={handleToggle} className='text-white text-xl md:hidden'/>
         </div>
         {user && (
           <div className={`${!menu ? "hidden md:flex" : "flex"} gap-2 md:gap-0 py-2 md:py-0 bg-black md:bg-transparent w-[98vw] md:w-auto -ml-7 md:ml-0 md:flex-row flex items-center justify-center `}>
             {showGptSearch && (
               <select onChange={handleLanguageChange} className='p-2 bg-gray-900 text-white mx-3'>
                 {SUPPORTED_LANG.map((lang) => (
                   <option className='md-2' value={lang.identifier} key={lang.identifier}>{lang.name}</option>
                 ))}
               </select>
             )}
             <button 
              onClick={handleGptSearchClick} 
              className='md:block py-2 px-4 cursor-pointer mr-5 rounded-sm bg-purple-400'>
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
