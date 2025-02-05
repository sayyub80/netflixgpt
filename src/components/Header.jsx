
import { auth } from '../utils/firebase'; // Ensure the correct path to firebase utils
import { signOut } from "firebase/auth"; // Import signOut from firebase/auth
import { useSelector } from 'react-redux'; // Import useSelector to access user state
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth"
import { useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"
import { logoURL } from '../utils/constants';


function Header() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Access user state from Redux


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
  };

  return (
     <div className="absolute flex justify-between top-0 w-full px-8 py-2 bg-gradient-to-b from-black z-10">
         <img
        className="w-44"
        src={logoURL}
        alt="logo"
      />
     {user && <div className='flex items-center'>
         <img className='w-7  mr-2' alt='img' src={user?.photoURL}></img>
         <button onClick={handleSignOut} className='font-bold text-sm cursor-pointer text-white'>SignOut</button>
      </div>}
     </div>
  );
}

export default Header;
