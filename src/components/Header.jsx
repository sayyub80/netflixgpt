
import { auth } from '../utils/firebase'; // Ensure the correct path to firebase utils
import { signOut } from "firebase/auth"; // Import signOut from firebase/auth
import { useSelector } from 'react-redux'; // Import useSelector to access user state
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth"
import { useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"


function Header() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Access user state from Redux


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
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
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
     {user && <div className='flex items-center'>
         <img className='w-8 rounded-full mr-2' alt='img' src={user?.photoURL}></img>
         <button onClick={handleSignOut} className='font-bold cursor-pointer text-white'>SignOut</button>
      </div>}
     </div>
  );
}

export default Header;
