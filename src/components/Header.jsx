
import { auth } from '../utils/firebase'; // Ensure the correct path to firebase utils
import { signOut } from "firebase/auth"; // Import signOut from firebase/auth
import { useSelector } from 'react-redux'; // Import useSelector to access user state
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth"
import { useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"
import { logoURL, SUPPORTED_LANG } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



function Header() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Access user state from Redux
  const showGptSearch=useSelector((store)=>store.gpt?.showGptSearch)


  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
       //whenever user sign in or sign up this is called and add user to our store 
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser(
          { uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL}
          ))
          navigate('/browse')
      } 
      //if user logout
      else {
        dispatch(removeUser())
        navigate('/')
      }
    });
    // Unsubscribe when component unmount
    return ()=>unsubscribe();
  },[])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
      navigate('/');
    }).catch((error) => {
      console.error("Sign out error", error);
    });
  };6
  //gpt click
  const handleGptSearchClick = () => {
     dispatch(toggleGptSearchView())
  }
  //language change
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  
  return (
     <div className="absolute flex justify-between top-0 w-full px-8 pt-2 bg-gradient-to-b from-black z-30">
         <img
        className="w-44"
        src={logoURL}
        alt="logo"
      />
     {user && <div className='flex items-center '>
         {showGptSearch && (<select onChange={handleLanguageChange} className='p-2 bg-gray-900 text-white mx-3'>
          {SUPPORTED_LANG.map((lang)=>(
            <option className='md-2 ' value={lang.identifier} key={lang.identifier}>{lang.name}</option>
          ))}
         </select>)}
         <button 
          onClick={handleGptSearchClick} 
          className='py-2 px-4 cursor-pointer mr-5 rounded-sm  bg-purple-400'>
           {showGptSearch?"Home":"Gpt Search"} 
         </button>
         <img className='w-9  mr-2' alt='img' src={user?.photoURL}></img>
         <button onClick={handleSignOut} className='font-bold text-sm cursor-pointer text-white'>SignOut</button>
      </div>}
     </div>
  );
}

export default Header;
